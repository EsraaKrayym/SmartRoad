import { useEffect, useState } from "react";
import {createAIReport, createReport} from "../../../api/report.api";


declare global {
    interface Window {
        roboflow: any;
    }
}

export default function CreateAIReportPage() {
    const [model, setModel] = useState<any>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [aiResult, setAiResult] = useState<any>(null);

    // 🔹 Roboflow laden
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.roboflow.com/0.2.26/roboflow.js";
        script.async = true;

        script.onload = async () => {
            const rf = await window.roboflow.auth({
                publishable_key: "rf_gGj5K2wK4aaTo3Pqmsr16zmt0cw2"
            });

            const loadedModel = await rf.load({
                model: "pothole-detection-lzbpk",
                version: 2
            });

            setModel(loadedModel);
        };

        document.body.appendChild(script);
    }, []);

    // 🔹 Severity berechnen
    function calculateSeverity(
        boxWidth: number,
        boxHeight: number,
        imgWidth: number,
        imgHeight: number
    ) {
        const ratio = (boxWidth * boxHeight) / (imgWidth * imgHeight);
        if (ratio < 0.02) return "LOW";
        if (ratio < 0.06) return "MEDIUM";
        return "HIGH";
    }

    // 🔹 KI starten
    async function runAI(file: File) {
        if (!model) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = async () => {
            const predictions = await model.detect(img);
            if (predictions.length === 0) return;

            const p = predictions[0];
            const severity = calculateSeverity(
                p.width,
                p.height,
                img.width,
                img.height
            );

            setAiResult({
                confidence: p.confidence ?? 0,
                boxWidth: p.width ?? 0,
                boxHeight: p.height ?? 0,
                severity
            });
        };
    }

    // 🔹 Report speichern
    async function submitReport() {
        if (!imageFile || !aiResult) {
            alert("Kein Bild oder KI-Ergebnis");
            return;
        }

        const formData = new FormData();

        formData.append("address", "Automatisch erkannt (KI)");
        formData.append("lat", "52.5200");
        formData.append("lng", "13.4050");
        formData.append("dangerLevel", aiResult.severity); // ⚠️ camelCase!
        formData.append(
            "description",
            `KI-Schlagloch (Confidence: ${Math.round(aiResult.confidence * 100)}%)`
        );

        // 🔥 WICHTIG: Bild MUSS mit
        formData.append("image", imageFile);

        // 🔥 KI-Felder (Backend akzeptiert sie optional)
        formData.append("ai_box_width", String(aiResult.boxWidth ?? 0));
        formData.append("ai_box_height", String(aiResult.boxHeight ?? 0));
        formData.append("ai_confidence", String(aiResult.confidence ?? 0));
        formData.append("severity", aiResult.severity);

        try {
            await createReport(formData); // ✅ GENAU WIE MANUELL
            alert("KI-Report erfolgreich gespeichert!");
        } catch (err) {
            console.error("Fehler beim Speichern:", err);
            alert("Fehler beim Speichern des KI-Reports");
        }
    }



    return (
        <div style={{ padding: "2rem" }}>
            <h2>KI-Report erstellen</h2>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (!e.target.files) return;
                    const file = e.target.files[0];
                    setImageFile(file);
                    runAI(file);
                }}
            />

            {aiResult && (
                <div style={{ marginTop: "1rem" }}>
                    <p><strong>Schweregrad:</strong> {aiResult.severity}</p>
                    <p>
                        <strong>KI-Sicherheit:</strong>{" "}
                        {Math.round(aiResult.confidence * 100)}%
                    </p>

                    <button onClick={submitReport}>
                        Report speichern
                    </button>
                </div>
            )}
        </div>
    );
}
