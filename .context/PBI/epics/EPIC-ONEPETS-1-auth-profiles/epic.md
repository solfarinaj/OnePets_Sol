# Essential Catalog & Product Discovery

**Jira Key:** ONEPETS-TBD  
**Status:** ASSIGNED  
**Priority:** HIGH  
**Phase:** Foundation  

---

## Epic Description

Catálogo reducido de esenciales (alimento, arena, básicos de higiene) optimizado para mobile, con navegación clara por especie y categoría.  
Incluye ficha de producto con datos clave, disponibilidad por dirección dentro de la zona piloto y opción de marcar favoritos para recompra rápida.  
Busca minimizar fricción en la búsqueda y discovery inicial, habilitando conversión rápida hacia carrito y checkout.

**Business Value:**  
Incrementa conversión al reducir pasos para encontrar productos adecuados por mascota, mejora exactitud de disponibilidad para evitar cancelaciones por falta de stock en la zona piloto y habilita recurrencia mediante favoritos.  
Es la base para la propuesta de valor de reposición rápida y para posteriores suscripciones de alimento.

---

## User Stories

1. ONEPETS-TBD – As a pet owner, I want to browse essential products by species so that I quickly find what fits my pet.  
2. ONEPETS-TBD – As a pet owner, I want to filter products by category so that I narrow results to what I need.  
3. ONEPETS-TBD – As a pet owner, I want to view key product details so that I can decide if it is suitable.  
4. ONEPETS-TBD – As a pet owner, I want to see product availability for my address so that I know if fast delivery applies.  
5. ONEPETS-TBD – As a pet owner, I want to mark products as favorites so that I can reorder them faster.

> NOTA: Los IDs se actualizarán con las stories reales creadas en Jira.

---

## Scope

### In Scope

- Catálogo esencial (~20 SKUs) filtrable por especie (perro/gato) y categoría (food, litter, hygiene).  
- Páginas de listado con paginación básica y ordenamiento por relevancia.  
- Ficha de producto con datos clave: presentación, peso, especie/categoría, elegibilidad para suscripción, flags de stock/activo.  
- Indicador de disponibilidad según dirección guardada del usuario (zona piloto) y manejo de caso sin dirección.  
- Favoritos (agregar/remover, vista de favoritos básica).  
- Mensajes claros ante falta de stock o producto inactivo.

### Out of Scope (Future)

- Recomendaciones avanzadas o motor ML.  
- Búsqueda semántica o full-text avanzada.  
- Soporte para especies adicionales o catálogos masivos (multi-ciudad).  
- Bundles, cross-sell automatizado o promociones complejas.

---

## Acceptance Criteria (Epic Level)

1. Listado de productos esenciales muestra solo SKUs activos marcados como `isEssential`, con respuesta ≤ 2s en condiciones nominales.  
2. Filtros por especie y categoría aplican combinaciones válidas y mantienen paginación consistente.  
3. Ficha de producto expone datos clave y retorna 404 para IDs inexistentes o inactivos.  
4. Disponibilidad por dirección refleja zona piloto; si no hay dirección o está fuera de zona, se muestra mensaje claro y CTA alternativo (ej. “Configurar dirección”).  
5. Favoritos requieren usuario autenticado, evitan duplicados y persisten entre sesiones.  
6. Errores de disponibilidad o stock se comunican antes de agregar al carrito para evitar cancelaciones posteriores.  
7. UX responsive en mobile con navegación simple (≤ 3 taps desde home a ficha de producto relevante).

---

## Related Functional Requirements

- FR-005: Listado de catálogo por especie.  
- FR-006: Filtros por tipo de producto.  
- FR-007: Visualización de información clave del producto.  
- FR-008: Indicación de disponibilidad según zona.  
- FR-009: Marcado y gestión de productos favoritos.

Ver: `.context/SRS/functional-specs.md`

---

## Technical Considerations

### Frontend & UX

- Diseño mobile-first; mantener performance en listado con lazy-load de imágenes.  
- Manejar estados vacíos: sin productos filtrados, sin dirección configurada, sin favoritos.  
- CTAs claros hacia agregar al carrito y hacia configuración de dirección.

### Catalog & Filtering

- Solo productos con flags `isEssential = true` y `active = true`.  
- Validar enums de `species` y `category` desde fuente central de datos para evitar filtros inválidos.  
- Paginación y ordenamiento determinístico para evitar “saltos” al aplicar filtros.

### Database Schema

_Tablas referenciales, no hardcodear SQL en este documento:_

