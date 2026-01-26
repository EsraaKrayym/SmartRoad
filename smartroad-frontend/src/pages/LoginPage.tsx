import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import "./css/LoginPage.css";

export default function LoginPage() {
    const { role } = useRole();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function login(e: React.FormEvent) {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);

        // 🔒 Später echtes Backend-Login
        setTimeout(() => {
            if (role === "ADMIN") navigate("/admin");
            else navigate("/app");
        }, 600);
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>SmartRoad</h1>
                <p className="subtitle">
                    Login as <b>{role}</b>
                </p>

                <form onSubmit={login} className="login-form">
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="login-button" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {role === "USER" && (
                    <div className="login-footer">
                        <span>No account?</span>
                        <Link to="/register">Create one</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
