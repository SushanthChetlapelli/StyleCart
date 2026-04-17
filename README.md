## TEAM DETAILS:
1.Ch.Nithin Reddy-2303A51550
2.Ch.Sushanth-2303A51750
3.M.Sathvik-2303A51483


## Project Structure:
```
 DEVOPS/
├── src/
│   ├── pages/             # All route-level page components
│   │   ├── Index.tsx           → Home page
│   │   ├── CategoryPage.tsx    → Shop / Co-ords / Streetwear / Essentials
│   │   ├── ProductPage.tsx     → Individual product detail
│   │   ├── CheckoutPage.tsx    → Multi-step checkout
│   │   ├── OrderSuccessPage.tsx→ Post-order confirmation
│   │   ├── UserDashboard.tsx   → Logged-in user profile & orders
│   │   ├── AdminLoginPage.tsx  → Admin-only login
│   │   ├── AdminDashboard.tsx  → Admin order management
│   │   └── NotFound.tsx        → 404 page
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.tsx          → Top navigation bar
│   │   ├── Footer.tsx          → Page footer
│   │   ├── CartDrawer.tsx      → Slide-out cart panel
│   │   ├── AuthModal.tsx       → Sign In / Sign Up modal
│   │   ├── HeroSection.tsx     → Homepage hero banner
│   │   ├── FeaturedCollection.tsx
│   │   ├── NewArrivals.tsx
│   │   ├── Categories.tsx
│   │   ├── SocialProof.tsx
│   │   ├── UrgencyBanner.tsx
│   │   └── NavLink.tsx
│   ├── context/
│   │   ├── AuthContext.tsx     → Auth state (user, signIn, signUp, signOut)
│   │   └── CartContext.tsx     → Cart state (items, add, remove, clear)
│   ├── api/
│   │   └── client.ts           → HTTP API client (auth, profile, orders)
│   ├── data/
│   │   └── products.ts         → Static product catalogue & mock reviews
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities
│   └── assets/            # Product images
├── server/
│   ├── server.js          → Express entry point (port 5001)
│   ├── routes/            → API route handlers
│   ├── models/            → MongoDB/Mongoose models
│   └── middleware/        → Auth middleware (JWT)
├── public/                # Static assets
├── dist/                  # Production build output
├── docker-compose.yml     → Docker setup
├── .env                   → Environment variables
└── package.json
```


## Navigation Flowchart:
```

┌─────────────────────────────────────────────────────────────┐
│                        ENTRY POINTS                         │
└──────────────────────┬──────────────────┬───────────────────┘
                       │                  │
              / (Homepage)         /admin-login
                       │                  │
                       ▼                  ▼
         ┌─────────────────┐    ┌─────────────────────┐
         │   INDEX PAGE    │    │  ADMIN LOGIN PAGE   │
         │   (Home "/")    │    │  (/admin-login)     │
         │ ─ HeroSection   │    │  Email + Password   │
         │ ─ UrgencyBanner │    └──────────┬──────────┘
         │ ─ FeaturedColl. │               │ (valid admin creds)
         │ ─ NewArrivals   │               ▼
         │ ─ Categories    │    ┌─────────────────────┐
         │ ─ SocialProof   │    │  ADMIN DASHBOARD    │
         │ ─ Footer        │    │  (/admin)           │
         └────────┬────────┘    │ ─ Order statistics  │
                  │             │ ─ Update order status│
    ┌─────────────┼──────────────────────────┐         │
    │             │             └─────────────────────┘
    ▼             ▼                     ▼
┌──────────┐  ┌──────────────────────────────────────────┐
│  Navbar  │  │         CATEGORY PAGES                   │
│ (Global) │  │  /shop  /co-ords  /streetwear  /essentials│
│          │  │  ─ Filter by size                        │
│ Links to:│  │  ─ Sort (trending / price low / high)    │
│ • /shop  │  │  ─ Product grid cards                    │
│ • /co-ords  └──────────────────┬───────────────────────┘
│ • /streetwear                  │ (click product card)
│ • /essentials                  ▼
│ • Cart   │  ┌──────────────────────────────────────────┐
│   icon   │  │           PRODUCT PAGE                   │
│ • User   │  │  /product/:id                            │
│   icon   │  │  ─ Product image + details               │
└──────────┘  │  ─ Size selector                         │
              │  ─ Quantity selector                     │
              │  ─ Customer reviews                      │
              │                                          │
              │  [Add to Cart] ──► CartDrawer (overlay)  │
              │  [Buy Now]     ──► /checkout              │
              └──────────────────┬───────────────────────┘
                                 │
                                 ▼
              ┌──────────────────────────────────────────┐
              │           CART DRAWER                    │
              │  (Slide-in overlay — global)             │
              │  ─ View cart items                       │
              │  ─ Update quantity / remove items        │
              │  [Checkout] ───────────────────────────► │
              └──────────────────┬───────────────────────┘
                                 │
                                 ▼
              ┌──────────────────────────────────────────┐
              │           CHECKOUT PAGE                  │
              │  /checkout  (3-step wizard)              │
              │                                          │
              │  Step 1: DELIVERY ADDRESS                │
              │    ─ Name, Phone, Address, City, Pincode │
              │    ─ Auto-fills from saved profile       │
              │    [Continue to Payment] ──────────────► │
              │                                          │
              │  Step 2: PAYMENT METHOD                  │
              │    ─ Cash on Delivery (COD)              │
              │    ─ UPI / Online Payment                │
              │    [Review Order] ──────────────────────►│
              │                                          │
              │  Step 3: ORDER REVIEW                    │
              │    ─ Items summary                       │
              │    ─ Delivery address                    │
              │    ─ Payment method                      │
              │    [Place Order] ───────────────────────►│
              └──────────────────┬───────────────────────┘
                                 │ (order placed successfully)
                                 ▼
              ┌──────────────────────────────────────────┐
              │        ORDER SUCCESS PAGE                │
              │  /order-success?order=SC-{timestamp}     │
              │  ─ Order confirmation + Order ID         │
              │  ─ Estimated delivery date (+5 days)     │
              │  [Continue Shopping] ──────────────────► /shop
              └──────────────────────────────────────────┘


AUTH FLOWS (Modal overlay — triggered from Navbar)
─────────────────────────────────────────────────
         [User icon — not logged in]
                    │
                    ▼
         ┌────────────────────┐
         │    AUTH MODAL      │
         │  (Overlay/Dialog)  │
         │                    │
         │  ┌──────────────┐  │
         │  │  SIGN IN tab │  │
         │  │  Email + Pass│  │
         │  └──────┬───────┘  │
         │         │ (success)│
         │         ▼          │
         │  Token saved →     │
         │  User state set    │
         └────────────────────┘
                    │
         ┌──────────────────┐
         │  SIGN UP tab     │
         │  Name+Email+Pass │
         └──────┬───────────┘
                │ (success)
                ▼
         Auto signs in → AuthContext updated


USER DASHBOARD (Authenticated users only)
──────────────────────────────────────────
         [User icon — logged in]
                    │
                    ▼
         ┌──────────────────────────────┐
         │      USER DASHBOARD          │
         │  /user-dashboard             │
         │                              │
         │  Tab: MY ORDERS              │
         │    ─ Order history list      │
         │    ─ Order status badge      │
         │    ─ Items per order         │
         │                              │
         │  Tab: MY PROFILE             │
         │    ─ View saved profile      │
         │    ─ Edit Name, Phone,       │
         │      Address, City, Pincode  │
         │    [Save Changes]            │
         │                              │
         │  [Sign Out] ──────────────── → /
         └──────────────────────────────┘


404 FALLBACK
────────────
  Any unmatched URL → /not-found (NotFound page)
```


