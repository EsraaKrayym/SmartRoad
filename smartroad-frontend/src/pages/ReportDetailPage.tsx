import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReport } from "../api/reports.api";
import { Report } from "../types/report";
import MapViewer from "../components/map/MapViewer";
import StatusBadge from "../components/reports/StatusBadge";

export default function ReportDetailPage() {
    const { id } = useParams();
    const [r, setR] = useState<Report | null>(null);
    const [err, setErr] = useState<string>("");

    useEffect(() => {
        if (!id) return;
        getReport(id).then(setR).catch((e) => setErr(String(e?.message || e)));
    }, [id]);

    if (err) return <div className="card">Error: {err}</div>;
    if (!r) return <div className="card">Loading...</div>;

    return (
        <div className="row">
            <div className="col">
                <div className="card" style={{ display: "grid", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                        <div style={{ fontWeight: 900, fontSize: 18 }}>{r.title}</div>
                        <StatusBadge status={r.status} />
                    </div>
                    <div style={{ opacity: 0.85 }}>{r.description}</div>

                    <div style={{ fontSize: 12, opacity: 0.7 }}>
                        Category: <b>{r.category}</b> · Created: {new Date(r.createdAt).toLocaleString()}
                    </div>

                    {r.imageUrl ? (
                        <img
                            src={r.imageUrl}
                            alt="report"
                            style={{ width: "100%", borderRadius: 12, border: "1px solid #e7e8ee" }}
                        />
                    ) : null}
                </div>
            </div>

            <div className="col">
                <div className="card" style={{ display: "grid", gap: 10 }}>
                    <div style={{ fontWeight: 800 }}>Location</div>
                    <MapViewer lat={r.lat} lng={r.lng} label={r.title} />
                </div>
            </div>
        </div>
    );
}
