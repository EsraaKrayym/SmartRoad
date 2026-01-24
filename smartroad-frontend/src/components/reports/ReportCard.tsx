import { Link } from "react-router-dom";
import type { Report } from "../../types/report";
import StatusBadge from "./StatusBadge";

export default function ReportCard({ r }: { r: Report }) {
    return (
        <div className="card" style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 800 }}>{r.title}</div>
                <StatusBadge status={r.status} />
            </div>
            <div style={{ opacity: 0.8 }}>{r.description}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{new Date(r.createdAt).toLocaleString()}</div>
                <Link to={`/reports/${r.id}`}>Open →</Link>
            </div>
        </div>
    );
}
