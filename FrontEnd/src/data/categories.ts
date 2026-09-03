import type { Category } from '../types/category';

export const categories: Category[] = [
	{ id: 'jewelry-adornments', collection: 'purely-handmade', name: 'Jewelry & Adornments', childSubcategories: ['Necklaces', 'Bracelets', 'Earrings', 'Rings', 'Pendants', 'Talismans & Amulets', 'Mala Beads', 'Hair Adornments', 'Brooches & Pins', 'Custom Jewelry'], image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d0c7?auto=format&fit=crop&w=900&q=80' },
	{ id: 'divination', collection: 'purely-handmade', name: 'Divination', childSubcategories: ['Handmade Tarot Decks', 'Handmade Oracle Decks', 'Handmade Rune Sets', 'Handmade Ogham Sets', 'Pendulums', 'Pendulum Boards', 'Scrying Tools', 'Scrying Mirrors', 'Divination Boards', 'Spirit Boards', 'Divination Dice & Tools', 'Tarot & Oracle Bags', 'Tarot & Oracle Cloths', 'Divination Accessories', 'Custom Divination Tools'], image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80' },
	{ id: 'witchcraft-spellcraft', collection: 'purely-handmade', name: 'Witchcraft & Spellcraft', childSubcategories: ['Spell Jars', 'Spell Bottles', 'Charm Bags', 'Spell Kits', 'Wands', 'Besoms & Ritual Brooms', 'Sigil Crafts', 'Magical Tools', 'Ritual Kits', 'Other Spellcraft'], image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80' },
	{ id: 'altar-sacred-goods', collection: 'purely-handmade', name: 'Altar & Sacred Goods', childSubcategories: ['Altar Cloths', 'Offering Bowls', 'Offering Trays', 'Candle Holders', 'Incense Holders', 'Altar Tiles', 'Crystal Grids', 'Shrine Décor', 'Sacred Displays', 'Ritual Containers'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80' },
	{ id: 'candles-wax', collection: 'purely-handmade', name: 'Candles & Wax', childSubcategories: ['Ritual Candles', 'Intention Candles', 'Spell Candles', 'Sculpted Candles', 'Carved Candles', 'Container Candles', 'Wax Melts', 'Candle Sets', 'Other Wax Creations'], image: 'https://images.unsplash.com/photo-1602872029706-5f3b8d5d7c4f?auto=format&fit=crop&w=900&q=80' },
	{ id: 'incense-aromatics', collection: 'purely-handmade', name: 'Incense & Aromatics', childSubcategories: ['Handmade Incense', 'Incense Cones', 'Loose Incense', 'Cleansing Blends', 'Ritual Sprays', 'Room Sprays', 'Scent Blends', 'Other Handmade Aromatics'], image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80' },
	{ id: 'herbs-botanicals', collection: 'purely-handmade', name: 'Herbs & Botanicals', childSubcategories: ['Herbal Blends', 'Botanical Blends', 'Herbal Sachets', 'Ritual Salts', 'Botanical Crafts', 'Herb Bundles', 'Herbal Spell Blends', 'Other Botanical Creations'], image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=80' },
	{ id: 'oils-perfume-blends', collection: 'purely-handmade', name: 'Oils, Perfume & Blends', childSubcategories: ['Ritual Oils', 'Intention Oils', 'Anointing Oils', 'Perfume Oils', 'Botanical Perfumes', 'Aromatherapy Blends', 'Other Handmade Blends'], image: 'https://images.unsplash.com/photo-1608571423539-e951a1f2b625?auto=format&fit=crop&w=900&q=80' },
	{ id: 'bath-body', collection: 'purely-handmade', name: 'Bath & Body', childSubcategories: ['Handmade Soap', 'Bath Bombs', 'Bath Salts', 'Body Oils', 'Body Butters', 'Scrubs', 'Herbal Baths', 'Ritual Bath Blends', 'Other Handmade Body Products'], image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80' },
	{ id: 'fiber-arts-textiles', collection: 'purely-handmade', name: 'Fiber Arts & Textiles', childSubcategories: ['Embroidery', 'Cross-Stitch', 'Crochet', 'Knitting', 'Weaving', 'Macramé', 'Sewing', 'Quilting', 'Tarot Bags', 'Rune Bags', 'Altar Cloths', 'Tapestries', 'Textile Wearables', 'Other Fiber Arts'], image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80' },
	{ id: 'wood-natural-materials', collection: 'purely-handmade', name: 'Wood & Natural Materials', childSubcategories: ['Wood Carvings', 'Wooden Wands', 'Carved Runes', 'Ritual Boards', 'Carved Boxes', 'Driftwood Art', 'Bone Crafts', 'Antler Crafts', 'Natural Material Creations', 'Other Wood & Natural Crafts'], image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80' },
	{ id: 'ceramics-clay', collection: 'purely-handmade', name: 'Ceramics & Clay', childSubcategories: ['Altar Bowls', 'Offering Bowls', 'Incense Burners', 'Candle Holders', 'Ritual Vessels', 'Figurines', 'Sculptures', 'Handmade Tiles', 'Clay Jewelry', 'Other Ceramic & Clay Creations'], image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80' },
	{ id: 'resin-glass-mixed-media', collection: 'purely-handmade', name: 'Resin, Glass & Mixed Media', childSubcategories: ['Resin Art', 'Resin Jewelry', 'Glass Art', 'Stained Glass', 'Crystal Resin Creations', 'Encased Botanicals', 'Mixed Media', 'Sculptural Creations', 'Other Mixed Media'], image: 'https://images.unsplash.com/photo-1512618834900-8ceac1f4d5f9?auto=format&fit=crop&w=900&q=80' },
	{ id: 'handmade-art', collection: 'purely-handmade', name: 'Handmade Art', childSubcategories: ['Paintings', 'Drawings', 'Watercolor', 'Illustration', 'Mixed Media Art', 'Folk Art', 'Occult Art', 'Spiritual Art', 'Nature Art', 'Sculpture', 'Other Handmade Art'], image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80' },
	{ id: 'handmade-books-journals', collection: 'purely-handmade', name: 'Handmade Books & Journals', childSubcategories: ['Grimoires', 'Books of Shadows', 'Handbound Books', 'Spell Books', 'Journals', 'Notebooks', 'Sketchbooks', 'Art Journals', 'Other Handmade Books'], image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80' },
	{ id: 'clothing-wearables', collection: 'purely-handmade', name: 'Clothing & Wearables', childSubcategories: ['Handmade Clothing', 'Cloaks & Robes', 'Ritual Wear', 'Embellished Clothing', 'Handmade Hats', 'Shawls', 'Scarves', 'Belts', 'Textile Accessories', 'Other Handmade Wearables'], image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
	{ id: 'home-decor', collection: 'purely-handmade', name: 'Home & Décor', childSubcategories: ['Wall Décor', 'Suncatchers', 'Mobiles', 'Dreamcatchers', 'Decorative Boxes', 'Mirrors', 'Handmade Frames', 'Figurines', 'Seasonal Décor', 'Nature-Inspired Décor', 'Other Handmade Décor'], image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80' },
	{ id: 'crystals-gemstone-creations', collection: 'purely-handmade', name: 'Crystals & Gemstone Creations', childSubcategories: ['Crystal Carvings', 'Crystal Wirework', 'Crystal Grids', 'Crystal Sculptures', 'Crystal Displays', 'Crystal Suncatchers', 'Crystal Wands', 'Gemstone Crafts', 'Crystal & Resin Art', 'Other Gemstone Creations'], image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80' },
	{ id: 'handmade-gifts-sets', collection: 'purely-handmade', name: 'Handmade Gifts & Sets', childSubcategories: ['Ritual Gift Sets', 'Crystal & Jewelry Sets', 'Self-Care Sets', 'Witchy Gift Sets', 'Seasonal Sets', 'Handmade Bundles', 'Gift Boxes', 'Other Handmade Gift Sets'], image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80' },
	{ id: 'custom-personalized-handmade', collection: 'purely-handmade', name: 'Custom & Personalized Handmade', childSubcategories: ['Custom Jewelry', 'Custom Artwork', 'Custom Embroidery', 'Personalized Journals', 'Custom Altar Pieces', 'Custom Ritual Items', 'Custom Woodwork', 'Custom Fiber Art', 'Custom Keepsakes', 'Other Custom Handmade'], image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d0c7?auto=format&fit=crop&w=900&q=80' },
	{
		id: 'digital-art',
		collection: 'digital-creations',
		name: 'Digital Art',
		childSubcategories: ['Digital Prints', 'Illustrations', 'Wallpapers', 'Digital Collages', 'Clip Art', 'AI-Assisted Art'],
		image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'craft-patterns',
		collection: 'digital-creations',
		name: 'Craft Patterns',
		childSubcategories: ['Cross Stitch Patterns', 'Embroidery Patterns', 'Crochet Patterns', 'Knitting Patterns', 'Sewing Patterns', 'Quilting Patterns', 'SVG & Cut Files'],
		image: 'https://images.unsplash.com/photo-1452860606245-08bea0c7f9c7?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'digital-spiritual-witchcraft',
		collection: 'digital-creations',
		name: 'Spiritual & Witchcraft',
		childSubcategories: ['Digital Grimoires', 'Spell Guides', 'Ritual Guides', 'Correspondence Guides', 'Book of Shadows Pages', 'Printable Rituals'],
		image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'digital-tarot-divination',
		collection: 'digital-creations',
		name: 'Tarot & Divination',
		childSubcategories: ['Digital Tarot', 'Oracle Resources', 'Tarot Spreads', 'Divination Guides', 'Journaling Resources'],
		image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'digital-journals-planners',
		collection: 'digital-creations',
		name: 'Journals & Planners',
		childSubcategories: ['Digital Journals', 'Moon Planners', 'Spiritual Planners', 'Shadow Work', 'Manifestation', 'Gratitude', 'Self-Reflection'],
		image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'astrology-mysticism',
		collection: 'digital-creations',
		name: 'Astrology & Mysticism',
		childSubcategories: ['Astrology Guides', 'Birth Chart Resources', 'Moon Guides', 'Numerology', 'Mysticism'],
		image: 'https://images.unsplash.com/photo-1534791547706-6c7e3f8f6845?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'digital-printables',
		collection: 'digital-creations',
		name: 'Printables',
		childSubcategories: ['Coloring Pages', 'Affirmation Cards', 'Altar Printables', 'Stickers', 'Journaling Pages', 'Worksheets'],
		image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'digital-books-learning',
		collection: 'digital-creations',
		name: 'Digital Books & Learning',
		childSubcategories: ['Ebooks', 'Guides', 'Tutorials', 'Courses', 'Workshops'],
		image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'custom-apparel',
		collection: 'custom-printing',
		name: 'Apparel',
		childSubcategories: ['T-Shirts', 'Sweatshirts', 'Hoodies', 'Tank Tops', 'Dresses', 'Leggings', 'Hats', 'Other Apparel'],
		image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'custom-home-living',
		collection: 'custom-printing',
		name: 'Home & Living',
		childSubcategories: ['Mugs', 'Tumblers', 'Pillows', 'Blankets', 'Towels', 'Home Decor'],
		image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'custom-wall-art',
		collection: 'custom-printing',
		name: 'Wall Art',
		childSubcategories: ['Posters', 'Art Prints', 'Canvas', 'Framed Prints', 'Metal Prints', 'Tapestries'],
		image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'custom-accessories',
		collection: 'custom-printing',
		name: 'Accessories',
		childSubcategories: ['Tote Bags', 'Backpacks', 'Phone Cases', 'Pouches', 'Wallets'],
		image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'custom-stationery',
		collection: 'custom-printing',
		name: 'Stationery',
		childSubcategories: ['Notebooks', 'Journals', 'Greeting Cards', 'Stickers', 'Art Cards', 'Calendars'],
		image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'custom-gifts',
		collection: 'custom-printing',
		name: 'Gifts',
		childSubcategories: ['Personalized Gifts', 'Witchy Gifts', 'Spiritual Gifts', 'Seasonal Gifts', 'Gift Sets'],
		image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
	},
];

export const legacyHandmadeCategoryMap: Record<string, string> = {
	'ritual-witchcraft': 'candles-wax', 'crystals-natural-goods': 'herbs-botanicals',
	'jewelry-adornment': 'jewelry-adornments', 'tarot-divination': 'divination',
	'home-altar': 'ceramics-clay', 'bath-body-wellness': 'bath-body',
	'art-fiber': 'fiber-arts-textiles', 'clothing-accessories': 'clothing-wearables',
	'stationery-paper': 'handmade-books-journals', 'gifts-seasonal': 'handmade-gifts-sets',
};

export const handmadeCategories = categories.filter((category) => category.collection === 'purely-handmade');
export const getCategory = (id: string) => categories.find((category) => category.id === id);
export const isValidCategorySelection = (collection: string, categoryId: string, subcategory: string) => {
	const category = getCategory(categoryId);
	return category?.collection === collection && Boolean(category.childSubcategories?.includes(subcategory));
};
