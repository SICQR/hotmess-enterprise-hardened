/**
 * Product catalog for the HOTMESS shop. Each item represents a piece of
 * apparel or product aligned to one of the RAW, HUNG, HIGH or SUPER lines.
 * In a real application this data would be fetched from a backend or a
 * service like Shopify; here we hardcode a dozen items and host images on
 * Unsplash. Alt text is provided for accessibility.
 */

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  alt: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "RAW Tank Top",
    description: "Heavy cotton tank top for raw evenings.",
    price: 29.99,
    category: "RAW",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?fit=crop&w=500&q=80",
    alt: "Model wearing a black tank top",
  },
  {
    id: 2,
    title: "RAW Hoodie",
    description: "Oversized hoodie with brutalist typography.",
    price: 54.99,
    category: "RAW",
    image:
      "https://images.unsplash.com/photo-1561808840-20aa2f9f2a10?fit=crop&w=500&q=80",
    alt: "Man wearing a dark hoodie outdoors",
  },
  {
    id: 3,
    title: "RAW Snapback",
    description: "Bold snapback cap with HOTMESS logo.",
    price: 24.99,
    category: "RAW",
    image:
      "https://images.unsplash.com/photo-1525395337255-1902115e75f8?fit=crop&w=500&q=80",
    alt: "Black snapback cap on a monochrome background",
  },
  {
    id: 4,
    title: "HUNG Jockstrap",
    description: "Supportive jockstrap for those who go hard.",
    price: 19.99,
    category: "HUNG",
    image:
      "https://images.unsplash.com/photo-1511974035430-5de47d3b95da?fit=crop&w=500&q=80",
    alt: "Man wearing sports underwear",
  },
  {
    id: 5,
    title: "HUNG Socks",
    description: "Thick athletic socks in signature colours.",
    price: 12.99,
    category: "HUNG",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?fit=crop&w=500&q=80",
    alt: "Pair of long athletic socks",
  },
  {
    id: 6,
    title: "HUNG Bandana",
    description: "Versatile bandana to keep things messy.",
    price: 14.99,
    category: "HUNG",
    image:
      "https://images.unsplash.com/photo-1602810317323-a77f52b04de5?fit=crop&w=500&q=80",
    alt: "Person wearing a bandana around their neck",
  },
  {
    id: 7,
    title: "HIGH Mesh Top",
    description: "Breathable mesh top with neon accents.",
    price: 34.99,
    category: "HIGH",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?fit=crop&w=500&q=80",
    alt: "Close-up of a mesh fabric top",
  },
  {
    id: 8,
    title: "HIGH Neon Shorts",
    description: "Fluorescent shorts for visibility on the dance floor.",
    price: 26.99,
    category: "HIGH",
    image:
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?fit=crop&w=500&q=80",
    alt: "Bright neon shorts on a male model",
  },
  {
    id: 9,
    title: "HIGH Harness",
    description: "Adjustable harness to wear over anything.",
    price: 39.99,
    category: "HIGH",
    image:
      "https://images.unsplash.com/photo-1600180758895-66fdcac72ebf?fit=crop&w=500&q=80",
    alt: "Leather harness on a torso mannequin",
  },
  {
    id: 10,
    title: "SUPER Leather Jacket",
    description: "Premium leather jacket with a rebellious edge.",
    price: 149.99,
    category: "SUPER",
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?fit=crop&w=500&q=80",
    alt: "Man wearing a black leather jacket",
  },
  {
    id: 11,
    title: "SUPER Sweatpants",
    description: "Ultra-soft sweatpants for lounging after the party.",
    price: 44.99,
    category: "SUPER",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?fit=crop&w=500&q=80",
    alt: "Pair of grey sweatpants hanging",
  },
  {
    id: 12,
    title: "SUPER Cap",
    description: "Structured cap with metallic embroidery.",
    price: 22.99,
    category: "SUPER",
    image:
      "https://images.unsplash.com/photo-1535916707207-35f97e715e3d?fit=crop&w=500&q=80",
    alt: "Stylish cap displayed on a table",
  },
];

export default products;
