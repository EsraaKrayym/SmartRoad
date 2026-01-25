import type { ReportStatus } from "../../types/report";


export default function ReportFilters({
                                          status,
                                          q,
                                          onChange,
                                      }: {
    status: "" | ReportStatus;
    q: string;
    onChange: (v: { status: "" | ReportStatus; q: string }) => void;
}) {
    return (
        <div className="card" style={{ display: "grid", gap: 12 }}>
            <div style={{ fontWeight: 800 }}>Filters</div>

            <div className="row">
                <div className="col">
                    <label style={{fontWeight: 600}}>Search</label>
                    <input
                        value={q}
                        onChange={(e) => onChange({status, q: e.target.value})}
                        placeholder="title or description..."
                    />
                </div>

                <div className="col">
                        <label style={{fontWeight: 600}}>Status</label>
                        <select
                            value={status}
                            onChange={(e) => onChange({status: (e.target.value as any) || "", q})}
                            style={{padding: 10, borderRadius: 10, border: "1px solid #e7e8ee"}}
                        >
                            <option value="">All</option>
                            <option value="NEW">New</option>
                            <option value="IN_PROGRESS">In progress</option>
                            <option value="DONE">Done</option>
                        </select>
                </div>
            </div>
        </div>
    );
}
