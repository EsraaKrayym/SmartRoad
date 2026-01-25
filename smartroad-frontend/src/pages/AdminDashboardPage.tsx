import { useEffect, useState } from "react";
import { listReports, updateReportStatus } from "../api/report.api";
import type { Report, ReportStatus } from "../types/report";
import Button from "../components/ui/Button";
import StatusBadge from "../components/reports/StatusBadge";

export default function AdminDashboardPage() {
    const [items, setItems] = useState<Report[]>([]);

    useEffect(() => {
        listReports().then(setItems);
    }, []);

    const onStatusChange = async (id: string, status: ReportStatus) => {
        const updated = await updateReportStatus(id, status);
        setItems((prev) =>
            prev.map((r) => (r.id === id ? updated : r))
        );
    };

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 900 }}>
                Admin Dashboard
            </div>

            <div className="card" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th style={{ padding: 10 }}>Title</th>
                        <th style={{ padding: 10 }}>Status</th>
                        <th style={{ padding: 10 }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((r) => (
                        <tr key={r.id}>
                            <td style={{ padding: 10 }}>{r.title}</td>
                            <td style={{ padding: 10 }}>
                                <StatusBadge status={r.status} />
                            </td>
                            <td style={{ padding: 10 }}>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <Button
                                        variant="ghost"
                                        onClick={() => onStatusChange(r.id, "NEW")}
                                    >
                                        New
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => onStatusChange(r.id, "IN_PROGRESS")}
                                    >
                                        In progress
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => onStatusChange(r.id, "DONE")}
                                    >
                                        Done
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {items.length === 0 && (
                        <tr>
                            <td colSpan={3} style={{ padding: 10 }}>
                                No reports.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
