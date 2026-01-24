import { Report, ReportStatus } from "../types/report";

/**
 * مؤقتًا: بيانات Mock حتى نكمل Frontend بدون Backend.
 * لاحقًا نستبدلها باستدعاءات http.get/post/patch.
 */
let MOCK: Report[] = [
    {
        id: "r1",
        title: "Pothole near intersection",
        description: "Deep pothole, cars swerve to avoid it.",
        category: "POTHOLE",
        lat: 52.5200,
        lng: 13.4050,
        status: "NEW",
        createdAt: new Date().toISOString(),
    },
];

export async function listReports(params?: { status?: ReportStatus; q?: string }) {
    const { status, q } = params || {};
    let data = [...MOCK];
    if (status) data = data.filter(r => r.status === status);
    if (q) {
        const s = q.toLowerCase();
        data = data.filter(r => r.title.toLowerCase().includes(s) || r.description.toLowerCase().includes(s));
    }
    return data;
}

export async function getReport(id: string) {
    const r = MOCK.find(x => x.id === id);
    if (!r) throw new Error("Not found");
    return r;
}

export async function createReport(input: Omit<Report, "id" | "createdAt" | "status">) {
    const newReport: Report = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        status: "NEW",
    };
    MOCK = [newReport, ...MOCK];
    return newReport;
}

export async function updateReportStatus(id: string, status: ReportStatus) {
    MOCK = MOCK.map(r => (r.id === id ? { ...r, status } : r));
    return getReport(id);
}
