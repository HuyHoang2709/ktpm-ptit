import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Loading from "./components/Loading";
import QuanLyGiaoVien from "./pages/QuanLyGiaoVien/QuanLyGiaoVien";
import ThemGiaoVien from "./pages/QuanLyGiaoVien/ThemGiaoVien";
import SuaGiaoVien from "./pages/QuanLyGiaoVien/SuaGiaoVien";
import ChonLop from "./pages/DangKyDay/ChonLop";
import ChiTietLop from "./pages/DangKyDay/ChiTietLop";
import ChonLopXepLich from "./pages/LenLichDay/ChonLopXepLich";
import DanhSachLichDay from "./pages/LenLichDay/DanhSachLichDay";
import ThemLichDay from "./pages/LenLichDay/ThemLichDay";
import SuaLichDay from "./pages/LenLichDay/SuaLichDay";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}>
            <Route path="/loading" element={<Loading />} />
            <Route path="/teachers" element={<QuanLyGiaoVien />} />
            <Route path="/teachers/new" element={<ThemGiaoVien />} />
            <Route path="/teachers/edit" element={<SuaGiaoVien />} />
            <Route path="/teach-register" element={<ChonLop />} />
            <Route path="/teach-register/info" element={<ChiTietLop />} />
            <Route path="/schedule/class" element={<ChonLopXepLich />} />
            <Route path="/schedule/view" element={<DanhSachLichDay />} />
            <Route path="/schedule/new" element={<ThemLichDay />} />
            <Route path="/schedule/edit" element={<SuaLichDay />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
