import { useForm } from "react-hook-form";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Watch password to match confirm password
  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      await api.post("/register", data);
      alert("Signup Success!");
      navigate("/login");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Failed"));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto", gap: "10px" }}>
        
        <input {...register("username", {required: true})} placeholder="Username" />
        <input {...register("email", {required: true})} placeholder="Email" type="email" />
        <input {...register("age")} placeholder="Age" type="number" />
        
        <select {...register("gender")}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>

        {/* Password */}
        <input 
            {...register("password", { required: "Password required", minLength: {value: 6, message: "Min 6 chars"} })} 
            placeholder="Password" type="password" 
        />
        {errors.password && <span style={{color:"red", fontSize:"12px"}}>{errors.password.message}</span>}

        {/* Confirm Password */}
        <input 
            {...register("confirmPassword", { 
                validate: value => value === password || "Passwords do not match"
            })} 
            placeholder="Confirm Password" type="password" 
        />
        {errors.confirmPassword && <span style={{color:"red", fontSize:"12px"}}>{errors.confirmPassword.message}</span>}

        <button type="submit" style={{ padding: "10px", background: "blue", color: "white" }}>Register</button>
      </form>
    </div>
  );
}