# Implementation Plan: STORY-OP-4 - User Login and Logout

## Overview

Implementar la autenticación de usuarios existentes mediante correo y contraseña, y la funcionalidad de cierre de sesión segura.

**Acceptance Criteria:**
- Login exitoso redirecciona al dashboard.
- Error visual claro ante credenciales inválidas.
- Logout limpia la sesión y redirecciona al home.
- Protección de rutas para usuarios no autenticados.

---

## Technical Approach

**Chosen approach:** Supabase SSR `signInWithPassword` + Middleware Protection.

**Why:**
- Reutiliza la configuración de SSR establecida en OP-3.
- Middleware de Next.js ofrece la protección de rutas más performante (antes de renderizar).

---

## UI/UX Design

### Componentes:
- `LoginForm`: Similar al de registro pero simplificado.
- `UserMenu`: Dropdown en el header con opción de Logout (solo visible si `session` existe).

### Wireframes:

**Login Page:**
```
┌──────────────────────────────────────┐
│  OnePets Logo                        │
│                                      │
│  Welcome Back                        │
│                                      │
│  [ Email Address   ]                 │
│  [ Password        ]                 │
│                                      │
│  [ Login Button ]                    │
│                                      │
│  Forgot Password?  Sign Up           │
└──────────────────────────────────────┘
```

---

## Implementation Steps

### **Step 1: Login Server Action**

**Task:** Crear acción `login`.

**File:** `lib/actions/auth.ts`

**Details:**
- `signInWithPassword({ email, password })`.
- Manejo de redirección post-login.
- Revalidación del path (cache).

**Testing:** Unit test con mock de Supabase.

**Estimated time:** 1h

---

### **Step 2: Frontend UI**

**Task:** Crear página de Login y Menú de Usuario.

**File:** `app/(auth)/login/page.tsx`, `components/auth/login-form.tsx`, `components/layout/user-menu.tsx`

**Details:**
- Formulario con validación Zod.
- Integración de `UserMenu` en `MainHeader` (condicional).

**Testing:** Visual.

**Estimated time:** 2h

---

### **Step 3: Route Protection (Middleware)**

**Task:** Configurar middleware para rutas protegidas.

**File:** `middleware.ts`

**Logic:**
- Verificar sesión con `supabase.auth.getUser()`.
- Si intenta acceder a `/profile/*` sin sesión -> Redirect `/login`.
- Si intenta acceder a `/login` con sesión -> Redirect `/`.

**Testing:** Intentar acceder manualmente a rutas protegidas.

**Estimated time:** 1h

---

### **Step 4: Integration Testing**

**Task:** E2E de Login/Logout.

**Details:**
- Login correcto.
- Login incorrecto.
- Logout y verificación de cookies borradas.

**Testing:** Playwright (`test-cases.md`).

**Estimated time:** 1h

---

## Estimated Effort

**Total:** 5h
**Story Points:** 2
