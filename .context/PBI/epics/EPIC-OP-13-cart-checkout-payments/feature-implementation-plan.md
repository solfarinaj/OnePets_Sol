# Feature Implementation Plan: EPIC-OP-13 - Cart, Checkout & Payments

## Overview

Esta feature implementa el motor transaccional de OnePets. Cubre desde la gestión del carrito de compras hasta la integración con pasarelas de pago y la generación de órdenes.

**Alcance:**

- STORY-OP-14: Add Products to Cart
- STORY-OP-15: View Cart Summary
- STORY-OP-16: Select Delivery Method
- STORY-OP-17: Process Payment
- STORY-OP-18: Order Confirmation

**Stack técnico:**

- Frontend: Next.js (Client components para interactividad del carrito).
- Backend: Supabase (PostgreSQL + RLS).
- Payments: SDK de Pasarela (ej. Stripe o MercadoPago).
- Database: Tablas `carts`, `cart_items`, `orders`, `order_items`.

---

## Technical Decisions

### Decision 1: Cart State Management

**Options considered:**
- A) Client-side only (LocalStorage)
- B) Server-side only (Database)
- C) Hybrid (Database for Auth users, LocalStorage for Guests)

**Chosen:** B) Server-side only (Database)

**Reasoning:**
- ✅ Consistencia multidispositivo: El carrito te sigue si cambias de PC a Mobile.
- ✅ Facilidad de integración con stock: Validar stock en tiempo real desde el backend.
- ✅ Preparado para Subscriptions: Los pedidos recurrentes necesitan lógica de servidor.
- ❌ Trade-off: Requiere autenticación obligatoria para añadir al carrito (decidido en Fase 5).

### Decision 2: Order Creation Strategy

**Options considered:**
- A) Create order before payment (Pending)
- B) Create order only after payment success

**Chosen:** A) Create order before payment (Pending)

**Reasoning:**
- ✅ Trazabilidad de intentos de pago fallidos.
- ✅ Permite reservar stock temporalmente (opcional).
- ✅ Estructura más limpia para manejar webhooks de pago asíncronos.

---

## Types & Type Safety

**Entidades principales:**
- `Cart`, `CartItem`
- `Order`, `OrderItem`

**Estrategia:**
- Definir tipos en `lib/types/checkout.ts`.

```typescript
export type CartItemWithProduct = CartItem & { products: Product };
export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
```

---

## UI/UX Design Strategy

### Componentes compartidos:
- `CartDrawer`: Acceso rápido al carrito desde cualquier página.
- `CheckoutStepper`: Indicador visual de progreso (Carrito -> Delivery -> Pago).
- `PriceSummary`: Desglose de Subtotal, Envío y Total.

### Flujos de UX:
1. **Selección:** El usuario añade productos sin salir del catálogo.
2. **Revisión:** Pantalla clara de carrito para ajustar cantidades.
3. **Checkout:** Proceso lineal de 3 pasos para minimizar distracciones.

---

## Architecture Notes

### Folder Structure

```
/app
  /cart
    page.tsx (Full summary)
  /checkout
    /delivery
    /payment
    /success
/components
  /checkout
    - cart-item-row.tsx
    - delivery-selector.tsx
    - payment-form.tsx
/lib
  /actions
    - cart.ts
    - orders.ts
```

---

## Implementation Order

1.  **STORY-OP-14 & OP-15 (Cart Core)**: CRUD del carrito.
2.  **STORY-OP-16 (Delivery Selection)**: Integración con perfiles y lógica de zona.
3.  **STORY-OP-17 (Payment)**: Integración externa crítica.
4.  **STORY-OP-18 (Success)**: Cierre del flujo.

---

## Risks & Mitigations

### Risk 1: Payment Webhook Failure
- **Impact:** El usuario paga pero la orden no se marca como pagada.
- **Mitigation:** Implementar lógica de reconciliación y asegurar idempotencia en el Webhook Handler.

### Risk 2: Stock Race Condition
- **Impact:** Dos usuarios pagan por el último producto al mismo tiempo.
- **Mitigation:** Validación de stock final *justo antes* de procesar el cargo en la pasarela.

---

## Success Criteria

- [ ] Carrito funcional con sincronización en tiempo real con DB.
- [ ] Integración de pago exitosa en Sandbox.
- [ ] Generación de órdenes correcta con borrado de carrito post-compra.
- [ ] RLS protege que ningún usuario vea carritos u órdenes ajenas.
