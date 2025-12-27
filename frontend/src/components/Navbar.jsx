import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "15px", background: "#111", color: "white", display: "flex", justifyContent: "space-between" }}>
      <h2>MERN Auth</h2>
      <div style={{display:'flex', gap:'15px', alignItems:'center'}}>
        <Link to="/" style={{color:"white", textDecoration:"none"}}>Home</Link>
        
        {user ? (
            <>
                {/* 👇 SIRF ADMIN KO DIKHEGA */}
                {user.isAdmin && (
                    <Link to="/admin" style={{background:"red", padding:"5px 10px", borderRadius:"5px", color:"white", textDecoration:"none"}}>
                        Admin Panel
                    </Link>
                )}

                <span style={{color:"yellow"}}>Hi, {user.username}</span>
                <button onClick={handleLogout} style={{background:"gray", color:"white", border:"none", padding:"5px 10px", cursor:"pointer"}}>Logout</button>
            </>
        ) : (
            <>
                <Link to="/login" style={{color:"white"}}>Login</Link>
                <Link to="/register" style={{color:"white"}}>Signup</Link>
            </>
        )}
      </div>
    </nav>
  );
}