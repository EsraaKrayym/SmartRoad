import { http } from "./http";
import type { Report, ReportStatus } from "../types/report";
import axios from "axios";


export async function listReports(params?: {
    status?: string;
    q?: string;
}): Promise<Report[]> {
    const res = await http.get<Report[]>("/reports/", {
        params,
    });

    return res.data;
}

export async function getReport(id: string): Promise<Report> {
    const res = await http.get<Report>(`/reports/${id}`);
    return res.data;
}

export async function createReport(input: {
    title: string;
    description: string;
    category: string;
    lat: number;
    lng: number;
}): Promise<Report> {
    const res = await http.post<Report>("/reports/", input);
    return res.data;
}

export async function updateReportStatus(
    id: string,
    status: ReportStatus
): Promise<Report> {
    const res = await axios.patch(
        `http://localhost:8000/reports/${id}/status`,
        { status },
        {
            headers: {
                "X-Role": "ADMIN",
            },
        }
    );

    return res.data;
}
export async function createAIReport(data: {
    address: string;
    lat: number;
    lng: number;
    danger_level: string;
    description?: string;
    ai_confidence: number;
    ai_box_width: number;
    ai_box_height: number;
    severity: string;
}) {
    const res = await http.post("/reports/", data);
    return res.data;
}

