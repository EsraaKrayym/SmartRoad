type Props = {
    title: string;
    value: string;
    color: "blue" | "green" | "purple";
};

export default function StatCard({ title, value, color }: Props) {
    return (
        <div className={`stat-card ${color}`}>
            <div className="stat-title">{title}</div>
            <div className="stat-value">{value}</div>
        </div>
    );
}
