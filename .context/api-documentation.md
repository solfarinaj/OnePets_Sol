# OnePets – API Documentation (MVP)

## 1. Overview

El backend de OnePets usa:

- Supabase como API de datos (PostgREST + RPC)
- Route Handlers / API Routes en Next.js para lógica específica

Esta documentación cubre los **flujos principales del MVP**:

- Autenticación
- Gestión de perfiles
- Gestión de mascotas
- Citas
- Vacunas

---

## 2. Auth

### 2.1. Signup

**Proveedor:** Supabase Auth

- Método: `POST`
- Endpoint: Supabase SDK (`supabase.auth.signUp`)

Payload:

```json
{
  "email": "user@example.com",
  "password": "••••••••",
  "options": {
    "data": {
      "full_name": "Nombre Apellido"
    }
  }
}
