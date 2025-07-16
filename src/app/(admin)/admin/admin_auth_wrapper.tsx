import { auth } from "@/auth";
import {redirect} from "next/navigation";
import { getUserRoleByEmail } from "@/lib/_data_access/users";
import React from "react";

export default async function AdminAuthWrapper({ children }: { children:React.ReactNode }) {
    const session = await auth();
    if (!session) {
        return redirect('/login');  // TODO decide where to redirect
    }

    const userRole = await getUserRoleByEmail(session.user?.email);
    if (userRole !== "admin") {
        return redirect("/login");
    }

    return (
        <>
            {children}
        </>
    )
}