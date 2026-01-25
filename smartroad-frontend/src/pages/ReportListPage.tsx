import { useEffect, useState } from "react";
import { listReports } from "../api/report.api.ts";
import type { Report, ReportStatus } from "../types/report";
import ReportCard from "../components/reports/ReportCard";
import ReportFilters from "../components/reports/ReportFilters";
import ReportsMap from "../components/map/ReportsMap";

export default function ReportListPage() {
    const [items, setItems] = useState<Report[]>([]);
    const [status, setStatus] = useState<"" | ReportStatus>("");
    const [q, setQ] = useState("");

    <ReportsMap reports={items} />


    useEffect(() => {
        listReports({
            status: status || undefined,
            q: q || undefined,
        }).then(setItems);
    }, [status, q]);


    return (
        <div style={{display: "grid", gap: 12}}>
            <div style={{fontSize: 22, fontWeight: 900}}>Reports</div>

            <ReportFilters
                status={status}
                q={q}
                onChange={(v) => {
                    setStatus(v.status);
                    setQ(v.q);
                }}
            />

            <div style={{display: "grid", gap: 12}}>
                {items.map((r) => (
                    <ReportCard key={r.id} r={r}/>
                ))}
                {items.length === 0 ? <div className="card">No reports found.</div> : null}
            </div>

            <div style={{display: "grid", gap: 16}}>
                <h1>Reports</h1>

                <ReportsMap reports={items}/>

                {/* bestehende Filter + Liste */}
            </div>

        </div>
    );
}
