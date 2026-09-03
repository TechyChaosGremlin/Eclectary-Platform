import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DepartmentSidebar from './DepartmentSidebar';
import { customPrintingCategories, digitalCategories, handmadeCategories } from '../data/categories';

const baseProps = {
  activeCategory: '',
  activeSubcategory: '',
  activeIntention: '',
  activePrice: '',
  priceBuckets: [{ id: 'under-25', label: 'Under $25' }],
  intentions: ['Protection'] as const,
  openSections: { categories: true, intentions: false, price: false },
  onSectionToggle: vi.fn(),
  onCategorySelect: vi.fn(),
  onIntentionSelect: vi.fn(),
  onPriceSelect: vi.fn(),
  onClear: vi.fn(),
};

describe('DepartmentSidebar', () => {
  it.each([
    ['purely-handmade', handmadeCategories, 'Divination', 'Digital Art'],
    ['digital-creations', digitalCategories, 'Tarot, Oracle & Divination', 'Jewelry & Adornments'],
    ['custom-printing', customPrintingCategories, 'Spiritual & Ritual Printing', 'Digital Art'],
  ] as const)('renders only the %s taxonomy', (department, departmentCategories, visibleCategory, hiddenCategory) => {
    render(<DepartmentSidebar {...baseProps} department={department} categories={departmentCategories} />);

    expect(screen.getByText(visibleCategory)).toBeInTheDocument();
    expect(screen.queryByText(hiddenCategory)).not.toBeInTheDocument();
  });

  it('expands a category and marks its active subcategory', () => {
    render(
      <DepartmentSidebar
        {...baseProps}
        department="purely-handmade"
        categories={handmadeCategories}
        activeCategory="divination"
        activeSubcategory="Pendulums"
      />,
    );

    expect(screen.getByText('Pendulums')).toHaveClass('department-sidebar__sublink--active');
    fireEvent.click(screen.getByRole('button', { name: 'Collapse Divination' }));
    expect(screen.queryByText('Pendulums')).not.toBeInTheDocument();
  });
});