import { CircleCheck, Package, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CardContext';
import { Button } from './ui/button';
export function OrderConfirmationPage({ onNavigate }) {
  const { cart, clearCart, getCartTotal } = useCart();
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  const handleContinueShopping = () => {
    clearCart();
    onNavigate('products');
  };

  const handleGoHome = () => {
    clearCart();
    onNavigate('home');
  };

  return (
    <div className="mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CircleCheck className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6 pb-6 border-b">
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-xl">#{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
              <p className="text-xl">
                {estimatedDelivery.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h2 className="text-xl mb-4">Order Items</h2>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="mb-1">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-purple-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t pt-6 space-y-2">
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
            <div className="flex justify-between text-xl pt-2 border-t">
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
        </div>

        {/* Next Steps */}
        <div className="bg-purple-50 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Package className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg mb-2">What's Next?</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• You'll receive an email confirmation shortly</li>
                <li>• We'll send you tracking information once your order ships</li>
                <li>• Expected delivery in 5-7 business days</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleGoHome}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Button>
          <Button
            onClick={handleContinueShopping}
            className="flex-1 bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
