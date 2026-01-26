import { useEffect, useState } from "react";
import { listReports } from "../../api/report.api";
import type { Report } from "../../types/report";
import ReportCard from "../../components/reports/ReportCard";

export default function ReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        listReports().then(setReports);
    }, []);

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <h2>Reports</h2>
            {reports.map(r => <ReportCard key={r.id} r={r} />)}
        </div>
    );
}
