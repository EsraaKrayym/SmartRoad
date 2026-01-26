import { ReactNode } from "react";
import "./glass.css";

export default function GlassCard({ children }: { children: ReactNode }) {
    return <div className="glass-card">{children}</div>;
}
