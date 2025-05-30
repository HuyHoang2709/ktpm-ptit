import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Title from "../../components/Title";
import Card from "../../components/Card";
import Button from "../../components/Button";

const ChiTietLop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lophoc } = location.state || {};
  const giaovien = JSON.parse(localStorage.getItem("user")).info;
  const [remainingSlots, setRemainingSlots] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách đăng ký dạy của lớp hiện tại
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API}/dangkyday/lophoc`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(lophoc),
          }
        );
        if (!response.ok) throw new Error("Failed to fetch registration data");
        const data = await response.json();
        setRemainingSlots(() => lophoc.solop - data.length);
      } catch (error) {
        console.error("Error fetching registration data:", error);
      }
    };
    fetchData();
  }, [lophoc]);

  const handleRegister = async () => {
    const data = {
      giaovien,
      lophoc,
    };

    const confirmRegister = window.confirm(
      "Bạn chắc chắn muốn đăng ký dạy lớp này?"
    );
    if (!confirmRegister) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/dangkyday/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 404) {
        toast.error("Không tìm thấy lớp học hoặc giáo viên.");
        return;
      }
      if (response.status === 403) {
        toast.error("Không còn đủ lớp để đăng ký dạy.");
        return;
      }
      if (response.status === 409) {
        toast.error("Đã đăng ký dạy lớp này");
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to register for teaching");
      }
      toast.success("Đăng ký dạy thành công!");
      navigate("/teach-register");
    } catch (error) {
      toast.error("Đăng ký dạy thất bại. Vui lòng thử lại sau.");
      console.error("[TEACH REGISTER]", error);
    }
  };

  return (
    <>
      <Title text="Thông tin lớp" className="mb-10" />
      <Card>
        <div className="flex flex-col gap-2">
          <p>
            <b>Tên lớp:</b> {lophoc.ten}
          </p>
          <p>
            <b>Mô tả:</b> {lophoc.mota}
          </p>
          <p>
            <b>Tổng số lượng lớp:</b> {lophoc.solop}
          </p>
          <p>
            <b>Học phí:</b>{" "}
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(lophoc.hocphi)}
          </p>
          <div className="border-b border-b-slate-300"></div>
          <h2 className="text-center font-bold">Chương trình học của lớp</h2>
          <p>
            <b>Tên chương trình:</b> {lophoc.chuongtrinhhoc.ten}
          </p>
          <p>
            <b>Mô tả chương trình:</b> {lophoc.chuongtrinhhoc.mota}
          </p>
        </div>
      </Card>
      <div className="flex flex-col gap-10 py-4">
        {remainingSlots > 0 ? (
          <p className="text-blue-500 text-xl font-semibold">
            Hiện tại còn {remainingSlots} lớp để giáo viên đăng ký dạy.
          </p>
        ) : (
          <p className="text-red-500 text-xl font-semibold">
            Hiện tại không còn lớp để giáo viên đăng ký dạy.
          </p>
        )}
        <div className="flex justify-between">
          <Button isLink={true} link="/teach-register" variants="secondary">
            Quay lại
          </Button>
          {remainingSlots > 0 && (
            <Button onClick={handleRegister} variants="primary">
              Đăng ký dạy
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ChiTietLop;
