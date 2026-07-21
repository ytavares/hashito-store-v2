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
};

export const products: Product[] = [
  {
    id: "caderno-linen",
    name: "Caderno de Memórias Linen",
    category: "Cadernos",
    description: "Capa em linho cru, 80 folhas pólen bold, costura aparente.",
    price: 89,
    image: cadernoImg,
    imageAlt: "Caderno artesanal com capa de linho e fita cru",
  },
  {
    id: "convite-minimalista",
    name: "Convite Minimalista",
    category: "Convites",
    description: "Papel texturizado 250g com lacre de cera. Preço por unidade.",
    price: 12.5,
    image: conviteImg,
    imageAlt: "Convite minimalista com lacre de cera",
  },
  {
    id: "adesivos-botanicos",
    name: "Kit Adesivos Botânicos",
    category: "Adesivos",
    description: "12 adesivos ilustrados à mão em aquarela, recorte especial.",
    price: 24,
    image: adesivosImg,
    imageAlt: "Kit de adesivos botânicos em aquarela",
  },
  {
    id: "planner-semanal",
    name: "Planner Semanal Florescer",
    category: "Planners",
    description: "Planner sem data, capa dura, papel pólen, 52 semanas.",
    price: 129,
    image: plannerImg,
    imageAlt: "Planner semanal aberto com flores secas",
  },
  {
    id: "cartoes-agradecimento",
    name: "Cartões de Agradecimento",
    category: "Cartões",
    description: "Set com 10 cartões em papel pólen e envelopes cru.",
    price: 38,
    image: cartoesImg,
    imageAlt: "Cartões de agradecimento amarrados com sisal",
  },
  {
    id: "marcadores-pagina",
    name: "Marcadores de Página",
    category: "Acessórios",
    description: "Dupla de marcadores ilustrados com tassel em algodão tingido.",
    price: 22,
    image: marcadoresImg,
    imageAlt: "Marcadores de página botânicos com tassel",
  },
];

export const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.category)))];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });