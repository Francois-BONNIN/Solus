import { Route, Routes } from "react-router-dom";
import { Home } from "../views/Home";
import { ActivityId } from "../views/ActivityId";
import { About } from "../views/About";
import { Auth } from "../views/Auth";
import { Profile } from "../views/Profile";
import {Prof} from "../components/Prof";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="activities/:id" element={<ActivityId />} />
      <Route path="equipments/:id" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="about-us" element={<About />} />
      <Route path="auth" element={<Auth />} />
        <Route path="prof" element={<Prof />} />
    </Routes>
  );
};
