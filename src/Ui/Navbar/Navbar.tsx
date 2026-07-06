import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../types';
import type { Category } from '../../types';
import { SearchBar } from '../SearchBar/SearchBar';
import './Navbar.css';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

function formatCategoryLabel(category: Category): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function Navbar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategorySelect,
}: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleCategoryClick = (category: Category): void => {
    onCategorySelect(category);
    if (!isHome) {
      navigate('/');
    }
  };

  const handleSearchChange = (value: string): void => {
    onSearchChange(value);
    if (!isHome && value.trim()) {
      navigate('/');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link
          to="/"
          className="navbar__logo"
          onClick={() => onCategorySelect(null)}
        >
          DummyShope
        </Link>

        <nav className="navbar__nav">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />

          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`navbar__btn ${
                isHome && activeCategory === category
                  ? 'navbar__btn--active'
                  : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {formatCategoryLabel(category)}
            </button>
          ))}

          <Link
            to="/employees"
            className={`navbar__link ${
              location.pathname === '/employees' ? 'navbar__btn--active' : ''
            }`}
          >
            Our Employees
          </Link>
        </nav>
      </div>
    </header>
  );
}
