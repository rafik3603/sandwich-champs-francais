import { useState, useEffect } from "react";
import { Phone, MapPin, Clock, Utensils, Star, Heart, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { MenuCategory as MenuCategoryComponent } from "@/components/MenuCategory";
import { CartModal } from "@/components/CartModal";
import { CustomizeModal } from "@/components/CustomizeModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getMenuItems } from "@/lib/api";

// Define types based on the new data structure from the API
export interface Ingredient {
  id: string;
  name: string;
  stock_level: number;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  stock_level: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  isPopular?: boolean;
  ingredients: Ingredient[];
  addons: Addon[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface CartItem extends Omit<MenuItem, 'addons' | 'price'> {
  cart_item_id: string; // Unique ID for this specific cart item instance
  selected_addons: Addon[];
  final_price: number;
  quantity: number;
}

const Index = () => {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const menuData = await getMenuItems();
        setMenu(menuData);
        setError(null);
      } catch (err) {
        setError("Failed to load the menu. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleOpenCustomizeModal = (item: MenuItem) => {
    setSelectedItem(item);
    setIsCustomizeModalOpen(true);
  };

  const handleAddToCart = (itemToAdd: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.cart_item_id === itemToAdd.cart_item_id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.cart_item_id === itemToAdd.cart_item_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...itemToAdd, quantity: 1 }];
    });
    
    toast({
      title: "Article ajouté au panier",
      description: `${itemToAdd.name} a été ajouté à votre panier.`,
    });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cart_item_id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cart_item_id !== cartItemId));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    toast({
      title: "Commande en cours...",
      description: "Fonctionnalité de paiement à venir. Connectez Supabase pour les paiements sécurisés.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Header 
        cartItems={cartItems} 
        onRemoveFromCart={removeItem}
        onUpdateQuantity={updateQuantity}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center shadow-elegant">
                <Utensils className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Bienvenue chez <span className="text-gold">Babylone</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-light">
              Découvrez nos délicieux hamburgers, sandwichs et tacos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold-light text-primary font-semibold px-8 py-3"
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Voir le Menu
              </Button>
              <div className="flex items-center space-x-4 text-sm">
                <Badge className="bg-primary/20 text-gold border-gold">
                  <Clock className="w-4 h-4 mr-1" />
                  Ouvert: 11h00 - 23h00
                </Badge>
                <Badge className="bg-primary/20 text-gold border-gold">
                  <Heart className="w-4 h-4 mr-1" />
                  Livraison 20€ min
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-card transition-smooth">
              <CardContent className="p-6">
                <Phone className="w-12 h-12 mx-auto mb-4 text-gold" />
                <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
                <p className="text-muted-foreground">09 83 900 322</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card transition-smooth">
              <CardContent className="p-6">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-gold" />
                <h3 className="text-xl font-semibold mb-2">Adresse</h3>
                <p className="text-muted-foreground">2 Av. de Saint-Julien<br />13012 Marseille</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-card transition-smooth">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 mx-auto mb-4 text-gold" />
                <h3 className="text-xl font-semibold mb-2">Horaires</h3>
                <p className="text-muted-foreground">Ouvert tous les jours<br />11h00 - 23h00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Notre <span className="text-gold">Menu</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection de plats préparés avec des ingrédients frais et de qualité
            </p>
          </div>
          
          {loading && (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-12 h-12 animate-spin text-gold" />
            </div>
          )}

          {error && (
            <div className="text-center py-16 text-red-500">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && menu.map((category) => (
            <MenuCategoryComponent
              key={category.id}
              category={category}
              onAddToCart={handleOpenCustomizeModal}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">Babylone Restaurant</h3>
              <p className="text-gold-light mb-4">
                Votre restaurant de confiance pour des hamburgers, sandwichs et tacos authentiques.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <Star className="w-4 h-4 text-gold fill-current" />
                <span>Livraison rapide et qualité garantie</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gold" />
                  <span>09 83 900 322</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>2 Av. de Saint-Julien, 13012 Marseille</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>11h00 - 23h00</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Livraison</h4>
              <div className="space-y-2 text-sm">
                <p>Commande minimum: 20€</p>
                <p>Horaires de livraison: 18h - 22h</p>
                <p>Zone de livraison: Marseille</p>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">U</span>
                  </div>
                  <span>Partenaire Uber Eats</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Babylone Restaurant. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      {/* Customize Modal */}
      <CustomizeModal
        isOpen={isCustomizeModalOpen}
        onClose={() => setIsCustomizeModalOpen(false)}
        item={selectedItem}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Index;