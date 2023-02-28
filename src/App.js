import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import NotFound from "./NotFound";
import Battle from "./Battle/Battle";
import Popular from "./Popular/Popular";
import StartBattle from "./Battle/StartBattle";
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
          <Route element={<StartBattle />} path="/battle/results" />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
