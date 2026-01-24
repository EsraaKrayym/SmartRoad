import type { ReportStatus } from "../../types/report";

export default function StatusBadge({ status }: { status: ReportStatus }) {
    const map: Record<ReportStatus, { text: string }> = {
        NEW: { text: "New" },
        IN_PROGRESS: { text: "In progress" },
        DONE: { text: "Done" },
    };

    return (
        <span
            style={{
                display: "inline-block",
                padding: "4px 8px",
                borderRadius: 999,
                border: "1px solid #e7e8ee",
                fontSize: 12,
                fontWeight: 700,
                background: "white",
            }}
        >
      {map[status].text}
    </span>
    );
}
