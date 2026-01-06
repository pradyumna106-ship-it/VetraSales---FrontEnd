import { useState,useRef,useEffect } from 'react';
import { CartProvider } from './context/CardContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { OrderConfirmationPage } from './components/OrderConfirmation';
import { Toaster } from 'sonner';
import { SearchPage } from './components/SearchPage';
import { FavouriteProvider } from './context/FavouriteContext';
import { FavouritePage } from './components/FavouritePage';
import { UserProfile } from './components/UserProfilePage';
import { getAllProducts } from './services/productService';
import { categories } from './data/products';
import ProductReviews from './components/ProductReviews';

export default function Customer() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [username] = useState(localStorage.getItem('username') || '')
useEffect(() => {
  const loadProducts = async () => {
    const data = await getAllProducts();
    console.log("Products received in Customer:", data); // 👈 DEBUG
    setProducts(data);
  };
  loadProducts();
}, []);


  console.log('products List',products)
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

  const handleViewReviews = (product) => {
  setSelectedProduct(product);
  setCurrentPage('reviews');
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
        <Header  onCartClick={handleCartClick}  onNavigate={handleNavigate}  currentPage={currentPage}  role="customer"  onSearchClick={handleSearchClick}  onScroll={handleScroll}/>

        
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
                onViewReviews={() => handleViewReviews(selectedProduct)}
                username={username}
              />
            )}

              {currentPage === 'cart' && (
                <CartPage
                  onNavigate={handleNavigate}         // ✅ PASS FUNCTION
                  username={username}
                />
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
                username={username}
                onBack={() => handleNavigate('products', selectedCategory)}
                />
              )}
              {currentPage === 'reviews' && selectedProduct && (
                  <ProductReviews
                    productId={selectedProduct.id}
                    onBack={() => setCurrentPage('product-detail')}
                    username={username}
                  />
                )}

      </main>


        
      </div>
    </CartProvider>
    </FavouriteProvider>
  )
};