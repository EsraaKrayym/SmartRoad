import L from "leaflet";
import type {DangerLevel, ReportStatus} from "../../types/report.ts";

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
