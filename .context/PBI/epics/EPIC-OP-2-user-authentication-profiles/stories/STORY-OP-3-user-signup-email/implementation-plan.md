# Implementation Plan: STORY-OP-3 - User Signup with Email

## Overview

Implementar el flujo completo de registro de usuarios utilizando correo electrónico y contraseña. Esto incluye la UI del formulario, la integración con Supabase Auth y la creación automática del perfil de usuario en la base de datos.

**Acceptance Criteria a cumplir:**

- Registro exitoso con email único y contraseña segura.
- Creación de sesión y redirección al dashboard.
- Manejo de errores (email duplicado, contraseña débil).
- Validación visual de campos obligatorios.

---

## Technical Approach

**Chosen approach:** React Hook Form + Zod + Supabase SSR Auth Helpers.

**Why this approach:**

- ✅ **Zod:** Permite definir un esquema de validación robusto que se puede inferir como tipo TypeScript.
- ✅ **React Hook Form:** Manejo eficiente del estado del formulario y validaciones client-side instantáneas.
- ✅ **Supabase SSR:** Garantiza que la sesión se maneje de forma segura (cookies HttpOnly) compatible con Next.js App Router.

---

## UI/UX Design

### Componentes del Design System a usar:

- `Card`: Contenedor del formulario.
- `Input`: Campos de texto (email, password, nombre).
- `Button`: Botón de submit (estado loading).
- `Form`: Wrapper de shadcn para manejo de errores.
- `Toast`: Notificación de error global (si falla el servidor).

### Componentes custom a crear:

- 🆕 `SignupForm`
  - **Ubicación:** `components/auth/signup-form.tsx`
  - **Propósito:** Encapsular la lógica de registro.

### Wireframes/Layout:

```
┌──────────────────────────────────────┐
│  OnePets Logo                        │
│                                      │
│  Create an Account                   │
│                                      │
│  [ Full Name       ]                 │
│  [ Email Address   ]                 │
│  [ Password        ] (eye icon)      │
│                                      │
│  [ Sign Up Button ]                  │
│                                      │
│  Already have an account? Login      │
└──────────────────────────────────────┘
```

---

## Types & Type Safety

**Tipos:**
- `Profile` (de `lib/types.ts`) para verificar la creación del perfil.

**Schema Zod (`lib/schemas/auth.ts`):**

```typescript
export const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
```

---

## Implementation Steps

### **Step 1: Setup Zod Schemas & Server Actions**

**Task:** Definir validaciones y la acción de servidor para registro.

**File:** `lib/schemas/auth.ts`, `lib/actions/auth.ts`

**Details:**
- Crear esquema Zod.
- Crear función `signup(formData)` en `auth.ts`.
- Usar `supabase.auth.signUp()`.
- Manejar respuesta y errores de Supabase.

**Testing:** Unit test del esquema Zod.

**Estimated time:** 2h

---

### **Step 2: Database Trigger for Profile**

**Task:** Asegurar que `public.profiles` se crea automáticamente.

**Details:**
- Verificar si existe la función y trigger `handle_new_user` en Supabase.
- Si no, crear migración SQL.

**SQL (Reference):**
```sql
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

**Testing:** Manual signup via Supabase Dashboard -> Check `profiles` table.

**Estimated time:** 1h

---

### **Step 3: Frontend UI Implementation**

**Task:** Crear página y componente de formulario.

**File:** `app/(auth)/register/page.tsx`, `components/auth/signup-form.tsx`

**Details:**
- Implementar `signupSchema` con `useForm`.
- Conectar con `signup` Server Action.
- Estado de loading en botón.
- Redirección a `/` en éxito.

**Testing:** Visual validation of error messages.

**Estimated time:** 3h

---

### **Step 4: Integration Testing**

**Task:** Verificar el flujo completo.

**Details:**
- Registrar usuario real en entorno local.
- Verificar redirección.
- Verificar datos en DB (usando `getProfile` helper).

**Testing:** Playwright E2E test (`test-cases.md` Scenario 1).

**Estimated time:** 2h

---

## Risks & Mitigations

**Risk 1:** Trigger Failure
- **Impact:** Usuario creado sin perfil (Zombie).
- **Mitigation:** Wrap `signUp` in transaction or add robust error handling in Server Action to rollback (delete auth user) if trigger fails (complex in Supabase) OR use Client-side explicit profile creation as fallback (less secure). *Decision: Rely on robust trigger logic + error logging.*

---

## Estimated Effort

| Step | Time |
| --- | --- |
| 1. Schemas & Actions | 2h |
| 2. DB Trigger | 1h |
| 3. Frontend UI | 3h |
| 4. Testing | 2h |
| **Total** | **8h (1 day)** |

**Story points:** 3
