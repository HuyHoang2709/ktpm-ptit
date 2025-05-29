import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import Card from "../../components/Card";
import FormControl from "../../components/FormControl";
import Select from "../../components/Select";
import Button from "../../components/Button";
import toast from "react-hot-toast";

const ThemLichDay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { giaovien, buoihoc, ngay } = location.state || {};
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
        setSelectedDangKy(data1[0]);
        setDsDangKyDay(data1);

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
        setDsPhongHoc(data2);
      };
      fetchData();
    } catch (error) {
      console.error("[NEW SCHEDULE]", error);
    }
  }, [giaovien, buoihoc, ngay]);

  const handleChonDangKy = (e) => {
    const dangKyChon = dsDangKyDay.find(
      (dkd) => dkd.lophoc.ten === e.target.value
    );
    setSelectedDangKy(dangKyChon);
  };

  const handleChonPhong = (e) => {
    const phongChon = dsPhongHoc.find((phong) => phong.ten === e.target.value);
    console.log(phongChon);
    setSelectedPhong(phongChon);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lichDay = {
      ngay: ngay,
      dangkyday: selectedDangKy,
      buoihoc: buoihoc,
      phonghoc: selectedPhong,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/lichday/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lichDay),
        }
      );

      if (response.status === 404) {
        toast.error("Không tồn tại đăng ký dạy, buổi học hoặc phòng học.");
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to create new schedule");
      }

      toast.success("Xếp lịch thành công!");
      navigate("/schedule/view", {
        state: { giaovien },
      });
    } catch (error) {
      console.error("[NEW SCHEDULE]", error);
    }
  };

  return (
    <>
      <Title text="Thêm lịch dạy mới" className="mb-10" />
      <Card className="flex flex-col gap-2 mb-10">
        <p>
          <b>Giáo viên:</b> {giaovien.hoten}
        </p>
        <p>
          <b>Ngày: </b>
          {new Date(ngay).toLocaleDateString("vi-VN")}
        </p>
        <p>
          <b>Thời gian:</b> {buoihoc.mota}
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
            <Button type="submit" variants="primary" onClick={handleSubmit}>
              Xếp lịch
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default ThemLichDay;
