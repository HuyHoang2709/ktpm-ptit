import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import Card from "../../components/Card";
import FormControl from "../../components/FormControl";
import Select from "../../components/Select";
import Button from "../../components/Button";
import toast from "react-hot-toast";

const ThemLichDay = () => {
  const location = useLocation();
  const { lophoc, buoihoc, ngay } = location.state || {};
  const navigate = useNavigate();
  const [dsPhong, setDsPhong] = useState([]);
  const [dsDKDay, setDsDKDay] = useState([]);
  const [selectedDK, setSelectedDK] = useState();
  const [selectedPhong, setSelectedPhong] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        // Lấy danh sách giáo viên đăng ký dạy lớp này
        const response1 = await fetch(
          `${import.meta.env.VITE_BASE_API}/dangkyday/lophoc`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(lophoc),
          }
        );
        if (!response1.ok) {
          throw new Error("Failed to fetch registration data");
        }
        const data1 = await response1.json();
        setDsDKDay(data1);

        // Lấy danh sách phòng học khả dụng
        const response2 = await fetch(
          `${import.meta.env.VITE_BASE_API}/lichday/phonghoc?ngay=${ngay}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(buoihoc),
          }
        );
        if (!response2.ok) {
          throw new Error("Failed to fetch available classrooms");
        }
        const data2 = await response2.json();
        setSelectedPhong(data2[0]);
        setDsPhong(data2);
      };
      fetchData();
    } catch (error) {
      console.error("[NEW SCHEDULE]", error);
    }
  }, [lophoc, buoihoc, ngay]);

  const handleChonDangKy = (e) => {
    const dangKyChon = dsDKDay.find(
      (dkd) => dkd.giaovien.hoten === e.target.value
    );
    setSelectedDK(dangKyChon);
  };

  const handleChonPhong = (e) => {
    const phongChon = dsPhong.find((phong) => phong.ten === e.target.value);
    setSelectedPhong(phongChon);
  };

  const handleSubmit = async () => {
    if (!selectedDK) {
      toast.error("Vui lòng chọn giáo viên");
      return;
    }

    const lichday = {
      ngay: ngay,
      buoihoc: buoihoc,
      phonghoc: selectedPhong,
      dangkyday: selectedDK,
    };
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API}/lichday/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lichday),
      }
    );
    if (response.status === 409) {
      toast.error("Giáo viên đã có lịch dạy trong thời gian này");
      return;
    }
    if (!response.ok) {
      toast.error("Không thể xếp lịch dạy");
      return;
    }

    toast.success("Lên lịch dạy thành công");
    navigate("/schedule/view", {
      state: { lophoc },
    });
  };

  return (
    <>
      <Title text="Thêm lịch dạy mới" className="mb-10" />
      <Card className="flex flex-col gap-2 mb-10">
        <p>
          <b>Lớp học: </b> {lophoc.ten}
        </p>
        <p>
          <b>Ngày: </b> {new Date(ngay).toLocaleDateString("vi-VN")}
        </p>
        <p>
          <b>Thời gian: </b> {buoihoc.mota}
        </p>
      </Card>
      <FormControl>
        <label htmlFor="" className="text-lg font-semibold ml-1">
          Chọn giáo viên để xếp lịch:
        </label>
        {dsDKDay.length > 0 ? (
          <Select
            value={selectedDK?.giaovien?.hoten || ""}
            options={dsDKDay.map((dkd) => dkd.giaovien.hoten)}
            onChange={handleChonDangKy}
          />
        ) : (
          <p className="p-4 text-center bg-slate-300 rounded-md font-semibold italic">
            Chưa có giáo viên đăng ký dạy lớp này
          </p>
        )}
      </FormControl>
      <FormControl>
        <label className="text-lg font-semibold ml-1">
          Chọn phòng để xếp lịch:
        </label>
        {dsPhong.length > 0 ? (
          <Select
            value={selectedPhong.ten}
            options={dsPhong.map((phong) => phong.ten)}
            onChange={handleChonPhong}
          />
        ) : (
          <div className="p-4 text-center bg-slate-300 rounded-md font-semibold italic">
            Không còn phòng trống trong thời gian này
          </div>
        )}
      </FormControl>
      <div className="flex justify-between">
        <Button
          isLink={true}
          link="/schedule/view"
          variants="secondary"
          state={{ lophoc }}
        >
          Quay lại
        </Button>
        {dsDKDay.length > 0 && dsPhong.length > 0 && (
          <Button variants="primary" onClick={handleSubmit}>
            Xếp lịch
          </Button>
        )}
      </div>
    </>
  );
};

export default ThemLichDay;
