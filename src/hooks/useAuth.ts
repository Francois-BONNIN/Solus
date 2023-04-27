import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useToken } from "./useToken";
import api from "../utils/fetchdata";
import { AuthContext } from "../providers/AuthContext";
import { User } from "../models/User";

export const useAuth = () => {
  const { addJwtUser, removeJwtUser } = useToken();
  const { getItem } = useLocalStorage();
  const { user, setUser, isConnected, setIsConnected } =
    useContext(AuthContext);

  useQuery({
    queryKey: ["user"],
    queryFn: () =>
      api.get("/users/me?populate=*", {
        headers: { Authorization: `Bearer ${getItem("token")}` },
      }),
    enabled: !!getItem("token"),
    onSuccess: (data: User) => setUser(data),
  });

  const login = (jwt: string) => {
    addJwtUser(jwt);
    if (!isConnected) setIsConnected(true);
  };

  const logout = () => {
    setUser(null);
    removeJwtUser();
    setIsConnected(false);
    notifications.show({
      title: "Disconnected",
      message: "You have been disconnected",
      color: "blue",
      autoClose: 4000,
    });
  };

  return { user, login, logout, isConnected };
};
