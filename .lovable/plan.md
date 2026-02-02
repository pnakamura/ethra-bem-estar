

# Melhoria do Modo Box Breathing

## Problema Atual

O modo atual movimenta a bolinha assim:
- **Inhale**: Bottom-left → Top-right (atravessa 2 lados do quadrado)
- **HoldFull**: Fica parada no canto top-right
- **Exhale**: Top-right → Bottom-left (atravessa 2 lados)
- **HoldEmpty**: Fica parada no canto bottom-left

Isso é confuso porque:
1. Um lado do quadrado representa 2 fases diferentes
2. A bolinha fica nos **cantos** durante as pausas (não no meio das retas)
3. O movimento não corresponde visualmente ao conceito de "Box Breathing"

---

## Solução Proposta

Cada lado do quadrado representa **uma fase** da respiração:

```text
           ← HOLD FULL (Segure) ←
           ┌────────●────────┐
           │                 │
     ↑     │                 │     ↓
  INHALE   ●                 ●   EXHALE
 (Inspire) │                 │  (Expire)
           │                 │
           └────────●────────┘
           → HOLD EMPTY (Pause) →
```

### Movimento da Bolinha:
1. **INHALE**: Sobe pelo lado esquerdo (de baixo para cima)
2. **HOLD FULL**: Move horizontalmente pelo topo (da esquerda para direita)
3. **EXHALE**: Desce pelo lado direito (de cima para baixo)
4. **HOLD EMPTY**: Move horizontalmente pela base (da direita para esquerda)

### Durante as Pausas (Hold):
A bolinha **permanece no meio da reta** correspondente, pulsando suavemente para indicar que o usuário deve segurar a respiração.

---

## Detalhes Técnicos

### Arquivo: `src/components/breath-engine/BreathVisualizationEngine.tsx`

### Simplificação do Cálculo de Posição

Em vez do sistema complexo atual com `getPathPosition()` calculando arcos de cantos, usar cálculo direto por fase:

```text
const left = centerX - halfSize;
const right = centerX + halfSize;
const top = centerY - halfSize;
const bottom = centerY + halfSize;

switch (currentPhase) {
  case 'inhale':
    // Lado esquerdo: bottom → top
    x = left
    y = lerp(bottom, top, easedProgress)
    
  case 'holdFull':
    // Lado superior: left → right (ou parado no meio)
    x = lerp(left, right, easedProgress) 
    y = top
    // OU para ficar no meio: x = centerX, y = top
    
  case 'exhale':
    // Lado direito: top → bottom
    x = right
    y = lerp(top, bottom, easedProgress)
    
  case 'holdEmpty':
    // Lado inferior: right → left (ou parado no meio)
    x = lerp(right, left, easedProgress)
    y = bottom
    // OU para ficar no meio: x = centerX, y = bottom
}
```

### Melhorias Visuais

1. **Indicadores de Lado Ativo**: O lado atual brilha mais intensamente
2. **Trail Direcional**: Rastro mostra direção do movimento
3. **Pulsação nas Pausas**: Quando segurar, bolinha pulsa no centro do lado
4. **Labels de Fase**: Cada lado pode ter um label sutil (INSPIRE, SEGURE, EXPIRE, PAUSE)

### Remoção de Cantos Arredondados

Para simplificar e deixar mais claro o conceito de "Box" (quadrado), usar cantos retos em vez de arredondados.

---

## Comportamento por Fase

| Fase | Direção | Posição da Bolinha |
|------|---------|-------------------|
| **Inhale** | ↑ Subindo | Lado esquerdo (y varia de bottom→top) |
| **Hold Full** | → ou ● | Topo (move ou pulsa no centro) |
| **Exhale** | ↓ Descendo | Lado direito (y varia de top→bottom) |
| **Hold Empty** | ← ou ● | Base (move ou pulsa no centro) |

### Opção A - Hold com Movimento
Durante Hold, a bolinha percorre o lado lentamente (representa o tempo passando).

### Opção B - Hold com Pausa (Recomendado)
Durante Hold, a bolinha fica **parada no meio do lado** com pulsação sutil. Isso representa melhor o conceito de "segurar".

---

## Resultado Esperado

- Visualização intuitiva onde cada lado = uma fase
- Movimento da bolinha corresponde diretamente à respiração
- Durante "Segure"/"Pause", bolinha fica no centro da reta pulsando
- Transições suaves entre lados (ease in/out nos cantos)
- Visual mais limpo e fácil de acompanhar

---

## Linhas a Modificar

| Seção | Linhas | Alteração |
|-------|--------|-----------|
| Inicialização boxPath | 185-199 | Simplificar (remover cornerRadius) |
| Cálculo de posição | 558-665 | Reescrever com lógica por fase |
| Desenho do quadrado | 667-690 | Usar cantos retos + highlight no lado ativo |
| Efeitos visuais | 715-788 | Ajustar trail e glow para nova lógica |

