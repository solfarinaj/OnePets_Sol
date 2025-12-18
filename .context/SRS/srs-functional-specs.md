# OnePets – Functional Specs (FRs)

Este documento mapea cada User Story del PRD a requerimientos funcionales (FR), con inputs, procesamiento, outputs y validaciones.

---

## EPIC-ONEP-01 – User Accounts & Pet Profiles

### FR-001: Registro de usuarios con email y contraseña

**FR-001: El sistema debe permitir registro de usuarios con email y contraseña.**

- **Relacionado a:** EPIC-ONEP-01, US 1.1  
- **Input:**
  - `email`: string, formato email válido (RFC básico), máx. 254 caracteres.
  - `password`: string, min. 8 caracteres.
  - `fullName`: string, min. 2 caracteres, máx. 100.
- **Processing:**
  - Validar formato del email.
  - Validar longitud mínima de password.
  - Comprobar que el email no exista ya en la base de datos.
  - Hashear la password (bcrypt u otro algoritmo seguro).
  - Crear registro en tabla `users` con estado “activo” (o “pendiente de verificación” según política).
- **Output:**
  - **Success (201):** objeto con `id`, `email`, `fullName`, `createdAt`, token de sesión (JWT).
  - **Error (400/409):** objeto de error con `code` (`EMAIL_INVALID`, `EMAIL_ALREADY_EXISTS`, `PASSWORD_WEAK`) y `message`.
- **Validations:**
  - Email único en el sistema.
  - Password no puede ser nula/vacía y cumple mínimo de longitud.
  - Todos los campos requeridos presentes.

---

### FR-002: Login de usuarios registrados

**FR-002: El sistema debe permitir que usuarios registrados inicien sesión con email y contraseña.**

- **Relacionado a:** EPIC-ONEP-01, US 1.2  
- **Input:**
  - `email`: string, formato email.
  - `password`: string, min. 8 caracteres.
- **Processing:**
  - Buscar usuario por email.
  - Verificar hash de password.
  - Verificar que el usuario no esté bloqueado o deshabilitado.
  - Generar token JWT con `userId` y rol.
- **Output:**
  - **Success (200):** objeto con `success`, `token`, y datos básicos del usuario.
  - **Error (400/401):** `INVALID_CREDENTIALS`, `USER_DISABLED`.
- **Validations:**
  - Email existente en base de datos.
  - Password coincide con hash almacenado.

---

### FR-003: Registro de mascotas del usuario

**FR-003: El sistema debe permitir que el usuario registre una o más mascotas en su perfil.**

- **Relacionado a:** EPIC-ONEP-01, US 1.3  
- **Input:**
  - `name`: string, min. 1, máx. 50.
  - `species`: string, enum: `dog`, `cat`.
  - `breed`: string opcional, máx. 100.
  - `ageYears`: integer ≥ 0.
  - `weightKg`: number ≥ 0.
  - `size`: string, enum: `small`, `medium`, `large`.
- **Processing:**
  - Validar tipos y rangos.
  - Verificar que el usuario esté autenticado.
  - Insertar nueva fila en `pets` asociada a `userId`.
- **Output:**
  - **Success (201):** objeto con datos completos de la mascota (`id`, `name`, `species`, etc.).
  - **Error (400/401):** errores de validación o no autenticado.
- **Validations:**
  - Campos requeridos presentes.
  - `species` y `size` deben pertenecer a sus enums.
  - `ageYears` y `weightKg` no negativos.

---

### FR-004: Actualización de datos de usuario y dirección

**FR-004: El sistema debe permitir que el usuario actualice sus datos personales y dirección de entrega.**

- **Relacionado a:** EPIC-ONEP-01, US 1.4  
- **Input:**
  - `fullName` (opcional): string, min. 2, máx. 100.
  - `phone` (opcional): string, patrón teléfono local.
  - Dirección:
    - `line1`: string, min. 3, máx. 120.
    - `line2`: string opcional.
    - `city`: string.
    - `region`: string.
    - `postalCode`: string.
    - `country`: string (ej. `CL`).
- **Processing:**
  - Validar campos opcionales con sus formatos si son enviados.
  - Actualizar registro de `users` y/o tabla `addresses`.
  - Revalidar si la dirección está dentro o fuera de la zona piloto.
- **Output:**
  - **Success (200):** datos actualizados del usuario/dirección.
  - **Error (400/401):** fallas de validación o usuario no autenticado.
- **Validations:**
  - Direcciones con campos mínimos obligatorios.
  - País/código postal con formato válido según reglas definidas.
  - Si dirección es usada para entrega rápida, marcar campo `withinPilotZone` según lógica de negocio.

