# OnePets – User Journeys (MVP)

## Journey 1 – Happy Path: Reposición rápida de alimento con entrega a domicilio

### Persona
**Carla, dueña de perro en depto**

### Scenario
Carla vuelve del trabajo y se da cuenta de que el alimento de su perro está a punto de terminarse. No quiere salir de nuevo ni cargar un saco pesado, y recuerda que puede usar OnePets para pedir alimento con entrega rápida en su zona.

---

### Steps

#### Step 1
- **User Action:**  
  Carla entra al sitio de OnePets desde su celular y selecciona “Iniciar sesión”.
- **System Response:**  
  OnePets muestra el formulario de login, con campos de email y contraseña, y un enlace para recuperar contraseña.
- **Pain Point:**  
  Si el login es lento o falla sin explicación clara, Carla podría abandonar.  

#### Step 2
- **User Action:**  
  Carla ingresa su email y contraseña y confirma.
- **System Response:**  
  El sistema valida credenciales y la redirige al home personalizado, mostrando un mensaje tipo: “Hola Carla 👋, ¿lista para reponer alimento para Rocky?”.
- **Pain Point:**  
  Mensajes de error poco claros (“Error 500”) podrían frustrarla y hacerle dudar de la confiabilidad del sitio.

#### Step 3
- **User Action:**  
  Desde el home, Carla toca un acceso rápido “Reponer alimento de Rocky”.
- **System Response:**  
  OnePets carga una vista con el producto de alimento que Carla compró la vez anterior (marca, formato), indicando stock disponible y elegible para entrega en su dirección.
- **Pain Point:**  
  Si el producto aparece como “sin stock” sin ofrecer alternativas cercanas, Carla puede sentirse perdida.

#### Step 4
- **User Action:**  
  Carla revisa la información del producto (peso, descripción breve) y selecciona la cantidad (por ejemplo, 1 saco).
- **System Response:**  
  El sistema actualiza el precio total y muestra opción de “Agregar al carrito”.
- **Pain Point:**  
  Si los cambios de cantidad no actualizan precio/stock correctamente, genera desconfianza.

#### Step 5
- **User Action:**  
  Carla añade el producto al carrito y va a “Ir al checkout”.
- **System Response:**  
  Se muestra el resumen del carrito con:
  - producto(s),
  - precio,
  - costo de envío estimado,
  - tiempo de entrega objetivo (ej. ≤ 90 minutos para su dirección).
- **Pain Point:**  
  Falta de claridad en los costos de envío o tiempos de entrega puede hacer que Carla no continúe.

#### Step 6
- **User Action:**  
  Carla confirma su dirección de entrega (ya guardada) y selecciona “Entrega a domicilio”.
- **System Response:**  
  El sistema valida que la dirección esté dentro de la zona piloto y recalcula la promesa de entrega si es necesario.
- **Pain Point:**  
  Si la dirección aparece de pronto como “no cubierta” sin explicación, genera frustración y sensación de pérdida de tiempo.

#### Step 7
- **User Action:**  
  Carla selecciona su método de pago guardado (tarjeta o medio digital) y confirma el pago.
- **System Response:**  
  El sistema procesa el pago, muestra pantalla de confirmación con:
  - número de pedido,
  - detalle de productos,
  - ventana estimada de entrega,
  - botón para “Ver estado del pedido”.
- **Pain Point:**  
  Errores de pago poco claros o falta de feedback inmediato pueden hacer que Carla intente pagar dos veces o abandone.

#### Step 8
- **User Action:**  
  Carla cierra el navegador y espera la entrega.
- **System Response:**  
  OnePets envía notificaciones (email/WhatsApp, según configuración) cuando:
  - el pedido pasa a “en preparación”,
  - el pedido está “en camino”,
  - el pedido fue “entregado”.
- **Pain Point:**  
  Si no recibe ninguna notificación y el pedido se demora, puede sentir ansiedad y contactar soporte.

---

### Expected Outcome

Carla logra reponer el alimento de su perro en pocos minutos desde su celular, sin salir de casa, y recibe el pedido dentro de la ventana de tiempo prometida. La experiencia es fluida y refuerza su intención de usar OnePets nuevamente, e incluso evaluar la suscripción en futuras compras.

---

### Alternative Paths / Edge Cases

- **Pago rechazado:**  
  - ¿Qué pasa si el método de pago de Carla es rechazado?  
    → El sistema debe mostrar un mensaje claro, ofrecer reintento o cambio de método sin perder el carrito.

