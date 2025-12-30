import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { products as initialProducts, categories } from "./data/products";
import { admins,customers } from "./data/users";
import { orders } from "./data/orders";
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


export default function Admin({onLogout}) {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
useEffect(() => {
  if (Array.isArray(initialProducts)) {
    setProducts([...initialProducts]);
  }
}, [initialProducts]);

  const handleUpdateStatus = (orderId, status) => {
    setCurrentPage("orders");
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, orderStatus: status } : o
      )
    );
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
            onLogout={onLogout} // ✅ function reference only
        />

          <main className="p-6">
  {currentPage === "dashboard" && (
    <AdminDashboard products={products} categories={categories} onViewAll={() => handleNavigate("products")}/>
  )}

  {currentPage === "add-product" && (
    <AddProductPage onBack={() => handleNavigate("dashboard")} />
  )}

  {currentPage === "products" && (
  <AdminProductsPage
    products={products}
    onAddProduct={handleAddProduct}
    onEditProduct={handleEditProduct}
    onDeleteProduct={handleDeleteProduct}
    onBack={() => setCurrentPage("dashboard")}
  />
)}
  {currentPage === "reviews" && (
    <div className="text-center text-gray-500">
      Customer Reviews Page (Coming Soon)
    </div>
  )}

  {currentPage === "orders" && (
    <AdminOrdersPage
    orders={orders}
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
    <UserProfile username={"pradyumna"} onBack={() => handleNavigate('dashboard')} onLogout={onLogout} />
  )}
        </main>
        </div>
      </CartProvider>
    </FavouriteProvider>
  );
}
