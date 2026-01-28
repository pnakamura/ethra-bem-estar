

# Análise do Módulo de Nutrição (Alimentação Consciente)

## Visão Geral Atual

O módulo de Nutrição é focado em **Mindful Eating** (Alimentação Consciente), integrando estado emocional com alimentação. É uma funcionalidade diferenciada que conecta nutrição ao bem-estar emocional.

---

## Componentes Atuais

| Componente | Função |
|------------|--------|
| `Nutrition.tsx` | Página principal com timeline de refeições |
| `MealCheckModal.tsx` | Fluxo de check-in: humor → tipo de fome → categoria |
| `WaterTracker.tsx` | Registro de hidratação com meta diária |
| `NutritionSummary.tsx` | Resumo de macros (calorias, proteínas, carboidratos, gorduras) |
| `MealCard.tsx` | Card individual de registro de refeição |

---

## Estrutura do Banco de Dados

### Tabela Principal: `emotion_nutrition_context`
```
| Campo                | Tipo      | Uso Atual               |
|----------------------|-----------|-------------------------|
| mood_before          | text      | ✅ Capturado            |
| hunger_type          | text      | ✅ Capturado            |
| meal_category        | text      | ✅ Capturado            |
| energy_after         | text      | ❌ Não utilizado        |
| mindful_eating_notes | text      | ❌ Não utilizado        |
| nutrition_entry_id   | uuid      | ❌ Nunca vinculado      |
```

### Tabelas Relacionadas (Leitura)
- `informacoes_nutricionais`: Macros de refeições (vem de app externo)
- `registro_hidratacao`: Registro de água (funcional)
- `categorias_refeicao`: 6 categorias (Café, Lanche Manhã, Almoço, etc.)
- `metas_usuario`: Metas de calorias, água e peso (não utilizado no ETHRA)

### Tipos de Líquidos Disponíveis
`água`, `café`, `chá`, `suco`, `outro`

---

## Análise de Uso

**Dados atuais:**
- 5 registros de emotion_nutrition_context
- 1 usuário ativo
- 2 registros de fome emocional, 1 física, 2 desconhecido
- Campos `energy_after` e `mindful_eating_notes` nunca utilizados

---

## Problemas Identificados

### 1. Campos Subutilizados
O modal de check-in não coleta `energy_after` (energia após comer) nem `mindful_eating_notes` (reflexões), ambos já suportados no banco.

### 2. Falta de Feedback Pós-Refeição
O fluxo termina após selecionar a categoria. Não há registro de como a pessoa se sentiu depois de comer.

### 3. Hidratação Limitada
- Apenas registra "água" (tipo fixo)
- Tipos de líquidos disponíveis (café, chá, suco) não são utilizados na UI
- Sem lembretes ou notificações

### 4. Sem Correlações nos Insights
O hook `useInsightsData` processa hidratação, mas não integra dados de `emotion_nutrition_context` para correlacionar fome emocional com estados emocionais.

### 5. Resumo de Macros Desconectado
`NutritionSummary` lê de `informacoes_nutricionais` (app externo), mas essa tabela não tem dados para a maioria dos usuários do ETHRA.

### 6. Sem Histórico Visual Rico
Timeline mostra apenas cards básicos, sem gráficos de tendências ou padrões.

### 7. Sem Gamificação
O módulo não contribui para pontos ou conquistas do sistema de gamificação.

---

## Oportunidades de Melhoria

### Nível 1: Melhorias Imediatas (Usar o que já existe)

#### 1.1 Adicionar Etapa "Como você se sente agora?"
Após selecionar categoria, perguntar `energy_after`:
- 😴 Sonolento
- 😌 Satisfeito
- ⚡ Energizado
- 🤢 Desconfortável
- 😐 Normal

**Impacto:** Coletar dados já suportados no banco para análises futuras.

#### 1.2 Campo de Reflexão Opcional
Adicionar textarea opcional para `mindful_eating_notes`:
*"Gostaria de anotar algo sobre essa experiência?"*

**Impacto:** Promove consciência alimentar real.

#### 1.3 Expandir WaterTracker com Tipos de Líquido
Permitir registrar café, chá, suco além de água:
- Ícones diferenciados
- Contagem separada

**Impacto:** Melhor acompanhamento de hidratação real.

---

### Nível 2: Melhorias de Engajamento

#### 2.1 Lembretes Inteligentes de Refeição
Sugerir check-in de alimentação baseado no horário:
- 7-9h: "Hora do café da manhã?"
- 12-14h: "Como está sua fome para o almoço?"