- **Producto sin stock después de confirmar:**  
  - ¿Qué pasa si el stock cambia entre el momento de agregar al carrito y el pago?  
    → El sistema debe informar qué producto no está disponible y ofrecer alternativas (otro formato o marca cercana).

- **Tiempos de entrega saturados:**  
  - ¿Qué pasa si se alcanza la capacidad logística para la franja actual?  
    → El sistema debe ofrecer otra ventana de entrega o informar con transparencia antes de que Carla pague.

---

---

## Journey 2 – Edge Case: Checkout con datos faltantes o inválidos

### Persona
**Diego, dueño de gato indoor**

### Scenario
Diego quiere probar OnePets por primera vez. Llega al sitio, elige un alimento y arena para su gato, pero nunca ha completado correctamente su dirección ni algunos datos obligatorios. Durante el checkout se encuentra con validaciones y errores.

---

### Steps

#### Step 1
- **User Action:**  
  Diego entra al sitio de OnePets, navega el catálogo de gatos y agrega un saco de alimento y una bolsa de arena al carrito.
- **System Response:**  
  El sistema muestra el carrito con resumen de productos, precios y un botón “Ir al checkout”.
- **Pain Point:**  
  Si el carrito es poco claro (no se ve peso, tipo de producto), Diego puede dudar si está comprando lo correcto.

#### Step 2
- **User Action:**  
  Diego va al checkout. OnePets le pide iniciar sesión o registrarse.
- **System Response:**  
  Aparece formulario de registro con campos: nombre, email, contraseña, y luego dirección (calle, número, ciudad, etc.).
- **Pain Point:**  
  Formularios demasiado largos o poco guiados pueden generar abandono.

#### Step 3
- **User Action:**  
  Diego completa datos personales pero deja algunos campos de dirección en blanco o con formato incorrecto (ej. sin número).
- **System Response:**  
  Al intentar continuar, el sistema valida los campos y:
  - resalta en rojo los campos obligatorios incompletos,
  - muestra mensajes específicos: “Por favor, ingresa el número de tu dirección”.
- **Pain Point:**  
  Si los mensajes de error son genéricos (“datos inválidos”) o se muestran lejos del campo relevante, Diego se frustra.

#### Step 4
- **User Action:**  
  Diego corrige algunos campos, pero se equivoca en el formato del código postal o selecciona una comuna fuera de la zona piloto.
- **System Response:**  
  El sistema:
  - valida formato del código postal,
  - indica que la comuna seleccionada aún no está cubierta para entrega rápida, ofreciendo:
    - opción de retiro en punto físico (si es viable),
    - o mensaje claro de indisponibilidad.
- **Pain Point:**  
  Si la UI no explica bien por qué su dirección no es aceptada, Diego puede sentir que “el sitio no funciona”.

#### Step 5
- **User Action:**  
  Diego ajusta su dirección a una dentro de la zona piloto (por ejemplo, su trabajo) y reintenta.
- **System Response:**  
  El sistema acepta la dirección, actualiza el costo y la promesa de entrega, y permite avanzar al pago.
- **Pain Point:**  
  Cambiar dirección varias veces sin ver impacto en tiempo/costo puede generar desconfianza.

#### Step 6
- **User Action:**  
  Diego completa los datos de pago y confirma.
- **System Response:**  
  El sistema procesa el pago y muestra la confirmación de pedido. Además, guarda la dirección corregida en el perfil de Diego para futuras compras.
- **Pain Point:**  
  Si el sistema no guarda la información corregida, Diego tendrá que llenar todo de nuevo en la próxima compra, disminuyendo la probabilidad de recurrencia.

---

### Expected Outcome

A pesar de haber cometido errores en la dirección, Diego logra entender qué necesita corregir gracias a mensajes claros y validaciones amigables. Completa su primera compra con éxito y siente que el sistema “lo guía”, en lugar de bloquearlo sin explicación.

---

### Alternative Paths / Edge Cases

- **Usuario abandona en medio del formulario:**  
  - El sistema podría guardar parcialmente los datos (con consentimiento), para sugerir retomarlos en la próxima visita.
- **Dirección válida pero fuera de zona OnePets:**  
  - Se sugiere explícitamente:
    - “Por ahora no llegamos a tu zona con entrega rápida, pero puedes retirar en [punto físico]” (si es factible).
