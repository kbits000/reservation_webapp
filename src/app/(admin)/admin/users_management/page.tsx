import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {getUserRoleByEmail} from "@/lib/_data_access/users";
import AdminLayout from "@/app/(admin)/admin/admin_layout";
import {UsersManagementTable} from "@/components/ui/admin_pages/users_management/users_management_table";

export default async function AdminUsersManagementPage() {
    const session = await auth();
    if (!session) {
        // TODO should redirect to unauthorized page
        redirect("/");
    }
    const userRole = await getUserRoleByEmail(session.user?.email);

    if (userRole !== "admin") {
        return redirect("/");
    }

    return (
        <AdminLayout role={userRole}>
            <UsersManagementTable />
        </AdminLayout>
    )
}