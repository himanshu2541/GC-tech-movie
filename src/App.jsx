import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import Layout from "./layout/Layout";
import FlowBiteCarousel from "./components/Carousel";
import PaginatedItems from "./components/search-pagination/Pagination";
import Subscription from "./pages/Subscription";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="test" element={<FlowBiteCarousel />} />
          <Route path="/search/" element={<PaginatedItems itemsPerPage={6} />} />
          <Route path="/subscription" element={<Subscription />} />
        </Route>
          
      </Routes>
    </BrowserRouter>
  );
};

export default App;
