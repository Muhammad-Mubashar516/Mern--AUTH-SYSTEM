import { useEffect, useState, useContext } from "react";
import api from "../api";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const { user, loading } = useContext(AuthContext);
    const [usersList, setUsersList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Security Check
        if (!loading) {
            if (!user || !user.isAdmin) {
                alert("⛔ Access Denied! Admins Only.");
                navigate("/");
                return;
            }
            // 2. Fetch Users
            fetchUsers();
        }
    }, [user, loading, navigate]);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users"); // Admin route
            setUsersList(res.data);
        } catch (error) {
            alert("Error fetching users");
        }
    };

    if (loading) return <h2>Checking access...</h2>;

    return (
        <div style={{ padding: "40px" }}>
            <h1 style={{ color: "red", textAlign: "center" }}>🛡️ Admin Dashboard</h1>
            
            <table border="1" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse", textAlign: "center" }}>
                <thead style={{ background: "#333", color: "white" }}>
                    <tr>
                        <th style={{padding:"10px"}}>Username</th>
                        <th style={{padding:"10px"}}>Email</th>
                        <th style={{padding:"10px"}}>Age</th>
                        <th style={{padding:"10px"}}>Gender</th>
                        <th style={{padding:"10px"}}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((u) => (
                        <tr key={u._id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{padding:"10px", fontWeight:"bold"}}>{u.username}</td>
                            <td style={{padding:"10px", color:"blue"}}>{u.email}</td>
                            <td style={{padding:"10px"}}>{u.age || "-"}</td>
                            <td style={{padding:"10px"}}>{u.gender || "-"}</td>
                            <td style={{padding:"10px"}}>
                                {u.isAdmin ? <span style={{color:"red", fontWeight:"bold"}}>Admin</span> : "User"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}