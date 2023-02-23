import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import NotFound from "./NotFound";
import Battle from "./Battle";
import Popular from "./Popular/Popular";
import Nav from "./Nav";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Nav />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<NotFound />} path="*" />
          <Route element={<Battle />} path="/battle" />
          <Route element={<Popular />} path="/popular" />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
