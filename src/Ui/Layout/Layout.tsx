import type { ReactNode } from 'react';
import { Navbar } from '../Navbar/Navbar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export function Layout({
  children,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategorySelect,
}: LayoutProps) {
  return (
    <div className="layout">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        activeCategory={activeCategory}
        onCategorySelect={onCategorySelect}
      />
      <main className="layout__main">{children}</main>
    </div>
  );
}
