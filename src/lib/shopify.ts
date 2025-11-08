/**
 * Minimal Shopify Storefront API client. Uses GraphQL to fetch products
 * from the configured Shopify storefront. Requires a domain and
 * storefront token to be provided via environment variables.
 */

interface ShopifyProduct {
  id: string
  title: string
  description: string
  handle: string
  images: { edges: { node: { src: string; altText: string | null } }[] };
  variants: { edges: { node: { price: string } }[] };
}

export async function fetchShopifyProducts(): Promise<ShopifyProduct[]> {
  const domain = import.meta.env.VITE_SHOPIFY_DOMAIN
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
  if (!domain || !token) {
    throw new Error('Shopify environment variables are missing')
  }
  const endpoint = `https://${domain}/api/2023-10/graphql.json`
  const query = /* GraphQL */ `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            images(first: 1) { edges { node { src altText } } }
            variants(first: 1) { edges { node { price } } }
          }
        }
      }
    }
  `
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables: { first: 12 } }),
  })
  const { data } = await res.json()
  return data.products.edges.map((edge: { node: ShopifyProduct }) => edge.node)
}

// Additional exports for compatibility with other components
export type Product = {
  id: string
  title: string
  description: string
  price: string
  image: string
  handle: string
}

export async function getProducts(): Promise<Product[]> {
  return []
}

export async function getRecommendedProducts(): Promise<Product[]> {
  return []
}
