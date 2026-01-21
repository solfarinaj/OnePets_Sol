# Fase 1: Constitución de la Idea

> **Estado:** Completado
> **Propósito:** Contener la documentación fundamental que define la visión del negocio, el problema a resolver y el contexto del mercado.

---

## 🎯 Propósito de este Directorio

Este directorio (`.context/idea/`) alberga los artefactos generados durante la **Fase 1: Constitución**. Estos documentos son la piedra angular de todo el proyecto, ya que traducen una idea abstracta en un modelo de negocio y un análisis de mercado estructurados.

La información aquí contenida es la **fuente de verdad** sobre el "porqué" del producto y debe ser consultada antes de tomar decisiones estratégicas de producto o técnicas.

---

## 📄 Archivos Clave

Este directorio debe contener los siguientes documentos:

1.  **`business-model.md`**
    - **Propósito:** Detalla el **Business Model Canvas** del MVP. Describe el problema, la solución, la propuesta de valor, los segmentos de clientes, y cómo el negocio generará ingresos y sostendrá sus operaciones.
    - **Componentes Clave:** Problem Statement, Hipótesis del MVP, y los 9 bloques del Canvas.

2.  **`market-context.md`**
    - **Propósito:** Proporciona un análisis del entorno competitivo y las condiciones del mercado. Evalúa a los competidores, el tamaño de la oportunidad, las tendencias clave y los riesgos.
    - **Componentes Clave:** Análisis competitivo, dimensionamiento del mercado, tendencias y análisis FODA (SWOT).

---

## 🔗 Conexión con Otras Fases

El contenido de este directorio es un **input crítico** para la **Fase 2: Arquitectura**.

-   El **`business-model.md`** es la fuente principal para redactar el **Resumen Ejecutivo** del PRD (Product Requirements Document).
-   El **`market-context.md`** provee la justificación y el "dolor" del usuario que fundamentan las funcionalidades definidas en el PRD y los requisitos no funcionales del SRS (Software Requirements Specification).
-   Las **Hipótesis del MVP** definidas aquí deben poder ser validadas a través de las funcionalidades y métricas que se especificarán en fases posteriores.

No se debe proceder a la Fase 2 sin que estos documentos estén completos y validados.

---

## ✅ Checklist de Calidad

Antes de considerar esta fase como finalizada, asegúrate de que los documentos cumplen con lo siguiente:

- [ ] **Claridad:** El problema y la propuesta de valor se entienden en menos de 60 segundos.
- [ ] **Especificidad:** Los segmentos de clientes son concretos. El análisis de la competencia nombra rivales y detalla sus pros y contras.
- [ ] **Coherencia:** El `market-context.md` respalda y valida las afirmaciones hechas en el `business-model.md`.
- [ ] **Enfoque MVP:** Ambos documentos se centran en la versión inicial del producto, no en un roadmap a largo plazo.
- [ ] **Cuantificación:** Se utilizan métricas y datos numéricos siempre que es posible (ej: tamaño de mercado, hipótesis medibles).
