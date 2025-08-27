'use server';


import dayjs from "dayjs";
import "dayjs/locale/ar-sa";
dayjs.locale("ar-sa");
import { auth } from "@/auth";
import AnonymousUserReservationPage from "@/components/ui/main_pages/reservation_page/anonymousUserReservationPage";
import {UserReservePage} from "@/components/ui/main_pages/reservation_page/user_reserve_page";
import { getUserFullNameAndSexAndPhoneNumberServerAction } from "@/lib/actions/server_actions";


export default async function Page() {
  const session = await auth();
  if (!session) {
    // return redirect('/login');  // TODO decide where to redirect
    return (
          <AnonymousUserReservationPage />
    )
  }
  const userData = await getUserFullNameAndSexAndPhoneNumberServerAction();

  // get user full name and phonenumber
  return (
      <div className='p-10'>
          <UserReservePage userEmail={session.user?.email} userName={session.user?.name} userPhoneNumber={userData?.phone_number} userSex={userData?.sex} userFullName={userData?.full_name}/>
      </div>
  )
}
