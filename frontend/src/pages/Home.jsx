import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>MERN Auth Home</h1>
      {user ? <h3>Welcome, {user.username} 👋</h3> : <h3>Please Login</h3>}
    </div>
  );
}