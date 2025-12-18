# OnePets - Backend Setup (Fase 3)

## 1) Base tecnológica
- **DB:** Supabase PostgreSQL + Supabase Auth.
- **SDK:** `@supabase/ssr` + `@supabase/supabase-js`.
- **Auth:** email/password, sesión y refresco manejado por Supabase.
- **Next.js:** App Router (rutas protegidas vía `middleware.ts`).

## 2) Schema fundacional (docs/supabase-schema.sql)
Tablas creadas para el MVP (catálogo, carrito, pedidos, suscripciones):
- `profiles` (extiende `auth.users`, rol y dirección por defecto).
- `addresses` (envío/retirada, flag `within_pilot_zone`).
- `pets` (mascotas del usuario).
- `products` (catálogo esencial, elegible para suscripción).
- `carts`, `cart_items` (carrito único por usuario).
- `orders`, `order_items` (pedidos + líneas).
- `subscriptions` (reposiciones recurrentes ligadas a producto/pet).
- `favorite_products` (wishlist).
- `support_tickets` (incidencias básicas).

Índices: email, species+category, flags de esenciales, FKs de user_id, status de orders, etc. definidos en el SQL.

### RLS aplicado
- `profiles`: acceso sólo al propio `id = auth.uid()`.
- `addresses`, `pets`, `carts`, `subscriptions`, `favorite_products`, `support_tickets`: políticas de “manage own”.
- `cart_items`, `order_items`: control por pertenencia al carrito/pedido del usuario.
- `orders`: lectura/inserción sólo del dueño.
- `products`: lectura pública.
- Política amplia para `service_role`.

### Seed
4 productos esenciales (perro/gato, food/litter/hygiene) insertados en el SQL; elimina el bloque si no quieres seed.

### Cómo ejecutar el schema
1) Abre Supabase SQL editor.  
2) Pega y ejecuta `docs/supabase-schema.sql`.  
3) Verifica tablas, índices y RLS.

## 3) Tipos TypeScript
- Archivo: `src/types/supabase.ts` (tipos `Database` para todas las tablas públicas).
- Regenerar tras cambios de schema:
  ```bash
  supabase gen types typescript --project-ref <PROJECT_REF> --schema public > src/types/supabase.ts
  ```
  Usa el project ref de tu Supabase (de la URL).

## 4) Configuración de entorno
- Archivo real: `.env` (ya configurado). Plantilla: `.env.example` con:
  - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (solo servidor)
  - `NEXT_PUBLIC_APP_URL`
- Acceso centralizado en `src/lib/config.ts` con validaciones.

## 5) Clientes Supabase
- `src/lib/supabase/client.ts`: `createClient()` para navegador (`@supabase/ssr`).
- `src/lib/supabase/server.ts`: `createServerClient()` con `cookies()` async (Next 15).
- `src/lib/supabase/admin.ts`: client con `service_role` (solo server-side, valida variable).

## 6) Auth y middleware
- `middleware.ts`: protege `/account`, `/cart`, `/checkout`, `/orders`, `/subscriptions`; redirige a `/login` si no hay sesión y evita que usuarios logueados entren a `/login`/`/signup`.
- `src/contexts/auth-context.tsx`: contexto de autenticación usando Supabase Auth (signin, signup, signout) y carga de `profiles`.

## 7) Archivos clave creados/actualizados
- `docs/supabase-schema.sql`
- `src/types/supabase.ts`
- `src/lib/config.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/admin.ts`
- `src/contexts/auth-context.tsx`
- `middleware.ts`
- `.env.example`

## 8) Pasos para probar en local
1) Ejecuta el SQL en Supabase (`docs/supabase-schema.sql`).  
2) Instala dependencias mínimas:
   ```bash
   npm install next react react-dom typescript @supabase/ssr @supabase/supabase-js
   ```
3) Copia variables:
   ```bash
   cp .env.example .env
   # completa valores reales si falta alguno
   ```
4) Genera tipos (opcional si quieres refrescar desde tu proyecto):
   ```bash
   supabase gen types typescript --project-ref <PROJECT_REF> --schema public > src/types/supabase.ts
   ```
5) Levanta dev server (cuando tengas Next configurado):
   ```bash
   npm run dev
   ```

## 9) Notas de seguridad
- No exponer `SUPABASE_SERVICE_ROLE_KEY` en frontend.
- RLS aplicada; las queries deben usar la sesión del usuario.
- Amplía el middleware si agregas rutas protegidas adicionales.
