import { useEffect, useState } from "react";
import { listReports } from "../../api/report.api";
import type { Report } from "../../types/report";
import ReportsMap from "../../components/map/ReportsMap";

export default function MapPage() {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        listReports().then(setReports);
    }, []);

    return (
        <div style={{ display: "grid", gap: 16 }}>
            <h1 style={{ fontSize: 32, fontWeight: 800 }}>Map</h1>

            <ReportsMap reports={reports} />
        </div>
    );
}
