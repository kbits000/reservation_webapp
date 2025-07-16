import '@ant-design/v5-patch-for-react-19';

import { auth } from "@/auth";
import {redirect} from "next/navigation"; // Import auth from auth.ts
import { getUserRoleByEmail } from "@/lib/_data_access/users";
import AdminLayout from "@/app/(admin)/admin/admin_layout";
import React from "react";
import AdminAuthWrapper from "@/app/(admin)/admin/admin_auth_wrapper";

export default async function AdminPage() {
    // AdminAuthWrapper
    const session = await auth();
    if (!session) {
        return redirect('/login');  // TODO decide where to redirect
    }
    const userRole = await getUserRoleByEmail(session.user?.email);

    if (userRole !== "admin") {
        return redirect("/login");
    }
    return (
        <AdminAuthWrapper>
        <AdminLayout role={userRole} >

            <h1>Admin layout</h1>
        </AdminLayout>
        </AdminAuthWrapper>
    )
}