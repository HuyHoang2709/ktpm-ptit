import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import FormControl from "../../components/FormControl";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const request = await fetch(
        `${import.meta.env.VITE_BASE_API}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!request.ok) {
        toast.error("Đăng nhập thất bại!");
        return;
      }

      const response = await request.json();
      localStorage.setItem("user", JSON.stringify(response));
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      console.error("[LOGIN ERROR]", error);
      toast.error("Đăng nhập thất bại!");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-r from-cyan-500 to-blue-500">
      <Card className="w-[480px]">
        <h1 className="text-2xl text-center font-semibold mb-10">Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <label htmlFor="login-username">Tên đăng nhập:</label>
            <Input
              placeholder="VD: nva123"
              id="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="login-password">Mật khẩu:</label>
            <Input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" variants="primary" className="w-full mt-4">
            Đăng nhập
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
