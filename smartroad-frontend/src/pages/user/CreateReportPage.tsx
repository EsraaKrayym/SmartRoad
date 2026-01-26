import { useState } from "react";
import { createReport } from "../../api/report.api";

export default function CreateReportPage() {
    const [address, setAddress] = useState("");
    const [dangerLevel, setDangerLevel] = useState("LOW");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    // 📍 TEMPORÄR – später GPS
    const lat = 50.1109;
    const lng = 8.6821;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!address || !image) {
            alert("Address and image are required");
            return;
        }

        const formData = new FormData();
        formData.append("address", address);
        formData.append("lat", lat.toString());
        formData.append("lng", lng.toString());
        formData.append("dangerLevel", dangerLevel);
        formData.append("description", description);
        formData.append("image", image);

        setLoading(true);
        try {
            await createReport(formData);
            alert("Report created successfully");
        } catch (err) {
            console.error(err);
            alert("Error creating report");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card" style={{ maxWidth: 600 }}>
            <h2>Create Report</h2>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
                {/* Adresse */}
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                {/* Gefahr */}
                <div>
                    <label>Danger level</label>
                    <select
                        value={dangerLevel}
                        onChange={(e) => setDangerLevel(e.target.value)}
                    >
                        <option value="LOW">Leicht</option>
                        <option value="MEDIUM">Mittel</option>
                        <option value="HIGH">Gefährlich</option>
                    </select>
                </div>

                {/* Beschreibung */}
                <div>
                    <label>Description</label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Foto */}
                <div>
                    <label>Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        required
                    />
                </div>

                <button disabled={loading}>
                    {loading ? "Saving..." : "Create Report"}
                </button>
            </form>
        </div>
    );
}
