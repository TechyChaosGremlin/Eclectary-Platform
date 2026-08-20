import type { ChangeEvent, FormEvent } from 'react';

import '../styles/searchbar.css';

interface SearchbarProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
}

function Searchbar({
  value = '',
  placeholder = 'Search handmade finds, makers, and rituals',
  onChange,
  onSubmit,
  className = '',
}: SearchbarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form
      className={['search-container', className].filter(Boolean).join(' ')}
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search Eclectary"
    >
      <label className="search-bar" htmlFor="eclectary-search">
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>

        <input
          id="eclectary-search"
          type="search"
          value={value}
          onChange={handleChange}
          aria-label="Search products and creators"
          placeholder={placeholder}
        />

        <button type="submit" className="search-button" aria-label="Submit search">
          Search
        </button>
      </label>
    </form>
  );
}

export default Searchbar;
