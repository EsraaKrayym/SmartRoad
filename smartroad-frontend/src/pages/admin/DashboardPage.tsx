import StatCard from "../../components/ui/StatCard";
import "../css/admin.css";

export default function DashboardPage() {
    return (
        <>
            <h1>Admin Dashboard</h1>
            <p>Welcome To SmartRoad</p>


            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <span>Total Users</span>
                    <strong>18</strong>
                </div>

                <div className="stat-card">
                    <span>Total Reports</span>
                    <strong>261</strong>
                </div>

                <div className="stat-card">
                    <span>Active Users</span>
                    <strong>18</strong>
                </div>
            </div>
            {/* Quick actions */}
            <div className="quick-actions">
                <h3 className="quick-title">Quick Actions</h3>

                <div className="quick-row">
                    <div className="quick-card">User Management</div>
                    <div className="quick-card">Report Management</div>
                    <div className="quick-card">Map Overview</div>
                </div>
            </div>


        </>
    );
}