- `products` (id, name, species, category, isEssential, isSubscriptionEligible, active, stock flags).  
- `product_media` (imágenes principales).  
- `inventory` o equivalente por zona/punto de despacho.  
- `favorite_products` (userId, productId, timestamps).

### Security Requirements

- Autenticación obligatoria para favoritos y dirección de entrega.  
- Autorización: la dirección debe pertenecer al usuario para calcular disponibilidad.  
- Validación de input de filtros y params (evitar enumeraciones abiertas).  
- Rate-limit básico para endpoints de favoritos y ficha de producto.

---

## Dependencies

### External Dependencies

- Servicio/lógica de zonas para determinar `withinPilotZone` (puede venir de Epic 4 o configuración interna).  
- CDN o storage para imágenes de productos.

### Internal Dependencies

- **Epic 1**: cuentas y mascotas para personalizar especie y manejar autenticación.  
- **Epic 4**: definición de zona piloto y dirección seleccionada para disponibilidad.  
- **Epic 3**: carrito/checkout consume datos de producto y stock; requiere consistencia.

### Blocks

- Bloquea onboarding de carrito si no hay disponibilidad confiable por dirección.  
- Histórico de compras y suscripciones (Epic 5) dependen de ficha/producto consistente.

---

## Success Metrics

### Functional Metrics

- Tiempo de respuesta del listado y ficha ≤ 2s P95 en zona piloto.  
- Exactitud de disponibilidad por dirección ≥ 95 % vs inventario real.  
- Tasa de error 4xx/5xx en catálogo < 1 % de requests.

### Business Metrics

- Conversión desde vista de producto a “agregar al carrito” ≥ 20 % en esenciales.  
- Favoritos: ≥ 30 % de usuarios recurrentes con al menos 1 favorito guardado.  
- Reducción de cancelaciones por falta de stock a < 2 % (alineado a PRD).

---

## Risks & Mitigations

| Risk                                                 | Impact | Probability | Mitigation                                                                                   |
| ---------------------------------------------------- | ------ | ----------- | -------------------------------------------------------------------------------------------- |
| Datos de stock desalineados con inventario real      | High   | Medium      | Sincronización frecuente, flag `active` controlado por operaciones, fallback de “sin stock”. |
| Filtros confusos o poco usados                       | Medium | Medium      | Tests de usabilidad, etiquetas claras, estados vacíos instructivos.                          |
| Cálculo incorrecto de disponibilidad por dirección   | High   | Medium      | Validar ownership de dirección, pruebas dentro/fuera de zona, logs de discrepancias.         |
| Latencia alta en mobile por imágenes pesadas         | Medium | Medium      | Optimizar imágenes, lazy-loading y CDN.                                                      |
| Favoritos sin autenticación consistente              | Medium | Low         | Forzar login antes de agregar; manejar expiración de sesión con mensajes claros.             |

---

## Testing Strategy

Ver:  
`.context/PBI/epics/EPIC-ONEPETS-2-essential-catalog-product-discovery/feature-test-plan.md` (Fase 5).

### Test Coverage Requirements

- **Unit Tests:** normalización de filtros, validación de enums, formateo de datos en ficha.  
- **Integration Tests:** endpoints de catálogo con combinaciones de especie/categoría, disponibilidad por dirección.  
- **E2E Tests:** navegación mobile desde home → listado → ficha → marcar favorito; manejo de caso sin dirección / fuera de zona.

---

## Implementation Plan

Ver:  
`.context/PBI/epics/EPIC-ONEPETS-2-essential-catalog-product-discovery/feature-implementation-plan.md` (Fase 6).

### Recommended Story Order

1. ONEPETS-TBD – Listado esencial por especie y categoría (base).  
2. ONEPETS-TBD – Ficha de producto con datos clave.  
3. ONEPETS-TBD – Disponibilidad por dirección (zona piloto).  
4. ONEPETS-TBD – Favoritos (add/remove/list).  
5. ONEPETS-TBD – Optimizaciones de UX y rendimiento en mobile.

### Estimated Effort

- Development: 1.5–2 sprints.  
- Testing: 0.5 sprint.  
- Total: ~2–2.5 sprints.

---

## Notes

- Mantener vocabulario simple en labels y mensajes de error para pet owners.  
- Priorizar primeras versiones con set limitado de categorías; expandir cuando haya datos de demanda.

---

## Related Documentation

- PRD: `.context/PRD/executive-summary.md`, `.context/PRD/mvp-scope.md`  
- SRS: `.context/SRS/functional-specs.md`, `.context/SRS/non-functional-specs.md`  
- Architecture: `.context/SRS/architecture-specs.md`  
- API Contracts: `.context/SRS/api-contracts.md`
