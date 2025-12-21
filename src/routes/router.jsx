import { createBrowserRouter } from "react-router";
import MainLayouts from "../components/layouts/MainLayouts";
import AuthLayouts from "../components/layouts/AuthLayouts";
import DashBoardLayouts from "../components/layouts/DashBoardLayouts";
import Home from "../pages/home/Home/Home";
import AboutUs from "../pages/about/AboutUs";
import ContactUs from "../pages/contact/ContactUs";
import ShopPage from "../pages/shop/ShopPage/ShopPage";
import ProductDetails from "../pages/home/Home/FeaturedProduct/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/AuthenticationPages/Login/Login";
import Register from "../pages/AuthenticationPages/Register/Register";
import BecomeSeller from "../pages/BecomeASeller/BecomeSeller";
import DashboardHome from "../pages/DashBoard/DashboardHome/DashboardHome";
import AddProduct from "../pages/SellerPages/AddProduct/AddProduct";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Forbidden from "../pages/Forbidden/Forbidden";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import SellerRoute from "./SellerRoutes/SellerRoute";
import SellerProducts from "../pages/SellerPages/SellerProducts/SellerProducts";
import CustomerRoute from "./CustomerRoutes/CustomerRoutes";
import CustomerDashboard from "../pages/DashBoard/DashboardHomeRole/CustomerDashboard";
import SellerDashboard from "../pages/DashBoard/DashboardHomeRole/SellerDashboard";
import AdminRoute from "./AdminRoutes/AdminRoute";
import AdminDashboarded from "../pages/DashBoard/DashboardHomeRole/AdminDashboard";
import EditProduct from "../pages/SellerPages/EditProduct/EditProduct";

export const router = createBrowserRouter([
  /* ================= PUBLIC ================= */
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "about",
        Component: AboutUs
      },
      {
        path: "contact",
        Component: ContactUs
      },
      {
        path: "shop",
        Component: ShopPage
      },
      {
        path: "product/:id",
        Component: ProductDetails
      },

      {
        path: "cart",
        element: (
          <PrivateRoutes>
            <Cart />
          </PrivateRoutes>
        ),
      },

      {
        path: "become-seller",
        element: (
          <PrivateRoutes>
            <BecomeSeller />
          </PrivateRoutes>
        ),
      },

      {
        path: "forbidden",
        Component: Forbidden
      },
    ],
  },

  /* ================= AUTH ================= */
  {
    element: <AuthLayouts />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  /* ================= DASHBOARD ================= */
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayouts />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        Component: CustomerDashboard
      },
      {
        path: "customer",
        Component:CustomerDashboard
      },


      // {
      //   path: "orders",
      //   Component: Myor
      // }
      // {
      //   index: true,
      //   element: <DashboardHome />
      // },
        /* customer ROUTES */
      // {
      //   path:"/customer",
      //   element: <CustomerRoute><CustomerDashboard></CustomerDashboard></CustomerRoute>
      // },

      /* SELLER ROUTES */
      {
        path: "seller",
        element: <SellerRoute><SellerDashboard></SellerDashboard></SellerRoute>
      },
      {
        path:"seller/products",
        element:<SellerRoute><SellerProducts></SellerProducts></SellerRoute>
      },
      {
        path:"seller/edit-product/:id",
        element:<SellerRoute><EditProduct></EditProduct></SellerRoute>
      },
      {
        path: "seller/add-product",
        element: (
          <SellerRoute>
            <AddProduct />
          </SellerRoute>
        ),
      },
      // Admin Routes
      {
        path:"admin",
        element:<AdminRoute><AdminDashboarded></AdminDashboarded></AdminRoute>
      }

    ],
  },
]);
