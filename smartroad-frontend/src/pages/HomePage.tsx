import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const nav = useNavigate();

    return (
        <div className="row">
            <div className="col">
                <div className="card" style={{ display: "grid", gap: 10 }}>
                    <div style={{ fontSize: 24, fontWeight: 900 }}>Infrastructure Reporting</div>
                    <div style={{ opacity: 0.85 }}>
                        Create reports with location + photo and track processing status.
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <Button onClick={() => nav("/reports/new")}>Create Report</Button>
                        <Button variant="ghost" onClick={() => nav("/reports")}>
                            Browse Reports
                        </Button>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card">
                    <div style={{ fontWeight: 800, marginBottom: 8 }}>What’s included (Frontend)</div>
                    <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
                        <li>Map picker (OpenStreetMap + Leaflet)</li>
                        <li>Report form + validation</li>
                        <li>List + filters</li>
                        <li>Detail view + admin status update</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
