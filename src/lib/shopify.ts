export interface Product {
  id: string
  title: string
  handle: string
  description: string
  price: number
  compareAtPrice?: number
  image: string
  images: string[]
  available: boolean
  tags: string[]
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    title: 'CONCRETE HOODIE',
    handle: 'concrete-hoodie',
    description: 'Heavy-weight brutalist hoodie in industrial concrete grey. 480gsm French terry.',
    price: 245,
    compareAtPrice: 320,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop'],
    available: true,
    tags: ['apparel', 'winter', 'core']
  },
  {
    id: 'prod_002',
    title: 'STEEL UTILITY PANTS',
    handle: 'steel-utility-pants',
    description: 'Military-grade ripstop cargo pants with reinforced knees. Built for urban warfare.',
    price: 195,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop'],
    available: true,
    tags: ['apparel', 'pants', 'utility']
  },
  {
    id: 'prod_003',
    title: 'BRUTALIST LOGO TEE',
    handle: 'brutalist-logo-tee',
    description: 'Heavyweight tee with architectural HOTMESS wordmark. Pre-shrunk organic cotton.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop'],
    available: true,
    tags: ['apparel', 'tee', 'core']
  },
  {
    id: 'prod_004',
    title: 'CHROME CHAIN NECKLACE',
    handle: 'chrome-chain-necklace',
    description: 'Industrial stainless steel chain. 8mm Cuban link. Made in Italy.',
    price: 420,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop'],
    available: true,
    tags: ['jewelry', 'chains', 'luxury']
  },
  {
    id: 'prod_005',
    title: 'ARCHITECT LEATHER BOOTS',
    handle: 'architect-leather-boots',
    description: 'Full-grain Italian leather combat boots. Goodyear welted for life.',
    price: 680,
    compareAtPrice: 850,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&h=800&fit=crop'],
    available: true,
    tags: ['footwear', 'luxury', 'winter']
  },
  {
    id: 'prod_006',
    title: 'MONOLITH BACKPACK',
    handle: 'monolith-backpack',
    description: 'Waterproof Cordura backpack with laptop sleeve. 30L capacity.',
    price: 340,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'],
    available: true,
    tags: ['accessories', 'bags', 'utility']
  },
  {
    id: 'prod_007',
    title: 'TITANIUM RING',
    handle: 'titanium-ring',
    description: 'Aerospace-grade titanium signet ring. Matte black finish.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop'],
    available: false,
    tags: ['jewelry', 'rings', 'luxury']
  },
  {
    id: 'prod_008',
    title: 'CONCRETE CANDLE',
    handle: 'concrete-candle',
    description: 'Hand-poured soy wax candle in concrete vessel. Cedar & tobacco scent.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1602874801006-57789b1d0a3e?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1602874801006-57789b1d0a3e?w=800&h=800&fit=crop'],
    available: true,
    tags: ['home', 'candles', 'gifts']
  },
  {
    id: 'prod_009',
    title: 'RADIO VINTAGE TEE',
    handle: 'radio-vintage-tee',
    description: 'Distressed vintage wash tee with RAW CONVICT RECORDS logo.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop'],
    available: true,
    tags: ['apparel', 'tee', 'radio']
  },
  {
    id: 'prod_010',
    title: 'INDUSTRIAL SUNGLASSES',
    handle: 'industrial-sunglasses',
    description: 'Matte black acetate frames with polarized lenses. UV400 protection.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop'],
    available: true,
    tags: ['accessories', 'eyewear', 'summer']
  },
  {
    id: 'prod_011',
    title: 'FORTRESS JACKET',
    handle: 'fortress-jacket',
    description: 'Technical shell jacket with 3-layer Gore-Tex. Built for apocalypse weather.',
    price: 890,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop'],
    available: true,
    tags: ['apparel', 'outerwear', 'luxury']
  },
  {
    id: 'prod_012',
    title: 'STEEL WATER BOTTLE',
    handle: 'steel-water-bottle',
    description: 'Double-wall insulated steel bottle. Keeps cold for 24h. 750ml.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop',
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop'],
    available: true,
    tags: ['accessories', 'utility', 'gifts']
  }
]

export async function getProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return MOCK_PRODUCTS
}

export async function getProduct(handle: string): Promise<Product | null> {
  await new Promise(resolve => setTimeout(resolve, 200))
  return MOCK_PRODUCTS.find(p => p.handle === handle) || null
}

export function getRecommendedProducts(currentProductId: string, limit = 4): Product[] {
  return MOCK_PRODUCTS
    .filter(p => p.id !== currentProductId && p.available)
    .slice(0, limit)
}
