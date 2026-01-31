
# Análise Completa do ETHRA - Plataforma de Bem-Estar Emocional

## Resumo Executivo

O ETHRA é uma aplicação de bem-estar emocional completa com 22 páginas, sistema de autenticação robusto, controle de acesso hierárquico e backend seguro via Edge Functions. A arquitetura é sólida, mas há algumas melhorias de segurança recomendadas.

---

## 1. Arquitetura de Navegação

### Mapa de Rotas

```text
┌─────────────────────────────────────────────────────────────────┐
│                         ROTAS PÚBLICAS                          │
├─────────────────────────────────────────────────────────────────┤
│  /                 → Home (Dashboard)                           │
│  /landing          → Página de apresentação                     │
│  /onboarding       → Introdução para novos usuários             │
│  /auth             → Login e recuperação de senha               │
│  /privacy          → Política de privacidade                    │
│  /plans            → Planos de assinatura                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    ROTAS AUTENTICADAS                           │
├─────────────────────────────────────────────────────────────────┤
│  /guide            → Chat com guia espiritual                   │
│  /guide/select     → Seleção de guia                            │
│  /journeys         → Jornadas ativas                            │
│  /journeys/explore → Explorar jornadas                          │
│  /journal          → Diário emocional                           │
│  /nutrition        → Nutrição consciente                        │
│  /insights         → Dashboard analítico                        │
│  /favorites        → Conteúdos favoritos                        │
│  /report           → Relatório de bem-estar (IA)                │
│  /profile          → Perfil do usuário                          │
│  /settings         → Configurações                              │
│  /emotion-result   → Resultado do check-in emocional            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    ROTAS ADMINISTRATIVAS                        │
├─────────────────────────────────────────────────────────────────┤
│  /admin/breathing      → Gerenciar técnicas de respiração       │
│  /admin/meditation     → Gerenciar meditações                   │
│  /admin/journeys       → Gerenciar jornadas                     │
│  /admin/guides         → Gerenciar guias espirituais            │
│  /admin/access         → Gerenciar permissões por plano         │
└─────────────────────────────────────────────────────────────────┘
```

### Navegação Inferior (BottomNavigation)

| Posição | Ícone | Label | Rota |
|---------|-------|-------|------|
| 1 | Home | Início | `/` |
| 2 | MessageCircle | Guia | `/guide` |
| 3 | Heart | Favoritos | `/favorites` |
| 4 | BookOpen | Diário | `/journal` |
| 5 | User | Perfil | `/profile` |

---

## 2. Sistema de Autenticação

### Fluxo de Login

```text
┌─────────────┐     ┌─────────────────┐     ┌──────────────┐
│  Usuário    │────▶│ Supabase Auth   │────▶│ Tabela       │
│  (email/    │     │ (valida         │     │ `usuarios`   │
│   senha)    │     │  credenciais)   │     │ (verifica    │
└─────────────┘     └─────────────────┘     │  autorização)│
                                            └──────────────┘
                                                   │
                              ┌────────────────────┴────────────────────┐
                              ▼                                         ▼
                     ┌────────────────┐                       ┌─────────────────┐
                     │ ✅ Autorizado  │                       │ ❌ Não existe   │
                     │ (define        │                       │ na tabela       │
                     │  usuario,      │                       │ → Logout +      │
                     │  tipo, status) │                       │ "Não autorizado"│
                     └────────────────┘                       └─────────────────┘
```

### Tipos de Usuário

| Tipo | Descrição | Acesso Admin |
|------|-----------|--------------|
| `cliente` | Usuário padrão | ❌ |
| `socio` | Administrador | ✅ |
| `gestor` | Gerencia dependentes | ❌ |
| `dependente` | Vinculado a gestor | ❌ |

### Status de Conta

- `ativa` - Acesso normal
- `cancelada` - Conta cancelada
- `suspensa` - Temporariamente bloqueada
- `expirada` - Assinatura vencida

