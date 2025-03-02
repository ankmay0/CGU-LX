# CGU-LX
frontend/
│── public/
│── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Footer.jsx         # Footer section
│   │   ├── ProductCard.jsx    # UI card for product display
│   │   ├── ProductForm.jsx    # Form to add new products
│   │   ├── ProductList.jsx    # List all products
│   │   ├── ProductDetails.jsx # Display product details
│   │   ├── UserProfile.jsx    # User profile & listings
│   │   ├── Carousel.jsx
│   │   ├── EarlyBirdCarousel.jsx #Coming soon launching component
│   ├── pages/
│   │   ├── Home.jsx           # Homepage with featured products
│   │   ├── Sell.jsx           # Page to list a product
│   │   ├── Buy.jsx            # Browse and search products
│   │   ├── Login.jsx          # Login page (College email required)
│   │   ├── Register.jsx       # Sign-up page for new users
│   ├── context/
│   │   ├── AuthContext.jsx    # Manages authentication state
│   ├── firebase/
│   │   ├── firebaseConfig.js  # Firebase configuration
│   ├── routes/
│   │   ├── ProtectedRoute.jsx # Restrict access to authenticated users
│   ├── App.js                 # Main app component
│   ├── index.js               # Entry point, renders App.js
│   ├── styles.css             # Global styling
│── package.json
│── .gitignore
│── README.md



backend/
│── config/
│   ├── db.js                # MongoDB connection setup
│   ├── firebaseAdminConfig.json 
│── controllers/
│   ├── authController.js    # Handles user authentication (login/register)
│   ├── productController.js # Handles product CRUD operations
│── models/
│   ├── User.js              # User schema (name, email, password, listings)
│   ├── Product.js           # Product schema (title, description, price, images, seller)
│── routes/
│   ├── authRoutes.js        # Routes for login & signup
│   ├── productRoutes.js     # Routes for product CRUD operations
│── utils/
│   ├── otpService.js      # whatsaap otp verification
│── server.js                # Main entry point, sets up Express server
│── package.json
│── .env                     # Environment variables (Mongo URI, JWT secret, etc.)
│── .gitignore
│── README.md

