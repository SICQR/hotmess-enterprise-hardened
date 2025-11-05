import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/ProductGrid";
import { ArrowLeft } from "@phosphor-icons/react";
import { getProducts, type Product } from "@/lib/shopify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getRecommendedProducts } from "@/lib/shopify";

interface ShopPageProps {
  onNavigate: (route: string) => void;
}

export function ShopPage({ onNavigate }: ShopPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setRecommended(getRecommendedProducts(selectedProduct.id));
    }
  }, [selectedProduct]);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={() => onNavigate("home")}
            variant="ghost"
            size="icon"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold tracking-wider">HOTMESS SHOP</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold mb-4">BRUTALIST LUXURY</h2>
          <p className="text-xl text-muted-foreground">
            Apparel, accessories, and goods for the modern man.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <ProductGrid
            products={products}
            onProductClick={setSelectedProduct}
          />
        )}
      </div>

      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-3xl">
                  {selectedProduct.title}
                </DialogTitle>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-4xl font-bold">
                        ${selectedProduct.price}
                      </span>
                      {selectedProduct.compareAtPrice && (
                        <span className="text-xl text-muted-foreground line-through">
                          ${selectedProduct.compareAtPrice}
                        </span>
                      )}
                    </div>
                    {!selectedProduct.available && (
                      <Badge variant="destructive" className="mb-4">
                        SOLD OUT
                      </Badge>
                    )}
                  </div>

                  <p className="text-lg leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag.toUpperCase()}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={!selectedProduct.available}
                  >
                    {selectedProduct.available ? "ADD TO CART" : "OUT OF STOCK"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Free shipping on orders over $200
                  </p>
                </div>
              </div>

              {recommended.length > 0 && (
                <div className="pt-8 border-t border-border">
                  <h3 className="text-2xl font-bold mb-6">
                    YOU MIGHT ALSO LIKE
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recommended.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className="text-left group"
                      >
                        <div className="aspect-square bg-muted mb-2 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="text-sm font-bold">{product.title}</div>
                        <div className="text-sm text-muted-foreground">
                          ${product.price}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
