# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# VetraSales - FrontEnd

A modern React + Vite frontend for **VetraSales**, a Dealer Business Management System (BMS).  
This frontend provides clean UI components for authentication, dashboard, customers, products, orders, and integrates seamlessly with the Spring Boot backend.

Docker support is included for fast and portable deployment.

---

## 🚀 Features

- ⚛️ Built using **React + Vite**
- 🧱 Modular Component Structure (JSX)
- 🎨 Responsive & Modern UI
- 🔐 API Integration with Spring Boot Backend
- 🔄 Real-Time State Updates
- 🐳 Dockerized for Deployment
- 📦 Uses npm & ES Modules

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React JS** | Frontend UI |
| **Vite** | Fast bundler & dev server |
| **JavaScript (ES6+)** | Programming language |
| **Axios / Fetch** | API communication |
| **Docker** | Containerization |
| **CSS / Custom Styles** | UI styling |

---

## Roadmap Link:
https://roadmap.sh/projects/scalable-ecommerce-platform
## 📁 Project Structure
<details> <summary><strong>Click to expand folder tree</strong></summary>
<br> <pre>
D:\SALES-SAVVY\SALES-SAVVY-FE\SRC
│   App.jsx
│   index.css
│   main.jsx
│   postcss.config.js
│
├───assets
│       react.svg
│       svgviewer-png-output.png
│
└───pages
    │   Admin.jsx
    │   Customer.jsx
    │   Welcome.jsx
    │
    ├───components
    │   │   CartPage.jsx
    │   │   CategoryCard.jsx
    │   │   FavouritePage.jsx
    │   │   Header.jsx
    │   │   Hero.jsx
    │   │   HomePage.jsx
    │   │   OrderConfirmation.jsx
    │   │   ProductCard.jsx
    │   │   ProductDetailPage.jsx
    │   │   ProductReviews.jsx
    │   │   ProductsPage.jsx
    │   │   SearchPage.jsx
    │   │   SignInPage.jsx
    │   │   SignUpPage.jsx
    │   │   UserProfilePage.jsx
    │   │   Zero.jsx
    │   │
    │   ├───admin
    │   │       AddProductPage.jsx
    │   │       AdminDashboard.jsx
    │   │       AdminOrdersPage.jsx
    │   │       AdminProductsPage.jsx
    │   │       AdminReviewsPage.jsx
    │   │       AdminSearchPage.jsx
    │   │       CustomerProfile.jsx
    │   │       CustomerTable.jsx
    │   │       EmployeeDetailsModal.jsx
    │   │       EmployeeProfile.jsx
    │   │       EmployeeTable.jsx
    │   │       ProductReviewsPage.jsx
    │   │       UpdateProductPage.jsx
    │   │       UserManagementPage.jsx
    │   │
    │   ├───figma
    │   │       ImageWithFallback.jsx
    │   │
    │   └───ui
    │           Accordion.jsx
    │           alert-dialog.jsx
    │           alert.jsx
    │           aspect-ratio.jsx
    │           avatar.jsx
    │           badge.jsx
    │           breadcrumb.jsx
    │           button.jsx
    │           calender.jsx
    │           card.jsx
    │           carousel.jsx
    │           chart.jsx
    │           checkbox.jsx
    │           collapsible.jsx
    │           command.jsx
    │           context-menu.jsx
    │           dialog.jsx
    │           drawer.jsx
    │           dropdown-menu.jsx
    │           form.jsx
    │           hover-card.jsx
    │           input-otp.jsx
    │           input.jsx
    │           label.jsx
    │           menubar.jsx
    │           navigation-menu.jsx
    │           pagination.jsx
    │           progress.jsx
    │           radio-group.jsx
    │           resizable.jsx
    │           scroll-area.jsx
    │           select.jsx
    │           separator.jsx
    │           sheet.jsx
    │           sidebar.jsx
    │           skeleton.jsx
    │           slider.jsx
    │           sonner.jsx
    │           switch.jsx
    │           table.jsx
    │           tabs.jsx
    │           textarea.jsx
    │           toggle-group.jsx
    │           toggle.jsx
    │           tooltip.jsx
    │           use-mobile.js
    │           utils.js
    │
    ├───context
    │       CardContext.jsx
    │       FavouriteContext.jsx
    │
    ├───data
    │       orders.js
    │       products.js
    │       users.js
    │
    ├───notification
    │       notification.js
    │
    │           use-mobile.js
    │           utils.js
    │
    ├───context
    │       CardContext.jsx
    │       FavouriteContext.jsx
    │
    ├───data
    │       orders.js
    │       products.js
    │       users.js
    │
    ├───notification
    │       notification.js
    │
    └───services
            authenticator.js
    │           use-mobile.js
    │           utils.js
    │
    ├───context
    │       CardContext.jsx
    │       FavouriteContext.jsx
    │
    ├───data
    │       orders.js
    │       products.js
    │       users.js
    │
    ├───notification
    │       notification.js
    │
    │           utils.js
    │
    ├───context
    │       CardContext.jsx
    │       FavouriteContext.jsx
    │
    ├───data
    │       orders.js
    │       products.js
    │       users.js
    │
    ├───notification
    │       notification.js
    │
    ├───context
    │       CardContext.jsx
    │       FavouriteContext.jsx
    │
    ├───data
    │       orders.js
    │       products.js
    │       users.js
    │
    ├───notification
    │       notification.js
    │
    │
    ├───data
    │       orders.js
    │       products.js
    │       users.js
    │
    ├───notification
    │       notification.js
    │
    ├───data
    │       orders.js
    │       products.js
    │       users.js
    │
    ├───notification
    │       notification.js
    │
    │       products.js
    │       users.js
    │
    ├───notification
    │       notification.js
    │
    └───services
            authenticator.js
            cartServices.js
            mailService.js
    │       users.js
    │
    ├───notification
    │       notification.js
    │
    └───services
            authenticator.js
            cartServices.js
            mailService.js
    ├───notification
    │       notification.js
    │
    └───services
            authenticator.js
            cartServices.js
            mailService.js
    │
    └───services
            authenticator.js
            cartServices.js
            mailService.js
    │
    └───services
            authenticator.js
            cartServices.js
            mailService.js
            orderService.js
    └───services
            authenticator.js
            cartServices.js
            mailService.js
            orderService.js
            productService.js
            razorpayService.js
            reviewService.js
            userService.js
            orderService.js
            productService.js
            razorpayService.js
            reviewService.js
            userService.js
            reviewService.js
            userService.js
</pre></details>

## 🤝 Contributing
Pull requests are welcome!


## 📜 License
- This project is licensed under MIT License.