---

## EPIC-ONEP-02 – Essential Catalog & Product Discovery

### FR-005: Listado de catálogo por especie

**FR-005: El sistema debe permitir mostrar un catálogo de productos esenciales filtrable por especie.**

- **Relacionado a:** EPIC-ONEP-02, US 2.1  
- **Input:**
  - Query param `species` (opcional): `dog` | `cat`.
  - Paginación: `page` (int ≥ 1), `pageSize` (int 1–100).
- **Processing:**
  - Construir query a `products` filtrando por `species` cuando se incluya.
  - Incluir solo productos marcados como `isEssential = true`.
  - Aplicar paginación.
- **Output:**
  - **Success (200):** lista paginada de productos esenciales.
  - **Error (500):** error de servidor.
- **Validations:**
  - `species` debe ser valor permitido si se envía.
  - `page` y `pageSize` dentro de rango.

---

### FR-006: Filtros por tipo de producto

**FR-006: El sistema debe permitir filtrar el catálogo por tipo de producto (alimento, arena, higiene, etc.).**

- **Relacionado a:** EPIC-ONEP-02, US 2.2  
- **Input:**
  - Query param `category`: string, ej. `food`, `litter`, `hygiene`.
- **Processing:**
  - Validar que `category` exista en el conjunto de categorías soportadas.
  - Añadir filtro por `category` en la consulta a `products`.
- **Output:**
  - **Success (200):** lista paginada de productos filtrados.
  - **Error (400):** categoría no soportada.
- **Validations:**
  - `category` dentro del catálogo de categorías definidas.
  - Combinación de `species + category` válida (opcionalmente).

---

### FR-007: Visualización de información clave del producto

**FR-007: El sistema debe permitir ver información clave de cada producto en su ficha.**

- **Relacionado a:** EPIC-ONEP-02, US 2.3  
- **Input:**
  - `productId`: path param UUID.
- **Processing:**
  - Buscar producto en `products` por `id`.
  - Cargar campos: nombre, descripción, especie, categoría, presentaciones, peso, `isSubscriptionEligible`, `inStock`, etc.
- **Output:**
  - **Success (200):** objeto `product` con todos los datos relevantes.
  - **Error (404):** producto no encontrado.
- **Validations:**
  - `productId` debe tener formato UUID válido.
  - Producto debe estar marcado como activo/visible.

---

### FR-008: Indicar disponibilidad según zona

**FR-008: El sistema debe indicar si un producto está disponible para la zona del usuario.**

- **Relacionado a:** EPIC-ONEP-02, US 2.4  
- **Input:**
  - `productId`: UUID.
  - Contexto de usuario:
    - dirección seleccionada o `deliveryAddressId`.
- **Processing:**
  - Determinar `withinPilotZone` de la dirección.
  - Validar inventario disponible en dark store/punto asociado a esa zona.
- **Output:**
  - **Success (200):** detalle de producto + flag `isAvailableForAddress: boolean`.
  - **Error (400/404):** dirección desconocida o producto no encontrado.
- **Validations:**
  - La dirección debe pertenecer al usuario autenticado.
  - Manejar casos sin dirección configurada (devolver mensaje claro).

---

### FR-009: Marcado y gestión de productos favoritos

**FR-009: El sistema debe permitir que el usuario marque y gestione productos favoritos.**

- **Relacionado a:** EPIC-ONEP-02, US 2.5  
- **Input:**
  - `productId`: UUID.
  - Acción: `add` | `remove` (por método o payload).
- **Processing:**
  - Validar autenticación del usuario.
  - Crear o eliminar registro en tabla `favorite_products` (userId, productId).
- **Output:**
  - **Success (200/201):** confirmación de agregado/eliminado.
  - **Error (400/401/404):** producto no encontrado, usuario no autenticado.
- **Validations:**
  - No duplicar favoritos para la misma pareja `userId + productId`.

---

## EPIC-ONEP-03 – Cart, Checkout & Payments

### FR-010: Agregar productos al carrito

**FR-010: El sistema debe permitir que el usuario agregue productos al carrito.**

- **Relacionado a:** EPIC-ONEP-03, US 3.1  
- **Input:**
  - `productId`: UUID.
  - `quantity`: integer ≥ 1.
- **Processing:**
  - Validar que el producto exista y esté activo.
  - Validar que haya stock suficiente (opcional en MVP, al menos stock básico).
  - Si el carrito ya tenía el producto, sumar cantidad; si no, agregar línea nueva.
  - Recalcular subtotal, total y posibles costos de envío (si aplica).
