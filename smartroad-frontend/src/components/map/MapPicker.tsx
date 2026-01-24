import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";

type LatLng = { lat: number; lng: number };

function ClickHandler({ onPick }: { onPick: (p: LatLng) => void }) {
    useMapEvents({
        click(e) {
            onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });
    return null;
}

// fix default marker icons in many bundlers
const markerIcon = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function MapPicker({
                                      value,
                                      onChange,
                                  }: {
    value: LatLng;
    onChange: (p: LatLng) => void;
}) {
    const center = useMemo(() => [value.lat, value.lng] as [number, number], [value.lat, value.lng]);

    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom style={{ height: 420 }}>
            <TileLayer
                // OSM tiles
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // Required attribution
                attribution="&copy; OpenStreetMap contributors"
            />
            <ClickHandler onPick={onChange} />
            <Marker position={center} icon={markerIcon} />
        </MapContainer>
    );
}
