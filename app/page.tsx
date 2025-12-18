"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../src/contexts/auth-context";
import { createClient } from "../src/lib/supabase/client";
import { Button } from "../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuMobile,
} from "../components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Carousel } from "../components/ui/carousel";

type Species = "dog" | "cat";
type Category = "food" | "litter" | "hygiene";

type Product = {
  id: string;
  name: string;
  species: Species;
  category: Category;
  price: number;
  currency?: string;
  isSubscriptionEligible: boolean;
  inStock: boolean;
  isEssential: boolean;
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: "p-1",
    name: "Alimento premium pollo",
    species: "dog",
    category: "food",
    price: 24900,
    currency: "CLP",
    isSubscriptionEligible: true,
    inStock: true,
    isEssential: true,
  },
  {
    id: "p-2",
    name: "Arena aglomerante sin perfume",
    species: "cat",
    category: "litter",
    price: 12500,
    currency: "CLP",
    isSubscriptionEligible: false,
    inStock: true,
    isEssential: true,
  },
  {
    id: "p-3",
    name: "Shampoo piel sensible",
    species: "dog",
    category: "hygiene",
    price: 9990,
    currency: "CLP",
    isSubscriptionEligible: false,
    inStock: false,
    isEssential: true,
  },
  {
    id: "p-4",
    name: "Alimento salmón indoor",
    species: "cat",
    category: "food",
    price: 21900,
    currency: "CLP",
    isSubscriptionEligible: true,
    inStock: true,
    isEssential: true,
  },
];

