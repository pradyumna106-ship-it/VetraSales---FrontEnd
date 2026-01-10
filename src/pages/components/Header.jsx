import { ShoppingCart, Search, Heart, User } from 'lucide-react';
import { useCart } from '../context/CardContext';
import { Button,buttonVariants } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "./services/authenticator";
export function Header({ onCartClick, onNavigate, onSearchClick, currentPage, role, onScroll}) {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const onNav = useNavigate();
  const handleLogout = () => {
    alert("Are you sure You wanted to Log Out.");
    localStorage.clear()
    onNav('/');
  }

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Button
            onClick={() => onNavigate(role === 'admin' ? 'dashboard' : 'home')}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white">🐾</span>
            </div>
            <span className="text-xl">VETRA SALES</span>
          </Button>

          {/* ================= CUSTOMER NAV ================= */}
          {role === 'customer' && (
            <>
              <nav className="hidden md:flex items-center gap-6">
                <Button
                  onClick={() => onNavigate('home')}
                  className={currentPage === 'home' ? 'text-purple-600' : 'hover:text-purple-600'}
                >
                  Home
                </Button>
                <Button  onClick={() => onNavigate('products')}  className={currentPage === 'products' ? 'text-purple-600' : 'hover:text-purple-600'}> Products</Button>
                  <Button onClick={() => onScroll('about')}  className="hover:text-purple-600">
                      About </Button>
                  <Button onClick={() => onScroll('contact')} className="hover:text-purple-600">
                    Contact </Button>
              </nav>

              <div className="flex items-center gap-4">
                <Button onClick={() => onSearchClick()}  className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Search className="w-5 h-5" />
                </Button>

                <Button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => onNavigate('favourites')}>
                  <Heart className="w-5 h-5" />
                </Button>
                <Button
                  onClick={onCartClick}
                  className="relative p-2 hover:bg-gray-100 rounded-full"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
                <Button className="p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={() => onNavigate('user-profile')}>
                  <User className="w-5 h-5" />
                </Button>
                <Button onClick={() => handleLogout()} className="bg-red-600 hover:bg-red-700 text-white"> Logout</Button>
              </div>
            </>
          )}

          {/* ================= ADMIN NAV ================= */}
            {role === 'admin' && (
              <nav className="hidden md:flex items-center gap-6">
                <Button onClick={() => onNavigate("dashboard")} className={currentPage === 'dashboard' ? 'text-purple-600' : 'hover:text-purple-600'}>Dashboard</Button>
                <Button onClick={() => onNavigate("reviews")} className={currentPage === "reviews" ? 'text-purple-600' : 'hover:text-purple-600'}>Customer Reviews</Button>
                <Button onClick={() => onNavigate("orders")} className={currentPage === "orders" ? 'text-purple-600' : 'hover:text-purple-600'}>Orders</Button>
                <Button onClick={() => onNavigate("users")} className={currentPage === "users" ? 'text-purple-600' : 'hover:text-purple-600'}>User Management</Button>
                <Button onClick={() => onSearchClick()}  className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Search className="w-5 h-5" />
                </Button>
                <Button onClick={() => onNavigate('my-profile')} className={currentPage === "my-profile" ? 'text-purple-600' : 'p-2 hover:bg-gray-100 rounded-full transition-colors'}>
                  <User className="w-5 h-5" />
                </Button>
                <Button onClick={() => handleLogout()} className="bg-red-600 hover:bg-red-700 text-white"> Logout</Button>
              </nav>
          )}

        </div>
      </div>
    </header>
  );
}
