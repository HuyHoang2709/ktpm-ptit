import { useState } from "react";
import Card from "../../components/Card";
import FormControl from "../../components/FormControl";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!username) toast.error("Vui lòng nhập tên đăng nhập!");
    else if (!password) toast.error("Vui lòng nhập mật khẩu!");
    else {
      // Check input
      if (username === "nva123" && password === "123456") {
        toast.success("Đăng nhập thành công!");

        // Save user info to local storage
        localStorage.setItem("user", JSON.stringify({ id: 1, ten: "Demo" }));

        // Redirect to home page
        navigate("/");
      } else {
        toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    }
  };

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
