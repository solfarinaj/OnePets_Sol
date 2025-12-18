# Feature Test Plan – EPIC-ONEPETS-1 – Autenticación y perfiles

**Epic:** Autenticación y perfiles  
**Jira Epic Key:** ONEPETS-1 (placeholder)  
**Versión:** 0.1  
**Responsable QA:** Sol Fariña  

---

## 1. Business Context

OnePets necesita que los dueños de mascotas puedan:

- Crear una cuenta.
- Iniciar sesión y cerrar sesión.
- Gestionar su perfil básico.

Sin esta épica, el usuario no puede acceder a las funcionalidades de mascotas, citas ni vacunas.

**Personas impactadas:**

- Pet Owner (dueño de mascotas).

**KPIs relacionados:**

- % de usuarios que completan el registro.
- % de logins exitosos vs intentos.
- # de sesiones activas sin errores.

---

## 2. Technical Overview

**Componentes involucrados:**

- Frontend:
  - Pantallas: Signup, Login, Perfil, Navbar (estado logueado/no logueado).
- Backend:
  - Supabase Auth (email/password).
  - Tabla `profiles` (ver `backend-setup.md`).
- Infra:
  - Variables de entorno de Supabase.
  - RLS en `profiles`.

**Flujos clave:**

1. Signup → crea usuario en `auth.users` + fila en `profiles`.
2. Login → crea sesión y expone usuario al frontend.
3. Logout → invalida sesión.
4. Edit profile → actualiza fila en `profiles`.

---

## 3. Risk Analysis

| Riesgo                                         | Impacto | Prob. | Nota                           |
|-----------------------------------------------|---------|-------|--------------------------------|
| Usuarios vean perfiles de otros               | Alto    | Medio | RLS mal configurado            |
| Signup/login fallan por env mal configurado   | Alto    | Bajo  | Variables de entorno incorrectas |
| Validaciones débiles (password/email)         | Medio   | Medio | Experiencia y seguridad pobres |
| Errores no manejados en UI                    | Medio   | Alto  | Mala UX, frustración usuario   |

---

## 4. Test Strategy

**Capas de prueba:**

- Unit tests (frontend):
  - Validaciones de formularios (email, password mínimos, etc.).
- Unit tests (backend/helper):
  - Funciones que mapean user ↔ profile.
- Integration tests:
  - Signup → crea fila en `profiles`.
  - Edit profile → solo afecta al usuario logueado.
- E2E tests:
  - Flujo completo: signup → login → ver perfil → editar perfil → logout.
- Exploratory testing:
  - Intentos de romper RLS / acceso a datos de otros usuarios.
  - Repetir signup con mismo email, passwords débiles, etc.

---

## 5. Test Ideas (alto nivel)

### 5.1. Signup

- Signup válido con email nuevo y password válido.
- Email inválido (sin `@`, formato raro).
- Password demasiado corto.
- Email ya registrado.
- Desconexión o error de red durante signup.

### 5.2. Login / Logout

- Login correcto con usuario creado.
- Password incorrecto.
- Email no existente.
- Logout desde navbar.
- Intentar acceder a `/profile` sin estar logueado.

### 5.3. Perfil

- Ver perfil después de login (datos consistentes).
- Editar nombre / email y que persista.
- Intentar actualizar perfil con campos vacíos.
- Validar que un usuario A no pueda acceder al perfil de B (RLS).

---

## 6. NFRs relevantes

- Seguridad:
  - RLS activa en `profiles`.
  - No exponer datos sensibles en el frontend.
- Performance:
  - Respuesta de login/signup < 2s en condiciones normales.
- UX:
  - Mensajes de error claros en formularios.
  - Indicador de carga en acciones críticas (signup/login/update).

---

## 7. QA Questions (para PO / Dev)

1. ¿Necesitamos verificación de email en el MVP o solo password?
2. ¿Permitimos cambiar el email desde el perfil o queda fijo?
3. ¿Qué política aplicamos a passwords? (mínimo de caracteres, complejidad).
4. ¿Qué ocurre si `profiles` falla al crearse pero `auth.users` sí se crea?
5. ¿Cuál es la URL de redirección después de login y logout?

---

## 8. Definition of Done (QA para la épica)

- [ ] Todos los flujos de signup/login/logout probados manualmente.
- [ ] RLS verificada: ningún usuario accede a perfil ajeno.
- [ ] Se implementan tests unitarios básicos de formularios.
- [ ] Al menos 1–2 tests de integración para `profiles`.
- [ ] E2E de login básico en verde (cuando exista suite E2E).
- [ ] Todas las QA Questions respondidas o documentadas.
