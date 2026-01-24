export type ReportStatus = "NEW" | "IN_PROGRESS" | "DONE";

export interface Report {
    id: string;
    title: string;
    description: string;
    category: "POTHOLE" | "SIDEWALK" | "LIGHTING" | "OTHER";
    lat: number;
    lng: number;
    imageUrl?: string;
    status: ReportStatus;
    createdAt: string;
}

console.log("report.ts loaded");
