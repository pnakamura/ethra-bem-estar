

# Plano de Melhorias - Módulo de Nutrição

## Resumo Executivo
Após análise detalhada da área de Alimentação Consciente, identifiquei oportunidades significativas para melhorar a experiência do usuário, adicionar funcionalidades e incorporar ajuda contextual que já existe em outras partes do app mas está ausente na nutrição.

---

## 1. Adicionar Ajuda Contextual (ContextualHelp)

### Problema
O `MoodCheckModal` possui ajuda contextual integrada (`ContextualHelp` com ícone de `?`), mas o `MealCheckModal` e a página de Nutrição **não possuem** essa funcionalidade, apesar de já existirem conteúdos de ajuda definidos em `help-content.ts`:
- `meal-checkin`
- `water-tracker`
- `mindful-eating`

### Ações

**Arquivo: `src/components/nutrition/MealCheckModal.tsx`**
- Adicionar `ContextualHelp` no header do modal com `helpKey="meal-checkin"`
- Adicionar tooltip/ajuda contextual no step de fome explicando a diferença entre fome física e emocional

**Arquivo: `src/components/nutrition/WaterTracker.tsx`**
- Adicionar `ContextualHelp` ao lado do título "Hidratação" com `helpKey="water-tracker"`

**Arquivo: `src/pages/Nutrition.tsx`**
- Adicionar `ContextualHelp` ao lado do título principal com `helpKey="mindful-eating"`

---

## 2. Melhorias de UX no MealCheckModal

### 2.1 Feedback Visual de Progresso
- O indicador de progresso (barras de step) já existe, mas pode ser mais informativo
- Adicionar **labels de step** visíveis: "Humor → Fome → Refeição → Energia → Reflexão"

### 2.2 Animações de Transição Entre Steps
- Adicionar animação de slide horizontal (entrada/saída) entre steps para feedback mais fluido
- Usar `AnimatePresence` com `mode="wait"` para transições suaves

### 2.3 Melhorar Área de Notas (Step 5)
- Aumentar altura do textarea em telas maiores
- Adicionar prompts/sugestões de reflexão (ex: "O que você percebeu durante a refeição?")
- Mostrar contador de caracteres de forma mais discreta

### 2.4 Confirmar Antes de Fechar
- Se o usuário arrastou para fechar (drag-to-dismiss) e já preencheu dados, mostrar confirmação

---

## 3. Melhorias de UX na Página Nutrition.tsx

### 3.1 Onboarding para Novos Usuários
- Melhorar estado vazio com um mini-tutorial visual explicando os benefícios da alimentação consciente
- Adicionar ilustração ou animação lottie no estado vazio

### 3.2 Quick Actions
- Adicionar botão de "Adicionar água" diretamente na página (além do FAB de refeição)
- Permitir registro rápido de água sem abrir o WaterTracker completo

### 3.3 Filtros na Timeline
- Adicionar filtro por tipo de fome (física/emocional/todas)
- Adicionar filtro por período (hoje/semana/mês)

### 3.4 Estatísticas Rápidas
- Mostrar mini-resumo no topo: "X refeições hoje • Y copos de água • Z% fome física"

---

## 4. Melhorias de UI

### 4.1 Cards de Refeição (MealCard)
- Adicionar visual de "comparação antes/depois" mais proeminente quando expandido
- Usar cores temáticas baseadas no tipo de fome:
  - Verde para fome física
  - Laranja para fome emocional
  - Cinza para não identificada

### 4.2 WaterTracker
- Animação mais suave ao adicionar água (bounce effect)
- Celebração visual ao atingir 50% e 100% da meta
- Adicionar opção de editar quantidade personalizada

### 4.3 NutritionSummary
- Mostrar dados de alimentação consciente (não apenas macros do sistema externo)
- Se não há dados de macros, mostrar resumo dos check-ins de fome

### 4.4 Cores e Temas
- Garantir consistência da cor `nutrition` (laranja) em todos os componentes
- Adicionar variantes para estados de sucesso/alerta

---

## 5. Novas Funcionalidades

### 5.1 Lembretes de Hidratação
- Opção de ativar notificações de lembrete para beber água (se suportado pelo PWA)

### 5.2 Streak de Alimentação Consciente
- Mostrar sequência de dias com check-in de refeição
- Gamificação: badges por X dias consecutivos praticando

### 5.3 Integração com Insights
- Link direto para ver padrões de alimentação nos Insights
- Preview de insights no rodapé da página de Nutrição

### 5.4 Exportar Dados
- Permitir exportar histórico de alimentação consciente em formato simples

---

## 6. Correções Técnicas Pendentes

### 6.1 Layout do Modal (já parcialmente implementado)
- Garantir que `max-h-[min(92dvh,92vh)]` funciona em todos os navegadores
- Testar a margem inferior `mb-[max(env(safe-area-inset-bottom,24px),24px)]` em diferentes dispositivos

### 6.2 Performance
- Memoizar componentes de step para evitar re-renders desnecessários
- Lazy load do componente de sugestão de respiração

---

## Priorização Recomendada

### Alta Prioridade (Implementar Primeiro)
1. Adicionar `ContextualHelp` em todos os componentes de nutrição
2. Melhorar transições entre steps do modal
3. Garantir layout correto em todos os dispositivos Android

### Média Prioridade
4. Filtros na timeline
5. Quick action de água na página
6. Melhorar estado vazio com onboarding

### Baixa Prioridade (Futuro)
7. Lembretes de hidratação
8. Streak de alimentação
9. Exportação de dados

---

## Arquivos Afetados
- `src/components/nutrition/MealCheckModal.tsx` - Ajuda contextual + transições + melhorias UX
- `src/components/nutrition/WaterTracker.tsx` - Ajuda contextual + celebrações
- `src/components/nutrition/MealCard.tsx` - Cores temáticas + visual expandido
- `src/components/nutrition/NutritionSummary.tsx` - Resumo de check-ins
- `src/pages/Nutrition.tsx` - Ajuda contextual + filtros + quick actions

---

## Seção Técnica

### Dependências Necessárias
- Nenhuma nova dependência. Usar `ContextualHelp`, `framer-motion`, e componentes existentes.

### Padrões a Seguir
- Usar `AnimatePresence mode="wait"` para transições entre steps
- Seguir padrão do `MoodCheckModal` para ajuda contextual
- Manter `z-[120]` para modais sobre `BottomNavigation`
- Usar cores CSS variables (`hsl(var(--nutrition))`) para consistência temática

### Testes Recomendados
- Testar em Android Chrome (browser normal)
- Testar em iOS Safari
- Testar em WhatsApp In-App Browser
- Verificar com diferentes escalas de fonte (Normal/Large/Extra Grande)

