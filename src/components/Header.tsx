import { ShoppingCart, Phone, MapPin, Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NotificationSystem from "./NotificationSystem";
import { useState } from "react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'success' as const,
      title: 'Commande confirmée',
      message: 'Votre commande ORD-001 a été confirmée et sera livrée dans 45 minutes.',
      timestamp: new Date().toISOString(),
      read: false,
      actionRequired: false
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'Nouvelle promotion',
      message: 'Profitez de 20% de réduction sur tous les hamburgers ce week-end !',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      actionRequired: false
    }
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

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

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <NotificationSystem
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onRemoveNotification={handleRemoveNotification}
            />

            {/* Admin Access */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/admin'}
              className="hidden md:flex text-gold hover:text-gold-light"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>

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
      </div>
    </header>
  );
};