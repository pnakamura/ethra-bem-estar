
## Objetivo
Corrigir de forma definitiva:
1) **Botão “Salvar Registro” não aparece** no passo 5 (Reflexão).
2) **Restauração do rascunho** está voltando para a **pergunta 5**, mas deve voltar para a **4 (Energia)** quando o usuário saiu logo após selecionar energia.

---

## O que descobri no código atual (por que ainda falha)
### 1) O botão existe, mas está “preso” no footer absoluto
No `MealCheckModal.tsx`, o botão **só é renderizado no footer** quando `step === 'notes'`:

- Footer está `absolute bottom-0 ... z-[130]`.
- Em browsers problemáticos (WhatsApp/Android WebView), ainda pode acontecer de:
  - o footer ficar **fora da área visível** (mesmo absoluto), ou
  - ficar **atrás de alguma camada** / cálculo de viewport errado durante `drag`/`overflow`.

Como você pediu explicitamente: **“Coloque o botão logo após a caixa de texto”**, a abordagem mais robusta é **não depender do footer para o botão**.

### 2) A restauração “deveria” voltar para energy, mas na prática ainda cai em notes
Hoje a restauração faz:
- Se `draft.step === 'notes'` e `draft.notes.trim()` vazio → `restoreStep = 'energy'`.

Se ainda está indo para o passo 5, isso indica um destes cenários reais:
- O draft está chegando com `notes` **não vazio** (mesmo que seja espaço/quebra de linha).
- O draft está sendo sobrescrito para `step:'notes'` depois do “energy select” por algum fluxo não previsto.
- Ou o `restoreStep` até é calculado, mas algo depois está mudando `step` novamente (ex.: alguma navegação/efeito).

Vamos tornar isso **determinístico**, baseado no que você quer:  
“Se saiu logo após selecionar energia, sempre voltar para Energia”.

---

## Estratégia (mudança de abordagem)
### A) Botão “Salvar” passa a ficar dentro do conteúdo do passo 5 (logo após a textarea)
Em vez de confiar no footer:
- Renderizar o botão **imediatamente após a textarea** no bloco do step `notes`.
- Opcionalmente manter um texto explicativo abaixo do botão.
- O footer global pode ficar apenas com mensagens simples (ou ser removido) para evitar conflitos de layout.

Para garantir visibilidade em mobile (teclado aberto):
- Colocar o botão em um container **`sticky bottom-0`** dentro da área scrollável do step `notes`, com `bg-card`, `border-t` e `safe-area-bottom`.
- Isso dá o melhor dos 2 mundos:
  - o botão fica “logo após a caixa de texto” no DOM,
  - e também fica “fixo”/visível durante scroll e teclado.

### B) Restauração: usar regra “à prova de falhas” para voltar à página 4
Vamos reforçar a lógica de restauração com duas medidas:

1) **Normalização de notes** na restauração: considerar vazio se:
   - `!draft.notes` OU
   - `draft.notes.trim().length === 0`

2) **Âncora forte para o caso específico do seu bug**:
   - Se `draft.selectedEnergy` está preenchido **e** `draft.notes` está vazia → restaurar **sempre** em `energy` (passo 4).
   - Mesmo que `draft.step` tenha sido salvo como `notes` por qualquer motivo, a regra do seu requisito ganha prioridade.

---

## Mudanças planejadas (arquivo por arquivo)

### 1) `src/components/nutrition/MealCheckModal.tsx`

#### 1.1. Mover/duplicar botão para dentro do step `notes`
No bloco:
```tsx
{step === 'notes' && !showBreathingSuggestion && ( ... )}
```
Adicionar logo após a textarea (ou logo após o bloco textarea + contador):
- Um container com:
  - Texto curto
  - Botão “Salvar Registro”
- Preferência: container `sticky bottom-0` dentro do scroll (assim fica sempre visível).

Exemplo de estrutura (conceitual):
```tsx
<div className="space-y-3">
  ... textarea ...

  <div className="sticky bottom-0 -mx-5 px-5 pt-3 bg-card border-t border-border/30 safe-area-bottom">
    <p className="text-xs text-muted-foreground text-center mb-3">
      Ao salvar, seu registro aparecerá na timeline e ajudará a identificar padrões alimentares
    </p>
    <Button ...>Salvar Registro</Button>
  </div>
</div>
```

#### 1.2. Simplificar ou remover o botão do footer global
Para evitar duplicidade/confusão:
- Opção recomendada: no footer global **não renderizar botão de salvar** (deixar o botão apenas no step `notes`).
- O footer global pode ficar com mensagens do tipo:
  - “Continue para registrar...”
  - ou, no step `energy`, uma dica curta.
- Alternativa: manter o footer, mas sem depender dele para “Salvar”.

Isso elimina 100% a chance do “Salvar” sumir por causa de footer.

#### 1.3. Restauração determinística (voltar para a 4)
No `useEffect` de restore, substituir a lógica de `restoreStep` por uma função mais explícita:

Regras (ordem de prioridade):
1) Se `draft.selectedEnergy` existe e `draft.notes.trim()` está vazia → `restoreStep = 'energy'`
2) Senão, se `draft.step === 'notes'` e `draft.notes.trim()` vazia → `restoreStep = 'energy'`
3) Senão, se `restoreStep === 'energy'` e `!draft.selectedEnergy` → `restoreStep = 'category'`
4) Caso contrário, manter `draft.step`

Também vamos garantir que `draft.notes` seja tratado como string segura:
- `const restoredNotes = typeof draft.notes === 'string' ? draft.notes : ''`

#### 1.4. (Pequena melhoria) Salvar notes “limpo” quando selecionar energia
No `handleEnergySelect`, ao salvar draft imediatamente, garantir:
- `notes: notes ?? ''`
- Se necessário, `notes: notes.trim()` para evitar armazenar whitespace que quebra a regra.

---

## Como vamos validar (checklist)
1) Abrir modal → ir até o passo 5:
   - o botão “Salvar Registro” deve estar **logo abaixo da caixa de texto**, visível.
2) Em Android/WhatsApp in-app:
   - focar no textarea (teclado aberto) e verificar que o botão ainda fica acessível (via sticky).
3) Teste de restauração:
   - ir até passo 4, selecionar energia, fechar imediatamente → abrir novamente:
     - deve voltar no **passo 4 (Energia)**.
4) Se escrever qualquer nota e fechar → abrir novamente:
   - pode voltar no passo 5 (porque existe conteúdo real).

---

## Arquivos afetados
- `src/components/nutrition/MealCheckModal.tsx` (principal; layout do botão e restauração)
- (Opcional) nenhum outro arquivo necessário, já que `useNutritionDraft.ts` está ok para armazenar dados; o problema é a decisão de “qual passo restaurar”.

---

## Observação importante (para destravar se ainda falhar)
Se após isso ainda “voltar no passo 5”, a próxima ação de debug será pedir para você copiar/colar o conteúdo do `localStorage` na chave:
`nutrition-check-in-draft`
Assim verificamos exatamente o que está sendo salvo em `step` e `notes` no dispositivo real (WhatsApp WebView pode se comportar diferente).
