# 🛒 CartVerse

CartVerse is a **modern eCommerce web application** built with **React** that allows users to browse products, search items, manage cart functionality, save favorites, and securely log in for a personalized shopping experience.

---

## 🚀 Features

* 🛍️ **Browse Products** – Explore products with clean product listings
* 🔍 **Search Products** – Quickly find items by name
* 🧾 **Product Details Page** – View images, price, rating, description, and category
* 🛒 **Shopping Cart** – Add, remove, and update item quantity
* ❤️ **Wishlist** – Save favorite products for later
* 🔐 **Authentication (Auth0)** – Secure login/logout system
* 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop
* ⚡ **Smooth Performance** – Built with reusable components and efficient state updates

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router
* **State Management:** Redux Toolkit
* **Authentication:** Auth0
* **API:** DummyJSON API
* **HTTP Client:** Axios / Fetch API

---

## 📂 Project Structure

```bash
src/
│
├── components/      # Navbar, ProductCard, Hero, ProductDetails, etc.
├── pages/           # Home, Cart, Wishlist, Protected
├── redux/           # Store, slices (cart, wishlist, products)
├── hooks/           # Custom hooks
├── services/        # API requests
├── App.jsx
└── main.jsx
```

---

## 🚀 Core Functionalities

### 🛍️ Product System

* Fetches products from DummyJSON API
* Product listing page
* Product details page using dynamic routes
* Search and category browsing

### 🛒 Cart System

* Add to cart
* Remove from cart
* Increase / decrease quantity
* Automatic total price calculation

### ❤️ Wishlist

* Add/remove favorite products
* Quick access saved products

### 🔐 Authentication

* Login / Logout using Auth0
* Protected actions for logged-in users

### ⚙️ State Management with Redux

* Centralized global state using Redux Toolkit
* Separate slices for cart, wishlist, and products
* Predictable state updates

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cartverse.git
cd cartverse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a file named `.env` in the root folder and add:

```env
VITE_BASE_URL=https://dummyjson.com
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-client-id
```

### 4. Run the project

```bash
npm run dev
```

---

## 📌 Future Improvements

* 💳 Checkout / Payment Gateway
* 📦 Order History
* 🧠 Product Recommendations
* 🌙 Dark Mode
* 📊 Advanced Filters & Sorting
* ☁️ Backend integration with database
