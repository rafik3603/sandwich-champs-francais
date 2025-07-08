import { useState } from "react";
import { Plus, Edit, Trash2, Settings, Users, ShoppingCart, Bell, BarChart3, Package, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { menuData, MenuItem, MenuCategory } from "@/data/menuData";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  deliveryAddress: string;
  orderDate: string;
  estimatedDelivery: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Ahmed Benali",
    customerPhone: "06 12 34 56 78",
    customerEmail: "ahmed.benali@email.com",
    items: [
      { id: "cheese", name: "CHEESE", quantity: 2, price: 8.00 },
      { id: "frites", name: "Frites", quantity: 1, price: 3.00 }
    ],
    total: 19.00,
    status: 'confirmed',
    deliveryAddress: "15 Avenue de la République, 13001 Marseille",
    orderDate: "2024-01-15 14:30",
    estimatedDelivery: "2024-01-15 15:15"
  },
  {
    id: "ORD-002",
    customerName: "Fatima Zahra",
    customerPhone: "06 98 76 54 32",
    customerEmail: "fatima.zahra@email.com",
    items: [
      { id: "doner-kebab", name: "DONER KEBAB", quantity: 1, price: 7.50 },
      { id: "canette-33cl", name: "CANETTE 33cl", quantity: 1, price: 2.00 }
    ],
    total: 9.50,
    status: 'preparing',
    deliveryAddress: "8 Rue de la Paix, 13002 Marseille",
    orderDate: "2024-01-15 15:45",
    estimatedDelivery: "2024-01-15 16:30"
  }
];

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    isPopular: false
  });
  const { toast } = useToast();

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'preparing': return 'bg-orange-500';
      case 'ready': return 'bg-green-500';
      case 'delivered': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'preparing': return 'En préparation';
      case 'ready': return 'Prête';
      case 'delivered': return 'Livrée';
      default: return status;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Statut mis à jour",
      description: `Commande ${orderId} mise à jour vers: ${getStatusText(newStatus)}`,
    });
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const item: MenuItem = {
      id: Date.now().toString(),
      name: newItem.name!,
      description: newItem.description || "",
      price: newItem.price!,
      category: newItem.category!,
      isPopular: newItem.isPopular || false
    };

    toast({
      title: "Article ajouté",
      description: `${item.name} a été ajouté au menu`,
    });
    
    setNewItem({
      name: "",
      description: "",
      price: 0,
      category: "",
      isPopular: false
    });
    setIsAddingItem(false);
  };

  const sendNotification = (orderId: string, message: string) => {
    toast({
      title: "Notification envoyée",
      description: `Notification envoyée au client pour la commande ${orderId}`,
    });
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    revenue: orders.reduce((sum, order) => sum + order.total, 0),
    averageOrderValue: orders.length > 0 ? (orders.reduce((sum, order) => sum + order.total, 0) / orders.length) : 0
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="bg-gradient-primary text-primary-foreground p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Administration Babylone</h1>
            </div>
            <Button variant="secondary" onClick={() => window.location.href = '/'}>
              <Eye className="w-4 h-4 mr-2" />
              Voir le site
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">
              <BarChart3 className="w-4 h-4 mr-2" />
              Tableau de bord
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Commandes
            </TabsTrigger>
            <TabsTrigger value="menu">
              <Package className="w-4 h-4 mr-2" />
              Menu
            </TabsTrigger>
            <TabsTrigger value="customers">
              <Users className="w-4 h-4 mr-2" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Commandes totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">En attente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                  <p className="text-xs text-muted-foreground">Nécessitent une action</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.revenue.toFixed(2)}€</div>
                  <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.averageOrderValue.toFixed(2)}€</div>
                  <p className="text-xs text-muted-foreground">Par commande</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Commandes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          {getStatusText(order.status)}
                        </Badge>
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{order.total.toFixed(2)}€</p>
                        <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {getStatusText(order.status)}
                          </Badge>
                          <div>
                            <h3 className="font-bold">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{order.total.toFixed(2)}€</p>
                          <p className="text-sm text-muted-foreground">Livraison: {order.estimatedDelivery}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold mb-2">Client</h4>
                          <p>{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Adresse de livraison</h4>
                          <p className="text-sm">{order.deliveryAddress}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Articles commandés</h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                              <span>{item.name} × {item.quantity}</span>
                              <span className="font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}>
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">En attente</SelectItem>
                            <SelectItem value="confirmed">Confirmée</SelectItem>
                            <SelectItem value="preparing">En préparation</SelectItem>
                            <SelectItem value="ready">Prête</SelectItem>
                            <SelectItem value="delivered">Livrée</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => sendNotification(order.id, `Votre commande ${order.id} est ${getStatusText(order.status)}`)}
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Notifier
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Gestion du menu
                  <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un article
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter un nouvel article</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nom</Label>
                          <Input
                            id="name"
                            value={newItem.name || ""}
                            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                            placeholder="Nom de l'article"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newItem.description || ""}
                            onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                            placeholder="Description de l'article"
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Prix (€)</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={newItem.price || 0}
                            onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value)})}
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Catégorie</Label>
                          <Select value={newItem.category || ""} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hamburgers">Hamburgers</SelectItem>
                              <SelectItem value="sandwiches">Sandwiches</SelectItem>
                              <SelectItem value="tacos">Tacos</SelectItem>
                              <SelectItem value="paninis">Paninis</SelectItem>
                              <SelectItem value="boissons">Boissons</SelectItem>
                              <SelectItem value="desserts">Desserts</SelectItem>
                              <SelectItem value="sides">Accompagnements</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="popular"
                            checked={newItem.isPopular || false}
                            onCheckedChange={(checked) => setNewItem({...newItem, isPopular: checked})}
                          />
                          <Label htmlFor="popular">Article populaire</Label>
                        </div>
                        <Button onClick={handleAddItem} className="w-full">
                          Ajouter l'article
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {menuData.map((category) => (
                    <div key={category.id}>
                      <h3 className="text-lg font-semibold mb-3">{category.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.items.map((item) => (
                          <Card key={item.id} className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-gold">{item.price.toFixed(2)}€</span>
                              {item.isPopular && (
                                <Badge className="bg-gold text-primary text-xs">Populaire</Badge>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from(new Set(orders.map(order => order.customerEmail))).map((email) => {
                    const customerOrders = orders.filter(order => order.customerEmail === email);
                    const customer = customerOrders[0];
                    const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0);
                    
                    return (
                      <Card key={email} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{customer.customerName}</h4>
                            <p className="text-sm text-muted-foreground">{customer.customerPhone}</p>
                            <p className="text-sm text-muted-foreground">{customer.customerEmail}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{totalSpent.toFixed(2)}€</p>
                            <p className="text-sm text-muted-foreground">{customerOrders.length} commandes</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Système de notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Bell className="w-5 h-5 text-blue-500" />
                        <h4 className="font-medium">SMS</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Notifications par SMS pour les mises à jour de commandes</p>
                      <Switch defaultChecked />
                    </Card>
                    
                    <Card className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Bell className="w-5 h-5 text-green-500" />
                        <h4 className="font-medium">Email</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Confirmations et reçus par email</p>
                      <Switch defaultChecked />
                    </Card>
                    
                    <Card className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Bell className="w-5 h-5 text-purple-500" />
                        <h4 className="font-medium">Push</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Notifications push dans l'application</p>
                      <Switch defaultChecked />
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Envoyer une notification personnalisée</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="notification-type">Type de notification</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner le type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="promo">Promotion</SelectItem>
                              <SelectItem value="info">Information</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Votre message..."
                            rows={3}
                          />
                        </div>
                        <Button>
                          <Bell className="w-4 h-4 mr-2" />
                          Envoyer la notification
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;