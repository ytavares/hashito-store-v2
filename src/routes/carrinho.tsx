import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/products";
import { WHATSAPP_NUMBER, STORE } from "@/config";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Meu carrinho — Hashito Store" },
      {
        name: "description",
        content: "Revise seu pedido e finalize a compra pelo WhatsApp com a Hashito Store.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, updateQuantity, removeItem, clear } = useCart();
  const pixDiscount = subtotal * 0.05;
  const pixTotal = subtotal - pixDiscount;

  const buildMessage = () => {
    const lines = [
      `*Novo pedido — ${STORE.name}*`,
      "",
      ...detailed.map((i) => `• ${i.quantity}x ${i.product.name} — ${formatBRL(i.lineTotal)}`),
      "",
      `Subtotal: ${formatBRL(subtotal)}`,
      `Com desconto Pix (-5%): ${formatBRL(pixTotal)}`,
      "",
      "Gostaria de finalizar o pedido e combinar a personalização.",
    ];
    return lines.join("\n");
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Continuar comprando
          </Link>
          <Link to="/" className="font-serif text-lg cursor-pointer">
            Hashito <span className="text-rosa italic">Store</span>
          </Link>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-12">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-rosa">
            Seu pedido
          </span>
          <h1 className="font-serif text-4xl md:text-5xl mt-2">Carrinho</h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Revise seu pedido. Ao finalizar, montamos uma mensagem com o resumo e você conclui a
            compra pelo WhatsApp.
          </p>
        </header>

        {detailed.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
            <section className="space-y-4">
              {detailed.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 bg-background ring-1 ring-black/5 rounded-lg p-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.imageAlt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-24 h-28 object-cover rounded-md"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-rosa">
                          {item.product.category}
                        </p>
                        <h3 className="font-serif text-lg leading-tight mt-1">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatBRL(item.product.price)} · unitário
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        aria-label="Remover item"
                        className="text-muted-foreground hover:text-rosa transition cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="flex items-center ring-1 ring-border rounded-md bg-secondary">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          aria-label="Diminuir"
                          className="px-3 py-2 text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm font-medium min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          aria-label="Aumentar"
                          className="px-3 py-2 text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-medium">{formatBRL(item.lineTotal)}</span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clear}
                className="text-xs text-muted-foreground hover:text-rosa transition cursor-pointer"
              >
                Esvaziar carrinho
              </button>
            </section>

            <aside className="lg:sticky lg:top-24 h-fit bg-secondary/50 ring-1 ring-black/5 rounded-lg p-6">
              <h2 className="font-serif text-xl mb-6">Resumo</h2>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{formatBRL(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-rosa">
                  <dt>Desconto Pix (5%)</dt>
                  <dd>− {formatBRL(pixDiscount)}</dd>
                </div>
                <div className="pt-3 border-t border-border flex justify-between text-base font-medium">
                  <dt>Total no Pix</dt>
                  <dd>{formatBRL(pixTotal)}</dd>
                </div>
                <p className="text-[11px] text-muted-foreground pt-1">
                  Ou {formatBRL(subtotal)} em até 6x sem juros no cartão.
                </p>
              </dl>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[oklch(0.68_0.16_148)] text-white py-3.5 rounded-md text-sm font-semibold hover:opacity-90 transition cursor-pointer"
              >
                Finalizar no WhatsApp
              </a>
              <p className="text-[11px] text-muted-foreground mt-3 text-center italic">
                Você será redirecionado para o WhatsApp com o resumo do pedido.
              </p>

              <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground space-y-2">
                <p>Pix com 5% de desconto.</p>
                <p>Parcelamos em até 6x no cartão.</p>
                <p>Pedidos urgentes têm taxa extra sob consulta.</p>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="text-center py-24 ring-1 ring-border rounded-xl bg-secondary/30">
      <p className="font-serif text-2xl">Seu carrinho está vazio</p>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
        Explore o catálogo e adicione suas peças favoritas para finalizar o pedido pelo WhatsApp.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-md bg-rosa px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition cursor-pointer"
      >
        Ver catálogo
      </Link>
    </div>
  );
}
