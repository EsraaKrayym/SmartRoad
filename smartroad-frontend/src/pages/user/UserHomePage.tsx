import { useEffect, useState } from "react";
import type { Report } from "../../types/report";
import ReportsMap from "../../components/map/ReportsMap";
import GlassCard from "../../components/ui/GlassCard";

export default function UserHomePage() {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/reports")
            .then(r => r.json())
            .then(setReports);
    }, []);

    return (
        <div
            style={{
                display: "grid",
                gap: 32,
                maxWidth: 1200,
                margin: "40px auto",
                padding: "0 20px",
            }}
        >
            <h1 style={{ fontSize: 40, fontWeight: 800 }}>
                🛣️ SmartRoad Reports
            </h1>

            {/* 🗺️ Glass Map */}
            <GlassCard>
                <ReportsMap reports={reports} />
            </GlassCard>

            {/* 📋 Latest Reports */}
            <GlassCard>
                <h3 style={{ marginBottom: 12 }}>Latest Reports</h3>

                {reports.length === 0 && (
                    <p style={{ opacity: 0.6 }}>No reports yet</p>
                )}

                {reports.slice(0, 5).map(r => (
                    <div
                        key={r.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px 0",
                            borderBottom: "1px solid rgba(0,0,0,0.06)",
                        }}
                    >
                        <span>{r.address}</span>
                        <strong>{r.status}</strong>
                    </div>
                ))}
            </GlassCard>
        </div>
    );
}
