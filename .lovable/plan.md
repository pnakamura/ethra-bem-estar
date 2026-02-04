
# Restringir Acesso ao Animation Studio para Sócios

## Resumo

A funcionalidade Animation Studio deve ser exclusiva para usuários `socio`. Isso envolve duas alterações:
1. Proteger a rota `/animation-studio` para impedir acesso direto
2. Ocultar o card "Studio" nas Ações Rápidas da Home para não-sócios

---

## Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/App.tsx` | Envolver rota AnimationStudio com AdminGuard |
| `src/pages/Home.tsx` | Renderizar card Studio condicionalmente |

---

## 1. Proteção da Rota

### App.tsx

Importar `AdminGuard` e envolver a rota:

```typescript
import { AdminGuard } from "@/components/admin/AdminGuard";

// Na seção de Routes:
<Route path="/animation-studio" element={
  <AdminGuard>
    <AnimationStudio />
  </AdminGuard>
} />
```

---

## 2. Ocultar Card nas Ações Rápidas

### Home.tsx

O card "Studio" só será renderizado se `usuario?.tipo_usuario === 'socio'`:

```typescript
// Na grid de Quick Actions (linha ~247)
{usuario?.tipo_usuario === 'socio' && (
  <QuickActionCard
    emoji="✨"
    icon={Wand2}
    label="Studio"
    color="studio"
    onClick={handleAnimationStudio}
    delay={0.45}
  />
)}
```

---

## Comportamento Esperado

| Cenário | Card Studio | Acesso à Rota |
|---------|-------------|---------------|
| Não logado | Oculto | Redirecionado para `/` |
| Logado (cliente/gestor) | Oculto | Redirecionado para `/` |
| Logado (socio) | Visível | Acesso permitido |

---

## Seção Técnica

### Verificação de Permissão

O `AuthContext` já fornece o objeto `usuario` com o campo `tipo_usuario`. A verificação é simples:

```typescript
const { usuario } = useAuth();
const isSocio = usuario?.tipo_usuario === 'socio';
```

### Proteção em Duas Camadas

1. **UI Layer**: Card oculto impede descoberta da funcionalidade
2. **Route Layer**: AdminGuard bloqueia acesso direto via URL

Essa abordagem de "defense in depth" garante que mesmo que alguém descubra a URL, não conseguirá acessar sem a permissão adequada.
