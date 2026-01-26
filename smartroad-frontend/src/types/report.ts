export type ReportStatus = "NEW" | "IN_PROGRESS" | "DONE";
export type DangerLevel = "LOW" | "MEDIUM" | "HIGH";
export interface Report {
    id: number;
    title: string;
    address: string;
    description: string;
    category: "POTHOLE" | "SIDEWALK" | "LIGHTING" | "OTHER";
    lat: number;
    lng: number;
    imageUrl?: string;
    status: ReportStatus;
    createdAt: string;
    dangerLevel: DangerLevel;
}
export async function createReport(formData: FormData) {
    const res = await fetch("http://localhost:8000/reports", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Create report failed");
    }

    return res.json();
}


console.log("report.ts loaded");
