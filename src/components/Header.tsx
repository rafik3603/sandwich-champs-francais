import { ShoppingCart, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-elegant sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-gold font-bold text-lg">B</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">Babylone</h1>
              <p className="text-sm text-gold">Restaurant</p>
            </div>
          </div>

          {/* Contact Info - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gold" />
              <span>11h00 - 23h00</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gold" />
              <span>09 83 900 322</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gold" />
              <span>Marseille</span>
            </div>
          </div>

          {/* Cart Button */}
          <Button
            variant="secondary"
            size="lg"
            onClick={onCartClick}
            className="relative bg-gold hover:bg-gold-light text-primary font-semibold transition-smooth"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Panier
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-primary text-gold min-w-[20px] h-5 rounded-full text-xs">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};