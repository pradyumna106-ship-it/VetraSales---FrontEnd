import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Input } from './ui/input';
import { Button,buttonVariants } from './ui/button';
export function SearchPage({ products, onViewProduct, onBack }) {
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />

        <Button
          onClick={onBack}
          className="text-[#D9C88A] hover:underline whitespace-nowrap"
        >
          Back
        </Button>
      </div>

      {/* Results */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
