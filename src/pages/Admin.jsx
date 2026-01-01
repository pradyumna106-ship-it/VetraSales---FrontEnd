import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { admins,customers } from "./data/users";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminProductsPage } from "./components/admin/AdminProductsPage";
import { AddProductPage } from "./components/admin/AddProductPage";
import { UpdateProductPage } from "./components/admin/UpdateProductPage";
import { UserProfile } from "./components/UserProfilePage";
import { CartProvider } from "./context/CardContext";
import { FavouriteProvider } from "./context/FavouriteContext";
import { AdminSearchPage } from "./components/admin/AdminSearchPage";
import { AdminOrdersPage } from "./components/admin/AdminOrdersPage";
import UserManagementPage from "./components/admin/UserManagementPage";
import { getAllProducts } from "./services/productService";
import { deleteProduct } from "./services/productService";
import { categories } from "./data/products";
import { AdminReviewsPage } from "./components/admin/AdminReviewsPage";
import { ProductReviewsPage } from "./components/admin/ProductReviewsPage";
export default function Admin() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [username] = useState(localStorage.getItem('username') || '')
  const [orders, setOrders] = useState([])
useEffect(() => {
  const loadProducts = async () => {
    const data = await getAllProducts();
    console.log("Products received in Customer:", data); // 👈 DEBUG
    setProducts(data);
  };
  loadProducts();
}, []);

  const handleUpdateStatus = (orderId, status) => {
    setCurrentPage("orders");
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, orderStatus: status } : o
      )
    );
  };
  const handleOpenProductReviews = (productId) => {
  setSelectedProduct(productId);
  setCurrentPage("product-reviews");
};

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
  };
  const handleAddProduct = () => {
    setCurrentPage("add-product");
  }
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage("edit-product");
  };
  const handleSearchClick = () => {
    setCurrentPage('search');
  };
  const handleDeleteProduct = (id) => {
    if (confirm("Delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      try {
        const res = deleteProduct(id);
        console.log(res);
      } catch (error) {
        console.error(error)
      }
    }
  };

  return (
    <FavouriteProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" richColors />

          <Header
            role="admin"
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onSearchClick={handleSearchClick}
        />

          <main className="p-6">
  {currentPage === "dashboard" && (
    <AdminDashboard products={products} categories={categories} onViewAll={() => handleNavigate("products")}/>
  )}

  {currentPage === "add-product" && (
    <AddProductPage onBack={() => handleNavigate("dashboard")} username={username}/>
  )}

  {currentPage === "products" && (
  <AdminProductsPage
    products={products}
    onAddProduct={handleAddProduct}
    onEditProduct={handleEditProduct}
    onDeleteProduct={handleDeleteProduct}
    onViewReviews={handleOpenProductReviews}
    onBack={() => setCurrentPage("dashboard")}
  />
)}
  {currentPage === "reviews" && (
    <AdminReviewsPage onBack={ () => {
      setSelectedProduct(null)
      setCurrentPage("products")
    }
    }/>
  )}

  {currentPage === "product-reviews" && selectedProduct && (
  <ProductReviewsPage
    productId={selectedProduct}
    onBack={() => {
      setSelectedProduct(null);
      setCurrentPage("products");
    }}
  />
)}


  {currentPage === "orders" && (
    <AdminOrdersPage
    onUpdateStatus={handleUpdateStatus}
  />

  )}

  {currentPage === "users" && (
      <UserManagementPage/>
  )}
    {currentPage === "edit-product" && selectedProduct && (
  <UpdateProductPage
    product={selectedProduct}
    onEditProduct={handleEditProduct}
    onUpdate={(updatedProduct) => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      );
      setSelectedProduct(null);
      setCurrentPage("products"); // go back to products page
    }}
    onBack={() => {
      setSelectedProduct(null);
      setCurrentPage("products");
    }}
    username={username}
        />
      )}
    {currentPage === 'search' && (
      <AdminSearchPage
        products={products}
        customers={customers}
        admins={admins}
        onBack={() => handleNavigate("dashboard")}
      />
    )}
    {currentPage === 'user-profile' && (
    <UserProfile username={username} onBack={() => handleNavigate('dashboard')} />
  )}
        </main>
        </div>
      </CartProvider>
    </FavouriteProvider>
  );
}