- **Usuario usa datos inventados solo para pasar validaciones:**  
  - Marcar como riesgo y considerar validaciones adicionales (geocoding, validación de comuna/calle, etc.) en fases posteriores.

---

---

## Journey 3 – Edge Case: Retraso en entrega y manejo de expectativas

### Persona
**Familia con niños y varias mascotas**

### Scenario
Una familia realiza un pedido grande de alimento y arena un fin de semana. Eligen entrega a domicilio con promesa de ≤ 2 horas. Por saturación logística o problemas de tráfico, la entrega se retrasa.

---

### Steps

#### Step 1
- **User Action:**  
  La familia entra a OnePets desde una laptop, inicia sesión y arma un carrito con varios productos esenciales (alimento, arena, snacks).
- **System Response:**  
  El sistema muestra el resumen del carrito, incluyendo costo de envío y ventana de entrega estimada.
- **Pain Point:**  
  Si la ventana de entrega no está claramente indicada, la familia puede asumir expectativas no realistas.

#### Step 2
- **User Action:**  
  Confirman la compra, eligen entrega a domicilio y completan el pago.
- **System Response:**  
  OnePets muestra pantalla de confirmación y envía notificación con:
  - número de pedido,
  - rango de entrega prometido (ej. entre 16:00 y 18:00),
  - enlace para ver el estado del pedido.
- **Pain Point:**  
  Si el rango es ambiguo o no queda registrado, será difícil gestionar expectativas.

#### Step 3
- **User Action:**  
  Pasado el tiempo mínimo de la ventana, un miembro de la familia revisa el estado del pedido desde su cuenta.
- **System Response:**  
  El sistema sigue mostrando “en preparación” sin explicación adicional, aunque la hora prometida esté cerca o haya pasado.
- **Pain Point:**  
  Falta de actualización en el estado genera ansiedad y sensación de poca transparencia.

#### Step 4
- **User Action:**  
  La familia espera un poco más, pero al ver que la entrega aún no llega ni cambian los estados, deciden contactar soporte.
- **System Response:**  
  En la sección de ayuda, OnePets ofrece:
  - formulario de contacto o chat básico,
  - mensajes predefinidos para incidencias de entrega (“Mi pedido está atrasado”).
- **Pain Point:**  
  Si el canal de soporte no responde o es difícil de encontrar, la experiencia se deteriora rápidamente.

#### Step 5
- **User Action:**  
  Envian un mensaje indicando que el pedido está atrasado.
- **System Response:**  
  El operador de OnePets:
  - revisa el pedido en el panel interno,
  - actualiza el estado a “demora por alta demanda”,
  - responde explicando el retraso y ajustando la nueva hora estimada de entrega, ofreciendo una compensación si aplica (cupón, descuento futuro).
- **Pain Point:**  
  Comunicación poco empática o sin opciones de compensación puede generar reseñas negativas.

#### Step 6
- **User Action:**  
  La familia recibe finalmente el pedido, aunque más tarde de lo prometido.
- **System Response:**  
  OnePets registra el retraso, lo clasifica como incidente logístico y:
  - ajusta métricas internas,
  - propone una pequeña compensación en el próximo pedido (si la política de negocio lo permite).
- **Pain Point:**  
  Si no se registra el incidente y no se aprende de él, el problema se repetirá sistemáticamente.

---

### Expected Outcome

Aunque la entrega sufrió un retraso, la familia se siente informada y tratada con respeto: recibió explicaciones, una nueva estimación de entrega y una posible compensación. La confianza en la marca se ve afectada menos que si el retraso hubiera ocurrido sin comunicación ni soporte.

---

### Alternative Paths / Edge Cases

- **Pedido imposible de entregar ese día:**
  - El sistema y el equipo de soporte deben:
    - notificar proactivamente,
    - ofrecer reprogramación de entrega o cancelación con reembolso completo.

- **Cliente muy insatisfecho:**
  - Posibilidad de registrar feedback negativo y analizar:
    - si hay que ajustar el rango horario prometido,
    - si es necesario limitar la cantidad de pedidos por franja.

- **Errores en el panel interno de estados:**
  - Si el operador no actualiza estados, la información al cliente será incorrecta.
  - Es necesario definir reglas de negocio y automatizaciones mínimas (por ejemplo, pasar a “posible retraso” si se supera cierto umbral de tiempo).
