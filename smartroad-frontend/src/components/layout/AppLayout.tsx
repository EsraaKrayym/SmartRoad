import NavBar from "./NavBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <div className="container">{children}</div>
        </>
    );
}
