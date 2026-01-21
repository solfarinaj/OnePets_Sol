# Feature Test Plan: EPIC-OP-13 - Cart, Checkout & Payments

**Fecha:** 2026-01-07
**QA Lead:** TBD
**Epic Jira Key:** OP-13
**Status:** Draft

---

## 📋 Business Context Analysis

### Business Value

Esta épica es el corazón del modelo de negocio de OnePets, ya que permite la monetización a través de la venta de productos. Su valor principal es habilitar el flujo completo de compra, desde la selección de productos hasta el pago, lo que impacta directamente en los ingresos y la validación del modelo de negocio.

**Key Value Proposition:**

- **Entrega Ultra-Rápida (≤ 2 Horas):** Esta épica habilita la promesa de valor central al permitir que los usuarios completen sus pedidos urgentes.
- **Experiencia de Compra sin Fricción:** Un checkout rápido y claro es fundamental para la conveniencia que se ofrece a los usuarios.

**Success Metrics (KPIs):**

- **Tasa de conversión:** Un flujo de checkout optimizado es crucial para alcanzar el objetivo de ≥ 3% de conversión de visitas a compras.
- **Ticket promedio:** La correcta visualización del carrito y los costos asociados influye en la decisión de compra y el monto final.
- **Tasa de cancelación por falta de stock:** Las validaciones de stock durante el checkout son clave para mantener este KPI en ≤ 2%.

**User Impact:**

- **Carla, dueña de perro en depto:** Se beneficia de un proceso de compra rápido que le permite reponer el alimento de su perro sin salir de casa y sin cargar peso.
- **Diego, dueño de gato indoor:** Valora un checkout sin fricciones, con costos claros y la posibilidad de pagar rápidamente para no perder tiempo.
- **Marcela, mamá con familia y varias mascotas:** Necesita un proceso de compra eficiente para no añadir más complejidad a su día a día.

**Critical User Journeys:**

- **Reposición rápida de alimento con entrega a domicilio:** Este es el "happy path" principal que esta épica habilita por completo.

---

## 🏗️ Technical Architecture Analysis

### Architecture Components Involved

**Frontend:**
- Componentes de React para el carrito de compras, resumen del pedido, selección de método de envío y formulario de pago.
- Páginas/rutas afectadas: `/cart`, `/checkout`, `/order-confirmation`.

**Backend:**
- API Routes en Next.js para:
  - `/api/cart` (GET, PUT)
  - `/api/orders` (POST)
  - `/api/orders/{orderId}` (GET)
- Servicios de negocio para calcular totales, validar stock, y procesar pagos.

**Database:**
- Tablas involucradas: `carts`, `cart_items`, `orders`, `order_items`, `products`, `addresses`.
- Queries críticos:
  - Recalcular el total del carrito al modificar items.
  - Creación transaccional de la orden y sus items al confirmar el pago.

**External Services:**
- **Payment Provider:** Para procesar los pagos de forma segura.

### Integration Points (Critical for Testing)

**Internal Integration Points:**

- Frontend ↔ Backend API (para todas las operaciones de carrito y pedidos)
- Backend ↔ Database (para persistir carritos y órdenes)
- Backend ↔ Auth Service (para asegurar que solo usuarios autenticados puedan comprar)

**External Integration Points:**

- Backend ↔ Payment Provider

**Data Flow:**
```
User → Frontend → API (Order Creation) → Payment Provider
                                      ↓
                                    Database (Order persistence)
```

---

## 🚨 Risk Analysis

### Technical Risks

#### Risk 1: Inconsistencia entre el stock mostrado y el real

- **Impact:** High
- **Likelihood:** Medium
- **Area Affected:** Backend / Database
- **Mitigation Strategy:**
  - Implementar validaciones de stock en el backend al agregar al carrito y, de forma crítica, antes de procesar el pago.
  - Realizar tests de concurrencia para simular múltiples usuarios comprando el mismo producto.
- **Test Coverage Required:**
  - Tests de integración que verifiquen el flujo de compra con y sin stock.
  - Tests de API que intenten comprar un producto sin stock.

#### Risk 2: Falla en la comunicación con la pasarela de pagos

- **Impact:** High
- **Likelihood:** Medium
- **Area Affected:** Integration
- **Mitigation Strategy:**
  - Implementar manejo de errores robusto para todos los posibles escenarios de respuesta de la pasarela (aprobado, rechazado, error).
  - Usar "mock servers" para simular la API de la pasarela en los tests de integración.
- **Test Coverage Required:**
  - Tests de integración para cada escenario de respuesta de la pasarela.

### Business Risks

#### Risk 1: Abandono de carrito por costos de envío inesperados

- **Impact on Business:** Afecta directamente la tasa de conversión.
- **Impact on Users:** Genera frustración y desconfianza.
- **Likelihood:** High
- **Mitigation Strategy:**
  - Mostrar el costo de envío estimado tan pronto como sea posible en el flujo de checkout.
  - Realizar pruebas A/B (a futuro) con diferentes umbrales para envío gratuito.
