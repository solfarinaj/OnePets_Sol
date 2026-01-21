# Implementation Plan: STORY-OP-9 - Filter Products by Category

## Overview

Extender el filtrado para soportar categorías (Food, Litter, etc.), permitiendo selección múltiple.

**Acceptance Criteria:**
- Filtro por categoría funciona con/sin especie.
- Selección múltiple (Food OR Litter).
- URL refleja estado (`?category=food&category=litter`).

---

## Technical Approach

**Chosen approach:** Array Search Params.

**Why:**
- Soporte nativo `getAll('category')` en `URLSearchParams`.

---

## UI/UX Design

### Componentes:
- `CategoryFilter`: Lista de checkboxes o pills.
- `ActiveFilters`: Muestra chips de filtros activos con "X" para quitar.

---

## Implementation Steps

### **Step 1: Update Fetcher**

**Task:** Soportar array de categorías en `getProducts`.

**File:** `lib/data/products.ts`

**Details:**
- Modificar query Supabase: `.in('category', categories)`.

**Estimated time:** 1h

### **Step 2: Filter Component**

**Task:** UI de categorías.

**File:** `components/catalog/filters.tsx`

**Details:**
- Checkbox list.
- Lógica `onChange`: Clonar params actuales, agregar/quitar valor, `router.replace`.

**Estimated time:** 2h

### **Step 3: Integration**

**Task:** Integrar en `/products/page.tsx`.

**Details:**
- Pasar params al fetcher.

**Estimated time:** 1h

---

## Estimated Effort

**Total:** 4h
**Story Points:** 3
