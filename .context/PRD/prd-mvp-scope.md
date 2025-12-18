# OnePets – MVP Scope

## 1. In Scope (Must Have)

### EPIC-ONEP-01 – User Accounts & Pet Profiles

**Descripción:**  
Permitir que los usuarios creen y gestionen sus cuentas, junto con la información básica de sus mascotas, para habilitar compras rápidas y futuras personalizaciones.

**User Stories**

- US 1.1: Como _dueño de mascota_, quiero crear una cuenta con email y contraseña, para poder gestionar mis pedidos y datos de envío.
- US 1.2: Como _dueño de mascota_, quiero iniciar sesión con mis credenciales, para acceder a mi historial de pedidos y suscripciones.
- US 1.3: Como _dueño de mascota_, quiero registrar una o más mascotas (nombre, especie, tamaño, edad), para que el sistema recuerde qué productos son relevantes.
- US 1.4: Como _dueño de mascota_, quiero actualizar mis datos personales y dirección de entrega, para mantener mis pedidos siempre correctamente enviados.

---

### EPIC-ONEP-02 – Essential Catalog & Product Discovery

**Descripción:**  
Ofrecer un catálogo reducido pero optimizado (Top ~20 SKUs) con foco en productos esenciales (alimento, arena, básicos de higiene), fácil de navegar desde móvil.

**User Stories**

- US 2.1: Como _dueño de mascota_, quiero ver un catálogo de productos esenciales organizados por especie (perro/gato), para encontrar rápido lo que necesito.
- US 2.2: Como _dueño de mascota_, quiero filtrar los productos por tipo (alimento, arena, higiene), para reducir la lista a lo que busco.
- US 2.3: Como _dueño de mascota_, quiero ver información clave del producto (presentación, peso, recomendación de uso), para decidir si es adecuado para mi mascota.
- US 2.4: Como _dueño de mascota_, quiero ver la disponibilidad del producto para mi zona, para saber si es elegible para entrega rápida.
- US 2.5: Como _dueño de mascota_, quiero poder marcar productos favoritos, para volver a comprarlos rápidamente en el futuro.

---

### EPIC-ONEP-03 – Cart, Checkout & Payments

**Descripción:**  
Permitir que los usuarios agreguen productos al carrito, seleccionen método de entrega y paguen de forma segura, con foco en simplicidad y velocidad.

**User Stories**

- US 3.1: Como _dueño de mascota_, quiero agregar productos al carrito desde el catálogo, para preparar mi compra.
- US 3.2: Como _dueño de mascota_, quiero ver un resumen claro de mi carrito (productos, cantidades, precios, costo de envío), para revisar antes de pagar.
- US 3.3: Como _dueño de mascota_, quiero elegir entre entrega a domicilio o retiro en punto físico, para usar la opción que más me convenga.
- US 3.4: Como _dueño de mascota_, quiero pagar con métodos de pago digitales soportados, para completar mi compra de forma rápida y segura.
- US 3.5: Como _dueño de mascota_, quiero recibir una confirmación de pedido con el número de orden y hora estimada de entrega, para saber que la compra se registró correctamente.

---

### EPIC-ONEP-04 – Delivery & Click & Collect (Zona Piloto)

**Descripción:**  
Gestionar la promesa de entrega rápida en zona piloto y la opción de retiro en punto físico, alineada con la operación de dark store / tienda asociada.

**User Stories**

- US 4.1: Como _dueño de mascota_, quiero registrar y seleccionar una dirección de entrega dentro de la zona piloto, para recibir mis productos en casa.
- US 4.2: Como _dueño de mascota_, quiero ver la promesa de tiempo de entrega estimado para mi pedido, para saber cuándo llegará.
- US 4.3: Como _dueño de mascota_, quiero elegir la opción de retiro en el punto físico disponible, para recoger el pedido cuando me convenga.
- US 4.4: Como _operador de OnePets_, quiero ver una lista de pedidos pendientes con estado y ventana de entrega, para organizar la preparación y despacho.
- US 4.5: Como _operador de OnePets_, quiero marcar un pedido como “en preparación”, “en camino” o “entregado”, para mantener actualizado el estado al cliente.

---

### EPIC-ONEP-05 – Subscription Management (Alimento Recurrente)

**Descripción:**  
Habilitar suscripciones simples para productos de alimento, con frecuencia configurable y recordatorios.

**User Stories**

