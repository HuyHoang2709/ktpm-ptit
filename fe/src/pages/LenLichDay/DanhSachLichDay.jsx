import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Title from "../../components/Title";
import Input from "../../components/Input";
import toast from "react-hot-toast";
import { ThongTinLichDay } from "./ThongTinLichDay";
import Button from "../../components/Button";

const DanhSachLichDay = () => {
  const location = useLocation();
  const { giaovien } = location.state || {};
  const [ngay, setNgay] = useState(new Date().toJSON().slice(0, 10));
  const [buoiHoc, setBuoiHoc] = useState([]);
  const [lichDay, setLichDay] = useState([]);

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

        // Lấy lịch dạy của giáo viên trong ngày đã chọn
        const response2 = await fetch(
          `${import.meta.env.VITE_BASE_API}/lichday/?ngay=${ngay}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(giaovien),
          }
        );
        if (!response2.ok) {
          toast.error("Không thể lấy lịch dạy của giáo viên");
          throw new Error("Failed to fetch teacher's schedule");
        }
        const data2 = await response2.json();
        setLichDay(data2);
      } catch (error) {
        console.error("[SCHEDULE VIEW]", error);
      }
    };
    fetchData();
  }, [giaovien, ngay]);

  const handleDateChange = async (e) => {
    setNgay(e.target.value);
    try {
      // Lấy lịch dạy của giáo viên trong ngày đã chọn
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/lichday/?ngay=${e.target.value}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(giaovien),
        }
      );
      if (!response.ok) {
        toast.error("Không thể lấy lịch dạy của giáo viên");
        throw new Error("Failed to fetch teacher's schedule");
      }
      const data = await response.json();
      setLichDay(data);
    } catch (error) {
      console.error("[SCHEDULE VIEW]", error);
    }
  };

  return (
    <>
      <Title
        text={`Lịch dạy của giáo viên ${giaovien.hoten}`}
        className="mb-10"
      />
      <div className="mb-10">
        <Button isLink={true} variants="secondary" link="/schedule/teacher">
          Quay lại
        </Button>
      </div>
      <h2 className="mb-2 font-semibold text-lg ml-1">
        Chọn ngày để xếp lịch:
      </h2>
      <Input type="date" value={ngay} onChange={handleDateChange} />
      <div className="h-10 w-full flex flex-col gap-4 mt-10">
        <h2 className="font-semibold text-lg">
          Danh sách lịch dạy của giáo viên trong ngày{" "}
          {new Date(ngay).toLocaleDateString("vi-VN")}:
        </h2>
        {buoiHoc.length > 0 &&
          buoiHoc.map((buoi) => (
            <div className="flex" key={buoi.id}>
              <div className="flex flex-col gap-2 p-6 w-1/5 text-center bg-slate-300">
                <h3 className="font-bold text-lg">{buoi.ten}</h3>
                <p>{buoi.mota}</p>
              </div>
              <div className="w-4/5 flex">
                {lichDay &&
                lichDay.length > 0 &&
                lichDay.map((item) => item.buoihoc.id).includes(buoi.id) ? (
                  <Link
                    to="/schedule/edit"
                    className="bg-blue-500 w-full p-6 flex flex-col justify-center items-center text-white"
                    state={{
                      giaovien: giaovien,
                      lich: lichDay.find((lich) => lich.buoihoc.id == buoi.id),
                    }}
                  >
                    <ThongTinLichDay
                      lich={lichDay.find((lich) => lich.buoihoc.id == buoi.id)}
                    />
                  </Link>
                ) : (
                  <Link
                    to="/schedule/new"
                    state={{ giaovien: giaovien, buoihoc: buoi, ngay: ngay }}
                    className="border border-slate-300 w-full p-6 text-green-600 font-semibold text-lg flex justify-center items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    <span>Thêm lịch dạy mới</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default DanhSachLichDay;
