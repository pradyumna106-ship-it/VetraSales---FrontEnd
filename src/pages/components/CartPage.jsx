import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CardContext'; 
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
export function CartPage({ onNavigate, onCheckout }) {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Add some products to get started!
          </p>
          <Button
            onClick={() => onNavigate('products')}
            className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-4xl mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm p-4 flex gap-4"
            >
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg mb-1 truncate">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <span className="text-xl text-purple-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  ${item.price} each
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-2xl mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">
                  {getCartTotal() >= 50 ? 'Free' : '$5.99'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl">
                <span>Total</span>
                <span className="text-purple-600">
                  $
                  {(
                    getCartTotal() +
                    (getCartTotal() >= 50 ? 0 : 5.99) +
                    getCartTotal() * 0.08
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            {getCartTotal() < 50 && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4 text-sm text-purple-700">
                Add ${(50 - getCartTotal()).toFixed(2)} more for free shipping!
              </div>
            )}

            <Button
              onClick={onCheckout}
              className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition-colors mb-3"
            >
              Proceed to Checkout
            </Button>

            <Button
              onClick={() => onNavigate('products')}
              className="w-full border border-gray-300 py-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
