import { describe, expect, it } from 'vitest';

import { categories, handmadeCategories, isValidCategorySelection } from './categories';

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

  it('does not change the other departments', () => {
    expect(categories.filter((category) => category.collection === 'digital-creations')).toHaveLength(8);
    expect(categories.filter((category) => category.collection === 'custom-printing')).toHaveLength(6);
  });
});