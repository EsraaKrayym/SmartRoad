import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext.tsx";
import "./css/RoleSelectPage.css";

export default function RoleSelectPage() {
    const navigate = useNavigate();
    const { setRole } = useRole();

    function selectRole(role: "USER" | "ADMIN") {
        setRole(role);
        navigate("/login");
    }

    return (
        <div className="role-page">
            <div className="role-card">
                <h1>Welcome to SmartRoad</h1>
                <p className="subtitle">Please choose how you want to continue</p>

                <div className="role-options">
                    <button
                        className="role-option user"
                        onClick={() => selectRole("USER")}
                    >
                        <span className="icon">👤</span>
                        <h3>User</h3>
                        <p>Report road damages and view the map</p>
                    </button>

                    <button
                        className="role-option admin"
                        onClick={() => selectRole("ADMIN")}
                    >
                        <span className="icon">🛠️</span>
                        <h3>Admin</h3>
                        <p>Manage reports and users</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
