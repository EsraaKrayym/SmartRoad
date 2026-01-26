import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReport } from "../api/report.api";
import type { Report } from "../types/report";
import StatusBadge from "../components/reports/StatusBadge";
import ReportsMap from "../components/map/ReportsMap";

export default function ReportDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        getReport(id)
            .then(setReport)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className="card">Loading report...</div>;
    }

    if (!report) {
        return <div className="card">Report not found.</div>;
    }

    return (
        <div style={{ display: "grid", gap: 16 }}>
            {/* 🔙 Back */}
            <Link to="/app/reports" style={{ textDecoration: "none" }}>
                ← Back to reports
            </Link>

            {/* 🧾 Report Info */}
            <div className="card" style={{ maxWidth: 700 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2>Report #{report.id}</h2>
                    <StatusBadge status={report.status} />
                </div>

                <p><b>Address:</b> {report.address}</p>
                <p>
                    <b>Danger level:</b>{" "}
                    {report.dangerLevel === "LOW" && "🟢 Low"}
                    {report.dangerLevel === "MEDIUM" && "🟡 Medium"}
                    {report.dangerLevel === "HIGH" && "🔴 Dangerous"}
                </p>
                <p><b>Description:</b> {report.description}</p>
                <p>
                    <b>Date:</b>{" "}
                    {new Date(report.createdAt).toLocaleString()}
                </p>

                {report.imageUrl && (
                    <img
                        src={report.imageUrl}
                        alt="report"
                        style={{
                            width: "100%",
                            marginTop: 12,
                            borderRadius: 12,
                            border: "1px solid #e7e8ee",
                        }}
                    />
                )}
            </div>

            {/* 🗺️ Map */}
            <div className="card">
                <h3>Location</h3>
                <ReportsMap reports={[report]} />
            </div>
        </div>
    );
}
