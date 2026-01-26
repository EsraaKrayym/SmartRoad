import { Navigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

export default function AdminRoute({ children }: { children: JSX.Element }) {
    const { role } = useRole();

    if (role !== "ADMIN") {
        return <Navigate to="/login" replace />;
    }

    return children;
}
