

# Plano de Correção: Botão Salvar na Nutrição + Fluxo de Novos Usuários

## Resumo dos Problemas Identificados

### 1. Modal de Nutrição - Botão Salvar Invisível
O footer com o botão "Salvar" está no step 5 (notas), mas:
- Usa `sticky bottom-0` dentro de um container flex que pode não renderizar corretamente em alguns dispositivos
- O footer está posicionado DENTRO da área scrollável, não como elemento fixo do modal
- Falta explicação visual do que acontece após o registro

### 2. Página de Login - Sem Opção para Novos Usuários
- A página Auth.tsx só oferece Login e "Esqueci minha senha"
- Não existe opção para usuários sem conta conhecerem o serviço
- Deveria haver um CTA para "Criar conta" ou "Conhecer o ETHRA" direcionando para a landing page

---

## Solução 1: Corrigir Footer do Modal de Nutrição

### Problema Técnico Atual
```text
┌─────────────────────────────────┐
│ Header (sticky top)             │
├─────────────────────────────────┤
│ Content (flex-1 overflow-y-auto)│
│   └── ... steps ...             │
│   └── Footer (sticky bottom-0)  │  ← ERRADO: dentro do scroll!
└─────────────────────────────────┘
```

### Solução Correta
```text
┌─────────────────────────────────┐
│ Header (flex-shrink-0)          │
├─────────────────────────────────┤
│ Content (flex-1 overflow-y-auto)│
│   └── ... steps ...             │
├─────────────────────────────────┤
│ Footer (flex-shrink-0)          │  ← FORA do scroll
└─────────────────────────────────┘
```

### Mudanças no Arquivo: `src/components/nutrition/MealCheckModal.tsx`

1. **Mover o footer para FORA da área scrollável** (após fechar a div do content)
2. **Mostrar footer em TODOS os steps** (não apenas no step notes)
   - Step 1-4: Exibir texto explicativo sobre o que será registrado
   - Step 5: Exibir botão "Salvar" com descrição do que acontece

3. **Adicionar explicação pós-registro:**
   - Mostrar mensagem no step de sucesso: "Seu registro foi salvo e aparecerá na timeline de refeições. Você pode ver padrões de alimentação na página de Insights."

4. **Melhorar visibilidade do botão:**
   - Usar `z-[130]` no footer para garantir sobreposição
   - Adicionar sombra superior para destacar do conteúdo
   - Usar `safe-bottom` com fallback de margem

---

## Solução 2: Adicionar Opção para Novos Usuários na Página de Login

### Mudanças no Arquivo: `src/pages/Auth.tsx`

1. **Adicionar seção "Não tem conta?" abaixo do formulário de login:**
   ```text
   ────────────────────────────────────
   Novo por aqui?
   [Conhecer o ETHRA] → navega para /landing
   ────────────────────────────────────
   ```

2. **Manter consistência com a marca:**
   - Usar texto amigável: "Ainda não faz parte?"
   - Botão secundário com variante `outline`
   - Direcionar para `/landing` onde o usuário pode ver benefícios e planos

3. **Adicionar separador visual:**
   - Linha com "ou" entre o botão "Entrar" e a seção de novos usuários

---

## Detalhes de Implementação

### Arquivo 1: `src/components/nutrition/MealCheckModal.tsx`

**Mudança estrutural:**
```tsx
// Layout atual (INCORRETO)
<div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
  {/* Content + Steps */}
  {step === 'notes' && (
    <div className="sticky bottom-0 ...">  {/* Footer DENTRO do scroll */}
      <Button>Salvar</Button>
    </div>
  )}
</div>

// Layout corrigido
<div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
  {/* Content + Steps */}
</div>
{/* Footer FORA do scroll, sempre visível */}
{step !== 'success' && (
  <div className="flex-shrink-0 px-5 pt-3 pb-5 border-t ...">
    {step === 'notes' ? (
      <Button>Salvar</Button>
    ) : (
      <p className="text-sm text-muted-foreground text-center">
        Continue para registrar sua experiência alimentar
      </p>
    )}
  </div>
)}
```

**Adicionar explicação no step de sucesso:**
- Mensagem: "Seu registro foi salvo! Ele aparece na sua timeline de refeições e contribui para seus insights de alimentação consciente."

### Arquivo 2: `src/pages/Auth.tsx`

**Adicionar após o Card de login:**
```tsx
{/* Separador */}
<div className="relative my-4">
  <div className="absolute inset-0 flex items-center">
    <span className="w-full border-t border-border" />
  </div>
  <div className="relative flex justify-center text-xs uppercase">
    <span className="bg-background px-2 text-muted-foreground">ou</span>
  </div>
</div>

{/* Seção para novos usuários */}
<div className="text-center space-y-3">
  <p className="text-sm text-muted-foreground">
    Ainda não faz parte?
  </p>
  <Button
    variant="outline"
    className="w-full"
    onClick={() => navigate('/landing')}
  >
    Conhecer o ETHRA
  </Button>
</div>
```

---

## Arquivos Afetados
1. `src/components/nutrition/MealCheckModal.tsx` - Reposicionar footer + adicionar explicação
2. `src/pages/Auth.tsx` - Adicionar opção para novos usuários

---

## Testes Recomendados
1. Abrir modal de nutrição no Android e verificar se botão "Salvar" está visível
2. Testar com teclado aberto (digitando notas) e verificar que botão não é coberto
3. Verificar transição entre steps e texto explicativo no footer
4. Testar fluxo completo de registro e verificar mensagem de sucesso
5. Acessar `/auth` como usuário deslogado e clicar "Conhecer o ETHRA"
6. Verificar redirecionamento para `/landing`

