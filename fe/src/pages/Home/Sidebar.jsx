import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Title";

export const Sidebar = ({ user }) => {
  const [active, setActive] = useState(1);
  const [role, setRole] = useState("giaovien");

  useEffect(() => {
    setRole(() => user.role);
  }, [user]);

  return (
    <div className="fixed w-1/6 top-0 left-0 bottom-0 bg-slate-200">
      <div className="h-16 flex items-center p-6">
        <Title
          text={`Dashboard ${user.role === "quanly" ? "Quản lý" : "Giáo viên"}`}
        />
      </div>
      <nav className="py-6 px-3 flex flex-col gap-2">
        <Link
          to="/"
          className={`py-3 px-4 rounded transition-all ${
            active === 1 && "bg-blue-500 text-white"
          }`}
          onClick={() => setActive(1)}
        >
          Trang chủ
        </Link>
        {role === "giaovien" && (
          <Link
            to="/teach-register"
            className={`py-3 px-4 rounded ${
              active === 2 && "bg-blue-500 text-white"
            }`}
            onClick={() => setActive(2)}
          >
            Đăng ký dạy
          </Link>
        )}
        {role === "quanly" && (
          <>
            <Link
              to="/teachers"
              className={`py-3 px-4 rounded ${
                active === 2 && "bg-blue-500 text-white"
              }`}
              onClick={() => setActive(2)}
            >
              Quản lý giáo viên
            </Link>
            <Link
              to="/"
              className={`py-3 px-4 rounded ${
                active === 3 && "bg-blue-500 text-white"
              }`}
              onClick={() => setActive(3)}
            >
              Lên lịch dạy
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
