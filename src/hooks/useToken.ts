import { useLocalStorage } from "./useLocalStorage";

export const useToken = () => {
  const { setItem } = useLocalStorage();

  const addJwtUser = (jwtToken: string) => {
    setItem("token", jwtToken);
  };

  const removeJwtUser = () => {
    setItem("token", "");
  };

  return { addJwtUser, removeJwtUser };
};