---

## 3. Sistema de Controle de Acesso

### Hierarquia de Permissões

```text
NÍVEIS DE ACESSO DO USUÁRIO (crescente):
┌──────────┬──────────┬──────────┬──────────┐
│   none   │  preview │  limited │   full   │
│ (nenhum) │(só vê)   │(free+    │ (tudo)   │
│          │          │ basic)   │          │
└──────────┴──────────┴──────────┴──────────┘

NÍVEIS DE CONTEÚDO (crescente):
┌──────────┬──────────┬──────────┬───────────┐
│   free   │  basic   │ premium  │ exclusive │
│ (grátis) │(básico)  │(premium) │(exclusivo)│
└──────────┴──────────┴──────────┴───────────┘
```

### Lógica de Acesso Cumulativo

| Nível Usuário | Acessa Conteúdos |
|---------------|------------------|
| `none` | Apenas `free` |
| `preview` | Visualiza todos (bloqueado) |
| `limited` | `free` + `basic` |
| `full` | Todos os níveis |

### Componentes de Controle

1. **FeatureGate** - Bloqueia módulos inteiros
2. **ContentLock** - Bloqueia conteúdo específico com CTA de upgrade
3. **UpgradeModal** - Modal de convite para assinatura
4. **AdminGuard** - Protege rotas `/admin/*`

---

## 4. Segurança do Banco de Dados

### Row Level Security (RLS)

✅ **Habilitado em todas as 41 tabelas**

### Políticas Principais

```text
┌────────────────────────────────────────────────────────────────┐
│                    PADRÕES DE POLICY                           │
├────────────────────────────────────────────────────────────────┤
│  Dados do usuário: auth.uid() = user_id                        │
│  Conteúdo público: is_active = true                            │
│  Admin only: is_socio() OR is_admin()                          │
│  Service role: current_setting('role') = 'service_role'        │
└────────────────────────────────────────────────────────────────┘
```

### Funções de Segurança

| Função | Propósito |
|--------|-----------|
| `is_socio()` | Verifica se é administrador |
| `is_admin()` | Verifica role admin |
| `has_role(uuid, role)` | Verifica role específica |
| `check_feature_access(uuid, feature)` | Verifica permissão de feature |
| `can_gestor_access_user(uuid)` | Verifica acesso de gestor |

### Issues de Segurança Detectadas

| Severidade | Issue | Descrição | Recomendação |
|------------|-------|-----------|--------------|
| ⚠️ WARN | Function Search Path | 6 funções sem search_path | Adicionar `SET search_path = public` |
| ⚠️ WARN | Permissive Policy | Policy INSERT com `true` em pagamentos | Restringir para service_role |
| ⚠️ WARN | OTP Expiry | Tempo de expiração muito longo | Reduzir para 10-15 minutos |
| ⚠️ WARN | Leaked Password | Proteção desabilitada | Habilitar em Auth Settings |
| ⚠️ WARN | Postgres Version | Patches de segurança disponíveis | Atualizar versão |
| ℹ️ INFO | RLS No Policy | 1 tabela sem policy | Adicionar policy |

---

## 5. Edge Functions (Backend)

### guide-chat

```text
┌─────────────────────────────────────────────────────────────────┐
│                     FLUXO DE SEGURANÇA                          │
├─────────────────────────────────────────────────────────────────┤
│  1. Verifica Authorization header (Bearer token)                │
│  2. Valida JWT via authClient.auth.getUser(token)               │
│  3. Usa service_role para operações de banco                    │
│  4. Aplica regras de segurança no prompt de IA:                 │
│     - Não fornece diagnósticos médicos                          │
│     - Não recomenda interromper tratamentos                     │
│     - Sugere ajuda profissional quando apropriado               │
│  5. Trata rate limits (429) e créditos (402)                    │
└─────────────────────────────────────────────────────────────────┘
```

