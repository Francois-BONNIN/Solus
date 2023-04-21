import { notifications } from "@mantine/notifications";
import { useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useToken } from "./useToken";
import { User } from "../models/User";
import api from "../utils/fetchdata";
import { AuthContext } from "../providers/AuthContext";

export const useAuth = () => {
  const { addJwtUser, removeJwtUser } = useToken();
  const { getItem } = useLocalStorage();
  const { user, setUser, isConnected, setIsConnected } =
    useContext(AuthContext);

  const login = (jwt: string) => {
    addJwtUser(jwt);
    setIsConnected(true);
    const jwtToken = getItem("token");
    api
      .get("/users/me?populate=avatar", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then((user: User) => {
        setUser(user);
        console.log("user", user);
      });
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
