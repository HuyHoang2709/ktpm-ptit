import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Loading from "./components/Loading";
import QuanLyGiaoVien from "./pages/QuanLyGiaoVien/QuanLyGiaoVien";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}>
            <Route path="/loading" element={<Loading />} />
            <Route path="/quanlygiaovien" element={<QuanLyGiaoVien />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
