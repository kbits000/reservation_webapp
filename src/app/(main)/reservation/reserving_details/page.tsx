'use server';
import { ReserverDetailsComponent } from '@/components/ui/main_pages/reservation_page/reserver_details_component';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {getUserFullNameAndSexAndPhoneNumberServerAction} from "@/lib/actions/server_actions";


export default async function ReservingDetailsPage({searchParams,}: { searchParams: Promise<{ startTime: string, endTime: string }> }) {
    const session = await auth();
    if (!session) {
        redirect('/login');  // TODO decide where to redirect
    }

    const { startTime } = await searchParams;
    const { endTime } = await searchParams;
    const userDetails = await getUserFullNameAndSexAndPhoneNumberServerAction();

    return (
        <>
            <ReserverDetailsComponent
                userEmail={session.user?.email}
                userName={session.user?.name}
                reservationTimePeriodInISO8601={[startTime, endTime]}
                userFullName={userDetails!['full_name']}
                userSex={userDetails!['sex']}
                userPhoneNumber={userDetails!['phone_number']}
            />
        </>
    )
}