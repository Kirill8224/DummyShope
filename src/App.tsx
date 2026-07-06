import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import type { Category } from './types';
import { Layout } from './Ui/Layout/Layout';
import { EmployeesPage } from './pages/EmployeesPage/EmployeesPage';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import './App.css';

function isCategory(value: string | null): value is Category {
  return value === 'groceries' || value === 'fragrances' || value === 'beauty';
}

function AppRoutes() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const handleCategorySelect = (category: string | null): void => {
    if (category === null) {
      setActiveCategory(null);
    } else if (isCategory(category)) {
      setActiveCategory(category);
    }
    setSearchQuery('');
  }

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
  };

  return (
    <Layout
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      activeCategory={activeCategory}
      onCategorySelect={handleCategorySelect}
    >
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchQuery={searchQuery}
              activeCategory={activeCategory}
            />
          }
        />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
