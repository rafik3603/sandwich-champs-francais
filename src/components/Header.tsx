import { useState } from 'react';
import { ShoppingCart, Bell, User, Menu, X, LogOut, Phone, MapPin, Clock, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { CartModal } from './CartModal';
import { MenuItem } from '@/data/menuData';
import NotificationSystem from './NotificationSystem';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface CartItem extends MenuItem {
  quantity: number;
}

interface HeaderProps {
  cartItems: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const Header = ({ cartItems, onRemoveFromCart, onUpdateQuantity }: HeaderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Mock notifications data
  const mockNotifications = [
    {
      id: '1',
      type: 'success' as const,
      title: 'طلبك جاهز!',
      message: 'تم تحضير طلبك #1234 وهو جاهز للاستلام',
      timestamp: new Date().toISOString(),
      read: false,
      actionRequired: true
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'عرض خاص',
      message: 'خصم 20% على جميع البرجر اليوم فقط!',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      actionRequired: false
    },
    {
      id: '3',
      type: 'success' as const,
      title: 'تم التوصيل',
      message: 'تم توصيل طلبك #1233 بنجاح',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
      actionRequired: false
    }
  ];

  const handleMarkAsRead = (notificationId: string) => {
    console.log('Mark as read:', notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read');
  };

  const handleRemoveNotification = (notificationId: string) => {
    console.log('Remove notification:', notificationId);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "نراك قريباً!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  return (
    <>
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
                <h1 className="text-2xl font-display font-bold">مطعم بابيلون</h1>
                <p className="text-sm text-gold">Restaurant Babylone</p>
              </div>
            </div>

            {/* Contact Info - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gold" />
                <span>11:00 - 23:00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gold" />
                <span>09 83 900 322</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gold" />
                <span>الجزائر</span>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-3">
                {/* Notifications */}
                <NotificationSystem
                  notifications={mockNotifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onRemoveNotification={handleRemoveNotification}
                />

                {/* User Menu */}
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={profile?.avatar_url} />
                          <AvatarFallback className="text-xs">
                            {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="flex items-center justify-start gap-2 p-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={profile?.avatar_url} />
                          <AvatarFallback className="text-xs">
                            {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {profile?.full_name || 'مستخدم'}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        الملف الشخصي
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        طلباتي
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        الإعدادات
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        تسجيل الخروج
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/auth">
                    <Button variant="ghost" size="sm">
                      <User className="h-5 w-5 mr-1" />
                      تسجيل الدخول
                    </Button>
                  </Link>
                )}

                {/* Admin Access */}
                <Link to="/admin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gold hover:text-gold-light"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    إدارة
                  </Button>
                </Link>
              </div>

              {/* Cart Button */}
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setIsCartOpen(true)}
                className="relative bg-gold hover:bg-gold-light text-primary font-semibold transition-smooth"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                السلة
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-gold min-w-[20px] h-5 rounded-full text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gold/20 pt-4">
              <div className="flex flex-col space-y-2">
                {/* Contact Info */}
                <div className="flex flex-col space-y-2 text-sm mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gold" />
                    <span>11:00 - 23:00</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gold" />
                    <span>09 83 900 322</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span>الجزائر</span>
                  </div>
                </div>

                {/* Auth Links */}
                {user ? (
                  <>
                    <Button variant="ghost" className="justify-start">
                      الملف الشخصي
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      طلباتي
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      تسجيل الخروج
                    </Button>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button variant="ghost" className="justify-start w-full">
                      <User className="mr-2 h-4 w-4" />
                      تسجيل الدخول
                    </Button>
                  </Link>
                )}

                {/* Admin Link */}
                <Link to="/admin">
                  <Button variant="ghost" className="justify-start w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    إدارة
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={onRemoveFromCart}
        onUpdateQuantity={onUpdateQuantity}
        onCheckout={() => {
          toast({
            title: "جاري معالجة الطلب",
            description: "سيتم توجيهك لصفحة الدفع قريباً",
          });
        }}
      />
    </>
  );
};

export default Header;