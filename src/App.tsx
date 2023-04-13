import { HeaderResponsive } from "./components/Header";
import { AppShell } from "@mantine/core";
import { SideBar } from "./components/SideBar";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/router";

export const App = () => {
  const links = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/about-us",
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
    <BrowserRouter>
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
        <AppRouter />
      </AppShell>
    </BrowserRouter>
  );
};
