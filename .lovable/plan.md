

# Plano: Popular Banco de Dados com Export ETHRA

## ✅ CONCLUÍDO

## Resumo

Este arquivo SQL contém dados de produção do ETHRA com conteúdo rico e detalhado para substituir os dados de seed genéricos inseridos anteriormente.

---

## Dados Incluídos no Arquivo

| Tabela | Registros | Descrição |
|--------|-----------|-----------|
| `categorias_refeicao` | 6 | Categorias de refeição com horários (UUIDs de produção) |
| `meditation_categories` | 4 | Relaxamento, Foco, Sono, Natureza |
| `planos` | 6 | Planos completos com links Mercado Pago |
| `feature_access_levels` | 8 | Features premium/free |
| `plan_feature_access` | 9 | Mapeamento plano → acesso |
| `breathing_techniques` | 7 | Técnicas com áudio e explicações detalhadas |
| `spiritual_guides` | 6 | Guias com system prompts completos (Mestre Thich, Aurora, Dr. Mente, Deepak, Dr. Amit, Dr. Gabor) |
| `journeys` | 8 | Jornadas diversas (21 Dias, Estoica, MBSR, etc) |
| `meditation_tracks` | 14 | Meditações com URLs de áudio |
| `journey_days` | 21 | Conteúdo completo do "Desafio 21 Dias" |

---

## Destaques do Conteúdo

### Guias Espirituais (System Prompts Profissionais)
- **Mestre Thich**: Abordagem Budista, mindfulness
- **Aurora**: Chakras, astrologia, cristais
- **Dr. Mente**: Neurociência aplicada
- **Deepak**: Consciência integral
- **Dr. Amit**: Física quântica e consciência
- **Dr. Gabor**: Trauma e cura compassiva

### Técnicas de Respiração (com áudio)
- 4-7-8 para ansiedade
- Quadrada para estresse
- Energizante para cansaço
- Suspiro fisiológico para pânico
- Wim Hof (premium)
- Narina alternada (premium)
- Coerência cardíaca

### Jornada "Desafio 21 Dias"
Todos os 21 dias com:
- Ensinamentos diários
- Prompts de reflexão
- Desafios práticos
- Referências a meditações e respirações

---

## Observação Importante

Os URLs de áudio/imagem apontam para o projeto original:
```
https://jjpajouvaovffcfjjqkf.supabase.co/storage/v1/object/public/...
```

Após a migração dos arquivos de mídia, será necessário atualizar esses URLs.

---

## Ações a Executar

Após aprovação, executarei o SQL em etapas para popular o banco:

1. Categorias de refeição e meditação
2. Planos e features de acesso
3. Técnicas de respiração
4. Guias espirituais
5. Jornadas
6. Faixas de meditação
7. Dias da jornada "21 Dias"

Todos os INSERTs usam `ON CONFLICT DO UPDATE` para re-execução segura.

---

## ✅ Execução Realizada em 2026-02-05

Todos os dados do arquivo `ethra-data-export.sql` foram inseridos com sucesso:

| Tabela | Status |
|--------|--------|
| `categorias_refeicao` | ✅ Inserido |
| `meditation_categories` | ✅ Inserido |
| `planos` | ✅ Inserido |
| `feature_access_levels` | ✅ Inserido |
| `plan_feature_access` | ✅ Inserido |
| `breathing_techniques` | ✅ Inserido |
| `spiritual_guides` | ✅ Inserido |
| `journeys` | ✅ Inserido |
| `meditation_tracks` | ✅ Inserido |
| `journey_days` (21 dias) | ✅ Inserido |

