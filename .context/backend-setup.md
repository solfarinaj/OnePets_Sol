# Setup del Backend: OnePets MVP

> **Propósito:** Documentar la configuración inicial del backend, incluyendo el esquema de la base de datos, la seguridad y la generación de tipos.

---

## 1. Esquema de la Base de Datos
-   Se creó la migración inicial `supabase/migrations/0000_initial_schema.sql`.
-   Las tablas fundacionales creadas son: `users`, `pets`, `addresses`, `products`, `carts`, `cart_items`, `orders`, `order_items`, `subscriptions`, `favorite_products`, `support_tickets`.
-   El esquema se basa en el ERD definido en `srs-architecture-specs.md`.

## 2. Seguridad (RLS)
-   Se habilitó Row Level Security (RLS) en todas las tablas que contienen información de usuario.
-   Se implementaron políticas para asegurar que los usuarios solo puedan acceder y modificar sus propios datos.

## 3. Datos de Prueba (Seeding)
-   Se creó el archivo `supabase/seed.sql`.
-   Se insertaron datos de prueba para la tabla `products` para facilitar el desarrollo del frontend.

## 4. Generación de Tipos de TypeScript
-   Se generó el archivo `src/types/supabase.ts` usando el comando `supabase gen types`.
-   Este archivo es la **única fuente de verdad** para los tipos de datos del backend y debe ser consumido por el frontend.