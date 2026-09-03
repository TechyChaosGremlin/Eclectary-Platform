import { useState } from 'react';
import type { Category } from '../types/category';

import '../styles/department-sidebar.css';

export interface DepartmentSidebarProps {
  department: 'purely-handmade' | 'digital-creations' | 'custom-printing';
  categories: Category[];
  activeCategory: string;
  activeSubcategory: string;
  activeIntention: string;
  activePrice: string;
  priceBuckets: Array<{ id: string; label: string }>;
  intentions: readonly string[];
  openSections: { categories: boolean; intentions: boolean; price: boolean };
  onSectionToggle: (section: 'categories' | 'intentions' | 'price', open: boolean) => void;
  onCategorySelect: (categoryId: string, subcategory?: string) => void;
  onIntentionSelect: (intention: string) => void;
  onPriceSelect: (price: string) => void;
  onClear: () => void;
}

const departmentDetails = {
  'purely-handmade': { allLabel: 'All Handmade' },
  'digital-creations': { allLabel: 'All Digital Creations' },
  'custom-printing': { allLabel: 'All Custom Printing' },
} as const;

function DepartmentSidebar({
  department, categories, activeCategory, activeSubcategory, activeIntention, activePrice,
  priceBuckets, intentions, openSections, onSectionToggle, onCategorySelect,
  onIntentionSelect, onPriceSelect, onClear,
}: DepartmentSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(() => (
    activeCategory ? [activeCategory] : []
  ));
  const details = departmentDetails[department];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((current) => current.includes(categoryId)
      ? current.filter((id) => id !== categoryId)
      : [...current, categoryId]);
  };

  return (
    <>
      <details className="department-sidebar__section department-sidebar__section--price" open={openSections.price} onToggle={(event) => onSectionToggle('price', event.currentTarget.open)}>
        <summary className="department-sidebar__heading">Price</summary>
        <ul className="department-sidebar__list">
          <li><button type="button" className={`department-sidebar__link${!activePrice ? ' department-sidebar__link--active' : ''}`} aria-pressed={!activePrice} onClick={() => onPriceSelect('')}>Any price</button></li>
          {priceBuckets.map((bucket) => <li key={bucket.id}><button type="button" className={`department-sidebar__link${activePrice === bucket.id ? ' department-sidebar__link--active' : ''}`} aria-pressed={activePrice === bucket.id} onClick={() => onPriceSelect(bucket.id)}>{bucket.label}</button></li>)}
        </ul>
      </details>

      <details className="department-sidebar__section department-sidebar__section--categories" open={openSections.categories} onToggle={(event) => onSectionToggle('categories', event.currentTarget.open)}>
        <summary className="department-sidebar__heading">Categories</summary>
        <ul className="department-sidebar__list">
          <li><button type="button" className={`department-sidebar__link${!activeCategory ? ' department-sidebar__link--active' : ''}`} aria-pressed={!activeCategory} onClick={() => onCategorySelect('')}>{details.allLabel}</button></li>
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            const isActive = activeCategory === category.id;
            const hasSubcategories = Boolean(category.childSubcategories?.length);

            return (
              <li key={category.id} className="department-sidebar__category">
                <div className={`department-sidebar__category-row${isActive ? ' department-sidebar__category-row--active' : ''}`}>
                  <button type="button" className={`department-sidebar__link${isActive && !activeSubcategory ? ' department-sidebar__link--active' : ''}`} aria-pressed={isActive && !activeSubcategory} onClick={() => onCategorySelect(category.id)}>{category.name}</button>
                  {hasSubcategories && <button type="button" className="department-sidebar__expand" aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.name}`} aria-expanded={isExpanded} onClick={() => toggleCategory(category.id)}><span aria-hidden="true">⌄</span></button>}
                </div>
                {hasSubcategories && isExpanded && (
                  <ul className="department-sidebar__subcategories" aria-label={`${category.name} subcategories`}>
                    {category.childSubcategories?.map((subcategory) => (
                      <li key={subcategory}><button type="button" className={`department-sidebar__sublink${isActive && activeSubcategory === subcategory ? ' department-sidebar__sublink--active' : ''}`} aria-pressed={isActive && activeSubcategory === subcategory} onClick={() => onCategorySelect(category.id, subcategory)}>{subcategory}</button></li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </details>

      <div className="department-sidebar__explore">
        <p className="department-sidebar__label">Explore</p>
        <details className="department-sidebar__section" open={openSections.intentions} onToggle={(event) => onSectionToggle('intentions', event.currentTarget.open)}>
          <summary className="department-sidebar__heading">Shop by Intention</summary>
          <ul className="department-sidebar__list">
            <li><button type="button" className={`department-sidebar__link${!activeIntention ? ' department-sidebar__link--active' : ''}`} aria-pressed={!activeIntention} onClick={() => onIntentionSelect('')}>All intentions</button></li>
            {intentions.map((intention) => <li key={intention}><button type="button" className={`department-sidebar__link${activeIntention === intention ? ' department-sidebar__link--active' : ''}`} aria-pressed={activeIntention === intention} onClick={() => onIntentionSelect(intention)}>{intention}</button></li>)}
          </ul>
        </details>
      </div>

      {(activeIntention || activeCategory || activePrice) && <button type="button" className="department-sidebar__clear" onClick={onClear}>Clear all filters</button>}
    </>
  );
}

export default DepartmentSidebar;