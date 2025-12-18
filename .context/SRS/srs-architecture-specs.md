# OnePets – Architecture Specs

Proyecto: OnePets – Ecommerce de productos esenciales para mascotas  
Tech Stack: Next.js 15 (App Router), TypeScript, Supabase (PostgreSQL + Auth), Vercel, GitHub Actions

---

## 1. System Architecture (C4 Level 1–2)

### 1.1 C4 – Level 1: System Context (alto nivel)

```mermaid
graph TD
    user[Usuario OnePets<br/>(dueño de mascotas)]
    fe[OnePets Web App<br/>(Next.js 15)]
    api[Backend API<br/>(Next.js API Routes)]
    db[(Supabase PostgreSQL)]
    auth[Supabase Auth]
    email[Email Provider<br/>(Notificaciones)]
    payments[Payment Provider<br/>(Pagos)]

    user -->|HTTPS (browser mobile/desktop)| fe
    fe -->|REST /api/*| api
    api -->|Lee/escribe datos| db
    api -->|Registro/login/validación JWT| auth
    api -->|Envío de correos transaccionales| email
    api -->|Cobro de pedidos| payments
graph TD
    subgraph Cliente
        user[Usuario OnePets]
        browser[Navegador Web<br/>(Mobile / Desktop)]
    end

    subgraph OnePets Platform
        fe[Next.js 15 Frontend<br/>React + TypeScript]
        api[Next.js API Routes<br/>(REST JSON)]
        db[(Supabase PostgreSQL)]
    end

    auth[Supabase Auth]
    storage[Supabase Storage<br/>(opcional, assets)]
    email[Email Provider]
    payments[Payment Provider]

    user --> browser
    browser -->|HTTP/HTTPS| fe
    fe -->|fetch /api/*| api
    api -->|SDK / SQL| db
    api -->|SDK Auth| auth
    api -->|Subir/leer assets| storage
    api -->|HTTP API| email
    api -->|HTTP API| payments
erDiagram
    USERS ||--o{ PETS : "owns"
    USERS ||--o{ ADDRESSES : "has"
    USERS ||--o{ ORDERS : "places"
    USERS ||--o{ SUBSCRIPTIONS : "owns"
    USERS ||--o{ FAVORITE_PRODUCTS : "marks"
    USERS ||--o{ SUPPORT_TICKETS : "creates"

    PRODUCTS ||--o{ FAVORITE_PRODUCTS : "is bookmarked in"
    PRODUCTS ||--o{ CART_ITEMS : "is added to"
    PRODUCTS ||--o{ ORDER_ITEMS : "is purchased in"
    PRODUCTS ||--o{ SUBSCRIPTIONS : "is subscribed in"

    ORDERS ||--o{ ORDER_ITEMS : "contains"
    ORDERS }o--|| ADDRESSES : "ships-to"

    PETS ||--o{ SUBSCRIPTIONS : "linked to"
    ORDERS ||--o{ SUPPORT_TICKETS : "can generate"

    USERS {
        uuid id
        string email
        string full_name
        string phone
        timestamp created_at
    }

    PETS {
        uuid id
        uuid user_id
        string name
        string species
        string breed
        int age_years
        float weight_kg
        string size
        timestamp created_at
    }

    ADDRESSES {
        uuid id
        uuid user_id
        string line1
        string line2
        string city
        string region
        string postal_code
        string country
        boolean within_pilot_zone
        timestamp created_at
    }

    PRODUCTS {
        uuid id
        string name
        string species
        string category
        string description
        float price
        string currency
        float weight_kg
        boolean is_essential
        boolean is_subscription_eligible
        boolean in_stock
        timestamp created_at
    }

    CARTS {
        uuid id
        uuid user_id
        float subtotal
        float shipping_cost
        float total
        string currency
        timestamp updated_at
    }

    CART_ITEMS {
        uuid id
        uuid cart_id
        uuid product_id
        int quantity
        float unit_price
        float line_total
    }

    ORDERS {
        uuid id
        uuid user_id
        string status
        string delivery_method
        uuid delivery_address_id
        float subtotal
        float shipping_cost
        float total
        string currency
        string estimated_delivery_window
        timestamp created_at
    }

    ORDER_ITEMS {
        uuid id
        uuid order_id
        uuid product_id
        int quantity
        float unit_price
        float line_total
    }

    SUBSCRIPTIONS {
        uuid id
        uuid user_id
        uuid product_id
        uuid pet_id
        int frequency_weeks
        string status
        date next_delivery_date
        timestamp created_at
    }

    FAVORITE_PRODUCTS {
        uuid id
        uuid user_id
        uuid product_id
        timestamp created_at
    }

    SUPPORT_TICKETS {
        uuid id
        uuid user_id
        uuid order_id
        string category
        string message
        string status
        timestamp created_at
    }
sequenceDiagram
    participant U as User (Browser)
    participant FE as Frontend (Next.js)
    participant API as API Routes
    participant AUTH as Supabase Auth

    Note over U,AUTH: Registro
    U->>FE: Completa formulario de registro
    FE->>API: POST /api/auth/register
    API->>AUTH: Crear usuario (email/password)
    AUTH-->>API: Usuario creado / error
    API-->>FE: 201 + token o error
    FE-->>U: Redirección / mensajes

    Note over U,AUTH: Login
    U->>FE: Completa formulario de login
    FE->>API: POST /api/auth/login
    API->>AUTH: Validar credenciales
    AUTH-->>API: Datos usuario + token
    API-->>FE: 200 + JWT
    FE-->>U: Sesión iniciada

    Note over U,AUTH: Refresh (si se usa)
    FE->>API: Solicita refresh con refresh token
    API->>AUTH: Valida refresh token
    AUTH-->>API: Nuevo access token
    API-->>FE: Nuevo JWT
