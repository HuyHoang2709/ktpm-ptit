import { useEffect, useState } from "react";
import Title from "../../components/Title";
import Table from "../../components/Table";
import { Link } from "react-router-dom";

const ChonLop = () => {
  const [dsLop, setDsLop] = useState();
  const [dsDangKy, setDsDangKy] = useState();

  useEffect(() => {
    const giaovien = JSON.parse(localStorage.getItem("user")).info;
    const fetchData = async () => {
      try {
        // Lấy danh sách đăng ký dạy
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
        if (!response1.ok) throw new Error("Failed to fetch registration list");
        const data1 = await response1.json();
        setDsDangKy(data1);

        // Lấy danh sách lớp học
        const response2 = await fetch(
          `${import.meta.env.VITE_BASE_API}/dangkyday/lophoc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response2.ok) throw new Error("Failed to fetch class list");
        const data2 = await response2.json();
        setDsLop(() => {
          const dataLop = data2.filter(
            (lop) => !data1.map((dk) => dk.lophoc.id).includes(lop.id)
          );
          return dataLop.map((lop) => ({
            id: lop.id,
            ten: lop.ten,
            solop: lop.solop,
            select: (
              <Link
                to="/teach-register/info"
                state={{ lophoc: lop }}
                className="text-blue-600 font-semibold"
              >
                Chọn
              </Link>
            ),
          }));
        });
      } catch (error) {
        console.log("[CLASS SELECT]", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Title text="Đăng ký dạy" className="mb-10" />
      <h2 className="mb-4 text-lg">Danh sách lớp đang mở:</h2>
      <Table
        headers={["ID", "Tên lớp", "Tổng số lớp", "Xem chi tiết"]}
        rows={dsLop}
      />
      <h2 className="mb-4 text-lg">Danh sách lớp đã đăng ký:</h2>
      <Table
        headers={["ID", "Tên lớp", "Mô tả", "Học phí", "Chương trình học"]}
        rows={dsDangKy?.map((dk) => ({
          id: dk.lophoc.id,
          ten: dk.lophoc.ten,
          mota: dk.lophoc.mota,
          hocphi: new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "VND",
          }).format(dk.lophoc.hocphi),
          chuongtrinh: dk.lophoc.chuongtrinhhoc.ten,
        }))}
      />
    </>
  );
};

export default ChonLop;
