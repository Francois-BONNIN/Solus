import { Route, Routes } from "react-router-dom";
import { Home } from "../views/Home";
import { ActivityId } from "../views/ActivityId";
import { About } from "../components/About";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="activities/:id" element={<ActivityId />} />
      <Route path="equipments/:id" element={<Home />} />
      <Route path="profile" element={<Home />} />
      <Route path="about-us" element={<About />} />
      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};
