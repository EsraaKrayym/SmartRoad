import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Report, ReportStatus, DangerLevel } from "../../types/report";

type Props = {
    reports: Report[];
};

function getMarkerIcon(status: ReportStatus, danger: DangerLevel) {
    const color =
        status === "NEW" ? "red" :
            status === "IN_PROGRESS" ? "orange" :
                "green";

    const size =
        danger === "HIGH" ? 22 :
            danger === "MEDIUM" ? 18 :
                14;

    return L.divIcon({
        html: `<div style="
      background:${color};
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      border:2px solid white;
    "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
    });
}

function ReportMarkers({ reports }: { reports: Report[] }) {
    return (
        <>
            {reports.map((r) => (
                <Marker
                    key={r.id}
                    position={[r.lat, r.lng]}
                    icon={getMarkerIcon(r.status, r.danger_level)}
                >
                    <Popup>
                        <strong>{r.address}</strong><br />
                        {r.description}
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

export default function ReportsMap({ reports }: Props) {
    return (
        <MapContainer
            center={[52.52, 13.405]}
            zoom={12}
            style={{
                height: "420px",
                width: "100%",
                borderRadius: "18px",
                overflow: "hidden", }}
        >
            <TileLayer
                attribution="© OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ReportMarkers reports={reports} />
        </MapContainer>
    );
}
