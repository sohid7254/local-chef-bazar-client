# Local Chef Bazaar 🍽️

Local Chef Bazaar is a full-stack web application that connects home chefs with local food lovers. It allows chefs to showcase meals, manage orders, and receive reviews, while users can browse, order, and rate meals with secure authentication and payment integration.

## 🌐 Live URL
[Live LInk](https://local-chef-bazar-e4a60.web.app/)

## 🎯 Purpose
This platform empowers local chefs to build their brand and earn through home-cooked meals. It ensures secure role-based access, fraud prevention, and a smooth user experience for both chefs and customers.

## 🚀 Key Features
- 🔐 Firebase authentication with JWT-based role verification (admin, chef, user)
- 🧠 React Query for efficient data fetching and caching
- 📦 Stripe integration for secure payment and order tracking
- 🧾 Review system with dynamic rating updates
- 🧑‍🍳 Chef dashboard with fraud detection and role request flow
- 📊 Admin stats for users, orders, and payments
- 🎨 Responsive UI with TailwindCSS, AOS animations, and Lenis smooth scrolling
- 🧭 Protected routes with middleware-style logic and dynamic title updates
- 📩 Contact form with backend storage

## 📦 NPM Packages Used

| Package | Purpose |
|--------|---------|
| `@tailwindcss/vite` | Tailwind integration with Vite |
| `@tanstack/react-query` | Data fetching and caching |
| `aos` | Scroll animations |
| `axios` | API requests |
| `firebase` | Authentication and SDK |
| `lenis` | Smooth scrolling |
| `react` / `react-dom` | Core React |
| `react-helmet` / `react-helmet-async` | Dynamic page titles and SEO |
| `react-hook-form` | Form handling |
| `react-icons` | Icon library |
| `react-lottie` | Lottie animations |
| `react-router` | Routing |
| `recharts` | Data visualization |
| `sweetalert2` | Alert modals |
| `swiper` | Carousel and sliders |
| `tailwindcss` | Styling framework |

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/sohid7254/local-chef-bazar-client.git
cd local-chef-bazar-client
npm install
npm run dev

