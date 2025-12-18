# OnePets – Design System (MVP)

## 1. Identidad Visual

### 1.1. Colores

Paleta base pensada para un producto amigable y relacionado a mascotas:

- `--color-primary`: #1E9E8C (teal) – acciones principales
- `--color-primary-soft`: #E0F4F1 – fondos suaves / hovers
- `--color-secondary`: #FF9F43 (orange) – estados destacados / CTAs secundarios
- `--color-danger`: #E63946 – errores y acciones destructivas
- `--color-success`: #2ECC71 – estados de éxito (vacunas al día, cita confirmada)
- `--color-bg`: #F8FAFC – fondo general
- `--color-surface`: #FFFFFF – tarjetas y contenedores
- `--color-border`: #E2E8F0
- `--color-text`: #0F172A
- `--color-text-muted`: #6B7280

### 1.2. Tipografía

- Fuente base: `Inter`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`
- Jerarquía:
  - `h1` – 32px, semibold
  - `h2` – 24px, semibold
  - `h3` – 20px, medium
  - `body` – 14–16px, regular
  - `caption` – 12px, regular

### 1.3. Espaciado

- Escala 4px: `4, 8, 12, 16, 24, 32`
- Layout general:
  - Padding de página: `24px`
  - Gap entre tarjetas: `16px`

---

## 2. Componentes UI Base

Los componentes están pensados para ser implementados con Tailwind + un kit tipo shadcn/ui.

### 2.1. Button

Variantes:

- `primary`: fondo `--color-primary`, texto blanco
- `secondary`: fondo blanco, borde `--color-primary`, texto `--color-primary`
- `ghost`: sin borde, sin fondo, texto `--color-text`
- `danger`: fondo `--color-danger`, texto blanco

Estados:

- hover, active, focus-visible (outline), disabled.

Uso:

- Acciones principales: “Agregar mascota”, “Guardar cambios”.
- Acciones secundarias: “Cancelar”, “Ver detalles”.

### 2.2. Card

Componente para agrupar información de mascotas, citas, etc.

- Fondo: `--color-surface`
- Borde: `--color-border`
- Border-radius: `16px`
- Sombra suave
- Variantes:
  - `PetCard` – foto, nombre, especie, próxima vacuna
  - `AppointmentCard` – fecha/hora, estado, clínica

### 2.3. Input / Select / Textarea

- Bordes redondeados (`8px`)
- Borde por defecto `--color-border`
- Borde `--color-primary` en focus
- Mensajes de error en rojo (`--color-danger`)

Componentes:

- `TextField`
- `SelectField` (ej. especie de mascota)
- `DatePicker` para fecha de nacimiento o citas
- `Textarea` para notas

---

## 3. Layout

### 3.1. Shell principal

- **Navbar** superior:
  - Logo OnePets
  - Nombre del usuario
  - Botón de logout
- **Sidebar** (en desktop):
  - Menú:
    - Dashboard
    - Mis mascotas
    - Citas
    - Vacunas
- **Contenido principal**:
  - Cards con información relevante
  - Listados con filtros (future)

### 3.2. Páginas demo (MVP)

Páginas mínimas a tener en Fase 3:

1. `/` – Landing / Dashboard simple:
   - Si no está logueado → CTA de login.
   - Si está logueado → listado de mascotas y próxima cita.

2. `/pets` – Listado de mascotas:
   - Tabla o grid de `PetCard`.
   - Botón “Agregar mascota”.

3. `/pets/[id]` – Detalle de mascota:
   - Info básica
   - Listado de vacunas
   - Listado de citas relacionadas (no editable aún).

---

## 4. Estados y Feedback

### 4.1. Loaders

- Skeletons para listas (mascotas, citas)
- Spinners en botones de acciones críticas (ej. “Guardar”, “Agendar cita”)

### 4.2. Mensajes de error

- Alertas inline sobre el formulario
- Toasts/snackbars para errores globales (ej. fallo de red)

### 4.3. Vacunas y citas

- Badges para el estado:
  - `Vacuna al día` – verde
  - `Vacuna vencida` – rojo
  - `Cita próxima` – naranja
  - `Cita completada` – gris

---

## 5. Accesibilidad

- Contraste suficiente entre texto y fondo
- Tamaño mínimo de fuente 14px
- Focus visible en botones, links y campos
- Soporte de navegación con teclado básico:
  - `Tab` y `Shift+Tab` entre elementos interactivos

---

## 6. Checklist Design System (Fase 3)

- [ ] Paleta de colores definida y documentada
- [ ] Tipografía y tamaños establecidos
- [ ] Componentes `Button`, `Card`, `Input`, `Select` creados
- [ ] Layout principal (Navbar + contenido) implementado
- [ ] Páginas demo (`/`, `/pets`, `/pets/[id]`) montadas con datos mock/DB
- [ ] Guía rápida documentada en `design-system.md`
