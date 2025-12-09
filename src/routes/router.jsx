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
          path:'become-seller',
          Component:BecomeSeller
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
  }
]);