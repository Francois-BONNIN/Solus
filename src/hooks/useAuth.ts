import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useToken } from "./useToken";
import { User } from "../models/User";
import api from "../utils/fetchdata";

export const useAuth = () => {
  const { addJwtUser, removeJwtUser } = useToken();
  const { getItem } = useLocalStorage();
  const [user, setUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const jwtToken = getItem("token");
    setIsConnected(!!jwtToken);
    if (jwtToken) {
      api
        .get("/users/me?populate=avatar", {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
        .then((user: User) => {
          setUser(user);
          console.log("user", user);
        });
    }
  }, []);

  const login = (jwt: string) => {
    addJwtUser(jwt);
  };

  const logout = () => {
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
