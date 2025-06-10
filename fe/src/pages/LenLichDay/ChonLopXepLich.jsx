import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import Table from "../../components/Table";

const ChonLopXepLich = () => {
  const [dsLop, setDsLop] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API}/dangkyday/dslop`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();

        setDsLop(
          data.map((lop) => ({
            id: lop.id,
            ten: lop.ten,
            mota: lop.mota,
            hocphi: new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(lop.hocphi),
            chuongtrinh: lop.chuongtrinhhoc.ten,
            select: (
              <Link
                state={{ lophoc: lop }}
                className="text-blue-500 font-semibold"
                to="/schedule/view"
              >
                Chọn
              </Link>
            ),
          }))
        );
      } catch (error) {
        console.error("[SCHEDULE CLASSES]", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Title text="Chọn lớp để xếp lịch" className="mb-10" />
      <Table
        headers={[
          "ID",
          "Tên lớp",
          "Mô tả",
          "Học phí",
          "Chương trình",
          "Chọn lớp",
        ]}
        rows={dsLop}
      />
    </div>
  );
};

export default ChonLopXepLich;
