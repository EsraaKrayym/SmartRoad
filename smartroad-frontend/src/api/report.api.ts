import { http } from "./http";
import type { Report, ReportStatus } from "../types/report";

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
    const res = await http.patch<Report>(`/reports/${id}/status`, { status });
    return res.data;
}
