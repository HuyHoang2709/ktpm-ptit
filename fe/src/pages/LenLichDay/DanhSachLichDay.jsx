import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Title from "../../components/Title";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { ThongTinLichDay } from "./ThongTinLichDay";
import toast from "react-hot-toast";

const DanhSachLichDay = () => {
  const location = useLocation();
  const { lophoc } = location.state || {};
  const [ngay, setNgay] = useState(new Date().toJSON().slice(0, 10));
  const [dsBuoiHoc, setDsBuoiHoc] = useState([]);
  const [dsLichDay, setDsLichDay] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
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
        setDsBuoiHoc(data1);

        // Lấy lịch dạy theo buổi học của ngày đã chọn
        const response2 = await fetch(
          `${import.meta.env.VITE_BASE_API}/lichday/lophoc?ngay=${ngay}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(lophoc),
          }
        );
        if (!response2.ok) {
          toast.error("Không thể lấy danh sách lịch dạy");
          throw new Error("Failed to fetch class schedules");
        }
        const data2 = await response2.json();
        setDsLichDay(data2);
      };
      fetchData();
    } catch (error) {
      console.error("[SCHEDULE VIEW]", error);
    }
  }, [lophoc, ngay]);

  const handleDateChange = async (e) => {
    setNgay(e.target.value);
    try {
      // Lấy lịch dạy của lớp trong ngày đã chọn
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/lichday/lophoc?ngay=${
          e.target.value
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lophoc),
        }
      );
      if (!response.ok) {
        toast.error("Không thể lấy lịch dạy của giáo viên");
        throw new Error("Failed to fetch teacher's schedule");
      }
      const data = await response.json();
      setDsLichDay(data);
    } catch (error) {
      console.error("[SCHEDULE VIEW]", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Title text={`Lịch dạy của lớp ${lophoc.ten}`} />
      <Button
        isLink={true}
        link="/schedule/class"
        className="w-fit"
        variants="secondary"
      >
        Quay lại
      </Button>
      <div className="h-10 w-full flex flex-col gap-2">
        <h2 className="font-semibold text-lg">Chọn ngày để xếp lịch:</h2>
        <Input type="date" value={ngay} onChange={handleDateChange} />
      </div>
      <div className="h-10 w-full flex flex-col gap-4 mt-10">
        <h2 className="font-semibold text-lg">
          Danh sách lịch dạy của lớp trong ngày{" "}
          {new Date(ngay).toLocaleDateString("vi-VN")}:
        </h2>
        {dsBuoiHoc.length > 0 &&
          dsBuoiHoc.map((buoi) => (
            <div className="flex" key={buoi.id}>
              <div className="flex flex-col gap-2 p-6 w-1/5 text-center bg-slate-300">
                <h3 className="font-bold text-lg">{buoi.ten}</h3>
                <p>{buoi.mota}</p>
              </div>
              <div className="w-4/5 flex">
                {dsLichDay.length > 0 &&
                dsLichDay.map((item) => item.buoihoc.id).includes(buoi.id) ? (
                  <Link
                    to="/schedule/edit"
                    className="bg-blue-500 w-full p-6 flex flex-col justify-center items-center text-white"
                    state={{
                      lophoc: lophoc,
                      lich: dsLichDay.find(
                        (lich) => lich.buoihoc.id == buoi.id
                      ),
                    }}
                  >
                    <ThongTinLichDay
                      lich={dsLichDay.find(
                        (lich) => lich.buoihoc.id == buoi.id
                      )}
                    />
                  </Link>
                ) : (
                  <Link
                    to="/schedule/new"
                    state={{ lophoc: lophoc, buoihoc: buoi, ngay: ngay }}
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
    </div>
  );
};

export default DanhSachLichDay;
