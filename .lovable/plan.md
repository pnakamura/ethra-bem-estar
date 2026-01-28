
## Objetivo
Corrigir os modais/“caixas” da área de Nutrição que estão **aparecendo cortadas** e “fixas” (sem comportamento natural de bottom-sheet), garantindo que:
- o conteúdo fique **100% visível** (com rolagem interna quando necessário),
- os botões nunca fiquem escondidos pela barra do sistema / safe-area / BottomNavigation,
- o modal tenha um comportamento mais “padrão de chat/app” (estilo bottom-sheet), com drag suave para fechar.

## Diagnóstico (com base no código atual)
O `MealCheckModal` hoje usa:
- container com `className="... items-end ..."` e modal com `max-h-[85vh]` (vh clássico);
- conteúdo com `overflow-y-auto`, mas sem layout “flex-col + min-h-0” que garante rolagem correta;
- não há footer fixo/safe-area como em `MoodCheckModal`, que já está bem resolvido;
- em alguns dispositivos (especialmente iOS/WhatsApp In-App Browser), `vh` pode ficar “mentiroso”, fazendo o sheet parecer cortado.

O `MoodCheckModal` já segue um padrão mais robusto:
- `max-h-[92vh]`,
- header e footer “sticky”,
- área interna com `max-h` calculado,
- `safe-bottom` no footer.

## Estratégia
Padronizar o `MealCheckModal` para o mesmo “padrão ouro” do `MoodCheckModal`, com ajustes específicos para Nutrição.

---

## Mudanças planejadas (implementação)

### 1) Refatorar layout do `MealCheckModal` para bottom-sheet robusto
**Arquivo:** `src/components/nutrition/MealCheckModal.tsx`

**Ações:**
1. Trocar o wrapper para separar backdrop e sheet (igual ao `MoodCheckModal`):
   - wrapper: `fixed inset-0 z-50 flex items-end justify-center`
   - backdrop: `absolute inset-0 bg-background/80 backdrop-blur-sm` (ou manter leve escurecimento)
2. Trocar `max-h-[85vh]` por `max-h-[92dvh]` (ou `max-h-[92vh]` se preferirem, mas `dvh` é mais estável no mobile moderno).
3. Transformar o sheet em layout flex:
   - container: `flex flex-col w-full max-w-lg max-h-[92dvh] overflow-hidden rounded-t-3xl`
   - header: `sticky top-0 z-10`
   - content: `flex-1 min-h-0 overflow-y-auto`
   - footer (quando existir): `sticky bottom-0 safe-bottom`
4. Garantir que o conteúdo não “empurre” o modal pra fora da tela:
   - remover qualquer `p-6 overflow-y-auto` direto sem `flex-1 min-h-0`.

**Resultado esperado:** o modal nunca ficará “cortado”; se houver muito conteúdo, ele rola por dentro.

---

### 2) Adicionar “drag to dismiss” (deslizar para baixo para fechar)
**Arquivo:** `src/components/nutrition/MealCheckModal.tsx`

**Ações:**
1. Inserir “drag indicator” visual no topo do sheet.
2. Usar `framer-motion` no container do sheet com:
   - `drag="y"`
   - `dragConstraints={{ top: 0, bottom: 0 }}`
   - `dragElastic={0.15}`
   - `onDragEnd` fechando o modal se `info.offset.y` passar um limite (ex.: 120px).
3. Manter rolagem interna funcionando sem conflito:
   - drag só no container do sheet; a área scrollável continua dentro (`content`).
   - se necessário, aplicar `style={{ touchAction: 'pan-y' }}` no container.

**Resultado esperado:** deixa de parecer “fixo”; comportamento mais natural de app.

---

### 3) Garantir botões sempre visíveis (safe-area + footer consistente)
**Arquivo:** `src/components/nutrition/MealCheckModal.tsx`

**Ações:**
1. Para o step de notas (e outros passos que precisem botões), mover a ação principal para um “footer” sticky:
   - footer com `safe-bottom`, padding adequado e background sólido (evita ficar transparente sobre conteúdo).
2. Confirmar que o botão “Salvar” já substitui “Pular” (isso já foi ajustado no diff enviado), mas agora ele ficará em área que nunca é cortada.

**Resultado esperado:** botão não some atrás da barra do iPhone / UI do WhatsApp / navegação inferior.

---

### 4) Revisar z-index e interação com BottomNavigation
**Arquivos:**
- `src/components/nutrition/MealCheckModal.tsx`
- (se necessário) `src/components/BottomNavigation.tsx` (apenas para confirmar alturas/z-index, sem mudanças se não precisar)

**Ações:**
1. Confirmar que o modal usa `z-50` e a BottomNavigation também; se houver disputa em alguns browsers, elevar o modal para `z-[120]` (padrão parecido com ContextualHelp) para garantir sobreposição.
2. Garantir que o backdrop captura clique e o sheet bloqueia propagação corretamente (já existe `stopPropagation`).

---

### 5) Validação (QA) focada no problema
**Cenários para testar:**
1. Abrir `MealCheckModal` em telas pequenas (iPhone SE/Android pequeno) e verificar:
   - header aparece inteiro,
   - conteúdo rola,
   - botão “Salvar” fica visível.
2. Testar no WhatsApp In-App Browser (principal contexto do projeto):
   - abrir modal, alternar steps, digitar no textarea, teclado não “mata” o footer.
3. Testar drag:
   - arrastar levemente (não fecha),
   - arrastar bastante (fecha),
   - tocar no backdrop (fecha).
4. Testar step “Fome emocional” com sugestão de respiração:
   - overlay de sugestão não estoura altura; rola se necessário.

---

## Observação sobre o screenshot
O sintoma “cortado” é altamente consistente com:
- `vh` tradicional em webview + teclado + barras dinâmicas,
- falta de `flex-1 min-h-0` no conteúdo scrollável,
- ausência de footer sticky com `safe-bottom`.

A refatoração acima resolve os três pontos de forma estruturada (e alinhada ao padrão já comprovado no `MoodCheckModal`).

---

## Arquivo principal afetado
- `src/components/nutrition/MealCheckModal.tsx` (refatoração de layout e drag)

## Riscos e mitigação
- **Conflito drag vs scroll:** mitigado mantendo scroll no content e drag no container; ajustar threshold do drag.
- **Diferenças iOS/Android:** mitigado usando `dvh` + sticky footer + safe-bottom.
