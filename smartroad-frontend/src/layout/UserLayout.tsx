// src/layout/UserLayout.tsx
import { Outlet, Link } from "react-router-dom";

export default function UserLayout() {
    return (
        <div>
            <header style={{ padding: 16, borderBottom: "1px solid #eee", display: "flex", gap: 16 }}>
                <b>SmartRoad</b>
                <Link to="/app">Map</Link>
                <Link to="/app/reports">Reports</Link>
                <Link to="/app/new">Create Report</Link>
                <Link to="/login">Logout</Link>
            </header>

            <main style={{ padding: 16 }}>
                <Outlet />
            </main>
        </div>
    );
}