## Setup & Installation
Prerequisites

Node.js 18+ or Bun
MongoDB (local or Atlas)
Docker (optional)

1. Clone & Install
bash# Install frontend dependencies
cd DEVOPS
npm install   # or: bun install

# Install backend dependencies
cd server
npm install
2. Configure Environment
Create a .env file in the root:
envVITE_API_URL=http://localhost:5001/api
Configure the server with MongoDB URI (in server/.env or directly):
envMONGODB_URI=mongodb://localhost:27017/stylecart
JWT_SECRET=your_jwt_secret_key
PORT=5001
3. Run Development
bash# Start backend (from /server)
node server.js

# Start frontend (from root)
npm run dev
Frontend runs on http://localhost:5173
Backend API runs on http://localhost:5001/api
4. Using Docker
bashdocker-compose up --build
5. Build for Production
bashnpm run build
# Output goes to /dist

## Authentication Flow:
```
User clicks "Sign In" (Navbar)
        │
        ▼
AuthModal opens → POST /api/auth/signin
        │
        ▼ (success)
JWT token saved to localStorage
        │
        ▼
AuthContext re-fetches profile (GET /api/auth/me)
        │
        ▼
User state updated → Navbar shows User + Logout icons
        │
   ┌────┴─────┐
   ▼          ▼
/user-dashboard  Auto-fill checkout form
```


## Cart Flow :
```
Product Page → [Add to Cart]
        │
        ▼
CartContext.addToCart(product, size, qty)
        │
        ▼
CartDrawer shows updated items
        │
  [Go to Checkout]
        │
        ▼
CheckoutPage reads CartContext.items
        │
        ▼ (order placed)
CartContext.clearCart()
        │
        ▼
OrderSuccessPage (/order-success?order=SC-xxxx)
```

## 🛠️ Tech Stack

### 🎨 Frontend
- React 18 with TypeScript  
- Vite (Build Tool)  
- Tailwind CSS + shadcn/ui (Styling)  
- React Router DOM v6 (Routing)  
- React Context API (State Management - Auth & Cart)  
- TanStack React Query (Data Fetching)  

### ⚙️ Backend
- Node.js  
- Express.js  

### 🗄️ Database
- MongoDB (using Mongoose)  

### 🔐 Authentication
- JWT (JSON Web Tokens)  

### 📦 DevOps / Deployment
- Docker  
- Docker Compose  