import '@ant-design/v5-patch-for-react-19';

import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import MyReservationsList from "@/components/ui/user_pages/reservations/my_reservations_list";
import { getCurrentUserReservationsServerAction } from "@/lib/actions/user_reservation_server_actions";

export const metadata: Metadata = {
    title: "حجوزاتي",
    description: "طلبات الحجز الخاصة بالمستخدم",
};

export default async function UserReservationsPage() {
    const session = await auth();
    if (!session) {
        redirect('/');
    }

    const reservations = await getCurrentUserReservationsServerAction();

    return (
        <main className='min-h-screen p-6 md:p-10'>
            <h1 className='mb-2 text-3xl font-bold md:text-5xl'>حجوزاتي</h1>
            <p className='text-base text-gray-600'>
                اعرض جميع طلبات الحجز الخاصة بك وتابع حالتها أو قم بإلغاء الطلبات المسموح بها.
            </p>

            <MyReservationsList initialReservations={reservations ?? []} />
        </main>
    );
}
