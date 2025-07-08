export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isPopular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "hamburgers",
    name: "Nos Hamburgers",
    items: [
      {
        id: "cheese",
        name: "CHEESE",
        description: "Steak, cheddar",
        price: 8.00,
        category: "hamburgers",
        image: "/src/assets/cheese-burger.jpg",
        isPopular: true
      },
      {
        id: "fish",
        name: "FISH",
        description: "Fish, cheddar, sauce fish",
        price: 8.00,
        category: "hamburgers",
        image: "/src/assets/fish-burger.jpg"
      },
      {
        id: "burger-cheval",
        name: "BURGER CHEVAL",
        description: "Steak, œuf, cheddar",
        price: 9.00,
        category: "hamburgers",
        image: "/src/assets/burger-cheval.jpg"
      },
      {
        id: "chicken-burger",
        name: "CHICKEN BURGER",
        description: "Chicken, cheddar",
        price: 8.50,
        category: "hamburgers",
        image: "/src/assets/chicken-burger.jpg"
      },
      {
        id: "mexicain",
        name: "MEXICAIN",
        description: "Salade, tomate, oignons, chicken, bacon, toastinette",
        price: 10.00,
        category: "hamburgers",
        isPopular: true
      },
      {
        id: "chicago",
        name: "CHICAGO",
        description: "Steak, salade, tomate, cornichon, bacon, œuf, galette pdt",
        price: 11.50,
        category: "hamburgers"
      },
      {
        id: "new-jersey",
        name: "NEW JERSEY",
        description: "Steak, salade, tomate, cornichon, bacon, œuf, sauce burger",
        price: 11.50,
        category: "hamburgers"
      },
      {
        id: "chevre-miel",
        name: "CHÈVRE MIEL",
        description: "Steak, salade, sauce barbecue, chèvre, miel",
        price: 10.50,
        category: "hamburgers"
      },
      {
        id: "double-cheese",
        name: "DOUBLE CHEESE",
        description: "2 steaks, 2 cheddars",
        price: 9.90,
        category: "hamburgers"
      },
      {
        id: "triple-cheese",
        name: "TRIPLE CHEESE",
        description: "3 steaks, 3 cheddars",
        price: 11.50,
        category: "hamburgers"
      }
    ]
  },
  {
    id: "sandwiches",
    name: "Nos Sandwichs",
    items: [
      {
        id: "doner-kebab",
        name: "DONER KEBAB",
        description: "Pain maison, baguette ou galette",
        price: 7.50,
        category: "sandwiches",
        image: "/src/assets/doner-kebab.jpg"
      },
      {
        id: "steak-hache",
        name: "STEAK HACHÉ",
        description: "",
        price: 6.00,
        category: "sandwiches"
      },
      {
        id: "chicken-kebab",
        name: "CHICKEN KEBAB",
        description: "",
        price: 7.00,
        category: "sandwiches"
      },
      {
        id: "merguez",
        name: "MERGUEZ",
        description: "",
        price: 7.00,
        category: "sandwiches"
      },
      {
        id: "cordon-bleu",
        name: "CORDON BLEU",
        description: "",
        price: 6.00,
        category: "sandwiches"
      },
      {
        id: "tenders-poulet",
        name: "TENDERS POULET",
        description: "",
        price: 7.00,
        category: "sandwiches"
      },
      {
        id: "escalope-curry",
        name: "ESCALOPE CURRY",
        description: "",
        price: 7.00,
        category: "sandwiches"
      },
      {
        id: "escalope-farfrika",
        name: "ESCALOPE FARFRIKA",
        description: "",
        price: 7.00,
        category: "sandwiches"
      },
      {
        id: "babylone-special",
        name: "BABYLONE",
        description: "Steak, œuf, bacon, galette pdt, cheddar",
        price: 10.00,
        category: "sandwiches",
        isPopular: true
      }
    ]
  },
  {
    id: "tacos",
    name: "Nos Tacos",
    items: [
      {
        id: "tacos-classic",
        name: "Classic - 1 viande au choix",
        description: "",
        price: 9.00,
        category: "tacos",
        image: "/src/assets/tacos.jpg"
      },
      {
        id: "tacos-double",
        name: "Double - 2 viandes au choix",
        description: "",
        price: 10.90,
        category: "tacos"
      },
      {
        id: "tacos-gourmand",
        name: "Gourmand - 3 viandes au choix",
        description: "",
        price: 12.90,
        category: "tacos"
      }
    ]
  },
  {
    id: "paninis",
    name: "Panini",
    items: [
      {
        id: "panini-4-fromages",
        name: "4 FROMAGES",
        description: "Mozza, chèvre, emmental, cheddar",
        price: 6.00,
        category: "paninis",
        image: "/src/assets/panini.jpg"
      },
      {
        id: "panini-poulet",
        name: "POULET",
        description: "Tomate, poulet, poivrons, fromage",
        price: 6.00,
        category: "paninis"
      },
      {
        id: "panini-provencal",
        name: "PROVENÇAL",
        description: "Tomate, mozza, basilic",
        price: 6.00,
        category: "paninis"
      },
      {
        id: "panini-viande-hachee",
        name: "VIANDE HACHÉE",
        description: "Viande hachée, fromage",
        price: 6.00,
        category: "paninis"
      },
      {
        id: "panini-au-choix",
        name: "Panini au choix",
        description: "Frites Boisson",
        price: 8.00,
        category: "paninis"
      }
    ]
  },
  {
    id: "boissons",
    name: "Nos Boissons",
    items: [
      {
        id: "eau-50cl",
        name: "EAU 50cl",
        description: "",
        price: 1.00,
        category: "boissons"
      },
      {
        id: "eau-1-5l",
        name: "EAU 1.5L",
        description: "",
        price: 2.00,
        category: "boissons"
      },
      {
        id: "canette-33cl",
        name: "CANETTE 33cl",
        description: "",
        price: 2.00,
        category: "boissons"
      },
      {
        id: "redbull-monster",
        name: "REDBULL OU MONSTER",
        description: "",
        price: 3.00,
        category: "boissons"
      },
      {
        id: "bouteille-1-5l",
        name: "BOUTEILLE 1.5L",
        description: "",
        price: 3.50,
        category: "boissons"
      },
      {
        id: "coca",
        name: "Coca",
        description: "",
        price: 3.50,
        category: "boissons"
      }
    ]
  },
  {
    id: "desserts",
    name: "Nos Desserts",
    items: [
      {
        id: "tiramisu",
        name: "TIRAMISU",
        description: "",
        price: 4.00,
        category: "desserts"
      },
      {
        id: "tarte-au-daim",
        name: "TARTE AU DAIM",
        description: "",
        price: 4.00,
        category: "desserts"
      }
    ]
  },
  {
    id: "sides",
    name: "Frites & Tex Mex",
    items: [
      {
        id: "frites",
        name: "Frites",
        description: "",
        price: 3.00,
        category: "sides"
      },
      {
        id: "frites-cheddar",
        name: "Frites Cheddar",
        description: "",
        price: 4.00,
        category: "sides",
        image: "/src/assets/frites-cheddar.jpg"
      },
      {
        id: "frites-cheddar-bacon",
        name: "Frites Cheddar Bacon",
        description: "",
        price: 5.00,
        category: "sides"
      },
      {
        id: "jalapenos",
        name: "Jalapeños (x5)",
        description: "",
        price: 4.50,
        category: "sides"
      },
      {
        id: "mozza-sticks",
        name: "Mozza Sticks (x4)",
        description: "",
        price: 5.00,
        category: "sides"
      },
      {
        id: "chicken-wings",
        name: "Chicken Wings (x6)",
        description: "",
        price: 6.00,
        category: "sides"
      }
    ]
  }
];

export const supplements = [
  { id: "cheddar", name: "Cheddar", price: 1.00 },
  { id: "emmental", name: "Emmental", price: 1.00 },
  { id: "boursin", name: "Boursin", price: 1.00 },
  { id: "mozzarella", name: "Mozzarella", price: 1.00 },
  { id: "vache-qui-rit", name: "Vache qui rit", price: 1.00 },
  { id: "chevre", name: "Chèvre", price: 1.00 }
];

export const sauces = [
  "Algérienne", "Samouraï", "Chili thai", "Harissa", "Mayonnaise", "Ketchup", 
  "Barbecue", "Blanche", "Biggy Brazil", "Fish", "Poivre"
];