import { useEffect, useState } from "react";
import { listReports } from "../../api/report.api";
import type { Report } from "../../types/report";
import StatusBadge from "../../components/reports/StatusBadge";
import Button from "../../components/ui/Button.tsx";

export default function AdminReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        listReports().then(setReports);
    }, []);

    return (
        <div style={{ display: "grid", gap: 24 }}>
            <h1>Reports</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: 20,
                }}
            >
                {reports.map((r) => (
                    <div key={r.id} className="card" style={{ display: "grid", gap: 12 }}>

                        {/* Header */}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <strong>{r.title}</strong>
                            <StatusBadge status={r.status} />
                        </div>

                        {/* Image */}
                        {r.image_url && (
                            <img
                                src={r.image_url}
                                alt="report"
                                style={{
                                    width: "100%",
                                    height: 180,
                                    objectFit: "cover",
                                    borderRadius: 12,
                                }}
                            />
                        )}

                        {/* Meta */}
                        <div style={{ fontSize: 14, opacity: 0.85 }}>
                            <div>📍 {r.address}</div>
                            <div>
                                Lat: {r.lat}, Lng: {r.lng}
                            </div>
                            <a
                                href={`https://www.google.com/maps?q=${r.lat},${r.lng}`}
                                target="_blank"
                            >
                                View on Google Maps
                            </a>
                        </div>

                        {/* Actions */}
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <Button>Status</Button>
                            <Button>Edit</Button>
                            <Button variant="danger">Delete</Button>
                            <Button variant="ghost">History</Button>
                        </div>

                        {/* Share */}
                        <Button
                            style={{ background: "#25D366" }}
                            onClick={() =>
                                window.open(
                                    `https://wa.me/?text=Report: ${r.title} ${r.lat},${r.lng}`
                                )
                            }
                        >
                            Share on WhatsApp
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
