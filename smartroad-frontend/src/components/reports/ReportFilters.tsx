import { ReportStatus } from "../../types/report";
import Field from "../ui/Field";

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
                    <Field label="Search">
                        <input
                            value={q}
                            onChange={(e) => onChange({ status, q: e.target.value })}
                            placeholder="title or description..."
                            style={{ padding: 10, borderRadius: 10, border: "1px solid #e7e8ee" }}
                        />
                    </Field>
                </div>

                <div className="col">
                    <Field label="Status">
                        <select
                            value={status}
                            onChange={(e) => onChange({ status: (e.target.value as any) || "", q })}
                            style={{ padding: 10, borderRadius: 10, border: "1px solid #e7e8ee" }}
                        >
                            <option value="">All</option>
                            <option value="NEW">New</option>
                            <option value="IN_PROGRESS">In progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </Field>
                </div>
            </div>
        </div>
    );
}
