import { createContext, useContext, useState, useEffect } from "react";

type Role = "USER" | "ADMIN" | null;

type RoleContextType = {
    role: Role;
    setRole: (role: Role) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<Role>(null);

    useEffect(() => {
        const stored = localStorage.getItem("role") as Role;
        if (stored) setRole(stored);
    }, []);

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const ctx = useContext(RoleContext);
    if (!ctx) throw new Error("useRole must be used inside RoleProvider");
    return ctx;
}
