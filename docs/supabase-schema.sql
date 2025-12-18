--- OnePets - Supabase Schema (Foundational)
-- Run this script in Supabase SQL editor before generating types.
-- Assumptions:
-- - Auth is handled by Supabase Auth (users table managed by Supabase).
-- - gen_random_uuid() is available (Supabase includes pgcrypto).

-- Extensions (safe to run even if already present)
create extension if not exists "pgcrypto";

-- ============================================================
-- Tables
-- ============================================================

-- Profiles (one row per auth user)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  full_name text not null,
  phone text,
  role text not null default 'user', -- 'user' | 'admin'
  default_address_id uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Addresses (delivery locations)
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  line1 text not null,
  line2 text,
  city text not null,
  region text not null,
  postal_code text not null,
  country text not null default 'CL',
  within_pilot_zone boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);
alter table public.profiles
  add constraint profiles_default_address_fk
  foreign key (default_address_id) references public.addresses (id);


-- Pets (user-owned)
create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  species text not null check (species in ('dog', 'cat')),
  breed text,
  age_years integer default 0 check (age_years >= 0),
  weight_kg numeric(6,2) default 0 check (weight_kg >= 0),
  size text not null default 'medium' check (size in ('small', 'medium', 'large')),
  created_at timestamptz not null default timezone('utc', now())
);

-- Products (catalog)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  species text not null check (species in ('dog', 'cat', 'all')),
  category text not null, -- e.g. food, litter, hygiene, accessories
  description text,
  price numeric(10,2) not null check (price >= 0),
  currency text not null default 'CLP',
  weight_kg numeric(8,2) default 0 check (weight_kg >= 0),
  is_essential boolean not null default true,
  is_subscription_eligible boolean not null default false,
  in_stock boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

-- Carts (one active cart per user)
create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  subtotal numeric(12,2) not null default 0,
  shipping_cost numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  currency text not null default 'CLP',
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts (id) on delete cascade,
  product_id uuid not null references public.products (id),
  quantity integer not null default 1 check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  line_total numeric(12,2) not null check (line_total >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  unique (cart_id, product_id)
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id),
  status text not null default 'pending' check (status in ('pending','preparing','out_for_delivery','delivered','cancelled')),
  delivery_method text not null default 'home_delivery' check (delivery_method in ('home_delivery','pickup')),
  delivery_address_id uuid references public.addresses (id),
  subtotal numeric(12,2) not null default 0,
  shipping_cost numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  currency text not null default 'CLP',
  estimated_delivery_window text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid not null references public.products (id),
  quantity integer not null default 1 check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  line_total numeric(12,2) not null check (line_total >= 0),
  created_at timestamptz not null default timezone('utc', now())
);

-- Subscriptions (recurring food)
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id),
  pet_id uuid references public.pets (id) on delete set null,
  frequency_weeks integer not null default 4 check (frequency_weeks > 0),
  status text not null default 'active' check (status in ('active','paused','cancelled')),
  next_delivery_date date,
  created_at timestamptz not null default timezone('utc', now())
);

-- Favorites
create table if not exists public.favorite_products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id),
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, product_id)
);

-- Support tickets
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  order_id uuid references public.orders (id) on delete set null,
  category text not null,
  message text not null,
  status text not null default 'open' check (status in ('open','in_progress','resolved','closed')),
  created_at timestamptz not null default timezone('utc', now())
);

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_profiles_email on public.profiles (email);
create index if not exists idx_addresses_user on public.addresses (user_id);
create index if not exists idx_pets_user on public.pets (user_id);
create index if not exists idx_products_species_category on public.products (species, category);
create index if not exists idx_products_essential on public.products (is_essential);
create index if not exists idx_cart_items_cart on public.cart_items (cart_id);
create index if not exists idx_orders_user on public.orders (user_id);
create index if not exists idx_orders_status on public.orders (status);
create index if not exists idx_subscriptions_user on public.subscriptions (user_id);
create index if not exists idx_favorites_user on public.favorite_products (user_id);
create index if not exists idx_support_user on public.support_tickets (user_id);

