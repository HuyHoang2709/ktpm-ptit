import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Đăng xuất thành công!");
  };

  return (
    <div className="w-5/6 fixed top-0 right-0 shadow-sm h-16 flex px-6 justify-between items-center bg-white z-10">
      <p>Hi, {user.info.hoten}!</p>
      <button
        onClick={handleLogout}
        className="text-blue-600 font-semibold cursor-pointer"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Header;
