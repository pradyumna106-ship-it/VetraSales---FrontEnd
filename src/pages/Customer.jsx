import { useState,useRef } from 'react';
import { CartProvider } from './context/CardContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmation';
import { Toaster } from 'sonner';
import { products,categories } from './data/products';
import { SearchPage } from './components/SearchPage';
import { FavouriteProvider } from './context/FavouriteContext';
import { FavouritePage } from './components/FavouritePage';
import { UserProfile } from './components/UserProfilePage';

export default function Customer({onLogout}) {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const handleScroll = (section) => {
  if (currentPage !== 'home') {
    setCurrentPage('home');
    setTimeout(() => {
      section === 'about'
        ? aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
        : contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  } else {
    section === 'about'
      ? aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
      : contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
};

  const handleNavigate = (page, category) => {
  if (!page) return; // ⛔ prevent undefined navigation

  setCurrentPage(page);
  setSelectedCategory(category ?? undefined);
  setSelectedProduct(null);
};
  const handleSearchClick = () => {
  setCurrentPage('search');
};

  const handleFavouriteClick = () => {
  setCurrentPage('favourites');
};

  const handleCartClick = () => {
    setCurrentPage('cart');
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleBackToProducts = () => {
    setCurrentPage('products');
    setSelectedProduct(null);
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleOrderComplete = () => {
    setCurrentPage('order-confirmation');
  };

  const handleUserProfile = () => {
    setCurrentPage('user-profile');
  };


  console.log('Current Page:', currentPage);
  return (
    <FavouriteProvider>
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" richColors />
        <Header  onCartClick={handleCartClick}  onNavigate={handleNavigate}  currentPage={currentPage}  role="customer"  onSearchClick={handleSearchClick}  onScroll={handleScroll} onLogout={onLogout}/>

        
        <main>
  {currentPage === 'home' && (
    <HomePage onNavigate={() => handleNavigate('products', 'all')} aboutRef={aboutRef}
  contactRef={contactRef}/>
  )}

  {currentPage === 'products' && (
  <ProductsPage
    products={products}
    categories={categories}
    initialCategory={selectedCategory}
    onViewProduct={handleViewProduct}
  />
)}


  {currentPage === 'product-detail' && selectedProduct && (
  <ProductDetailPage
    product={selectedProduct}
    onBack={handleBackToProducts}
  />
)}

  {currentPage === 'cart' && (
    <CartPage
      onNavigate={handleNavigate}         // ✅ PASS FUNCTION
      onCheckout={handleCheckout}
    />
  )}

  {currentPage === 'checkout' && (
    <CheckoutPage onOrderComplete={handleOrderComplete} />
  )}

  {currentPage === 'order-confirmation' && (
    <OrderConfirmationPage onNavigate={handleNavigate} />
  )}

  {currentPage === 'search' && (
  <SearchPage
    products={products}
    onViewProduct={handleViewProduct}
    onBack={() => handleNavigate('products', selectedCategory)}
  />
)}
  {currentPage === 'favourites' && (
    <FavouritePage
    onViewProduct={handleViewProduct}
    onBack={() => handleNavigate('products', selectedCategory)}
    />
  )}
  {currentPage === 'user-profile' && (
    <UserProfile
    username={"pradyumna"}
    onBack={() => handleNavigate('products', selectedCategory)}
    />
  )}
  </main>


        
      </div>
    </CartProvider>
    </FavouriteProvider>
  )
};