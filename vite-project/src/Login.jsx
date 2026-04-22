import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("clicked");

    try {
      const res = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });

      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      setAuth(true);

      navigate("/protected");
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;