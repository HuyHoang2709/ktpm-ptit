import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import FormControl from "../../components/FormControl";
import Button from "../../components/Button";
import Input from "../../components/Input";
import toast from "react-hot-toast";

const SuaGiaoVien = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { giaovien } = location.state || {};

  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [expertise, setExpertise] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: +giaovien.id,
      hoten: name,
      ngaysinh: birth,
      sdt: phone,
      email: email,
      trinhdo: level,
      chuyenmon: expertise,
      username: username,
      password: password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API}/giaovien/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 404) {
        toast.error("Không tìm thấy giáo viên");
        return;
      }
      if (response.status === 409) {
        toast.error("Tên đăng nhập đã được sử dụng");
        return;
      }
      if (response.status !== 200) {
        throw new Error("Failed to update teacher");
      }

      toast.success("Cập nhật thông tin giáo viên thành công");
      navigate("/teachers");
    } catch (error) {
      console.error("[EDIT TEACHER]", error);
      toast.error("Lỗi khi cập nhật thông tin giáo viên");
      return;
    }
  };

  useEffect(() => {
    setName(giaovien.hoten);
    setBirth(giaovien.ngaysinh);
    setPhone(giaovien.sdt);
    setEmail(giaovien.email);
    setLevel(giaovien.trinhdo);
    setExpertise(giaovien.chuyenmon);
    setUsername(giaovien.username);
    setPassword(giaovien.password);
  }, [giaovien]);

  return (
    <>
      <Title text="Sửa Thông Tin Giáo Viên" className="mb-10" />
      <div className="max-w-5xl mx-auto">
        <form>
          <div className="flex gap-6">
            <FormControl>
              <label htmlFor="add-gv-name">Họ tên:</label>
              <Input
                id="add-gv-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="add-gv-birth">Ngày sinh:</label>
              <Input
                id="add-gv-birth"
                type="date"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="flex gap-6">
            <FormControl>
              <label htmlFor="">Số điện thoại:</label>
              <Input
                id="add-gv-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="add-gv-email">Email:</label>
              <Input
                id="add-gv-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="flex gap-6">
            <FormControl>
              <label htmlFor="add-gv-level">Trình độ:</label>
              <Input
                id="add-gv-level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="add-gv-expertise">Chuyên môn:</label>
              <Input
                id="add-gv-expertise"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
              />
            </FormControl>
          </div>
          <FormControl>
            <label htmlFor="add-gv-username">Tên đăng nhập:</label>
            <Input
              id="add-gv-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="add-gv-password">Mật khẩu:</label>
            <Input
              id="add-gv-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <div className="flex justify-between mt-6">
            <Button isLink={true} link="/teachers" variants="secondary">
              Hủy
            </Button>
            <Button type="submit" variants="primary" onClick={handleSubmit}>
              Xác nhận
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SuaGiaoVien;
