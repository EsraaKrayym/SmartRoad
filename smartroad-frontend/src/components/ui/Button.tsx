export default function Button(
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }
) {
    const { variant = "primary", style, ...rest } = props;

    const base: React.CSSProperties = {
        borderRadius: 10,
        padding: "10px 12px",
        border: "1px solid #e7e8ee",
        cursor: "pointer",
        fontWeight: 600,
    };

    const variants: Record<string, React.CSSProperties> = {
        primary: { background: "#111", color: "white" },
        ghost: { background: "transparent", color: "#111" },
    };

    return <button {...rest} style={{ ...base, ...variants[variant], ...style }} />;
}
