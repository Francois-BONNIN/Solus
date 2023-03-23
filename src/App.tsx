import { useState } from "react";
import { Route } from "react-router-dom";
import { Home } from "./views/Home";
import { HeaderResponsive } from "./components/Header";
import { CardMaterials } from "./components/CardMaterials";
import { ListMaterials } from './components/ListMaterials';

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
      <ListMaterials/>
    </div>
  );
}

export default App;
