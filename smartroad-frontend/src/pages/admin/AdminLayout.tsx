import Sidebar from "../../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <main style={{ flex: 1, padding: 32 }}>
                <Outlet />
            </main>
        </div>
    );
}
