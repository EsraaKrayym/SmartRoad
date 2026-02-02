import { useEffect } from "react";

declare global {
    interface Window {
        roboflow: any;
    }
}

export default function PotholeDetectionPage() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.roboflow.com/0.2.26/roboflow.js";
        script.async = true;

        script.onload = async () => {
            // ✅ Roboflow korrekt initialisieren
            const rf = await window.roboflow.auth({
                publishable_key: "rf_gGj5K2wK4aaTo3Pqmsr16zmt0cw2"
            });

            const model = await rf.load({
                model: "pothole-detection-lzbpk",
                version: 2
            });

            console.log("Roboflow Modell geladen");

            const input = document.getElementById(
                "potholeInput"
            ) as HTMLInputElement;

            input.onchange = async () => {
                if (!input.files || input.files.length === 0) return;

                const file = input.files[0];

                // ✅ WICHTIG: File → Image umwandeln
                const img = new Image();
                img.src = URL.createObjectURL(file);

                img.onload = async () => {
                    const predictions = await model.detect(img);
                    console.log("Schlagloch-Erkennung:", predictions);
                };
            };
        };

        document.body.appendChild(script);
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Schlagloch erkennen (KI)</h2>

            <input
                type="file"
                id="potholeInput"
                accept="image/*"
            />

            <p>Ergebnis in der Browser-Konsole (F12)</p>
        </div>
    );
}
