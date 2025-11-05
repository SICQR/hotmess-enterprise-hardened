import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "@phosphor-icons/react";
import { type Product } from "@/lib/shopify";

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group cursor-pointer overflow-hidden border-2 border-border hover:border-accent transition-all duration-300"
          onClick={() => onProductClick?.(product)}
        >
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-sm leading-tight text-monument">
                {product.title}
              </h3>
              {!product.available && (
                <Badge
                  variant="outline"
                  className="border-muted-foreground text-xs"
                >
                  SOLD OUT
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold">${product.price}</span>
                {product.compareAtPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-accent hover:text-accent/80"
                disabled={!product.available}
              >
                <ShoppingBag size={20} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
