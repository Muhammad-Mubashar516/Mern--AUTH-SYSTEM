import { useForm } from "react-hook-form";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/login", data);
      loginUser(res.data.user);
      alert("Login Success!");
      navigate("/");
    } catch (error) {
      alert("Login Failed!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto", gap: "10px" }}>
        <input {...register("email")} placeholder="Email" required />
        <input {...register("password")} placeholder="Password" type="password" required />
        <button type="submit" style={{ padding: "10px", background: "green", color: "white" }}>Login</button>
      </form>
    </div>
  );
}