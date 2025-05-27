import { useEffect, useState } from "react";
import Title from "../../components/Title";
import toast from "react-hot-toast";
import Table from "../../components/Table";
import Button from "../../components/Button";

const QuanLyGiaoVien = () => {
  const [listGV, setListGV] = useState();

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
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setListGV(
          data.map((item) => ({
            id: item.id,
            hoten: item.hoten,
            ngaysinh: new Date(item.ngaysinh).toLocaleDateString("vi-VN"),
            sdt: item.sdt,
            email: item.email,
            username: item.username,
            trinhdo: item.trinhdo,
            chuyenmon: item.chuyenmon,
            actions: (
              <>
                <button className="text-blue-500 mr-2 hover:cursor-pointer">
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                <button className="text-red-500 hover:cursor-pointer">
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </>
            ),
          }))
        );
      } catch (error) {
        toast.error("Không thể tải danh sách giáo viên!");
        console.error("[TEACHER MANAGEMENT]", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Title text="Quản lý giáo viên" />
      <Button variants="add" className="mb-4 ml-auto">
        Thêm giáo viên mới
      </Button>
      <Table
        headers={[
          "ID",
          "Họ tên",
          "Ngày sinh",
          "Số điện thoại",
          "Email",
          "Username",
          "Trình độ",
          "Chuyên môn",
          "Hành động",
        ]}
        rows={listGV}
      />
    </div>
  );
};

export default QuanLyGiaoVien;
