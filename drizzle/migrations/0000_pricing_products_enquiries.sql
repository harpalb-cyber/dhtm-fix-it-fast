CREATE TABLE public.device_repairs (
  id text PRIMARY KEY,
  device_id text NOT NULL,
  brand text NOT NULL,
  family text NOT NULL,
  device_type text NOT NULL DEFAULT '',
  model text NOT NULL,
  repair_id text NOT NULL,
  repair_name text NOT NULL,
  price_pence integer CHECK (price_pence IS NULL OR price_pence >= 0),
  duration_minutes integer CHECK (duration_minutes IS NULL OR duration_minutes >= 0),
  available boolean NOT NULL DEFAULT true,
  notes text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX device_repairs_device_idx ON public.device_repairs(device_id);
GRANT SELECT ON public.device_repairs TO anon, authenticated;
GRANT ALL ON public.device_repairs TO service_role;
ALTER TABLE public.device_repairs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Repair prices are public" ON public.device_repairs FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.products (
  sku text PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'accessories',
  brand text NOT NULL DEFAULT '',
  condition text NOT NULL DEFAULT 'new',
  storage text NOT NULL DEFAULT '',
  colour text NOT NULL DEFAULT '',
  price_pence integer NOT NULL CHECK (price_pence >= 0),
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active products are public" ON public.products FOR SELECT TO anon, authenticated USING (active);

CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('contact','repair','sell','shop','postal','tracking')),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text NOT NULL DEFAULT '' CHECK (char_length(phone) <= 30),
  device text NOT NULL DEFAULT '' CHECK (char_length(device) <= 200),
  device_condition text NOT NULL DEFAULT '' CHECK (char_length(device_condition) <= 50),
  context text NOT NULL DEFAULT '' CHECK (char_length(context) <= 500),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);