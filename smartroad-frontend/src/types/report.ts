export type ReportStatus = "NEW" | "IN_PROGRESS" | "DONE";

export type Report = {
    id: string;
    title: string;
    description: string;
    category: "POTHOLE" | "SIDEWALK" | "LIGHTING" | "OTHER";
    lat: number;
    lng: number;
    imageUrl?: string;
    status: ReportStatus;
    createdAt: string; // ISO
};
