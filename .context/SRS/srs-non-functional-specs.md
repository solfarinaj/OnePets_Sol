# OnePets – Non-Functional Requirements (NFRs)

Proyecto: OnePets – Ecommerce de productos esenciales para mascotas  
Tech Stack: Next.js 15, Supabase (PostgreSQL), Vercel, GitHub Actions

---

## 1. Performance

### 1.1 Page Load & Rendering

- **LCP (Largest Contentful Paint):**  
  - Objetivo: **< 2 s** en p75 para:
    - Home,
    - Catálogo de productos esenciales,
    - Ficha de producto,
    - Checkout.  
  - Condiciones de prueba:
    - Dispositivo móvil gama media,
    - Conexión 4G / banda ancha doméstica estándar,
    - Sin cache previa.

- **TTI (Time to Interactive):**  
  - Objetivo: **< 3 s** en p75 en las mismas vistas clave.  
  - Uso de:
    - SSR/ISR de Next.js para contenido crítico,
    - lazy loading para componentes no críticos (banners, recomendaciones secundarias).

- **Tamaño inicial del bundle:**  
  - Objetivo: **< 250 KB** JS comprimidos (gzip) en la primera carga de páginas clave (sin contar librerías de terceros no críticas), con code splitting agresivo.

### 1.2 API Performance

- **API Response Time (p95):**
  - Endpoints críticos (catálogo, carrito, creación de pedido, login):
    - Objetivo: **< 500 ms** en p95 (excluyendo latencia de red).
  - Endpoints secundarios (historial de pedidos, detalle de suscripción):
    - Objetivo: **< 800 ms** en p95.

- **Database Query Time:**
  - Queries simples (por ID, listados pequeños, joins simples):
    - Objetivo: **< 100 ms**.
  - Queries de listados paginados:
    - Objetivo: **< 200 ms** en p95.

### 1.3 Capacidad de Usuarios Concurrentes

- **Concurrent Users (MVP):**
  - Objetivo: soportar **100 usuarios concurrentes activos** (navegando y realizando compras) sin degradación significativa de tiempos de respuesta.

- **Concurrent Users (v2 objetivo):**
  - Objetivo: escalar a **1.000 usuarios concurrentes** mediante:
    - escalado horizontal de funciones/API,
    - optimización de consultas,
    - cacheo adicional.

### 1.4 Disponibilidad en horas pico

- El sistema debe mantener los objetivos de rendimiento durante:
  - Horarios pico esperados (ej. 18:00–22:00, fines de semana),
  - Campañas específicas (promos, lanzamientos).

---

## 2. Security

### 2.1 Autenticación y Autorización

- **Authentication:**
  - Uso de **JWT tokens** via Supabase Auth (o equivalente).
  - Tokens firmados con claves seguras y rotadas periódicamente.

- **Authorization (RBAC):**
  - Roles mínimos:
    - `user`: cliente final (dueños de mascotas),
    - `admin`: personal de OnePets (gestión de catálogo, pedidos).
  - Endpoints protegidos deben validar rol adecuado antes de realizar acciones sensibles (gestión de pedidos, catálogo, etc.).

### 2.2 Protección de Datos

- **Data in Transit:**
  - Todo tráfico entre clientes y API debe ir sobre **HTTPS** con **TLS 1.2+ (recomendado 1.3)**.
  - Cookies marcadas como `Secure` y `HttpOnly` cuando aplique.

- **Data at Rest:**
  - Uso de **cifrado por defecto de Supabase/PostgreSQL** para almacenamiento.
  - Campos sensibles (ej. tokens de pago, secretos) nunca se almacenan en texto plano.

### 2.3 Validación e Integridad

- **Input Validation:**
  - Validación en **frontend y backend**:
    - Tipos, rangos, formatos (email, UUID, etc.),
    - protección contra inyección de SQL (usando queries parametrizadas),
    - validación de payloads con esquemas (Zod/JSON Schema u otro).
  - Nunca confiar en datos del cliente sin revalidación server-side.

- **Password Policy:**
  - Longitud mínima: **8 caracteres**.
  - Recomendado (no obligatorio de UX para MVP, pero soportado):
    - 1 mayúscula,
    - 1 número,
    - 1 símbolo.

### 2.4 Sesiones & Tokens

- **Session Management:**
  - Expiración de tokens de acceso: **15–60 minutos** (definir valor exacto en implementación).
  - Uso de **refresh tokens** seguros con expiración más prolongada (ej. 7–30 días).
  - Invalidación de tokens:
    - en logout,
    - ante posible compromiso de cuenta (cambio de contraseña, detección de anomalías).

### 2.5 OWASP Top 10

- Deben estar documentadas y mitigadas, como mínimo:

  - **Injection:** uso exclusivo de ORM/queries parametrizadas.
  - **Broken Authentication:** correcta gestión de tokens, expiración, logout, protección de endpoints.
  - **Sensitive Data Exposure:** no loguear datos sensibles, usar HTTPS, cifrado adecuado.
  - **XSS:** escape apropiado de contenido, Content Security Policy (CSP) básica, evitar `dangerouslySetInnerHTML`.
  - **CSRF:** protección mediante tokens CSRF en formularios críticos o patrones seguros (SameSite cookies).
  - **Security Misconfiguration:** uso de defaults seguros en Vercel/Supabase, secretos nunca en repositorios.

---

## 3. Scalability

### 3.1 Base de Datos

- **Database Engine:**
  - PostgreSQL via Supabase.

- **Row Level Security (RLS):**
  - Activado para tablas con datos multi-tenant (usuarios, mascotas, pedidos),
  - Políticas explícitas que aseguren que cada usuario solo ve sus datos.

