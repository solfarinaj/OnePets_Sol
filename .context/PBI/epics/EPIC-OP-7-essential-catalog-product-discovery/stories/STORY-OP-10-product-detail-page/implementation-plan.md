# Implementation Plan: STORY-OP-10 - Product Detail Page

## Overview

Página dedicada para ver información detallada de un producto.

**Acceptance Criteria:**
- Ver nombre, precio, descripción, peso.
- Badge de stock y suscripción.
- SEO Metadata dinámico.

---

## Technical Approach

**Chosen approach:** Dynamic Route `[id]` + `generateMetadata`.

---

## UI/UX Design

### Componentes:
- `ProductDetail`: Layout grid (Imagen izquierda, Info derecha).
- `AddToCart`: (Placeholder button por ahora).

### Wireframes:

```
┌──────────────────────────────────────┐
│  < Back                              │
│                                      │
│  [  IMAGE  ]    [ Title      ]       │
│  [         ]    [ Price      ]       │
│  [         ]    [ Desc.......]       │
│                 [ Add to Cart]       │
└──────────────────────────────────────┘
```

---

## Implementation Steps

### **Step 1: Data Fetching**

**Task:** `getProduct(id)`.

**File:** `lib/data/products.ts`

**Details:**
- `single()` query.
- Validar existencia.

**Estimated time:** 1h

### **Step 2: Page UI**

**Task:** `app/products/[id]/page.tsx`.

**Details:**
- Renderizado de datos.
- Manejo de `notFound()`.

**Estimated time:** 3h

### **Step 3: SEO**

**Task:** `generateMetadata`.

**Details:**
- Title = Product Name.
- Desc = Product Description (truncated).

**Estimated time:** 1h

---

## Estimated Effort

**Total:** 5h
**Story Points:** 5 (High due to SEO/Metadata/Layout polish)
