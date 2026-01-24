import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: 10,
    background: isActive ? "#111" : "transparent",
    color: isActive ? "white" : "#111",
});

export default function NavBar() {
    return (
        <div style={{ background: "white", borderBottom: "1px solid #e7e8ee" }}>
            <div className="container" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ fontWeight: 800 }}>SmartRoad</div>
                <nav style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <NavLink to="/" style={linkStyle}>Home</NavLink>
                    <NavLink to="/reports" style={linkStyle}>Reports</NavLink>
                    <NavLink to="/reports/new" style={linkStyle}>New Report</NavLink>
                    <NavLink to="/admin" style={linkStyle}>Admin</NavLink>
                    <NavLink to="/login" style={linkStyle}>Login</NavLink>
                </nav>
            </div>
        </div>
    );
}
