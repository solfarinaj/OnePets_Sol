# Feature Implementation Plan: EPIC-OP-7 - Essential Catalog & Product Discovery

## Overview

Esta feature implementa el catálogo de productos esenciales, permitiendo a los usuarios navegar, filtrar y ver detalles de los productos. También incluye la gestión de favoritos para facilitar la recompra.

**Alcance:**

- STORY-OP-8: Browse by Species
- STORY-OP-9: Filter by Category
- STORY-OP-10: Product Detail Page
- STORY-OP-11: Product Availability by Address
- STORY-OP-12: Favorites Management

**Stack técnico:**

- Frontend: Next.js (Server Components para SEO), Shadcn UI.
- Backend: Supabase (Postgres).
- State: URL Search Params (para filtros compartibles).

---

## Technical Decisions

### Decision 1: Filtering State Management

**Options considered:**
- A) React State (useState)
- B) URL Search Params (`?species=dog&category=food`)
- C) Global Store (Zustand/Redux)

**Chosen:** B) URL Search Params

**Reasoning:**
- ✅ Deep linking: Los usuarios pueden compartir una URL con filtros aplicados.
- ✅ SEO friendly.
- ✅ Persistencia al recargar.
- ✅ Next.js App Router tiene soporte nativo (`searchParams` prop).

**Implementation notes:**
- Usar hook `useSearchParams` y `router.push` (o `<Link>`) para actualizar filtros.

### Decision 2: Product Data Fetching

**Options considered:**
- A) Client-side fetch (`useEffect` / SWR)
- B) Server-side fetch (RSC)
- C) Static Generation (SSG)

**Chosen:** B) Server-side fetch (RSC)

**Reasoning:**
- ✅ SEO: El contenido está en el HTML inicial.
- ✅ Performance: Fetch directo a DB (sin roundtrip API adicional si se hostea cerca).
- ✅ Dynamic: El stock y disponibilidad cambian, no puede ser 100% estático.

**Implementation notes:**
- Las páginas de catálogo y detalle serán `async server components`.

---

## Types & Type Safety

**Entidades:**
- `public.products`
- `public.favorite_products`

**Estrategia:**
- Extender `lib/types.ts`.

```typescript
export type Product = Database['public']['Tables']['products']['Row'];
export type Favorite = Database['public']['Tables']['favorite_products']['Row'];
```

---

## UI/UX Design Strategy

### Componentes compartidos:
- `ProductCard`: Imagen, Título, Precio, Badge (Stock), Botón Favorito.
- `FilterSidebar` (Desktop) / `FilterDrawer` (Mobile).
- `Badge`: Para "Out of Stock" o "Fast Delivery".

### Personalidad UI/UX:
- **Imágenes:** Protagonistas. Calidad alta.
- **Filtros:** Claros y rápidos. Feedback inmediato.
- **Empty States:** Amigables ("No encontramos productos para tu gato").

---

## Architecture Notes

### Folder Structure

```
/app
  /products
    page.tsx (Catalog with filters)
    /[id]
      page.tsx (Detail)
/components
  /catalog
    product-card.tsx
    filters.tsx
    product-grid.tsx
  /product-detail
    gallery.tsx
    info.tsx
/lib
  /actions
    favorites.ts
```

---

## Implementation Order

1.  **STORY-OP-8 & OP-9 (Catalog & Filters)**: Estructura base.
2.  **STORY-OP-10 (Detail)**: Navegación profunda.
3.  **STORY-OP-12 (Favorites)**: Interacción usuario.
4.  **STORY-OP-11 (Availability)**: Capa de lógica de negocio adicional.

---

## Risks & Mitigations

### Risk 1: N+1 Problem on Favorites
- **Impact:** Performance (Query por cada producto para saber si es favorito).
- **Mitigation:** Fetch de todos los IDs favoritos del usuario en *un solo query* inicial y mapear en memoria o join eficiente.

### Risk 2: Image Optimization
- **Impact:** LCP (Largest Contentful Paint) pobre.
- **Mitigation:** Usar `next/image` con tamaños correctos y placeholders.

---

## Success Criteria

- [ ] Catálogo navegable y filtrable por URL.
- [ ] SEO básico (Meta tags) en detalle de producto.
- [ ] Favoritos persistentes.
- [ ] Lighthouse score > 90 en Performance/SEO.
