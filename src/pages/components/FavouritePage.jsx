import { ProductCard } from './ProductCard';
import { useFavourite } from '../context/FavouriteContext';
import { Button,buttonVariants } from './ui/button';
export function FavouritePage({ onViewProduct, onBack }) {
  const { favourites } = useFavourite();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Your Favourites ❤️</h2>
        <Button
          onClick={onBack}
          className="text-[#D9C88A]-600 hover:underline"
        >
          Back
        </Button>
      </div>

      {favourites.length === 0 ? (
        <p className="text-gray-500">No favourite products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favourites.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onView={() => onViewProduct(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
