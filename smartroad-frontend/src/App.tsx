import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import RoleSelectPage from "./pages/RoleSelectPage.tsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import { useRole } from "./context/RoleContext";
import UserLayout from "./layout/UserLayout";
import UserHomePage from "./pages/user/UserHomePage.tsx";
import ReportsPage from "./pages/user/ReportsPage"
import CreateReportPage from "./pages/user/CreateReportPage"

import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage.tsx";
import MapPage from "./pages/admin/MapPage";
import UsersPage from "./pages/admin/UsersPage";

export default function App() {
    const { role } = useRole();

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/role" />} />
            <Route path="/role" element={<RoleSelectPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/app" element={<UserLayout />}>
                <Route index element={<UserHomePage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="reports/:id" element={<ReportDetailPage />} />
                <Route path="new" element={<CreateReportPage />} />
            </Route>




            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="reports" element={<AdminReportsPage />} />
                <Route path="map" element={<MapPage />} />
                <Route path="users" element={<UsersPage />} />
            </Route>
        </Routes>

    );
}
