import type { ReportStatus } from "../../types/report";


type Props = {
    status?: string;
};

const STATUS_MAP: Record<string, { text: string; color: string }> = {
    OPEN: { text: "Offen", color: "#2563eb" },
    IN_PROGRESS: { text: "In Bearbeitung", color: "#f59e0b" },
    DONE: { text: "Erledigt", color: "#16a34a" },
};
export default function StatusBadge({ status }: Props) {
    if (!status || !STATUS_MAP[status]) {
        return (
            <span
                style={{
                    padding: "4px 8px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    background: "#e5e7eb",
                    color: "#374151",
                }}
            >
        Unbekannt
      </span>
        );
    }

    const { text, color } = STATUS_MAP[status];

    return (
        <span
            style={{
                padding: "4px 8px",
                borderRadius: 999,
                border: `1px solid ${color}`,
                fontSize: 12,
                fontWeight: 700,
                color,
                background: "white",
            }}
        >
      {text}
    </span>
    );
}