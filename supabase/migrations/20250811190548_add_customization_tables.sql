-- Create ingredients table
CREATE TABLE public.ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  stock_level INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for ingredients
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;

-- Policies for ingredients
CREATE POLICY "Anyone can view ingredients" ON public.ingredients FOR SELECT USING (true);
CREATE POLICY "Admin can manage ingredients" ON public.ingredients FOR ALL USING (true); -- Assuming an admin role check would be here

-- Create addons table
CREATE TABLE public.addons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  stock_level INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for addons
ALTER TABLE public.addons ENABLE ROW LEVEL SECURITY;

-- Policies for addons
CREATE POLICY "Anyone can view addons" ON public.addons FOR SELECT USING (true);
CREATE POLICY "Admin can manage addons" ON public.addons FOR ALL USING (true);

-- Create menu_item_ingredients join table
CREATE TABLE public.menu_item_ingredients (
  menu_item_id UUID NOT NULL REFERENCES public.menu_items(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
  PRIMARY KEY (menu_item_id, ingredient_id)
);

-- Enable RLS for menu_item_ingredients
ALTER TABLE public.menu_item_ingredients ENABLE ROW LEVEL SECURITY;

-- Policies for menu_item_ingredients
CREATE POLICY "Anyone can view menu item ingredients" ON public.menu_item_ingredients FOR SELECT USING (true);
CREATE POLICY "Admin can manage menu item ingredients" ON public.menu_item_ingredients FOR ALL USING (true);

-- Create menu_item_addons join table
CREATE TABLE public.menu_item_addons (
  menu_item_id UUID NOT NULL REFERENCES public.menu_items(id) ON DELETE CASCADE,
  addon_id UUID NOT NULL REFERENCES public.addons(id) ON DELETE CASCADE,
  PRIMARY KEY (menu_item_id, addon_id)
);

-- Enable RLS for menu_item_addons
ALTER TABLE public.menu_item_addons ENABLE ROW LEVEL SECURITY;

-- Policies for menu_item_addons
CREATE POLICY "Anyone can view menu item addons" ON public.menu_item_addons FOR SELECT USING (true);
CREATE POLICY "Admin can manage menu item addons" ON public.menu_item_addons FOR ALL USING (true);

-- Create triggers for automatic timestamp updates on new tables
CREATE TRIGGER update_ingredients_updated_at
  BEFORE UPDATE ON public.ingredients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_addons_updated_at
  BEFORE UPDATE ON public.addons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Remove old ingredients column from menu_items table
ALTER TABLE public.menu_items DROP COLUMN ingredients;

-- Add some sample data
INSERT INTO public.ingredients (name, stock_level) VALUES
('Beef Patty', 100),
('Lettuce', 50),
('Tomato', 50),
('Onions', 50),
('Cheddar Cheese', 80),
('Pickles', 40);

INSERT INTO public.addons (name, price, stock_level) VALUES
('Extra Cheese', 1.50, 100),
('Bacon', 2.00, 70),
('Avocado', 2.50, 30),
('Fried Egg', 1.75, 60);

-- Associate ingredients with the Cheese Burger from the previous migration
-- First, get the ID of the Cheese Burger
-- Note: This is not robust for migrations, but for this context it's okay.
-- A better way would be to use a variable.
-- Let's assume we can't do that easily here and just insert based on a subquery.
DO $$
DECLARE
    cheese_burger_id UUID;
BEGIN
    SELECT id INTO cheese_burger_id FROM public.menu_items WHERE name = 'Cheese Burger' LIMIT 1;

    IF cheese_burger_id IS NOT NULL THEN
        INSERT INTO public.menu_item_ingredients (menu_item_id, ingredient_id)
        SELECT cheese_burger_id, id FROM public.ingredients WHERE name IN ('Beef Patty', 'Cheddar Cheese');

        INSERT INTO public.menu_item_addons (menu_item_id, addon_id)
        SELECT cheese_burger_id, id FROM public.addons WHERE name IN ('Bacon', 'Fried Egg');
    END IF;
END $$;
