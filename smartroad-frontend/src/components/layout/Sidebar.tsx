import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2 className="logo">SmartRoad</h2>

            <nav className="sidebar-nav">
                <NavLink to="/admin">Dashboard</NavLink>
                <NavLink to="/admin/reports">Reports</NavLink>
                <NavLink to="/admin/map">Map</NavLink>
                <NavLink to="/admin/users">Users</NavLink>
            </nav>

            <div className="admin-footer">
                <div className="avatar">A</div>
                <div>
                    <b>Admin</b>
                    <div>admin@smartroad.de</div>
                </div>
            </div>
        </aside>
    );
}