- **Output:**
  - **Success (200):** representación actualizada del carrito.
  - **Error (400/404):** producto inexistente o cantidad inválida.
- **Validations:**
  - `quantity` ≥ 1.
  - `productId` válido y elegible para venta.

---

### FR-011: Ver resumen del carrito

**FR-011: El sistema debe permitir que el usuario vea un resumen claro de su carrito.**

- **Relacionado a:** EPIC-ONEP-03, US 3.2  
- **Input:**
  - Contexto de usuario autenticado.
- **Processing:**
  - Obtener carrito activo del usuario:
    - items (producto, cantidad, precio unitario, total por línea),
    - subtotal, envío estimado (si se puede calcular), total.
- **Output:**
  - **Success (200):** objeto `cart` con detalle completo.
- **Validations:**
  - Usuario autenticado.
  - Si no hay carrito, devolver carrito vacío (no error).

---

### FR-012: Seleccionar método de entrega (domicilio o retiro)

**FR-012: El sistema debe permitir seleccionar entre entrega a domicilio o retiro en punto físico.**

- **Relacionado a:** EPIC-ONEP-03, US 3.3  
- **Input:**
  - `deliveryMethod`: `home_delivery` | `pickup`.
  - `deliveryAddressId` (requerido si `home_delivery`).
- **Processing:**
  - Validar que `deliveryMethod` sea valor permitido.
  - Si `home_delivery`, verificar que la dirección esté dentro de la zona soportada (para entrega rápida o estándar).
  - Si `pickup`, asociar pedido al punto de retiro por defecto.
- **Output:**
  - **Success (200):** carrito/orden provisional con método de entrega seleccionado y costos recalculados.
  - **Error (400):** dirección no válida o fuera de zona para el modo elegido.
- **Validations:**
  - `deliveryAddressId` debe ser propiedad del usuario.
  - Validar compatibilidad de `deliveryMethod` con zona.

---

### FR-013: Procesar pagos de pedidos

**FR-013: El sistema debe permitir el pago de pedidos de forma segura.**

- **Relacionado a:** EPIC-ONEP-03, US 3.4  
- **Input:**
  - `paymentMethodId` o token equivalente (dependiendo de pasarela).
  - Carrito válido (no vacío, precios actualizados).
- **Processing:**
  - Validar que el carrito tenga al menos un item.
  - Calcular montos definitivos (subtotal, envío, total).
  - Invocar integración con pasarela de pagos.
  - Manejar respuestas de la pasarela (aprobado, rechazado).
  - Si pago aprobado, crear `order` y asociar estado inicial (`pending`/`preparing`).
- **Output:**
  - **Success (201):** objeto `order` con estado, total, método de entrega y estimación de entrega.
  - **Error (400/402):** `PAYMENT_FAILED`, `CART_EMPTY`, etc.
- **Validations:**
  - Total a pagar > 0.
  - Token de pago no expirado/inválido.
  - Prevención de doble pago ante reintentos (idempotencia).

---

### FR-014: Confirmación de pedido

**FR-014: El sistema debe generar una confirmación de pedido con información clave.**

- **Relacionado a:** EPIC-ONEP-03, US 3.5  
- **Input:**
  - Pedido recién creado (`orderId`).
- **Processing:**
  - Construir mensaje de confirmación (en pantalla y por notificación):
    - número de pedido,
    - resumen de productos,
    - dirección de entrega o punto de retiro,
    - ventana estimada de entrega.
- **Output:**
  - **Success (200/201):** objeto con detalles + bandera `orderConfirmed: true`.
- **Validations:**
  - `orderId` existente y asociado al usuario actual.

---

## EPIC-ONEP-04 – Delivery & Click & Collect (Zona Piloto)

### FR-015: Registro y selección de dirección dentro de zona piloto

**FR-015: El sistema debe permitir registrar y seleccionar direcciones para entrega en la zona piloto.**

- **Relacionado a:** EPIC-ONEP-04, US 4.1  
- **Input:**
  - Datos de dirección (ver FR-004).
- **Processing:**
  - Validar formato y campos obligatorios.
  - Determinar si la dirección está dentro de la zona piloto (`withinPilotZone`).
  - Guardar dirección asociada al usuario.
- **Output:**
  - **Success (201):** objeto `address` con flag `withinPilotZone`.
- **Validations:**
  - Cada dirección debe tener campos mínimos.
  - No permitir direcciones vacías o inconsistentes.

---

