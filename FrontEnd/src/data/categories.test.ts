import { describe, expect, it } from 'vitest';

import { categories, customPrintingCategories, digitalCategories, handmadeCategories, isValidCategorySelection } from './categories';

describe('Handmade taxonomy', () => {
  it('contains the requested top-level Handmade categories exactly once', () => {
    expect(handmadeCategories).toHaveLength(20);
    expect(handmadeCategories.map((category) => category.name)).toEqual([
      'Jewelry & Adornments', 'Divination', 'Witchcraft & Spellcraft', 'Altar & Sacred Goods',
      'Candles & Wax', 'Incense & Aromatics', 'Herbs & Botanicals', 'Oils, Perfume & Blends',
      'Bath & Body', 'Fiber Arts & Textiles', 'Wood & Natural Materials', 'Ceramics & Clay',
      'Resin, Glass & Mixed Media', 'Handmade Art', 'Handmade Books & Journals',
      'Clothing & Wearables', 'Home & Décor', 'Crystals & Gemstone Creations',
      'Handmade Gifts & Sets', 'Custom & Personalized Handmade',
    ]);
  });

  it('keeps Divination top-level and validates its Pendulums subcategory', () => {
    expect(handmadeCategories.find((category) => category.id === 'divination')?.childSubcategories)
      .toContain('Pendulums');
    expect(isValidCategorySelection('purely-handmade', 'divination', 'Pendulums')).toBe(true);
    expect(isValidCategorySelection('purely-handmade', 'divination', 'Spell Jars')).toBe(false);
  });

  it('contains the complete Digital Creations taxonomy', () => {
    expect(digitalCategories).toHaveLength(13);
    expect(digitalCategories.map((category) => category.name)).toEqual([
      'Digital Art', 'Grimoires & Spiritual Journaling', 'Tarot, Oracle & Divination',
      'Witchcraft & Ritual', 'Astrology', 'Patterns & Craft Designs', 'Planners & Organization',
      'E-books, Guides & Education', 'Digital Design Assets', 'Printable Resources',
      'Spiritual & Metaphysical Resources', 'Digital Templates', 'Custom Digital Creations',
    ]);
    expect(digitalCategories.find((category) => category.name === 'Tarot, Oracle & Divination')?.childSubcategories)
      .toContain('Digital Tarot Decks');
    expect(isValidCategorySelection('digital-creations', 'patterns-craft-designs', 'SVG Files')).toBe(true);
    expect(isValidCategorySelection('purely-handmade', 'patterns-craft-designs', 'SVG Files')).toBe(false);
  });

  it('does not change the other departments', () => {
    expect(categories.filter((category) => category.collection === 'purely-handmade')).toHaveLength(20);
    expect(digitalCategories).toHaveLength(13);
  });

  it('contains the complete Custom Printing taxonomy', () => {
    expect(customPrintingCategories).toHaveLength(15);
    expect(customPrintingCategories.map((category) => category.name)).toEqual([
      'Apparel & Wearables', 'Jewelry & Accessories', 'Art Prints & Wall Décor', 'Stickers & Decals',
      'Stationery & Paper Goods', 'Books & Printed Publications', 'Home & Living', 'Bags & Carriers',
      'Phone & Tech Accessories', 'Spiritual & Ritual Printing', 'Artist & Creator Merchandise',
      'Personalized Gifts', 'Invitations & Event Goods', 'Seasonal & Holiday Printing', 'Custom Printing',
    ]);
    expect(customPrintingCategories.find((category) => category.name === 'Spiritual & Ritual Printing')?.childSubcategories)
      .toContain('Printed Tarot Products');
    expect(isValidCategorySelection('custom-printing', 'custom-art-prints-wall-decor', 'Art Prints')).toBe(true);
    expect(isValidCategorySelection('digital-creations', 'custom-art-prints-wall-decor', 'Art Prints')).toBe(false);
  });
});