import { useEffect, useState } from "react";
import Title from "../../components/Title";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

const ChonGiaoVien = () => {
  const [dsGV, setDsGV] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API}/giaovien/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }
        const data = await response.json();
        setDsGV(
          data.map((gv) => ({
            id: gv.id,
            name: gv.hoten,
            ngaysinh: new Date(gv.ngaysinh).toLocaleDateString("vi-VN"),
            email: gv.email,
            sdt: gv.sdt,
            trinhdo: gv.trinhdo,
            chuyenmon: gv.chuyenmon,
            selected: (
              <Link
                to="/schedule/view"
                state={{ giaovien: gv }}
                className="text-blue-500 font-semibold"
              >
                Chọn
              </Link>
            ),
          }))
        );
      } catch (error) {
        console.error("[SCHEDULE TEACHERS]", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Title text="Chọn giáo viên để xếp lịch dạy" className="mb-10" />
      <Table
        headers={[
          "ID",
          "Họ tên",
          "Ngày sinh",
          "Email",
          "Số điện thoại",
          "Trình độ",
          "Chuyên môn",
          "Chọn",
        ]}
        rows={dsGV}
      />
    </>
  );
};

export default ChonGiaoVien;
