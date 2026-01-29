
## Objetivo (o que vai mudar)
Corrigir definitivamente dois problemas no **MealCheckModal**:

1) O botão **“Salvar Registro”** não aparece (principalmente no passo 5 / Reflexão).  
2) Ao restaurar o rascunho, o fluxo volta para a **pergunta 5**, mas deveria voltar para a **4 (Energia)** quando o usuário saiu logo após selecionar a energia.

---

## Diagnóstico (com base no código atual)
### A) “Salvar” depende de estar no step `notes`
Hoje o botão só renderiza quando `step === 'notes'`:

- Footer sempre renderiza quando `step !== 'success'`
- Mas o **botão “Salvar Registro” só aparece no bloco `step === 'notes'`**  
Se por qualquer motivo o estado estiver em `energy` (passo 4) ou o modal estiver “restaurado errado”, o usuário verá apenas o texto “Continue para registrar...”.

### B) O layout atual pode estar “cortando” o footer em alguns browsers
Mesmo com `flex` correto, em browsers como WhatsApp In‑App Browser / Android WebView, existe um padrão recorrente:
- `overflow-hidden` no container do bottom sheet + `drag="y"` (Framer Motion) + `overflow-y-auto` interno pode resultar em cálculo de altura/scroll inconsistente.
- Resultado típico: o **footer fica fora da área visível** (literalmente “cortado”), então o botão não aparece mesmo existindo no DOM.

### C) Restauração indo para o passo 5
O autosave salva o passo atual:
```ts
if (['category','energy','notes'].includes(step) && hasData) saveDraft({ step, ... })
```
No step 4 (`energy`), ao selecionar energia, você faz:
- `setSelectedEnergy(energyId)`
- `goToStep('notes', 1)`

Isso faz o autosave rodar com `step = 'notes'`, `selectedEnergy != null`, `notes = ''`, e o draft acaba salvo como “notes”.  
Na restauração, a lógica tenta voltar para `energy` se `notes` estiver vazio — mas na prática o usuário ainda está caindo no step 5, o que indica que **precisamos impedir o draft de “avançar” para `notes` automaticamente** no momento da escolha da energia.

---

## Solução proposta (mudanças concretas)

### 1) Tornar o footer “inquebrável” (não pode ser cortado)
Trocar o footer de “bloco no fluxo do flex” para **footer ancorado** dentro do modal:

- Modal container continua `relative`.
- Footer vira `absolute bottom-0 left-0 right-0`.
- O conteúdo scrollável ganha `padding-bottom` suficiente para nunca ficar atrás do footer.

Isso elimina a dependência do cálculo de flex/scroll em browsers problemáticos e garante que o botão fique sempre visível quando estiver no step correto.

**Mudanças no `MealCheckModal.tsx`:**
- Manter container do modal como `relative` e com `overflow-hidden` (ok).
- Alterar o footer para:
  - `className="absolute bottom-0 left-0 right-0 ... safe-area-bottom"`
- Ajustar o content scroll:
  - adicionar `pb-[algo]` (ex.: `pb-28` ou `pb-32`) para abrir espaço do footer + safe-area.
  - manter `min-h-0 overflow-y-auto`.

> Por que isso funciona melhor?  
> Porque o footer deixa de depender do espaço “sobrando” no flex e passa a ser “colado” no fundo do modal, independente do tamanho do conteúdo/viewport.

### 2) Garantir que o botão apareça mesmo se o usuário “parou” no passo 4
Hoje o botão só aparece no step 5. Como o seu requisito funcional é que o usuário volte para o passo 4 ao restaurar (e provavelmente finalize dali), vamos tornar o footer mais explícito:

- No step 4 (`energy`), exibir um CTA “Continuar” fixo (ou “Ir para Reflexão”) no footer.
- No step 5 (`notes`), exibir “Salvar Registro”.

Isso reduz confusão e evita a sensação de “não tem botão” quando a restauração cai no passo 4.

### 3) Corrigir a restauração para voltar para o passo 4 (de forma determinística)
Ajustar a estratégia de salvamento: **quando o step for `notes` mas `notes` estiver vazio, salvar como `energy`**.

Ou seja, no autosave vamos calcular um `stepToSave`:

- Se `step === 'notes'` e `notes.trim()` está vazio ⇒ `stepToSave = 'energy'`
- Caso contrário ⇒ `stepToSave = step`

Assim, se o usuário selecionou energia e foi automaticamente pro step 5, mas ainda não escreveu nada, o rascunho fica “ancorado” no step 4 — exatamente o comportamento desejado.

**Mudança no autosave (`useEffect`) em `MealCheckModal.tsx`:**
- substituir `step` por `stepToSave` ao chamar `saveDraft(...)`.

### 4) (Opcional, mas recomendado) Salvar imediatamente ao selecionar energia com o step 4
Além do autosave, podemos salvar no próprio `handleEnergySelect`:

- Salvar draft com `{ step: 'energy', selectedEnergy: energyId, ... }` antes de `goToStep('notes')`.

Isso garante que mesmo se o app fechar “no meio” do state update, o draft fica correto.

---

## Checklist de validação (o que vamos testar após aplicar)
1) Abrir Nutrição → abrir modal → ir até o step 5: **botão “Salvar Registro” visível sem precisar rolar**.  
2) No step 5 com teclado aberto (digitando notas): botão continua visível.  
3) Ir até o step 4 (Energia) → selecionar uma opção → fechar o modal/app imediatamente → reabrir:
   - deve voltar no **step 4** (Energia), não no 5.  
4) Escrever alguma nota no step 5 → fechar → reabrir:
   - agora sim pode voltar no **step 5** (porque há conteúdo real).  
5) Concluir e salvar:
   - draft deve ser apagado (`clearDraft()`), e reabrir começa do step 1.

---

## Arquivos afetados
- `src/components/nutrition/MealCheckModal.tsx` (principal: layout do footer, padding do conteúdo, lógica de autosave/restauração, CTA nos steps 4/5)

Nenhuma mudança necessária em `index.css` (a classe `.safe-area-bottom` já existe e está correta).

---

## Riscos e mitigação
- **Risco:** `pb-28/pb-32` pode variar por fonte/escala de acessibilidade.  
  **Mitigação:** usar um padding mais conservador (ex.: `pb-32`) e manter o conteúdo rolável.
- **Risco:** mudanças no footer podem afetar animações/drag.  
  **Mitigação:** footer absoluto não interfere no drag do container; o drag continua no wrapper.

---

## Notas técnicas (para referência)
- A solução “footer absoluto + content com padding-bottom” é a forma mais robusta para WebView/WhatsApp, onde `overflow-y-auto` em conjunto com `drag` frequentemente causa inconsistências visuais.
- A correção do draft deve ser feita no ponto de salvamento (autosave/handleEnergySelect) para não depender de heurísticas na restauração.
