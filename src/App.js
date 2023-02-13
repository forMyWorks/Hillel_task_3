import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import NotFound from "./NotFound";
import Battle from "./Battle";
import Popular from "./Popular";

const App = () => {
  return (
    <BrowserRouter basename="main">
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<NotFound />} path="*" />
        <Route element={<Battle />} path="/battle" />
        <Route element={<Popular />} path="/popular" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
