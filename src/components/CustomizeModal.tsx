import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { MenuItem, Addon } from "@/pages/Index";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CustomizedCartItem extends Omit<MenuItem, 'addons'> {
  selected_addons: Addon[];
  final_price: number;
  quantity: number;
  cart_item_id: string;
}

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  onAddToCart: (item: CustomizedCartItem) => void;
}

export const CustomizeModal = ({ isOpen, onClose, item, onAddToCart }: CustomizeModalProps) => {
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (item) {
      const addonPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
      setTotalPrice(item.price + addonPrice);
    }
  }, [item, selectedAddons]);

  useEffect(() => {
    // Reset state when a new item is selected
    if (item) {
      setSelectedAddons([]);
      setTotalPrice(item.price);
    }
  }, [item]);

  if (!item) return null;

  const handleAddonToggle = (addon: Addon) => {
    setSelectedAddons(prev => {
      const isSelected = prev.find(a => a.id === addon.id);
      if (isSelected) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleAddToCartClick = () => {
    const { addons, ...restOfItem } = item;
    const customizedItem: Omit<CustomizedCartItem, 'quantity'> = {
      ...restOfItem,
      selected_addons: selectedAddons,
      final_price: totalPrice,
      cart_item_id: `${item.id}-${selectedAddons.map(a => a.id).sort().join('-')}`
    };
    onAddToCart({ ...customizedItem, quantity: 1 });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-gold text-2xl font-display">{item.name}</DialogTitle>
          {item.description && <DialogDescription>{item.description}</DialogDescription>}
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-card-foreground">Ingredients</h4>
            <p className="text-sm text-muted-foreground">
              {item.ingredients.map(ing => ing.name).join(', ')}
            </p>
          </div>
          {item.addons.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 text-card-foreground">Add-ons</h4>
              <div className="space-y-3">
                {item.addons.map(addon => (
                  <div key={addon.id} className="flex items-center justify-between p-3 rounded-md bg-muted/30">
                    <Label htmlFor={addon.id} className="flex items-center space-x-3 cursor-pointer">
                      <Checkbox
                        id={addon.id}
                        onCheckedChange={() => handleAddonToggle(addon)}
                        checked={selectedAddons.some(a => a.id === addon.id)}
                      />
                      <span className="font-medium">{addon.name}</span>
                    </Label>
                    <span className="text-sm text-gold font-semibold">+ {addon.price.toFixed(2)}€</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="bg-muted/20 p-4 rounded-b-lg">
          <div className="w-full flex justify-between items-center">
            <span className="text-2xl font-bold text-gold">{totalPrice.toFixed(2)}€</span>
            <Button onClick={handleAddToCartClick} size="lg" className="bg-gradient-primary hover:bg-primary/90 text-primary-foreground font-semibold">Add to Cart</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
