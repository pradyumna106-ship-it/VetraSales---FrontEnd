import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Input } from './ui/input';
import {Label}  from './ui/label';
export function ProductsPage({ initialCategory, onViewProduct,products,categories }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 200]);
      
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]

    );

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [selectedCategory, sortBy, priceRange]);

  return (
  <div className="mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Shop All Products</h1>
        <p className="text-gray-600">
          {filteredAndSortedProducts.length} products found
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink:0">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="w-5 h-5" />
              <h2 className="text-xl">Filters</h2>
            </div>

            {/* Category */}
            <div className="mb-6">
              <h3 className="mb-3">Category</h3>
              <div className="space-y-2">
                <Label className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Input type="radio" value="all" checked={selectedCategory === 'all'}  onChange={e => setSelectedCategory(e.target.value)} className="h-4 w-4"/>
          All Products
        </Label>

        {categories.map((category) => (
  <Label
    key={category.slug}
    className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
  >
    <Input
      type="radio"
      value={category.slug}
      checked={selectedCategory === category.slug}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="h-4 w-4"
    />
    <span className="leading-none">{category.name}</span>
  </Label>
))}

      </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
