import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { HeaderResponsive } from "./components/Header";
import ListHome from "./components/listhome/ListHome";

export const App = () => {
  const links = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/about",
      label: "About",
    },
    {
      link: "/auth/login",
      label: "Log In",
    },
    {
      link: "/auth/register",
      label: "Register",
    },
  ];

  return (
    <div className="App">
      <HeaderResponsive links={links} />
      <ListHome />
      <RouterProvider router={router} />
    </div>
  );
};

