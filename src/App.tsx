import { useState } from "react";
import { Route } from "react-router-dom";
import { Home } from "./views/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Home />} />
      <Route path="/materiel" element={<Home />} />
    </div>
  );
}

export default App;