### FR-016: Cálculo y visualización de ventana de entrega estimada

**FR-016: El sistema debe mostrar al usuario una ventana de entrega estimada para su pedido.**

- **Relacionado a:** EPIC-ONEP-04, US 4.2  
- **Input:**
  - Información del pedido (contenido, destino, hora actual).
- **Processing:**
  - Determinar si el pedido es elegible para entrega rápida.
  - Calcular ventana estimada (ej. 60–120 min) en base a:
    - reglas de negocio,
    - horarios de operación,
    - carga logística aproximada.
- **Output:**
  - **Success (200):** campo `estimatedDeliveryWindow` anexado al pedido.
- **Validations:**
  - Debe existir dirección válida asociada al pedido.
  - Si no es posible calcular entrega rápida, se debe usar mensaje alternativo claro.

---

### FR-017: Selección de retiro en punto físico

**FR-017: El sistema debe permitir al usuario elegir retiro en punto físico como método de entrega.**

- **Relacionado a:** EPIC-ONEP-04, US 4.3  
- **Input:**
  - `deliveryMethod = pickup`.
- **Processing:**
  - Asignar el pedido al punto de retiro definido (id del dark store/tienda).
  - Omitir cálculo de ventanas de entrega a domicilio.
- **Output:**
  - **Success (200):** pedido con `deliveryMethod: pickup` y dirección del punto de retiro.
- **Validations:**
  - Confirmar que existe al menos un punto de retiro configurado.
  - Informar claramente horario de retiro.

---

### FR-018: Listado de pedidos para operación interna

**FR-018: El sistema debe permitir a operadores ver una lista de pedidos pendientes con estado y ventana de entrega.**

- **Relacionado a:** EPIC-ONEP-04, US 4.4  
- **Input:**
  - Filtros opcionales:
    - `status` (pending, preparing, out_for_delivery, delivered, cancelled),
    - rango de fechas.
- **Processing:**
  - Consultar tabla `orders` con filtros.
  - Ordenar por prioridad (ej. pedidos con entrega más urgente primero).
- **Output:**
  - **Success (200):** lista de pedidos con datos clave para logística.
- **Validations:**
  - Solo usuarios con rol `admin` u operador autorizado pueden acceder.

---

### FR-019: Actualización de estados de pedido por operadores

**FR-019: El sistema debe permitir a operadores actualizar el estado de los pedidos.**

- **Relacionado a:** EPIC-ONEP-04, US 4.5  
- **Input:**
  - `orderId`: UUID.
  - `status`: enum: `pending`, `preparing`, `out_for_delivery`, `delivered`, `cancelled`.
- **Processing:**
  - Validar rol de usuario operador.
  - Validar transición de estado (no permitir saltos inválidos).
  - Actualizar estado de pedido y registrar timestamp del cambio.
- **Output:**
  - **Success (200):** pedido con estado actualizado.
- **Validations:**
  - `orderId` debe existir.
  - Transiciones de estado deben respetar reglas (ej. no pasar de `cancelled` a `delivered`).

---

## EPIC-ONEP-05 – Subscription Management (Alimento Recurrente)

### FR-020: Creación de suscripción basada en producto de alimento

**FR-020: El sistema debe permitir convertir un producto de alimento en una suscripción recurrente.**

- **Relacionado a:** EPIC-ONEP-05, US 5.1  
- **Input:**
  - `productId`: UUID, must be `isSubscriptionEligible = true`.
  - `petId`: UUID.
  - `frequencyWeeks`: integer ≥ 1.
- **Processing:**
  - Validar que el producto sea elegible para suscripción.
  - Validar que `petId` pertenezca al usuario.
  - Crear registro en `subscriptions` con estado `active` y calcular `nextDeliveryDate`.
- **Output:**
  - **Success (201):** objeto `subscription` con detalles.
  - **Error (400):** producto no elegible o frecuencia inválida.
- **Validations:**
  - Usuario autenticado.
  - No permitir frecuencia 0 o negativa.

---

### FR-021: Visualización y gestión de suscripciones

**FR-021: El sistema debe permitir que el usuario vea y gestione sus suscripciones activas.**

- **Relacionado a:** EPIC-ONEP-05, US 5.2  
- **Input:**
  - Contexto de usuario autenticado.
  - Para actualización:
    - `subscriptionId`: UUID.
    - Campos a modificar: `frequencyWeeks`, `status` (active, paused, cancelled).
- **Processing:**
  - Listar `subscriptions` del usuario.
  - Para updates, validar transición de estado.
- **Output:**
  - **Success (200):** lista de suscripciones o suscripción actualizada.