- US 5.1: Como _dueño de mascota_, quiero convertir un producto de alimento en una suscripción recurrente (ej. cada 4 semanas), para no olvidarme de comprar.
- US 5.2: Como _dueño de mascota_, quiero ver y gestionar mis suscripciones activas (pausar, cambiar frecuencia, cancelar), para ajustarlas a mis necesidades.
- US 5.3: Como _dueño de mascota_, quiero recibir un recordatorio previo al próximo envío de mi suscripción, para confirmar o modificar el pedido.
- US 5.4: Como _operador de OnePets_, quiero ver un listado de suscripciones y sus próximas fechas de envío, para planificar inventario y logística.

---

### EPIC-ONEP-06 – Notifications & Basic Support

**Descripción:**  
Informar al usuario sobre el estado de su pedido y facilitar el contacto ante problemas básicos de logística o compra.

**User Stories**

- US 6.1: Como _dueño de mascota_, quiero recibir notificaciones (email/WhatsApp u otro canal) cuando mi pedido cambie de estado, para estar informado del progreso.
- US 6.2: Como _dueño de mascota_, quiero ver el estado de mi pedido desde mi cuenta (pendiente, en preparación, en camino, entregado), para tener visibilidad sin contactar soporte.
- US 6.3: Como _dueño de mascota_, quiero disponer de un canal básico de soporte (mensaje o formulario), para reportar problemas con mi pedido o entrega.
- US 6.4: Como _operador de OnePets_, quiero poder registrar notas internas sobre incidencias de pedidos, para hacer seguimiento y mejorar el servicio.

---

## 2. Out of Scope (Nice to Have – v2+)

Las siguientes funcionalidades **no son críticas para el MVP** y se consideran para versiones posteriores:

- **Programa de fidelización avanzado:**
  - Puntos, niveles y recompensas complejas.
  - Integración con programas de loyalty de terceros.

- **Recomendador avanzado de productos:**
  - Motor de recomendaciones basado en machine learning.
  - Sugerencias personalizadas avanzadas más allá de “productos relacionados básicos”.

- **Múltiples ciudades / expansión geográfica masiva:**
  - Operación simultánea en varias ciudades/regiones.
  - Soporte para múltiples dark stores y reglas logísticas complejas.

- **Integración con clínicas veterinarias y servicios de salud:**
  - Agenda de citas veterinarias.
  - Historia clínica de la mascota.

- **Aplicación móvil nativa (iOS/Android):**
  - Aplicaciones nativas completas; el MVP se centra en web responsive.

- **Analítica avanzada y paneles de BI:**
  - Dashboards detallados de comportamiento del usuario.
  - Segmentación avanzada de cohortes.

---

## 3. Success Criteria del MVP

### Criterios funcionales

El MVP se considera funcionalmente exitoso cuando:

- Los usuarios pueden:
  - registrarse, iniciar sesión y gestionar sus datos básicos,
  - registrar al menos una mascota,
  - encontrar y comprar productos esenciales a través de la web,
  - elegir entre entrega a domicilio o retiro en punto físico,
  - activar y gestionar suscripciones de alimento.

- El equipo de operaciones puede:
  - ver y gestionar pedidos desde un panel básico,
  - actualizar el estado de los pedidos,
  - planificar despachos y retiros en la zona piloto.

### Métricas mínimas (primeros 3–6 meses en zona piloto)

- **Adopción:**
  - ≥ 300 cuentas registradas.
  - ≥ 150 clientes que hayan realizado al menos 1 compra.

- **Recurrencia y suscripción:**
  - ≥ 25 % de los clientes realizan una segunda compra dentro de 60 días.
  - ≥ 15 % de los clientes con 2+ compras activan una suscripción de alimento.

- **Operación y experiencia:**
  - ≥ 80 % de los pedidos elegibles entregados dentro de la ventana de entrega prometida.
  - Tasa de cancelación por falta de stock ≤ 2 %.
  - Nivel de satisfacción (NPS o encuesta simple) con promedio ≥ 8/10 entre los primeros clientes encuestados.

### Condiciones para considerar lanzamiento a siguiente fase

- La plataforma es estable bajo el volumen actual de usuarios y pedidos.
- La operación logística en la zona piloto es repetible (no depende de “héroes”).
- Los KPIs mínimos anteriores se encuentran dentro del rango de objetivos.
- Existen aprendizajes claros sobre:
  - la mezcla de productos más demandada,
  - la adopción de suscripciones,
  - los principales puntos de fricción en la experiencia de compra.

Si estos criterios se cumplen o se acercan a los objetivos definidos, OnePets estará en posición de evaluar una **versión 2** orientada a:
- expansión geográfica,
- ampliación de catálogo,
- funcionalidades avanzadas de fidelización y recomendación.
