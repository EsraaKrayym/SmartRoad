import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";
import MapPicker from "../components/map/MapPicker";
import { createReport } from "../api/report.api.ts";

export default function ReportNewPage() {
    const nav = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<"POTHOLE" | "SIDEWALK" | "LIGHTING" | "OTHER">("POTHOLE");
    const [pos, setPos] = useState({ lat: 52.52, lng: 13.405 }); // Berlin default
    const [imageUrl, setImageUrl] = useState("");

    const canSubmit = title.trim().length >= 5 && description.trim().length >= 10;

    async function onSubmit() {
        const r = await createReport({
            title: title.trim(),
            description: description.trim(),
            category,
            lat: pos.lat,
            lng: pos.lng,
            imageUrl: imageUrl.trim() || undefined,
        });
        nav(`/reports/${r.id}`);
    }

    return (
        <div className="row">
            <div className="col">
                <div className="card" style={{ display: "grid", gap: 12 }}>
                    <div style={{ fontWeight: 900, fontSize: 18 }}>New Report</div>

                    <Field label="Title (min 5 chars)">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ padding: 10, borderRadius: 10, border: "1px solid #e7e8ee" }}
                            placeholder="e.g., Pothole near bus stop"
                        />
                    </Field>

                    <Field label="Description (min 10 chars)">
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ padding: 10, borderRadius: 10, border: "1px solid #e7e8ee", minHeight: 100 }}
                placeholder="Describe what you saw..."
            />
                    </Field>

                    <Field label="Category">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as any)}
                            style={{ padding: 10, borderRadius: 10, border: "1px solid #e7e8ee" }}
                        >
                            <option value="POTHOLE">Pothole</option>
                            <option value="SIDEWALK">Sidewalk</option>
                            <option value="LIGHTING">Lighting</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </Field>

                    <Field label="Image URL (optional)">
                        <input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            style={{ padding: 10, borderRadius: 10, border: "1px solid #e7e8ee" }}
                            placeholder="https://..."
                        />
                    </Field>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <Button disabled={!canSubmit} onClick={onSubmit} style={{ opacity: canSubmit ? 1 : 0.5 }}>
                            Submit
                        </Button>
                        <Button variant="ghost" onClick={() => nav("/reports")}>Cancel</Button>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card" style={{ display: "grid", gap: 10 }}>
                    <div style={{ fontWeight: 800 }}>Pick location</div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>
                        Click on the map to set the marker.
                    </div>
                    <MapPicker value={pos} onChange={setPos} />
                    <div style={{ fontSize: 12, opacity: 0.8 }}>
                        Selected: {pos.lat.toFixed(6)}, {pos.lng.toFixed(6)}
                    </div>
                </div>
            </div>
        </div>
    );
}
