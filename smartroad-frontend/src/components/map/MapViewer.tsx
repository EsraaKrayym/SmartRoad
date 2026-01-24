import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function MapViewer({
                                      lat,
                                      lng,
                                      label,
                                  }: {
    lat: number;
    lng: number;
    label?: string;
}) {
    return (
        <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom style={{ height: 420 }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[lat, lng]} icon={markerIcon}>
                {label ? <Popup>{label}</Popup> : null}
            </Marker>
        </MapContainer>
    );
}
