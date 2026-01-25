import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Report } from "../../types/report";

type Props = {
    reports: Report[];
};

export default function ReportsMap({ reports }: Props) {
    return (
        <MapContainer
            center={[52.52, 13.405]} // Berlin
            zoom={12}
            style={{ height: "400px", width: "100%", borderRadius: 12 }}
        >
            <TileLayer
                attribution='© OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {reports.map((r) => (
                <Marker key={r.id} position={[r.lat, r.lng]}>
                    <Popup>
                        <strong>{r.title}</strong>
                        <br />
                        {r.description}
                        <br />
                        <b>Status:</b> {r.status}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
