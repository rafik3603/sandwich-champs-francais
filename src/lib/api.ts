import { supabase } from "@/integrations/supabase/client";

export const getMenuItems = async () => {
  const { data, error } = await supabase
    .from('menu_items')
    .select(`
      *,
      ingredients:menu_item_ingredients(ingredient:ingredients(*)),
      addons:menu_item_addons(addon:addons(*))
    `);

  if (error) {
    console.error("Error fetching menu items:", error);
    throw new Error(error.message);
  }

  // The data from Supabase needs to be transformed a bit to be more useful
  const formattedData = data.map(item => ({
    ...item,
    ingredients: item.ingredients.map((ing: any) => ing.ingredient),
    addons: item.addons.map((ad: any) => ad.addon),
  }));

  // Group by category, similar to the old menuData structure
  const groupedMenu = formattedData.reduce((acc, item) => {
    const category = acc.find(c => c.name === item.category);
    if (category) {
      category.items.push(item);
    } else {
      acc.push({
        id: item.category.toLowerCase().replace(' ', '-'),
        name: item.category,
        items: [item],
      });
    }
    return acc;
  }, [] as { id: string; name: string; items: typeof formattedData }[]);


  return groupedMenu;
};

export const getIngredients = async () => {
    const { data, error } = await supabase.from('ingredients').select('*');
    if (error) {
        console.error("Error fetching ingredients:", error);
        throw new Error(error.message);
    }
    return data;
}

export const getAddons = async () => {
    const { data, error } = await supabase.from('addons').select('*');
    if (error) {
        console.error("Error fetching addons:", error);
        throw new Error(error.message);
    }
    return data;
}
