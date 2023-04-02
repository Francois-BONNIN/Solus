import { useState } from "react";
import { Route } from "react-router-dom";
import { HeaderResponsive } from "./components/Header";
import { CardMaterials } from "./components/CardMaterials";
import { ListMaterials } from './components/ListMaterials';
import { ButtonCategories } from "./components/ButtonCategories";
import ListHome from "./components/listhome/ListHome";
import Algo from "./components/Algo";

function App() {
  const [count, setCount] = useState(0);
  const links = [
    {
      link: "/", 
      label: "Home"
    },
    {
      link: "/about", 
      label: "About"
    },
    {
      link: "/auth/login", 
      label: "Log In"
    },
    {
      link: "/auth/register", 
      label: "Register"
    }
  ]

  return (
    <div className="App">
      
      <HeaderResponsive links={links} />
      <Algo/>
      <ListHome/>
    </div>
  );
}

export default App;
