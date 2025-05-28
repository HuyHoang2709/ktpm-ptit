import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Title from "../../components/Title";
import Input from "../../components/Input";
import toast from "react-hot-toast";

const DanhSachLichDay = () => {
  const location = useLocation();
  const { giaovien } = location.state || {};
  const [buoiHoc, setBuoiHoc] = useState();
  const [ngay, setNgay] = useState(new Date().toJSON().slice(0, 10));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin các buổi học
        const response1 = await fetch(
          `${import.meta.env.VITE_BASE_API}/lichday/buoihoc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response1.ok) {
          toast.error("Không thể lấy danh sách buổi học");
          throw new Error("Failed to fetch class schedules");
        }
        const data1 = await response1.json();
        setBuoiHoc(data1);
      } catch (error) {
        console.error("[SCHEDULE VIEW]", error);
      }
    };
    fetchData();
  }, []);

  const handleDateChange = (e) => {
    console.log(e.target.value);
    setNgay(e.target.value);
  };

  return (
    <>
      <Title
        text={`Lịch dạy của giáo viên ${giaovien.hoten}`}
        className="mb-10"
      />
      <h2 className="mb-2 font-semibold text-lg ml-1">
        Chọn ngày để xếp lịch:
      </h2>
      <Input type="date" value={ngay} onChange={handleDateChange} />
      <div className="h-10 w-full flex flex-col gap-4 mt-10">
        <h2 className="font-semibold text-lg">
          Danh sách lịch dạy của giáo viên trong ngày{" "}
          {new Date(ngay).toLocaleDateString("vi-VN")}:
        </h2>
        {buoiHoc &&
          buoiHoc.map((buoi) => (
            <div className="flex" key={buoi.id}>
              <div className="flex flex-col gap-2 p-4 w-1/5 text-center bg-slate-300">
                <h3 className="font-semibold text-lg">{buoi.ten}</h3>
                <p>{buoi.mota}</p>
              </div>
              <div className="w-4/5 border border-slate-300"></div>
            </div>
          ))}
      </div>
    </>
  );
};

export default DanhSachLichDay;
