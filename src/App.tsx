import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { HeaderResponsive } from "./components/Header";
import { AppShell } from "@mantine/core";
import { SideBar } from "./components/SideBar";

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
      <AppShell
        padding="md"
        navbar={<SideBar />}
        header={<HeaderResponsive links={links} />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <RouterProvider router={router} />
      </AppShell>
    </div>
  );
};
