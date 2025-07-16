'use server';


import dayjs from "dayjs";
import "dayjs/locale/ar-sa";
dayjs.locale("ar-sa");

import { auth } from "@/auth";

import AnonymousUserReservationPage from "@/components/ui/main_pages/reservation_page/anonymousUserReservationPage";
import {UserReservePage} from "@/components/ui/main_pages/reservation_page/user_reserve_page";


export default async function Page() {
  const session = await auth();
  if (!session) {
    // return redirect('/login');  // TODO decide where to redirect
    return (
          <AnonymousUserReservationPage />
    )
  }

  return (
      <div className='p-10'>
          <UserReservePage />
      </div>
  )
}
