-- Habilitar la extensión pgcrypto para UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabla de Usuarios (sincronizada con supabase.auth.users)
-- La columna 'id' referencia directamente a auth.users.id
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Perfiles de Mascota
CREATE TABLE public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL, -- ej: 'dog', 'cat'
  breed TEXT,
  age_years INTEGER,
  weight_kg NUMERIC(10, 2),
  size TEXT, -- ej: 'small', 'medium', 'large'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Direcciones
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  line1 TEXT NOT NULL,
  line2 TEXT,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  within_pilot_zone BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Productos
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  species TEXT NOT NULL, -- dog, cat
  category TEXT NOT NULL, -- food, litter, hygiene
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'CLP',
  weight_kg NUMERIC(10, 2),
  is_essential BOOLEAN DEFAULT FALSE,
  is_subscription_eligible BOOLEAN DEFAULT FALSE,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Carritos
CREATE TABLE public.carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  shipping_cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  total NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  currency TEXT NOT NULL DEFAULT 'CLP',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Items del Carrito
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price_per_unit NUMERIC(10, 2) NOT NULL,
  line_total NUMERIC(10, 2) NOT NULL,
  UNIQUE (cart_id, product_id) -- Un producto por carrito
);

-- Tabla de Pedidos
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, preparing, out_for_delivery, delivered, cancelled
  delivery_method TEXT NOT NULL, -- home_delivery, pickup
  delivery_address_id UUID REFERENCES public.addresses(id) ON DELETE SET NULL, -- Puede ser NULL si es pickup
  subtotal NUMERIC(10, 2) NOT NULL,
  shipping_cost NUMERIC(10, 2) NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'CLP',
  estimated_delivery_window TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Items del Pedido
CREATE TABLE public.order_items (
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price_per_unit NUMERIC(10, 2) NOT NULL,
  line_total NUMERIC(10, 2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);

-- Tabla de Suscripciones
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  pet_id UUID REFERENCES public.pets(id) ON DELETE SET NULL, -- Opcional, pero se puede vincular a una mascota específica
  frequency_weeks INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, paused, cancelled
  next_delivery_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Productos Favoritos
CREATE TABLE public.favorite_products (
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, product_id)
);

-- Tabla de Tickets de Soporte
CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL, -- Opcional, si el ticket está relacionado con un pedido
  category TEXT NOT NULL, -- ej: 'delivery', 'product', 'payment', 'general'
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open', -- open, in_progress, closed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --- RLS Policies ---

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Policies for public.users table
-- Supabase handles auth.users, public.users is an extension profile
-- User can only see and update their own profile
CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Policies for public.pets table
CREATE POLICY "Users can view their own pets" ON public.pets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create pets for themselves" ON public.pets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own pets" ON public.pets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own pets" ON public.pets FOR DELETE USING (auth.uid() = user_id);

-- Policies for public.addresses table
CREATE POLICY "Users can view their own addresses" ON public.addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create addresses for themselves" ON public.addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own addresses" ON public.addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own addresses" ON public.addresses FOR DELETE USING (auth.uid() = user_id);

-- Policies for public.products table (publicly readable)
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (TRUE);

-- Policies for public.carts table
CREATE POLICY "Users can view their own cart" ON public.carts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own cart" ON public.carts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own cart" ON public.carts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own cart" ON public.carts FOR DELETE USING (auth.uid() = user_id);

-- Policies for public.cart_items table
CREATE POLICY "Users can view their own cart items" ON public.cart_items FOR SELECT USING (cart_id IN (SELECT id FROM public.carts WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert into their own cart items" ON public.cart_items FOR INSERT WITH CHECK (cart_id IN (SELECT id FROM public.carts WHERE user_id = auth.uid()));
CREATE POLICY "Users can update their own cart items" ON public.cart_items FOR UPDATE USING (cart_id IN (SELECT id FROM public.carts WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete their own cart items" ON public.cart_items FOR DELETE USING (cart_id IN (SELECT id FROM public.carts WHERE user_id = auth.uid()));

-- Policies for public.orders table
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for public.order_items table
CREATE POLICY "Users can view their own order items" ON public.order_items FOR SELECT USING (order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()));

-- Policies for public.subscriptions table
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create subscriptions for themselves" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own subscriptions" ON public.subscriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own subscriptions" ON public.subscriptions FOR DELETE USING (auth.uid() = user_id);

-- Policies for public.favorite_products table
CREATE POLICY "Users can view their own favorite products" ON public.favorite_products FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add their own favorite products" ON public.favorite_products FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorite products" ON public.favorite_products FOR DELETE USING (auth.uid() = user_id);

-- Policies for public.support_tickets table
CREATE POLICY "Users can view their own support tickets" ON public.support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create support tickets for themselves" ON public.support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own support tickets" ON public.support_tickets FOR UPDATE USING (auth.uid() = user_id);