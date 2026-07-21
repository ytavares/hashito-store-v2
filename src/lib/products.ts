import cadernoImg from "@/assets/product-caderno.jpg";
import conviteImg from "@/assets/product-convite.jpg";
import adesivosImg from "@/assets/product-adesivos.jpg";
import plannerImg from "@/assets/product-planner.jpg";
import cartoesImg from "@/assets/product-cartoes.jpg";
import marcadoresImg from "@/assets/product-marcadores.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "caderno-a5",
    name: "Caderno A5 Personalizado",
    category: "Cadernos",
    description: "Capa dura com nome bordado. 120 folhas pautadas, papel pólen.",
    price: 59.9,
    image: cadernoImg,
    imageAlt: "Caderno A5 personalizado com capa dura e nome bordado",
    featured: true,
  },
  {
    id: "planner-anual-2026",
    name: "Planner Anual 2026",
    category: "Planners",
    description: "Planeje com visão anual, mensal e semanal. Capa em linho.",
    price: 129.9,
    image: plannerImg,
    imageAlt: "Planner anual 2026 com capa em linho",
    featured: true,
  },
  {
    id: "agenda-diaria",
    name: "Agenda Diária Permanente",
    category: "Planners",
    description: "Sem data – comece quando quiser. 365 páginas em papel pólen, capa dura.",
    price: 99.9,
    image: plannerImg,
    imageAlt: "Agenda diária permanente sem data",
  },
  {
    id: "convite-aniversario-infantil",
    name: "Convite Aniversário Infantil",
    category: "Convites",
    description: "Arte personalizada com foto. Impressão em papel perolado. Mínimo 15 un.",
    price: 49.9,
    image: conviteImg,
    imageAlt: "Convite de aniversário infantil personalizado com foto",
    featured: true,
  },
  {
    id: "convite-cha-revelacao",
    name: "Convite Chá Revelação",
    category: "Convites",
    description: "Convite dobrável com efeito de revelação. Pacote com 15 unidades.",
    price: 69.9,
    image: conviteImg,
    imageAlt: "Convite dobrável para chá revelação",
  },
  {
    id: "tag-lembrancinha",
    name: "Tag de Lembrancinha (50 un.)",
    category: "Lembrancinhas",
    description: "Tags personalizadas com nome e tema. Cordão de juta incluso.",
    price: 39.9,
    image: marcadoresImg,
    imageAlt: "Tags de lembrancinha personalizadas com cordão de juta",
  },
  {
    id: "kit-casamento",
    name: "Kit Papelaria de Casamento",
    category: "Casamento",
    description: "Convite + save-the-date + tag + menu personalizados. Combo para 50 convidados.",
    price: 599,
    image: cartoesImg,
    imageAlt: "Kit completo de papelaria para casamento",
    featured: true,
  },
  {
    id: "save-the-date",
    name: "Save-the-Date Magnético",
    category: "Casamento",
    description: "Ímã personalizado com foto do casal. Mínimo 30 unidades.",
    price: 159.9,
    image: cartoesImg,
    imageAlt: "Save-the-date magnético personalizado com foto do casal",
  },
  {
    id: "marca-pagina-couro",
    name: "Marca-Página em Couro",
    category: "Lembrancinhas",
    description: "Marca-página personalizado com inicial gravada. Couro ecológico.",
    price: 24.9,
    image: marcadoresImg,
    imageAlt: "Marca-página em couro ecológico com inicial gravada",
  },
  {
    id: "adesivos-personalizados",
    name: "Adesivos Personalizados (30 un.)",
    category: "Lembrancinhas",
    description: "Cartela com 30 adesivos da sua arte. Vinil resistente à água.",
    price: 29.9,
    image: adesivosImg,
    imageAlt: "Cartela de adesivos personalizados em vinil",
  },
  {
    id: "papel-carta",
    name: "Papel de Carta com Envelope",
    category: "Cadernos",
    description: "Kit com 10 folhas e 10 envelopes em papel reciclado artesanal.",
    price: 44.9,
    image: cadernoImg,
    imageAlt: "Kit de papel de carta com envelopes em papel reciclado",
  },
  {
    id: "kit-recem-nascido",
    name: "Kit Recém-Nascido Personalizado",
    category: "Lembrancinhas",
    description: "Cartão maternidade + livrinho de memórias + faixa. Caixa decorada.",
    price: 189.9,
    image: cartoesImg,
    imageAlt: "Kit recém-nascido personalizado em caixa decorada",
  },
];

export const categories = [
  "Todos",
  "Destaques",
  "Cadernos",
  "Planners",
  "Convites",
  "Lembrancinhas",
  "Casamento",
];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
