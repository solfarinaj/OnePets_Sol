# Infraestructura Cloud: OnePets MVP

> **Propósito:** Documentar la configuración inicial de los servicios en la nube que soportan el proyecto.

---

## 1. Backend as a Service (BaaS)

-   **Proveedor:** Supabase
-   **Nombre del Proyecto:** `onepets-mvp`
-   **Región:** `[La región que elegiste]`
-   **URL del Proyecto (API):** `https://xyz.supabase.co`
-   **Dashboard:** `https://supabase.com/dashboard/project/xyz`

## 2. Hosting y CI/CD

-   **Proveedor:** Vercel
-   **Nombre del Proyecto:** `onepets-sol`
-   **URL de Producción:** `https://onepets.vercel.app`
-   **Repositorio Git:** `[Pega aquí la URL de tu repositorio en GitHub/GitLab]`

## 3. Variables de Entorno

Las credenciales de estos servicios están gestionadas en el archivo `.env.local` para desarrollo y deben ser configuradas en el dashboard de Vercel para los entornos de Preview y Producción.