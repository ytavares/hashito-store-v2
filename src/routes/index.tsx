import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import heroImg from "@/assets/hero-hashito.jpg";
import { products, categories, formatBRL, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { STORE } from "@/config";

export const Route = createFileRoute("/")({
  component: Home,
});

const steps = [
  {
    n: "01",
    title: "Escolha o modelo",
    text: "Navegue pelas categorias e selecione a peça que mais combina com você.",
  },
  {
    n: "02",
    title: "Personalize",
    text: "Envie nomes, datas, fotos e referências de cores pelo WhatsApp após o pedido.",
  },
  {
    n: "03",
    title: "Aprovação da arte",
    text: "Você recebe a arte digital para revisar e aprovar antes da produção física.",
  },
  {
    n: "04",
    title: "Produção e envio",
    text: "Produção em 5 a 10 dias úteis. Envio para todo o Brasil com código de rastreio.",
  },
];

function Home() {
  const { totalItems } = useCart();
  const [category, setCategory] = useState("Todos");
  const filtered =
    category === "Todos" ? products : products.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-rosa-soft">
      <TopBar totalItems={totalItems} />

      {/* Hero */}
      <header className="px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-rosa mb-6">
            Feito à mão com afeto
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-balance leading-[1.05] mb-8">
            {STORE.name}
          </h1>
          <p className="text-lg text-pretty max-w-[52ch] leading-relaxed text-muted-foreground">
            {STORE.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#catalogo"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 cursor-pointer"
            >
              Ver catálogo
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:bg-secondary cursor-pointer"
            >
              Como funciona
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 overflow-hidden rounded-xl ring-1 ring-black/5">
          <img
            src={heroImg}
            alt="Papelaria artesanal Hashito Store"
            width={1600}
            height={1000}
            className="w-full h-[380px] md:h-[520px] object-cover"
          />
        </div>
      </header>

      {/* Catalog */}
      <section id="catalogo" className="py-20 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10">
            <div>
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-rosa">
                Coleção
              </span>
              <h2 className="font-serif text-4xl mt-2 text-balance leading-tight">
                Papelaria feita para você
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={
                    "px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition cursor-pointer " +
                    (category === c
                      ? "bg-rosa text-white"
                      : "bg-background text-muted-foreground ring-1 ring-border hover:text-foreground")
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="como-funciona" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-rosa">
              Processo
            </span>
            <h2 className="font-serif text-4xl mt-2 text-balance leading-tight">
              Como funciona a encomenda
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-5">
                <span className="font-serif text-3xl text-rosa/50 shrink-0 leading-none">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-serif text-xl mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty max-w-[42ch] leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment & Hours */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Pagamento
            </h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span>Pix</span>
                <span className="text-rosa font-medium">-5% de desconto</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Cartão de crédito</span>
                <span>Até 6x sem juros</span>
              </li>
              <li className="flex justify-between text-sm">
                <span>Cartão de débito</span>
                <span>À vista</span>
              </li>
              <li className="text-[11px] text-muted-foreground mt-4 leading-relaxed italic">
                * Pedidos urgentes possuem taxa adicional sob consulta.
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Atendimento
            </h4>
            <p className="text-sm">Segunda a Sexta</p>
            <p className="text-sm font-medium">09h às 18h</p>
            <p className="text-xs text-muted-foreground mt-2">
              Prazos contados em dias úteis. Pedidos e personalizações pelo WhatsApp.
            </p>
          </div>
          <div className="bg-secondary p-6 rounded-lg ring-1 ring-black/5">
            <h4 className="font-serif text-lg mb-2">Pronto para encomendar?</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Adicione os itens ao carrinho e finalize o pedido pelo WhatsApp.
            </p>
            <Link
              to="/carrinho"
              className="w-full inline-flex items-center justify-center gap-2 bg-rosa text-accent-foreground py-3 rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              Ver meu carrinho ({totalItems})
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <article className="group bg-background ring-1 ring-black/5 rounded-lg overflow-hidden flex flex-col">
      <div className="w-full aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          width={800}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-rosa mb-2">
          {product.category}
        </span>
        <h3 className="font-serif text-xl mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-6 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium">{formatBRL(product.price)}</span>
          <div className="flex items-center ring-1 ring-border rounded-md bg-secondary">
            <button
              type="button"
              aria-label="Diminuir quantidade"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="text-sm font-medium min-w-6 text-center">{qty}</span>
            <button
              type="button"
              aria-label="Aumentar quantidade"
              onClick={() => setQty((q) => q + 1)}
              className="px-3 py-2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            addItem(product.id, qty);
            toast.success(`${qty}x ${product.name} adicionado ao carrinho`);
          }}
          className="w-full bg-rosa text-white py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}

function TopBar({ totalItems }: { totalItems: number }) {
  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-tight cursor-pointer">
          Hashito <span className="text-rosa italic">Store</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#catalogo" className="hover:text-rosa transition cursor-pointer">Catálogo</a>
          <a href="#como-funciona" className="hover:text-rosa transition cursor-pointer">Como funciona</a>
        </nav>
        <Link
          to="/carrinho"
          className="relative inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/70 transition cursor-pointer"
        >
          <ShoppingBag className="h-4 w-4" />
          Carrinho
          {totalItems > 0 && (
            <span className="ml-1 inline-flex items-center justify-center rounded-full bg-rosa text-accent-foreground text-[10px] h-5 min-w-5 px-1.5 font-semibold">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 bg-secondary/40 border-t border-border text-center">
      <p className="font-serif text-lg mb-2">Hashito Store</p>
      <p className="text-xs text-muted-foreground tracking-wide">
        © {new Date().getFullYear()} · Papelaria afetiva & artesanal · {STORE.hours}
      </p>
    </footer>
  );
}
