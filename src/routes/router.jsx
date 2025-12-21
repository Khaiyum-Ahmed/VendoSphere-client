import { createBrowserRouter } from "react-router";
import MainLayouts from "../components/layouts/MainLayouts";
import Home from "../pages/home/Home/Home";
import AboutUs from "../pages/about/AboutUs";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ContactUs from "../pages/contact/ContactUs";
import AuthLayouts from "../components/layouts/AuthLayouts";
import Login from "../pages/AuthenticationPages/Login/Login";
import Register from "../pages/AuthenticationPages/Register/Register";
import BecomeSeller from "../pages/BecomeASeller/BecomeSeller";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import Forbidden from "../pages/Forbidden/Forbidden";
import DashBoardLayouts from "../components/layouts/DashBoardLayouts";
import DashboardHome from "../pages/DashBoard/DashboardHome/DashboardHome";
import SellerRoute from "./SellerRoutes/SellerRoute";
import AddProduct from "../pages/SellerPages/AddProduct/AddProduct";
import ShopPage from "../pages/shop/ShopPage/ShopPage";
import ProductDetails from "../pages/home/Home/FeaturedProduct/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayouts,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: 'about',
          Component:AboutUs
        },
        {
          path:'contact',
          Component:ContactUs
        },
        {
          path:'shop',
          Component:ShopPage
        },
        {
          path:'cart',
          Component:Cart
        },
         {
        path: "product/:id", // ✅ PRODUCT DETAILS ROUTE
        Component: ProductDetails
      },
        {
          path:'become-seller',
          element: <PrivateRoutes><BecomeSeller></BecomeSeller></PrivateRoutes>
        },
        {
          path: 'forbidden',
          Component: Forbidden
        }
    ]
  },
  {
    path:'/',
    Component:AuthLayouts,
    children:[
      {
        path:'login',
        Component: Login
      },
      {
        path: 'register',
        Component:Register
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes><DashBoardLayouts></DashBoardLayouts></PrivateRoutes>,
    children:[
      {
        index:true,
        Component: DashboardHome
      },
      // seller routes only
      {
        path: 'add-product',
        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
      },
    ]
  }
]);