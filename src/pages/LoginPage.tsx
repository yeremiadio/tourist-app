import Button from "../components/Buttons/Button";
import apiClient from "../utils/apiClient";
import { useState } from "react";
function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = async () => {
    await apiClient()
      .post("api/authaccount/login", { email, password })
      .then((res) => console.log(res));
  };
  return (
    <div>
      LoginPage
      <Button
        bgColor="blue-primary"
        className="text-white hover:bg-blue-600"
        onClick={login}
      >
        Login
      </Button>
    </div>
  );
}

export default LoginPage;