**Impacto:** Aumenta consistência de registros.

#### 2.2 Padrões de Fome Emocional
Correlacionar registros de fome emocional com:
- Horário do dia
- Emoções do dia anterior
- Ciclo semanal

Exibir insight: *"Você tende a sentir fome emocional às sextas à noite"*

**Impacto:** Autoconhecimento profundo sobre gatilhos.

#### 2.3 Sugestões Contextuais de Respiração
Se usuário registra fome emocional frequente:
- Sugerir técnica de respiração específica
- Oferecer meditação de 3 min para "fome consciente"

**Impacto:** Integração com outros módulos do app.

---

### Nível 3: Visualizações e Insights

#### 3.1 Dashboard de Nutrição Consciente
Adicionar gráficos:
- Proporção fome física vs emocional (pizza)
- Energia após refeições (linha temporal)
- Humor antes vs após (comparativo)

#### 3.2 Streak de Alimentação Consciente
Contador de dias consecutivos com check-in de refeição.

#### 3.3 Conquistas de Nutrição
Integrar com sistema de gamificação:
- "Mestre da Água" (7 dias batendo meta)
- "Comedor Consciente" (10 check-ins completos)
- "Vencedor da Fome Emocional" (5 respirações antes de comer)

---

### Nível 4: Funcionalidades Avançadas

#### 4.1 Diário Alimentar Simplificado
Permitir descrever o que comeu (texto livre) sem necessidade de macros:
- Foco em consciência, não contagem
- IA pode sugerir insights baseados em padrões textuais

#### 4.2 Conexão Humor-Alimentação
Relatório semanal mostrando:
- Quais alimentos/horários correlacionam com bom humor
- Padrões de energia ao longo do dia

#### 4.3 Modo Jejum Consciente
Para usuários que praticam jejum intermitente:
- Timer de jejum
- Check-in de estado durante o jejum
- Sugestões de respiração para fome

---

## Priorização Recomendada

| Prioridade | Melhoria | Esforço | Impacto |
|------------|----------|---------|---------|
| 🔴 Alta | 1.1 Etapa energy_after | Baixo | Alto |
| 🔴 Alta | 1.2 Campo de reflexão | Baixo | Médio |
| 🟡 Média | 1.3 Tipos de líquido | Baixo | Médio |
| 🟡 Média | 2.2 Padrões de fome | Médio | Alto |
| 🟡 Média | 3.2 Streak alimentação | Baixo | Médio |
| 🟢 Baixa | 3.1 Dashboard gráficos | Alto | Alto |
| 🟢 Baixa | 3.3 Conquistas | Médio | Médio |

---

## Proposta de Implementação Inicial

### Fase 1: Completar Fluxo de Check-in (1-2 dias)

1. Adicionar etapa 4 ao `MealCheckModal`: "Como você se sente agora?"
2. Adicionar campo opcional de notas
3. Salvar `energy_after` e `mindful_eating_notes`
4. Exibir esses dados no `MealCard`

### Fase 2: Expandir Hidratação (1 dia)

1. Atualizar `WaterTracker` com seletor de tipo de líquido
2. Diferenciar visualmente água de outras bebidas
3. Manter meta de 2L focada em água, mas mostrar total geral

### Fase 3: Insights de Nutrição (2-3 dias)

1. Adicionar seção em `useInsightsData` para processar `emotion_nutrition_context`
2. Criar componente `NutritionInsightsCard` com:
   - % fome física vs emocional
   - Padrões por horário/dia
   - Correlação humor-alimentação

---

## Arquivos a Modificar

| Arquivo | Mudança |
|---------|---------|
| `src/components/nutrition/MealCheckModal.tsx` | Adicionar etapas energy_after e notas |
| `src/components/nutrition/MealCard.tsx` | Exibir energy_after e notas |
| `src/components/nutrition/WaterTracker.tsx` | Seletor de tipo de líquido |
| `src/hooks/useNutrition.ts` | Atualizar mutação com novos campos |
| `src/hooks/useInsightsData.ts` | Processar dados de nutrição |
| `src/pages/Insights.tsx` | Adicionar card de insights de nutrição |

---

## Resultado Esperado

- **Utilidade:** Fluxo completo de alimentação consciente com antes/depois
- **Engajamento:** Dados mais ricos para insights personalizados
- **Atratividade:** Visualizações de padrões e conquistas
- **Diferencial:** Único app que conecta emoções + alimentação + respiração

