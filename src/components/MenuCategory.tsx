import { MenuCard } from "./MenuCard";
import { MenuCategory as MenuCategoryType, MenuItem } from "@/data/menuData";

interface MenuCategoryProps {
  category: MenuCategoryType;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuCategory = ({ category, onAddToCart }: MenuCategoryProps) => {
  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">
          {category.name}
        </h2>
        <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};