- **Validations:**
  - Solo el dueño de la suscripción puede verla/editarla.
  - No permitir reactivar suscripción `cancelled` sin reglas claras (definir).

---

### FR-022: Recordatorios previos a próximo envío de suscripción

**FR-022: El sistema debe enviar recordatorios antes del próximo envío de suscripción.**

- **Relacionado a:** EPIC-ONEP-05, US 5.3  
- **Input:**
  - Tarea programada (cron) que evalúa suscripciones.
- **Processing:**
  - Buscar suscripciones `active` con `nextDeliveryDate` dentro de una ventana (ej. 2–3 días).
  - Generar notificaciones (email/WhatsApp) con resumen de la próxima entrega.
- **Output:**
  - No hay output directo al usuario vía API; sí logs de notificaciones enviadas.
- **Validations:**
  - No duplicar notificaciones para la misma ventana.
  - Respetar preferencias de contacto del usuario (si existen).

---

### FR-023: Visibilidad de suscripciones para operación

**FR-023: El sistema debe permitir a operadores ver suscripciones y próximas fechas de envío.**

- **Relacionado a:** EPIC-ONEP-05, US 5.4  
- **Input:**
  - Filtros opcionales (`status`, rango de fechas de `nextDeliveryDate`).
- **Processing:**
  - Consultar tabla `subscriptions` según filtros.
- **Output:**
  - **Success (200):** lista de suscripciones para planificación de inventario y logística.
- **Validations:**
  - Acceso restringido a rol `admin`/operador.

---

## EPIC-ONEP-06 – Notifications & Basic Support

### FR-024: Notificaciones de cambio de estado de pedido

**FR-024: El sistema debe enviar notificaciones cuando el pedido cambie de estado.**

- **Relacionado a:** EPIC-ONEP-06, US 6.1  
- **Input:**
  - Evento de cambio de estado de pedido (`statusChange`).
- **Processing:**
  - Construir payload de notificación con:
    - número de pedido,
    - nuevo estado,
    - mensajes específicos por estado (preparando, en camino, entregado).
  - Enviar por los canales configurados (email/WhatsApp).
- **Output:**
  - Resultado de envío almacenado en logs internos (no expuesto directamente).
- **Validations:**
  - No enviar notificaciones duplicadas en caso de reintentos técnicos.
  - Respetar configuración de notificaciones del usuario (opt-out si aplica en futuro).

---

### FR-025: Consulta del estado de pedido desde la cuenta

**FR-025: El sistema debe permitir que el usuario consulte el estado de sus pedidos desde su cuenta.**

- **Relacionado a:** EPIC-ONEP-06, US 6.2  
- **Input:**
  - Contexto de usuario autenticado.
  - `orderId` opcional para detalle.
- **Processing:**
  - Listar pedidos del usuario y sus estados.
  - Si se solicita detalle, devolver datos completos de pedido.
- **Output:**
  - **Success (200):** lista de pedidos o detalle de pedido.
- **Validations:**
  - Usuario solo puede ver sus propios pedidos.

---

### FR-026: Canal básico de soporte para incidencias

**FR-026: El sistema debe proporcionar un canal básico de soporte para incidencias relacionadas con pedidos.**

- **Relacionado a:** EPIC-ONEP-06, US 6.3  
- **Input:**
  - Formulario o endpoint de soporte:
    - `orderId` opcional,
    - `category` (ej. entrega retrasada, producto dañado),
    - `message`: string.
- **Processing:**
  - Validar campos requeridos.
  - Crear registro en `support_tickets` o similar.
  - Notificar a operadores (correo interno o panel).
- **Output:**
  - **Success (201):** ticket de soporte creado con `ticketId`.
- **Validations:**
  - Longitud máxima del mensaje.
  - Si se incluye `orderId`, verificar propiedad del usuario.

---

### FR-027: Registro de notas internas sobre incidencias

**FR-027: El sistema debe permitir a operadores registrar notas internas sobre incidencias de pedidos.**

- **Relacionado a:** EPIC-ONEP-06, US 6.4  
- **Input:**
  - `orderId` o `ticketId`.
  - `note`: string (texto libre, máx. longitud definida).
- **Processing:**
  - Validar rol del usuario (operador/admin).
  - Guardar nota en tabla de notas internas asociada a pedido/ticket.
- **Output:**
  - **Success (201):** nota registrada con timestamp y usuario que la creó.
- **Validations:**
  - `orderId` o `ticketId` debe existir.
  - Longitud de la nota dentro de límites.

---