export default function Page() {
  const { session, loading, signIn, signUp, signOut } = useAuth();
  const supabase = useMemo(() => createClient(), []);

  const navLinks = [
    { label: "Perros", href: "#perros" },
    { label: "Gatos", href: "#gatos" },
    { label: "Farmacia", href: "#farmacia" },
    { label: "Higiene", href: "#higiene" },
    { label: "Ofertas", href: "#ofertas" },
  ];
  const slides = [
    {
      badge: "Envío rápido",
      title: "20% OFF en esenciales para perros",
      description: "Alimento premium, limpieza y básicos con entrega en zona piloto.",
      cta: { label: "Ver ofertas", href: "#ofertas" },
    },
    {
      badge: "Nuevo",
      title: "Arena aglomerante para gatos",
      description: "Stock limitado, entrega en 2 horas dentro de la zona.",
      cta: { label: "Comprar ahora", href: "#gatos" },
    },
    {
      badge: "Suscripción",
      title: "Suscribe tu alimento y ahorra",
      description: "Configura frecuencia y evita quedarte sin stock.",
      cta: { label: "Configurar", href: "#perros" },
    },
  ];

  const [species, setSpecies] = useState<Species | "all">("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [addressZone, setAddressZone] = useState<"pilot" | "out" | "none">(
    "pilot"
  );
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [productsLoading, setProductsLoading] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((item) => {
      const speciesMatch = species === "all" ? true : item.species === species;
      const categoryMatch =
        category === "all" ? true : item.category === category;
      return speciesMatch && categoryMatch && item.isEssential;
    });
  }, [species, category, products]);

  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      setProductsLoading(true);
      setAuthMessage("");
      try {
        let query = supabase
          .from("products")
          .select(
            "id,name,species,category,price,currency,is_essential,is_subscription_eligible,in_stock"
          )
          .eq("is_essential", true);

        if (species !== "all") query = query.eq("species", species);
        if (category !== "all") query = query.eq("category", category);

        const { data, error } = await query.order("name", { ascending: true });
        if (error) throw error;
        if (!active) return;
        const mapped: Product[] =
          data?.map((p: any) => ({
            id: p.id,
            name: p.name,
            species: p.species,
            category: p.category,
            price: p.price,
            currency: p.currency ?? "CLP",
            isSubscriptionEligible: p.is_subscription_eligible,
            inStock: p.in_stock,
            isEssential: p.is_essential,
          })) ?? [];
        setProducts(mapped.length ? mapped : MOCK_PRODUCTS);
      } catch (err) {
        console.warn("Falling back to mock products", err);
        if (active) setProducts(MOCK_PRODUCTS);
      } finally {
        if (active) setProductsLoading(false);
      }
    };
    fetchProducts();
    return () => {
      active = false;
    };
  }, [species, category, supabase]);

  // Load favorites when session changes
  useEffect(() => {
    let active = true;
    const loadFavorites = async () => {
      if (!session) {
        setFavorites(new Set());
        return;
      }
      try {
        const { data, error } = await supabase
          .from("favorite_products")
          .select("product_id")
          .eq("user_id", session.user.id);
        if (error) throw error;
        if (!active) return;
        setFavorites(new Set(data?.map((f) => f.product_id) ?? []));
      } catch (err) {
        console.warn("No se pudieron cargar favoritos, usando local.", err);
      }
    };
    loadFavorites();
    return () => {
      active = false;
    };
  }, [session, supabase]);

  // Load address zone
  useEffect(() => {
    let active = true;
    const loadAddress = async () => {
      if (!session) {
        setAddressZone("none");
        return;
      }
      try {
        const { data, error } = await supabase
          .from("addresses")
          .select("within_pilot_zone")
          .eq("user_id", session.user.id)
          .limit(1)
          .maybeSingle();
        if (error) throw error;
        if (!active) return;
        if (!data) {
          setAddressZone("none");
        } else {
          setAddressZone(data.within_pilot_zone ? "pilot" : "out");
        }
      } catch (err) {
        console.warn("No se pudo obtener dirección; se usará 'none'.", err);
        if (active) setAddressZone("none");
      }
    };
    loadAddress();
    return () => {
      active = false;
    };
  }, [session, supabase]);

  const toggleFavorite = async (id: string) => {
    // fallback local if no session
    if (!session) {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
      setAuthMessage("Inicia sesión para guardar favoritos.");
      return;
    }

    const isFav = favorites.has(id);
    try {
      if (isFav) {
        const { error } = await supabase
          .from("favorite_products")
          .delete()
          .eq("user_id", session.user.id)
          .eq("product_id", id);
        if (error) throw error;
        setFavorites((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      } else {
        const { error } = await supabase
          .from("favorite_products")
          .insert({ user_id: session.user.id, product_id: id });
        if (error) throw error;
        setFavorites((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
      }
      setAuthMessage(isFav ? "Favorito eliminado." : "Añadido a favoritos.");
    } catch (err: any) {
      setAuthMessage(err?.message ?? "No se pudo actualizar favoritos.");
    }
  };

  const availabilityLabel = (inStock: boolean) => {
    if (addressZone === "none") return "Agrega tu dirección";
    if (addressZone === "out") return "Fuera de zona piloto";
    return inStock ? "Disponible rápido" : "Sin stock en tu zona";
  };

  const formatPrice = (value: number, currency = "CLP") =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: currency === "CLP" ? "CLP" : "USD",
      minimumFractionDigits: 0,
    }).format(value);

  const handleLogin = async () => {
    setAuthMessage("");
    try {
      await signIn(authEmail, authPassword);
      setAuthMessage("Sesión iniciada.");
    } catch (err: any) {
      setAuthMessage(err?.message ?? "No se pudo iniciar sesión.");
    }
  };

  const handleSignup = async () => {
    setAuthMessage("");
    try {
      await signUp(authEmail, authPassword, signupName);
      setAuthMessage("Cuenta creada. Revisa tu correo si requiere confirmación.");
    } catch (err: any) {
      setAuthMessage(err?.message ?? "No se pudo crear la cuenta.");
    }
  };

  const handleLogout = async () => {
    setAuthMessage("");
    try {
      await signOut();
      setAuthMessage("Sesión cerrada.");
    } catch (err: any) {
      setAuthMessage(err?.message ?? "No se pudo cerrar sesión.");
    }
  };

  return (
    <main className="op-shell">
      <header className="op-navbar">
        <div className="op-logo">OnePets</div>
        <div className="op-nav-desktop">
          <NavigationMenu links={navLinks} />
        </div>
        <div className="op-actions">
          {!session ? (
            <>
              <Button variant="ghost" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="solid" onClick={handleSignup}>
                Crear cuenta
              </Button>
            </>
          ) : (
            <Button variant="ghost" onClick={handleLogout}>
              Logout ({session.user.email})
            </Button>
          )}
        </div>
        <div className="op-nav-mobile-trigger">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger onClick={() => setIsSheetOpen(true)}>Menú</SheetTrigger>
            <SheetContent>
              <NavigationMenuMobile
                links={navLinks}
                onSelect={() => setIsSheetOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="op-hero">
        <div className="op-hero-copy">
          <p className="eyebrow">Zona piloto • entrega rápida</p>
          <h1>Esenciales para tu mascota sin rodeos</h1>
          <p className="lede">
            Filtra por especie y categoría, ve disponibilidad por dirección y
            guarda tus favoritos para reordenar en segundos.
          </p>
          <div className="op-hero-cta">
            <Button variant="solid">Explorar esenciales</Button>
            <Button variant="ghost">Configurar dirección</Button>
          </div>
          <div className="op-hero-stats">
            <div>
              <strong>20+</strong>
              <span>SKUs esenciales</span>
            </div>
            <div>
              <strong>3 taps</strong>
              <span>de home a producto</span>
            </div>
            <div>
              <strong>2s</strong>
              <span>respuesta objetivo</span>
            </div>
          </div>
        </div>
        <Carousel slides={slides} />
      </section>

      <section className="op-panel" id="categorias">
        <div className="op-panel-header">
          <div>
            <p className="eyebrow">Categorías destacadas</p>
            <h2>Compra por especie y necesidad</h2>
          </div>
          <div className="chip-group">
            <span className="chip active">Perros</span>
            <span className="chip">Gatos</span>
            <span className="chip">Farmacia</span>
            <span className="chip">Higiene</span>
          </div>
        </div>
        <div className="op-cats">
          {[
            { title: "Alimento Perros", body: "Seco y húmedo, razas pequeñas a grandes." },
            { title: "Arena Gatos", body: "Aglomerante y control de olores." },
            { title: "Farmacia", body: "Vitaminas, antiparasitarios y más." },
            { title: "Higiene", body: "Shampoos, toallitas y dental care." },
          ].map((cat) => (
            <div className="cat-card" key={cat.title}>
              <div className="pill primary">Destacado</div>
              <h3>{cat.title}</h3>
              <p className="lede">{cat.body}</p>
              <Button variant="ghost">Ver</Button>
            </div>
          ))}
        </div>
      </section>

      <section id="catalogo" className="op-panel">
        <div className="op-panel-header">
          <div>
            <p className="eyebrow">Catálogo esencial</p>
            <h2>Filtra por especie y categoría</h2>
            <p className="lede">
              Solo productos activos y esenciales; disponibilidad según tu zona.
            </p>
          </div>
          <div className="op-filters">
            <div className="filter">
              <label>Especie</label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value as Species | "all")}
              >
                <option value="all">Todas</option>
                <option value="dog">Perro</option>
                <option value="cat">Gato</option>
              </select>
            </div>
            <div className="filter">
              <label>Categoría</label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as Category | "all")
                }
              >
                <option value="all">Todas</option>
                <option value="food">Alimento</option>
                <option value="litter">Arena</option>
                <option value="hygiene">Higiene</option>
              </select>
            </div>
          </div>
        </div>

        <div className="op-grid">
          {productsLoading && (
            <div className="op-empty">
              <p>Cargando productos esenciales...</p>
            </div>
          )}
          {!productsLoading &&
            filtered.map((product) => {
              const isFav = favorites.has(product.id);
              const availability = availabilityLabel(product.inStock);
              return (
                <article className="op-card" key={product.id}>
                  <div className="op-card-header">
                    <div className="pill subtle">
                      {product.species === "dog" ? "Perro" : "Gato"} ·{" "}
                      {product.category === "food"
                        ? "Alimento"
                        : product.category === "litter"
                        ? "Arena"
                        : "Higiene"}
                    </div>
                    <button
                      className={`fav ${isFav ? "active" : ""}`}
                      onClick={() => toggleFavorite(product.id)}
                      aria-label="Favorito"
                    >
                      ♥
                    </button>
                  </div>
                  <h3>{product.name}</h3>
                  <p className="price">
                    {formatPrice(product.price, product.currency)}
                  </p>
                  <div className="availability">
                    <span
                      className={`badge ${
                        availability === "Disponible rápido" ? "ok" : "warn"
                      }`}
                    >
                      {availability}
                    </span>
                    {product.isSubscriptionEligible && (
                      <span className="badge ghost">
                        Elegible a suscripción
                      </span>
                    )}
                  </div>
                  <div className="op-card-actions">
                    <Button variant="ghost">Ver detalle</Button>
                    <Button variant="solid">Agregar</Button>
                  </div>
                </article>
              );
            })}
          {!productsLoading && filtered.length === 0 && (
            <div className="op-empty">
              <p>Sin resultados. Ajusta especie o categoría.</p>
              <Button
                variant="ghost"
                onClick={() => {
                  setSpecies("all");
                  setCategory("all");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="favoritos" className="op-panel compact">
        <div>
          <p className="eyebrow">Favoritos</p>
          <h2>Reordenar en un tap</h2>
          <p className="lede">
            Guarda esenciales para no buscarlos de nuevo. Autenticación requerida.
          </p>
        </div>
        <div className="fav-summary">
          <div className="pill">Guardados</div>
          <h3>{favorites.size} productos</h3>
          <p>Agrega o quita favoritos desde las tarjetas del catálogo.</p>
        </div>
      </section>

      <section id="cuenta" className="op-panel grid-two">
        <div className="op-card form-card">
          <p className="eyebrow">Crear cuenta</p>
          <h3>Signup rápido</h3>
          <div className="op-form-fields">
            <input
              placeholder="Nombre completo"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
            <input
              placeholder="Correo"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
            />
            <input
              placeholder="Contraseña (min 8)"
              type="password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
            />
            <Button variant="solid" full onClick={handleSignup}>
              Crear cuenta
            </Button>
          </div>
          <ul className="bullets">
            <li>Valida email y contraseña (FR-001).</li>
            <li>Crea perfil en Supabase.</li>
            <li>Sesion inicia al terminar.</li>
          </ul>
        </div>
        <div className="op-card form-card">
          <p className="eyebrow">Perfil y dirección</p>
          <h3>Datos de contacto</h3>
          <div className="op-form-fields">
            <input placeholder="Nombre" />
            <input placeholder="Teléfono" />
            <input placeholder="Dirección (línea 1)" />
            <input placeholder="Ciudad / Región" />
            <Button variant="ghost" full>
              Guardar
            </Button>
          </div>
          <ul className="bullets">
            <li>Recalcula zona piloto al guardar (FR-004).</li>
            <li>Solo tu usuario puede editar sus datos.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
