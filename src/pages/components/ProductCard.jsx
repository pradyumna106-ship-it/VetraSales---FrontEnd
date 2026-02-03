import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CardContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { getRating } from '../services/reviewService';
import { useEffect, useState } from 'react';
export function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    loadRating(product.id);
  }, [])
  const loadRating = async (productId) => {
    try {
      const res = await getRating(productId);
      setRating(res || 0);
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      onClick={() => onViewDetails?.(product)}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${index < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
                }`}
            />
          ))}
          <span className="text-sm ml-1">({rating})</span>
        </div>


        <div className="flex items-center justify-between">
          <span className="text-2xl text-[#D9C88A]">${product.price}</span>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-[#D9C88A] text-white p-2 rounded-lg hover: bg-[#beb078] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
