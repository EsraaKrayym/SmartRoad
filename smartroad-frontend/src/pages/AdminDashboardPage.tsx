import { useEffect, useState } from "react";
import { listReports, updateReportStatus } from "../api/report.api.ts";
import type{ Report, ReportStatus } from "../types/report";
import Button from "../components/ui/Button";
import StatusBadge from "../components/reports/StatusBadge";

export default function AdminDashboardPage() {
    const [items, setItems] = useState<Report[]>([]);

    async function refresh() {
        const data = await listReports();
        setItems(data);
    }

    useEffect(() => { refresh(); }, []);

    async function setStatus(id: string, status: ReportStatus) {
        await updateReportStatus(id, status);
        await refresh();
    }

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 900 }}>Admin Dashboard</div>

            <div className="card" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ textAlign: "left" }}>
                        <th style={{ padding: 10, borderBottom: "1px solid #e7e8ee" }}>Title</th>
                        <th style={{ padding: 10, borderBottom: "1px solid #e7e8ee" }}>Status</th>
                        <th style={{ padding: 10, borderBottom: "1px solid #e7e8ee" }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((r) => (
                        <tr key={r.id}>
                            <td style={{ padding: 10, borderBottom: "1px solid #f0f1f5" }}>{r.title}</td>
                            <td style={{ padding: 10, borderBottom: "1px solid #f0f1f5" }}>
                                <StatusBadge status={r.status} />
                            </td>
                            <td style={{ padding: 10, borderBottom: "1px solid #f0f1f5" }}>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    <Button variant="ghost" onClick={() => setStatus(r.id, "NEW")}>New</Button>
                                    <Button variant="ghost" onClick={() => setStatus(r.id, "IN_PROGRESS")}>In progress</Button>
                                    <Button variant="ghost" onClick={() => setStatus(r.id, "DONE")}>Done</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {items.length === 0 ? (
                        <tr><td colSpan={3} style={{ padding: 10 }}>No reports.</td></tr>
                    ) : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
