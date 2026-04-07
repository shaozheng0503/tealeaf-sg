export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  weight: string;
  category: string;
  tags: string[];
  image: string;
  badge?: string;
  origin: string;
  brewTemp: string;
  brewTime: string;
  caffeine: 'None' | 'Low' | 'Medium' | 'High';
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 'ceremonial-matcha',
    name: 'Ceremonial Matcha',
    subtitle: 'First Harvest · Uji, Japan',
    description: 'Vibrant electric green. Umami-rich. The real deal.',
    longDescription: 'Stone-ground from the youngest tea leaves of the first spring harvest in Uji, Kyoto. This ceremonial grade matcha delivers an intensely vibrant green colour and a smooth, umami-rich flavour with zero bitterness. Perfect for traditional preparation or your morning matcha latte.',
    price: 38,
    weight: '30g',
    category: 'Matcha',
    tags: ['Bestseller', 'Japan', 'Ceremonial'],
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663454933582/UT4XBBxqMPEmepzbGVazUf/product-matcha-439b9u9DE3jVAsDcWrjFqd.webp',
    badge: 'BESTSELLER',
    origin: 'Uji, Kyoto, Japan',
    brewTemp: '70°C',
    brewTime: '30 sec whisk',
    caffeine: 'High',
    inStock: true,
  },
  {
    id: 'dong-ding-oolong',
    name: 'Dong Ding Oolong',
    subtitle: 'Medium Roast · Nantou, Taiwan',
    description: 'Caramel warmth. Orchid finish. Endlessly complex.',
    longDescription: 'Sourced from the misty mountains of Nantou County, this traditional medium-roasted oolong offers layers of toasted caramel, ripe stone fruit, and a lingering orchid floral finish. The tightly rolled leaves unfurl beautifully through multiple steepings.',
    price: 32,
    weight: '50g',
    category: 'Oolong',
    tags: ['Taiwan', 'Roasted', 'Multi-steep'],
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663454933582/UT4XBBxqMPEmepzbGVazUf/product-oolong-M2tZieUkPS3bWTtuReEZWM.webp',
    badge: 'NEW',
    origin: 'Nantou County, Taiwan',
    brewTemp: '90°C',
    brewTime: '45 sec',
    caffeine: 'Medium',
    inStock: true,
  },
  {
    id: 'silver-needle-white',
    name: 'Silver Needle White',
    subtitle: 'Single Origin · Fujian, China',
    description: 'Delicate. Honeydew sweet. Barely-there caffeine.',
    longDescription: 'Harvested only two days a year in early spring, these pristine silver-tipped buds from Fuding, Fujian are air-dried to preserve their natural sweetness. Expect a pale golden liquor with notes of fresh melon, white peach, and a clean, lingering sweetness.',
    price: 45,
    originalPrice: 52,
    weight: '25g',
    category: 'White Tea',
    tags: ['China', 'Low Caffeine', 'Rare'],
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663454933582/UT4XBBxqMPEmepzbGVazUf/product-white-tea-YJCdchk2rVWPhsUtQzYcXA.webp',
    badge: 'LIMITED',
    origin: 'Fuding, Fujian, China',
    brewTemp: '75°C',
    brewTime: '2 min',
    caffeine: 'Low',
    inStock: true,
  },
  {
    id: 'dragon-well-green',
    name: "Dragon Well Green",
    subtitle: 'Pre-Qingming · Hangzhou, China',
    description: 'Nutty. Vegetal. The classic Chinese green.',
    longDescription: 'Longjing (Dragon Well) is China\'s most celebrated green tea, hand-pressed in a wok to create its signature flat shape. This pre-Qingming harvest from West Lake, Hangzhou offers a clean, nutty sweetness with fresh vegetal notes and a smooth, lingering finish.',
    price: 28,
    weight: '50g',
    category: 'Green Tea',
    tags: ['China', 'Classic', 'Spring Harvest'],
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80',
    origin: 'West Lake, Hangzhou, China',
    brewTemp: '80°C',
    brewTime: '1.5 min',
    caffeine: 'Medium',
    inStock: true,
  },
  {
    id: 'darjeeling-first-flush',
    name: 'Darjeeling First Flush',
    subtitle: 'Spring Harvest · West Bengal, India',
    description: 'Muscatel grape. Bright astringency. Champagne of teas.',
    longDescription: 'The first flush Darjeeling from Makaibari Estate is often called the "Champagne of Teas." Harvested in March-April, these light, golden-tipped leaves produce a bright, floral cup with the signature muscatel grape character and a refreshing, brisk finish.',
    price: 35,
    weight: '50g',
    category: 'Black Tea',
    tags: ['India', 'First Flush', 'Muscatel'],
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80',
    origin: 'Makaibari Estate, Darjeeling, India',
    brewTemp: '90°C',
    brewTime: '3 min',
    caffeine: 'High',
    inStock: true,
  },
  {
    id: 'jasmine-pearl',
    name: 'Jasmine Pearl',
    subtitle: 'Hand-rolled · Fujian, China',
    description: 'Fragrant. Floral. Unfurls like a dream.',
    longDescription: 'Each tiny pearl is hand-rolled from two leaves and a bud, then scented multiple times with fresh jasmine blossoms during the night when they bloom. Watch them slowly unfurl in your cup, releasing wave after wave of intoxicating floral fragrance.',
    price: 26,
    weight: '50g',
    category: 'Green Tea',
    tags: ['China', 'Scented', 'Hand-rolled'],
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80',
    origin: 'Fujian, China',
    brewTemp: '80°C',
    brewTime: '2 min',
    caffeine: 'Low',
    inStock: true,
  },
];

export const categories = ['All', 'Matcha', 'Oolong', 'White Tea', 'Green Tea', 'Black Tea'];