### 3.2 Infraestructura y Red

- **CDN / Edge:**
  - Uso de **Vercel Edge Network** para servir:
    - assets estáticos (imágenes, JS, CSS),
    - páginas pre-renderizadas donde aplique.

- **API Stateless:**
  - Rutas de API en Next.js deben ser **stateless**, permitiendo:
    - auto-escalado horizontal,
    - despliegue en múltiples instancias sin dependencia en estado local.

### 3.3 Caching

- **Páginas:**
  - Uso de **ISR (Incremental Static Regeneration)** para:
    - páginas de catálogo,
    - fichas de producto,
    - páginas informativas.

- **API Responses:**
  - Headers `Cache-Control` definidos para:
    - contenido público poco cambiante (ej. catálogo),
    - evitar cache en datos sensibles (ej. pedidos, perfil de usuario).

### 3.4 Connection Pooling

- **Database Connection Pooling:**
  - Uso de pool de conexiones recomendado por Supabase (o PgBouncer gestionado por el proveedor),
  - evitar abrir/cerrar conexiones en cada request,
  - límites razonables para evitar saturación en alta concurrencia.

---

## 4. Accessibility

### 4.1 Estándares de Accesibilidad

- **WCAG Compliance:**
  - Objetivo: cumplimiento de **WCAG 2.1 Nivel AA** en:
    - flujo de registro/login,
    - vistas de catálogo,
    - ficha de producto,
    - carrito y checkout.

### 4.2 Navegación y Lectores de Pantalla

- **Keyboard Navigation:**
  - Todas las funcionalidades críticas:
    - búsqueda, filtrado, agregar al carrito, checkout,
    - deben ser accesibles vía teclado (Tab, Enter, Espacio, etc.).

- **Screen Reader Support:**
  - Uso de **etiquetas ARIA** adecuadas en:
    - botones,
    - formularios,
    - alerts (errores de validación, confirmaciones),
    - componentes dinámicos (modales, toasts).

### 4.3 Diseño Visual

- **Color Contrast:**
  - Contraste mínimo de **4.5:1** para texto normal,
  - **3:1** para textos grandes.

- **Focus Indicators:**
  - Indicadores de foco visibles y consistentes en todos los elementos interactivos:
    - botones,
    - links,
    - campos de formularios.

---

## 5. Browser Support

### 5.1 Desktop

- Navegadores soportados (últimas **2 versiones**):

  - Google Chrome  
  - Mozilla Firefox  
  - Apple Safari  
  - Microsoft Edge  

### 5.2 Mobile

- Navegadores soportados (últimas **2 versiones**):

  - iOS Safari  
  - Android Chrome  

### 5.3 Comportamiento en navegadores no soportados

- Mostrar experiencia degradada pero funcional cuando sea posible.
- En casos extremos, mostrar mensaje de “navegador no soportado” con recomendación.

---

## 6. Reliability

### 6.1 Disponibilidad

- **Uptime objetivo:**  
  - **99.9 %** medido mensualmente para servicios críticos (API, frontend público).

### 6.2 Errores y Resiliencia

- **Error Rate:**
  - Menos del **1 %** de requests totales deben resultar en errores 5xx.

- **Retry Strategy:**
  - Reintentos controlados (backoff) en llamadas internas donde aplique (ej. integración con servicios externos).

### 6.3 Recovery

- **Recovery Time Objective (RTO):**
  - Para incidentes críticos (caída total de frontend o API):
    - objetivo de recuperación **< 5 minutos**, aprovechando:
      - rollbacks rápidos en Vercel,
      - despliegue de versiones estables previas.

- **Backup & Restore (a nivel DB):**
  - Backups automáticos diarios (mínimo) vía Supabase.
  - Estrategia de restauración probada en ambientes no productivos.

---

## 7. Maintainability

### 7.1 Calidad de Código

- **Linting:**
  - Uso de ESLint con reglas definidas para Next.js / TypeScript,
  - Prettier para formato consistente en todo el repositorio.

- **TypeScript:**
  - **Strict mode habilitado** (`"strict": true` en `tsconfig.json`),
  - Tipado estricto para:
    - modelos de dominio,
    - contratos de API (tipos derivados de schemas cuando sea posible).

### 7.2 Testing

- **Cobertura de Tests:**
  - Objetivo mínimo para MVP:
    - **> 60 %** de cobertura en tests unitarios y de integración.
  - Objetivo v2:
    - **> 80 %** de cobertura en módulos críticos:
      - lógica de carrito,
      - cálculo de totales,
      - creación de pedidos,
      - suscripciones.

- **Tipos de tests:**
  - Unit tests (dominio, helpers).
  - Integration tests (API + DB en entorno de prueba).
  - E2E básicos en los principales flujos de compra.

### 7.3 Documentación

- **Documentos mínimos requeridos:**
  - `README.md` en raíz del proyecto,
  - Documentación de APIs (OpenAPI en `.context/SRS/api-contracts.yaml`),
  - Diagramas de arquitectura de alto nivel (C4 nivel 1–2, aunque sea textual al inicio).

### 7.4 Deploy & CI/CD

- **Pipelines:**
  - Uso de GitHub Actions para:
    - correr tests automatizados en cada PR,
    - linting,
    - builds de verificación,
    - despliegues automatizados a Staging / Production (cuando se configure).

- **Revisión de código:**
  - Toda nueva funcionalidad debe pasar por:
    - al menos una revisión de otro miembro del equipo,
    - verificación de tests verdes en CI.

---