-- ============================================================
-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles          enable row level security;
alter table public.addresses         enable row level security;
alter table public.pets              enable row level security;
alter table public.carts             enable row level security;
alter table public.cart_items        enable row level security;
alter table public.orders            enable row level security;
alter table public.order_items       enable row level security;
alter table public.subscriptions     enable row level security;
alter table public.favorite_products enable row level security;
alter table public.support_tickets   enable row level security;
alter table public.products          enable row level security;

-- Helper: allow service_role everything on profiles
create policy "Service role full access on profiles"
  on public.profiles
  for all
  to service_role
  using (true)
  with check (true);

-- Profiles: users only themselves
create policy "Users can read own profile"
  on public.profiles
  for select
  to public
  using (id = auth.uid());

create policy "Users can update own profile"
  on public.profiles
  for update
  to public
  using (id = auth.uid())
  with check (id = auth.uid());

-- Addresses
create policy "Users manage their addresses"
  on public.addresses
  for all
  to public
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Pets
create policy "Users manage their pets"
  on public.pets
  for all
  to public
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Products (public read)
create policy "Anyone can read products"
  on public.products
  for select
  to public
  using (true);

-- Carts
create policy "Users manage their cart"
  on public.carts
  for all
  to public
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Cart items: join via cart ownership
create policy "Users manage items in their cart"
  on public.cart_items
  for all
  to public
  using (
    cart_id in (
      select id from public.carts where user_id = auth.uid()
    )
  )
  with check (
    cart_id in (
      select id from public.carts where user_id = auth.uid()
    )
  );

-- Orders
create policy "Users read their orders"
  on public.orders
  for select
  to public
  using (user_id = auth.uid());

create policy "Users insert their orders"
  on public.orders
  for insert
  to public
  with check (user_id = auth.uid());

-- Order items: join via orders
create policy "Users read their order items"
  on public.order_items
  for select
  to public
  using (
    order_id in (select id from public.orders where user_id = auth.uid())
  );

create policy "Users insert their order items"
  on public.order_items
  for insert
  to public
  with check (
    order_id in (select id from public.orders where user_id = auth.uid())
  );

-- Subscriptions
create policy "Users manage their subscriptions"
  on public.subscriptions
  for all
  to public
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Favorites
create policy "Users manage their favorites"
  on public.favorite_products
  for all
  to public
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Support tickets
create policy "Users manage their tickets"
  on public.support_tickets
  for all
  to public
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Comment out if you prefer empty tables.
-- ============================================================
insert into public.products (id, name, species, category, description, price, currency, weight_kg, is_essential, is_subscription_eligible, in_stock)
values
  (gen_random_uuid(), 'Alimento seco premium perro adulto 15kg', 'dog', 'food', 'Receta pollo y arroz, formato 15kg', 48990, 'CLP', 15.0, true, true, true),
  (gen_random_uuid(), 'Arena sanitaria aglomerante 10kg', 'cat', 'litter', 'Bajo polvo, control de olores', 15990, 'CLP', 10.0, true, false, true),
  (gen_random_uuid(), 'Snack dental para perro mediano', 'dog', 'hygiene', 'Reduce sarro, uso diario', 7990, 'CLP', 0.2, true, false, true),
  (gen_random_uuid(), 'Alimento seco gato indoor 7.5kg', 'cat', 'food', 'Control bolas de pelo, indoor', 32990, 'CLP', 7.5, true, true, true)
on conflict do nothing;

-- Ensure each user has a cart (can be done via trigger or app logic; shown here as helper)
-- Example helper function to upsert cart; optional, run if desired.
-- create or replace function public.ensure_cart_for_user()
-- returns trigger as $$
-- begin
--   insert into public.carts (user_id) values (new.id)
--   on conflict (user_id) do nothing;
--   return new;
-- end;
-- $$ language plpgsql security definer;
--
-- drop trigger if exists trg_profiles_ensure_cart on public.profiles;
-- create trigger trg_profiles_ensure_cart
-- after insert on public.profiles
-- for each row execute function public.ensure_cart_for_user();
