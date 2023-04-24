import { HeaderResponsive } from "./components/Header";
import { AppShell } from "@mantine/core";
import { SideBar } from "./components/SideBar";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/router";
import { AuthProvider } from "./providers/AuthContext";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell
          padding="md"
          navbar={<SideBar />}
          header={<HeaderResponsive />}
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
      </AuthProvider>
    </BrowserRouter>
  );
};
