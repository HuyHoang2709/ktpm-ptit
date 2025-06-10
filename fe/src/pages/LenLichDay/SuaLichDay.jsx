import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import Card from "../../components/Card";
import FormControl from "../../components/FormControl";
import Select from "../../components/Select";
import Button from "../../components/Button";
import toast from "react-hot-toast";

const SuaLichDay = () => {
  const location = useLocation();
  const { lophoc, lich } = location.state || {};
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
        setSelectedDK(lich.dangkyday);
        setDsDKDay(data1);

        // Lấy danh sách phòng học khả dụng
        const response2 = await fetch(
          `${import.meta.env.VITE_BASE_API}/lichday/phonghoc?ngay=${lich.ngay}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(lich.buoihoc),
          }
        );
        if (!response2.ok) {
          throw new Error("Failed to fetch available classrooms");
        }
        const data2 = await response2.json();
        setSelectedPhong(lich.phonghoc);
        // Đảm bảo phòng hiện tại cũng có trong danh sách
        data2.push(lich.phonghoc);
        setDsPhong(data2);
      };
      fetchData();
    } catch (error) {
      console.error("[EDIT SCHEDULE]", error);
    }
  }, [lophoc, lich]);

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

  const handleXoaLich = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/lichday/${lich.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 404) {
        toast.error("Không tìm thấy lịch dạy");
        return;
      }
      if (response.status !== 200) {
        throw new Error("Failed to delete schedule");
      }

      toast.success("Xóa lịch dạy thành công");
      navigate("/schedule/view", {
        state: { lophoc },
      });
    } catch (error) {
      toast.error("Không thể xóa lịch dạy");
      console.error("[DELETE SCHEDULE]", error);
    }
  };

  const handleLuu = async () => {
    const data = {
      id: +lich.id,
      ngay: lich.ngay,
      buoihoc: lich.buoihoc,
      dangkyday: selectedDK,
      phonghoc: selectedPhong,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/lichday/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 404) {
        toast.error("Không tìm thấy lịch dạy");
        return;
      }
      if (response.status === 409) {
        toast.error("Giáo viên đã có lịch dạy trong thời gian này");
        return;
      }
      if (response.status !== 200) {
        throw new Error("Failed to update schedule");
      }

      toast.success("Sửa lịch dạy thành công");
      navigate("/schedule/view", {
        state: { lophoc },
      });
    } catch (error) {
      toast.error("Không thể sửa lịch dạy");
      console.error("[EDIT SCHEDULE]", error);
    }
  };

  return (
    <>
      <Title text="Sửa lịch dạy" className="mb-10" />
      <Card className="flex flex-col gap-2 mb-10">
        <p>
          <b>Lớp học: </b> {lophoc.ten}
        </p>
        <p>
          <b>Ngày: </b> {new Date(lich.ngay).toLocaleDateString("vi-VN")}
        </p>
        <p>
          <b>Thời gian: </b> {lich.buoihoc.mota}
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
          <div className="flex gap-2">
            <Button variants="danger" onClick={handleXoaLich}>
              Xóa
            </Button>
            <Button variants="primary" onClick={handleLuu}>
              Lưu
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default SuaLichDay;
