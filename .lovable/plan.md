
# Executar 00_enums_and_functions.sql

## Resumo

Vou executar o arquivo SQL que cria os tipos customizados (ENUMs) e funções fundamentais do banco de dados ETHRA.

---

## O que será criado

### Tipos Customizados (ENUMs)

| Tipo | Valores | Uso |
|------|---------|-----|
| `app_role` | admin, moderator, user | Roles de permissão |
| `tipo_usuario` | cliente, socio, gestor, dependente | Tipos de usuário |
| `tipo_status_assinatura` | ativa, cancelada, suspensa, expirada | Status de assinatura |
| `tipo_status_pagamento` | pendente, aprovado, recusado, estornado | Status de pagamento |
| `tipo_lembrete` | agua, refeicao, peso, exercicio, meditacao | Tipos de lembrete |
| `tipo_liquido` | água, suco, chá, café, refrigerante, outro | Tipos de líquido |
| `tipo_intensidade_exercicio` | leve, moderada, intensa | Intensidade de exercício |
| `tipo_status_envio` | pendente, enviado, erro | Status de envio |
| `tipo_objetivo` | perder_peso, manter_peso, ganhar_peso, melhorar_saude | Objetivos |
| `tipo_nivel_dificuldade` | facil, moderado, dificil | Níveis de dificuldade |

### Funções de Verificação

- `is_socio()` - Verifica se usuário é sócio
- `is_admin()` - Verifica se usuário é admin
- `has_role()` - Verifica se usuário tem uma role específica
- `get_current_user_role()` - Retorna o tipo do usuário atual
- `is_current_user()` - Verifica se é o próprio usuário

### Funções de Trigger

- `update_updated_at_column()` - Atualiza timestamp automaticamente
- `update_guide_updated_at()` - Atualiza timestamp de guias

### Funções de Rate Limiting

- `check_rate_limit()` - Controle de taxa de requisições
- `cleanup_old_rate_limits()` - Limpeza de registros antigos

### Funções de Controle de Acesso

- `can_manage_dependents()` - Verifica permissão para gerenciar dependentes
- `can_gestor_access_user()` - Verifica acesso de gestor a usuário
- `can_manage_user_type()` - Verifica permissão por tipo de usuário
- `has_higher_or_equal_privilege()` - Verifica hierarquia de privilégios

### Funções de Auditoria e Perfil

- `log_admin_action()` - Registra ações administrativas
- `handle_new_user()` - Trigger para novos usuários
- `make_user_admin()` - Promove usuário a admin

---

## Próximo Passo

Após aprovar, executarei a migração com este SQL. Depois disso, você poderá enviar os arquivos de criação de tabelas (CREATE TABLE) e o seed-data para completar a estrutura do banco.
