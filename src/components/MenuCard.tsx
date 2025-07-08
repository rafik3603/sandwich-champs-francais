import { Plus, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/data/menuData";

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuCard = ({ item, onAddToCart }: MenuCardProps) => {
  return (
    <Card className="bg-card border-border hover:shadow-card transition-smooth group">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-card-foreground text-lg">{item.name}</h3>
              {item.isPopular && (
                <Badge className="bg-gold text-primary text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Populaire
                </Badge>
              )}
            </div>
            {item.description && (
              <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gold">{item.price.toFixed(2)}€</span>
              <Button
                onClick={() => onAddToCart(item)}
                size="sm"
                className="bg-gradient-primary hover:bg-primary/90 text-primary-foreground transition-smooth group-hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};