### generate-wellness-report

```text
┌─────────────────────────────────────────────────────────────────┐
│                     FLUXO DE DADOS                              │
├─────────────────────────────────────────────────────────────────┤
│  1. Valida Authorization header                                 │
│  2. Obtém user via getUser()                                    │
│  3. Busca dados APENAS do próprio usuário:                      │
│     - emotion_entries                                           │
│     - breathing_sessions                                        │
│     - journal_entries                                           │
│     - registro_hidratacao                                       │
│  4. Processa e envia para IA                                    │
│  5. Retorna relatório personalizado                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Módulos e Funcionalidades

| Módulo | Funcionalidade | Persistência | Auth |
|--------|----------------|--------------|------|
| **Emoções** | Check-in com Roda de Plutchik, detecção de díades | `emotion_entries` | ✅ |
| **Respiração** | Técnicas guiadas, animações, áudio ambiente | `breathing_sessions` | ✅ |
| **Meditação** | Player de áudio, categorias, trilhas | `meditation_tracks` (read) | ✅ |
| **Jornadas** | Trilhas de X dias, progresso, práticas | `user_journeys`, `journey_day_completions` | ✅ |
| **Diário** | Escrita livre, detecção de emoções | `journal_entries` | ✅ |
| **Nutrição** | Registro de refeições, contexto emocional | `emotion_nutrition_context` | ✅ |
| **Hidratação** | Registro de água | `registro_hidratacao` | ✅ |
| **Guia IA** | Chat com guias espirituais | `guide_conversations`, `guide_messages` | ✅ |
| **Insights** | Dashboard analítico, padrões | Leitura de todas as tabelas | ✅ |
| **Relatório** | Análise semanal por IA | Edge Function | ✅ |

---

## 7. Recomendações de Melhorias

### Segurança (Prioridade Alta)

1. **Corrigir search_path das funções SQL**
   - Adicionar `SET search_path = public` em todas as funções SECURITY DEFINER

2. **Restringir policy de pagamentos**
   - Alterar INSERT policy para verificar service_role

3. **Habilitar proteção contra senhas vazadas**
   - Ativar em Supabase Dashboard > Auth > Settings

4. **Reduzir OTP expiry**
   - Configurar para 10-15 minutos máximo

5. **Atualizar Postgres**
   - Aplicar patches de segurança disponíveis

### Funcionalidades (Prioridade Média)

6. **Adicionar validação de status no contexto**
   - Bloquear usuários com status `cancelada`, `suspensa`, `expirada`

7. **Implementar logout automático**
   - Quando status mudar para não-ativo

### Código (Prioridade Baixa)

8. **Remover console.logs de produção**
   - Já há alguns em `signOut`, podem ser removidos

9. **Adicionar testes de edge functions**
   - Cobrir cenários de autenticação

---

## Seção Técnica

### Estrutura de Diretórios

```
src/
├── components/
│   ├── access/           # FeatureGate, ContentLock, UpgradeModal
│   ├── admin/            # Painel administrativo
│   ├── dashboard/        # Widgets da Home
│   ├── emotions/         # Roda de Plutchik
│   ├── guide/            # Chat com guia
│   ├── journeys/         # Componentes de jornadas
│   └── ui/               # Componentes base (shadcn)
├── contexts/
│   └── AuthContext.tsx   # Estado de autenticação
├── hooks/
│   ├── useFeatureAccess.ts   # Verificação de permissões
│   └── use*.ts               # Hooks de dados
├── pages/                # 22 páginas
└── integrations/
    └── supabase/         # Client e types
```

### Dependências Chave

- **React 18** + Vite + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Framer Motion** (animações de respiração)
- **TanStack Query** (cache e estado servidor)
- **Supabase JS** (autenticação e dados)
- **Zod** (validação)

### Variáveis de Ambiente

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

### Edge Functions Secrets

```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
LOVABLE_API_KEY
```
