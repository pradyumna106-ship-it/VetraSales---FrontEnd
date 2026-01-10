import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
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
import CustomerProfile from "./components/admin/CustomerProfile";
import EmployeeProfile from "./components/admin/EmployeeProfile";
import { updateUser } from "./services/userService"; 
import { getAllCustomer } from "./services/userService";
import { getAllAdmin } from "./services/userService";
import { toggleStatus } from "./services/userService";
import { updateOrderStatus } from "./services/orderService";
export default function Admin() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [username] = useState(localStorage.getItem('username') || '')
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [admins,setAdmins] = useState([])
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token){
      loadAdmins();
      loadCustomers();
      loadProducts();
  }
  
}, []);
  const loadProducts = async () => {
    const data = await getAllProducts();
    console.log("Products received in Admin:", data); // 👈 DEBUG
    setProducts(data);
  };
  const loadCustomers = async () => {
    const data = await getAllCustomer();
    console.log("customer data received in Admin:", data); // 👈 DEBUG
    setCustomers(data);
  };
  const loadAdmins = async () => {
    const data = await getAllAdmin();
    console.log("admin data received in Admin:", data); // 👈 DEBUG
    setAdmins(data);
  };
  const handleUpdateStatus = (orderId, status) => {
  setCurrentPage("orders");

  const updateOrders = async (orderId, status) => {
    try {
      const res = await updateOrderStatus(orderId, status);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  updateOrders(orderId, status); // ✅ CALL IT

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
  const handleOpenUserProfile = (user) => {
  setSelectedUser(user);
  setCurrentPage("customer-profile");
};

  const handleViewEmployee = (emp) => {
    setSelectedEmployee(emp);
    setCurrentPage("employee-profile");
  };

  const handleEditEmployee = (updatedEmp) => {
  console.log("Updated employee:", updatedEmp);
  // TODO: call backend API here
  try{ 
    const res = updateUser(updatedEmp);
    console.log(res.then(response => console.log(response.data)))
  } catch (error) {
    console.error(error);
  }
  setSelectedEmployee(updatedEmp);
};


  const handleDisableEmployee = (emp) => {
    if (confirm(`Disable ${emp.username}?`)) {
      // call backend API later
      const id = emp.id;
      const toggle = async() => {
        try {
          const res = await toggleStatus(id)
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      }
      toggle()
      console.log("Disabling employee:", emp.username);
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
                  <UserManagementPage onViewProfile={handleOpenUserProfile}  onViewEmployee={handleViewEmployee}  onEditEmployee={handleEditEmployee}  onDisableEmployee={handleDisableEmployee}/>
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
                {currentPage === 'my-profile' && (
                <UserProfile username={username} onBack={() => handleNavigate('dashboard')} />
              )}
              {currentPage === "customer-profile" && selectedUser && (
                <CustomerProfile
                  user={selectedUser}
                  onBack={() => {
                    setSelectedUser(null);
                    setCurrentPage("users");
                  }}
                />
              )}
              {currentPage === "emp-table" && (
                <EmployeeTable
                  onViewEmployee={handleViewEmployee}
                  onEditEmployee={handleEditEmployee}
                  onDisableEmployee={handleDisableEmployee}
                />
              )}
              {currentPage === "employee-profile" && selectedEmployee && (
                <EmployeeProfile
                  employee={selectedEmployee}
                  onBack={() => {
                    setSelectedEmployee(null);
                    setCurrentPage("users");
                  }}
                  onDisable={handleDisableEmployee}
                  onUpdateEmployee={handleEditEmployee}
                />

              )}

        </main>
        </div>
      </CartProvider>
    </FavouriteProvider>
  );
}
