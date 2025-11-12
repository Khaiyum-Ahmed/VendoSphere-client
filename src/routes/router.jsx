import { createBrowserRouter } from "react-router";
import MainLayouts from "../components/layouts/MainLayouts";
import Home from "../pages/home/Home/Home";
import AboutUs from "../pages/about/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayouts,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: 'about',
          Component:AboutUs
        }
    ]
  },
]);