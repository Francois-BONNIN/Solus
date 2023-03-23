import { createBrowserRouter } from "react-router-dom";
import { Home } from "../views/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <Home />,
  },
  {
    path: "/materiel",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Home />,
  },
  {
    path: "/profile/edit",
    element: <Home />,
  },
  {
    path: "/favorites",
    element: <Home />,
  },
  {
    path: "/about-us",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <Home />,
  },
  {
    path: "/auth/register",
    element: <Home />,
  },
]);
