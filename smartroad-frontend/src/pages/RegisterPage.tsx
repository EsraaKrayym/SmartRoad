import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function register() {
        if (!email || !password) return alert("Fill all fields");

        // 🔒 später Backend
        alert("Account created!");
        navigate("/login");
    }

    return (
        <div className="card" style={{ maxWidth: 400, margin: "40px auto" }}>
            <h2>Create account</h2>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={register}>Register</button>
        </div>
    );
}
