import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Products from "./pages/Products";
import Create from "./pages/Create";
import Update from "./pages/Update";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="create" element={<Create />} />
          <Route path="update/:id" element={<Update />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
