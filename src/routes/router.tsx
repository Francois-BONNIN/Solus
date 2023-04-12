import { Route, Routes } from "react-router-dom";
import { Home } from "../views/Home";
import { ActivityId } from "../views/ActivityId";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="activities/:id" element={<ActivityId />} />
      <Route path="equipments/:id" element={<Home />} />
      <Route path="profile" element={<Home />} />
      <Route path="about-us" element={<Home />} />
      <Route path="auth">
        <Route path="login" element={<Home />} />
        <Route path="register" element={<Home />} />
      </Route>
    </Routes>
  );
};
