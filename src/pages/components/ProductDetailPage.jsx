import { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CardContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';
import { useFavourite } from '../context/FavouriteContext';
import { Button, buttonVariants } from './ui/button';
import { getRating } from '../services/reviewService';

export function ProductDetailPage({ product, onBack, onViewReviews }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourite();
  const fav = isFavourite(product.id);
  const [rating, setRating] = useState(0);

  const loadRating = async (productId) => {
    try {
      const res = await getRating(productId);
      setRating(res || 0);
    } catch (error) {
      console.error(error)
    }
  }
  loadRating(product.id)
  const handleAddToCart = () => {
    for (let index = 0; index < quantity; index++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart!`);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Products</span>
      </Button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white px-6 py-3 rounded-full text-xl">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="inline-block bg-[#fcf8e8] text-[#D9C88A] px-3 py-1 rounded-full text-sm mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className={`w-5 h-5 ${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-gray-600">
                {rating > 0 ? `${rating} out of 5` : "No ratings yet"}
              </span>
            </div>
          </div>

          <div className="text-4xl text-[#D9C88A] mb-6">
            ${product.price}
          </div>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <Button
                onClick={decrementQuantity}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl w-12 text-center">{quantity}</span>
              <Button
                onClick={incrementQuantity}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Button
              onClick={() => handleAddToCart()}
              disabled={!product.inStock}
              className="flex-1 bg-[#D9C88A] text-white py-4 rounded-xl hover:bg-[#beb078] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              <ShoppingCart className="w-5 h-5 bg-[#725c00]" />
              <span>Add to Cart</span>
            </Button>
            <Button className="w-14 h-14 border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors" onClick={() => toggleFavourite(product)}>
              <Heart className={`w-6 h-6 transition-colors ${fav ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
            </Button>
            <Button onClick={() => onViewReviews()} variant="outline">
              View Reviews
            </Button>

          </div>
          {/* Features */}
          <div className="border-t pt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <h3 className="mb-1">Premium Quality</h3>
                <p className="text-gray-600 text-sm">
                  Made with the finest ingredients
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <h3 className="mb-1">Fast Shipping</h3>
                <p className="text-gray-600 text-sm">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <h3 className="mb-1">Satisfaction Guarantee</h3>
                <p className="text-gray-600 text-sm">
                  30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