- **Acceptance Criteria Validation:**
  - Asegurar que los criterios de aceptación de la historia de selección de método de envío incluyan la visualización clara de los costos.

---

## ⚠️ Critical Analysis & Questions for PO/Dev

### Ambiguities Identified

**Ambiguity 1:** ¿Qué sucede si un producto se queda sin stock entre que el usuario lo agrega al carrito y va a pagar?
- **Found in:** STORY-OP-14, STORY-OP-17
- **Question for PO:** ¿Se debe remover el producto del carrito automáticamente, o mostrar un error en el checkout y pedir al usuario que lo quite?
- **Impact if not clarified:** Experiencia de usuario inconsistente y posible frustración en el momento del pago.

**Ambiguity 2:** ¿Cómo se maneja la idempotencia en la creación de órdenes?
- **Found in:** STORY-OP-17
- **Question for Dev:** Si el usuario hace doble clic en "Pagar", ¿cómo evitamos que se creen dos órdenes o se cobre dos veces?
- **Impact if not clarified:** Riesgo de duplicar órdenes y cobros, generando problemas operativos y de confianza.

---

## 🎯 Test Strategy

### Test Scope

**In Scope:**

- Funcionalidad completa del carrito de compras (agregar, ver, modificar).
- Flujo de checkout de principio a fin.
- Selección de métodos de entrega y cálculo de costos.
- Integración con la pasarela de pagos (escenarios de éxito y fallo).
- Creación y confirmación de órdenes.
- Responsividad del flujo en dispositivos móviles.

**Out of Scope (For This Epic):**

- Pruebas de carga y estrés en la pasarela de pagos.
- Gestión de cupones o descuentos.
- Flujo de devolución o cancelación de órdenes ya pagadas.

---

### Test Levels

#### Unit Testing
- **Focus Areas:**
  - Lógica de cálculo de totales en el carrito.
  - Funciones de validación de stock.
  - Helpers para el formato de precios y fechas.

#### Integration Testing
- **Focus Areas:**
  - Endpoints de la API de carrito (`/api/cart`).
  - Endpoint de creación de órdenes (`/api/orders`), incluyendo la interacción con la pasarela de pagos (mockeada).

#### End-to-End (E2E) Testing
- **Focus Areas:**
  - Flujo completo de compra: agregar producto, ir al checkout, seleccionar entrega, pagar y ver confirmación.
  - Escenarios de error (pago rechazado, dirección fuera de zona).

#### API Testing
- **Focus Areas:**
  - Contrato de la API para `/api/cart` y `/api/orders`.
  - Simulación de todos los códigos de respuesta (2xx, 4xx, 5xx).

---

### Test Types per Story

- **STORY-OP-14:** Positivos (agregar 1 item, varios), Negativos (stock 0), Boundary (cantidad 99+).
- **STORY-OP-15:** Positivos (ver carrito con items), Negativos (ver carrito vacío).
- **STORY-OP-16:** Positivos (seleccionar domicilio, pickup), Negativos (dirección fuera de zona).
- **STORY-OP-17:** Positivos (pago exitoso), Negativos (pago rechazado), Boundary (monto 0).
- **STORY-OP-18:** Positivos (ver confirmación), Negativos (acceder a orden de otro usuario).

---

## 📊 Test Cases Summary by Story

### STORY-OP-14: Add Products to Cart
**Complexity:** Medium
**Estimated Test Cases:** 8
- Positive: 3, Negative: 3, Boundary: 2

### STORY-OP-15: View Cart Summary
**Complexity:** Low
**Estimated Test Cases:** 4
- Positive: 2, Negative: 2

### STORY-OP-16: Select Delivery Method
**Complexity:** Medium
**Estimated Test Cases:** 6
- Positive: 2, Negative: 4

### STORY-OP-17: Process Payment
**Complexity:** High
**Estimated Test Cases:** 10
- Positive: 2, Negative: 6, Integration: 2

### STORY-OP-18: Order Confirmation
**Complexity:** Low
**Estimated Test Cases:** 4
- Positive: 2, Negative: 2

### Total Estimated Test Cases for Epic
**Total:** 32

---

## 🗂️ Test Data Requirements

### Test Data Strategy

**Valid Data Sets:**
- Usuarios con direcciones dentro y fuera de la zona piloto.
- Productos con y sin stock.
- Tarjetas de crédito de prueba (provistas por la pasarela de pagos) para simular pagos exitosos y rechazados.

**Invalid Data Sets:**
- Cantidades negativas o cero para agregar al carrito.
- Direcciones incompletas.

---

## ✅ Entry/Exit Criteria

### Entry Criteria (Per Story)
- [ ] La historia está implementada y desplegada en Staging.
- [ ] Los tests unitarios existen y pasan.
- [ ] No hay bugs bloqueantes de historias dependientes.

### Exit Criteria (Per Story)
- [ ] Todos los test cases críticos y de alta prioridad ejecutados y pasando.
- [ ] Todos los bugs críticos y altos resueltos y verificados.
- [ ] El reporte de ejecución de pruebas es generado y compartido.

---
