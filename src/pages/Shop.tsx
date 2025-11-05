import React, { useEffect, useState } from "react";
import products from "../lib/products";
import { fetchShopifyProducts } from "../lib/shopify";

// Type for fallback products and Shopify products combined
interface UnifiedProduct {
  id: number | string;
  title: string;
  description: string;
  price: number;
  image: string;
  alt: string;
}

/**
 * Shop page displays a grid of products pulled from a static catalogue.
 * Each card shows an image, title, description and price. Users can
 * attempt to add items to their bag; if they haven’t verified age yet
 * they receive a reminder to confirm they’re over 18. In a real app
 * clicking Add to Bag would integrate with a cart system.
 */
export default function Shop() {
  const [items, setItems] = useState<UnifiedProduct[]>(
    products as unknown as UnifiedProduct[],
  );

  // On mount, attempt to fetch from Shopify and override static products if successful
  useEffect(() => {
    (async () => {
      try {
        const shopify = await fetchShopifyProducts();
        if (shopify && shopify.length > 0) {
          // Transform Shopify data into our unified product format
          const unified = shopify.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            price: parseFloat(p.variants.edges[0].node.price),
            image: p.images.edges[0]?.node.src ?? "",
            alt: p.images.edges[0]?.node.altText ?? p.title,
          })) as UnifiedProduct[];
          setItems(unified);
        }
      } catch (err) {
        console.error("Shopify fetch failed, using static products", err);
      }
    })();
  }, []);

  return (
    <div className="px-4 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6">Shop the Drop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-[#1a1a1a] rounded shadow overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-1">{product.title}</h2>
              <p className="text-sm opacity-80 mb-2">{product.description}</p>
              <p className="text-red-500 font-semibold">
                £
                {typeof product.price === "number"
                  ? product.price.toFixed(2)
                  : product.price}
              </p>
              <button
                className="mt-4 w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    const consented =
                      sessionStorage.getItem("age-verified") === "true";
                    if (consented) {
                      alert("Added to bag!");
                    } else {
                      alert("Please confirm you are 18+ and consenting.");
                    }
                  }
                }}
              >
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Cross‑sell section to drive users toward other parts of the ecosystem */}
      <div className="mt-12 text-center space-y-4">
        <h2 className="text-2xl font-bold">Keep the Mess Moving</h2>
        <p className="opacity-80 max-w-xl mx-auto">
          Earn more and stay engaged – scan QR beacons to unlock exclusive
          drops, tune into HOTMESS Radio for show‑only discount codes, and join
          our affiliate programme to earn commissions on every sale.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() =>
              alert("Tune into HOTMESS Radio for exclusive discount codes!")
            }
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Listen to Radio
          </button>
          <button
            onClick={() =>
              alert("Apply to our Affiliate Gang and earn commissions!")
            }
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Join Affiliate
          </button>
          <button
            onClick={() =>
              alert("Need aftercare? Visit our Care page for resources.")
            }
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold"
          >
            Visit Care
          </button>
        </div>
      </div>
    </div>
  );
}
