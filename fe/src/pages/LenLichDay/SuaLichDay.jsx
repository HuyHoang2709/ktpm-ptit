import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import Card from "../../components/Card";
import FormControl from "../../components/FormControl";
import Select from "../../components/Select";
import Button from "../../components/Button";
import toast from "react-hot-toast";

const SuaLichDay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { giaovien, lich } = location.state || {};
  const [dsDangKyDay, setDsDangKyDay] = useState([]);
  const [dsPhongHoc, setDsPhongHoc] = useState([]);
  const [selectedDangKy, setSelectedDangKy] = useState();
  const [selectedPhong, setSelectedPhong] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        // Lấy đăng ký dạy của giáo viên
        const response1 = await fetch(
          `${import.meta.env.VITE_BASE_API}/dangkyday/giaovien`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(giaovien),
          }
        );
        if (!response1.ok) {
          throw new Error("Failed to fetch registration list");
        }
        const data1 = await response1.json();
        setSelectedDangKy(lich.dangkyday);
        setDsDangKyDay(data1);

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
        data2.push(lich.phonghoc);
        setDsPhongHoc(data2);
      };
      fetchData();
    } catch (error) {
      console.error("[EDIT SCHEDULE]", error);
    }
  }, [giaovien, lich]);

  const handleChonDangKy = (e) => {
    const dangKyChon = dsDangKyDay.find(
      (dkd) => dkd.lophoc.ten === e.target.value
    );
    setSelectedDangKy(dangKyChon);
  };

  const handleChonPhong = (e) => {
    const phongChon = dsPhongHoc.find((phong) => phong.ten === e.target.value);
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
        state: { giaovien },
      });
    } catch (error) {
      toast.error("Không thể xóa lịch dạy");
      console.error("[DELETE SCHEDULE]", error);
    }
  };

  const handleLuu = async (e) => {
    e.preventDefault();
    const data = {
      id: +lich.id,
      ngay: lich.ngay,
      buoihoc: lich.buoihoc,
      dangkyday: selectedDangKy,
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
      if (response.status !== 200) {
        throw new Error("Failed to update schedule");
      }

      toast.success("Sửa lịch dạy thành công");
      navigate("/schedule/view", {
        state: { giaovien },
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
          <b>Giáo viên:</b> {giaovien.hoten}
        </p>
        <p>
          <b>Ngày: </b>
          {new Date(lich.ngay).toLocaleDateString("vi-VN")}
        </p>
        <p>
          <b>Thời gian:</b> {lich.buoihoc.mota}
        </p>
      </Card>
      <form className="flex flex-col gap-4">
        <FormControl>
          <label className="text-lg font-semibold ml-1">
            Chọn lớp để xếp lịch:
          </label>
          {dsDangKyDay.length > 0 ? (
            <Select
              value={selectedDangKy.lophoc.ten}
              options={dsDangKyDay.map((dkd) => dkd.lophoc.ten)}
              onChange={handleChonDangKy}
            />
          ) : (
            <div className="p-4 text-center bg-slate-300 rounded-md font-semibold italic">
              Giáo viên chưa đăng ký dạy lớp nào
            </div>
          )}
        </FormControl>
        <FormControl>
          <label className="text-lg font-semibold ml-1">
            Chọn phòng để xếp lịch:
          </label>
          {dsPhongHoc.length > 0 ? (
            <Select
              value={selectedPhong.ten}
              options={dsPhongHoc.map((phong) => phong.ten)}
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
            state={{ giaovien }}
          >
            Quay lại
          </Button>
          {dsDangKyDay.length > 0 && dsPhongHoc.length > 0 && (
            <div className="flex gap-2">
              <Button type="button" variants="danger" onClick={handleXoaLich}>
                Xóa
              </Button>
              <Button type="submit" variants="primary" onClick={handleLuu}>
                Lưu
              </Button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default SuaLichDay;
