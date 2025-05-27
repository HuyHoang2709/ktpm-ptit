import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import Loading from "../../components/Loading";
import Header from "./Header";
import Card from "../../components/Card";
import Title from "../../components/Title";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const userStore = localStorage.getItem("user");
      if (!userStore) {
        navigate("/login");
        return;
      }
      const parsedUser = JSON.parse(userStore);
      setUser(parsedUser);
    } catch (error) {
      console.error("[HOME]", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Sidebar user={user} />
      <Header user={user} />
      <div className="mt-16 ml-auto w-5/6 p-6">
        {location.pathname === "/" ? (
          <Card className="max-w-1/2 mx-auto">
            <Title text="Thông tin người dùng" className="mb-4" />
            <div className="flex flex-col gap-2">
              <p>
                <b>Họ tên:</b> {user.info.hoten}
              </p>
              <p>
                <b>Ngày sinh:</b>{" "}
                {new Date(user.info.ngaysinh).toLocaleDateString("vi-VN")}
              </p>
              <p>
                <b>Số điện thoại:</b> {user.info.sdt}
              </p>
              <p>
                <b>Email:</b> {user.info.email}
              </p>
              {user.role === "giaovien" && (
                <>
                  <p>
                    <b>Trình độ:</b> {user.info.trinhdo}
                  </p>
                  <p>
                    <b>Chuyên môn:</b> {user.info.chuyenmon}
                  </p>
                </>
              )}
            </div>
          </Card>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
};

export default Home;
