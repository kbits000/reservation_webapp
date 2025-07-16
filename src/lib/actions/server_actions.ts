"use server";
import { registerNewUser, getUsers } from "@/lib/_data_access/users";
import { UserRegistrationSchema } from "@/lib/schemas/user_registration_schema";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import {
  getAllAllowedReservationsDateTime,
  addAllowedReservationDateTime,
  getAllAllowedReservationsDateYearMonthDay,
    getAllOpenReservations
} from "@/lib/_data_access/allowed_reservations";

export async function printMeg() {
  console.log("fddfdfwage4rsg");
}

export async function submitSignupForm(newUser: unknown) {
  try {
    const validatedData = UserRegistrationSchema.safeParse(newUser);

    // if (!validatedData.success) {
    //   console.log(validatedData.error.issues);
    //   let errorMessage = "";
  
    //   return {
    //     error: "ERROR"
    //   };
    // }
    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
      }
    }
    // Here you would typically save the address to your database
    // console.log('Address submitted:',typeof( validatedData));

    // console.log('User submitted:', validatedData.data)
    const response = await registerNewUser(validatedData.data);

    // console.log("Inside submitSignupForm function");
    // const values = Object.fromEntries(formData.entries());
    // console.log("Received form values:", values["username"]); // Logs in the server console
    if (response.success) {
      return {
        success: true,
        message: 'User registered successfully!',
        // error: ''
      }
    } else {
      return {
        success: false,
        message: response.message,
        error: response.errors,
        emailExists: response.emailExists
      }
    }
  } catch {
    return {
      success: false,
      message: 'An unexpected error occurred',
      error: ''
    }
  }
}

export async function getAllowedDateTimesServerAction(date: string) {
  const session = await auth()
  if (!session) {
  // redirect('/api/auth/signin?callbackUrl=/user');
  redirect('/api/auth/signin');
  }
  // TODO add checking user role functionallity
  const allowed_times = await getAllAllowedReservationsDateTime(date);
  // console.log("fddfdfwage4rsg: ", allowed_times[0].date);
  // const day = allowed_times[0].date.day;
  // console.log('allowed_times ', allowed_times);
  return allowed_times;
  // console.log('server action allowed_times: ', allowed_times?.start_time);
  // console.log('server action allowed_times: ', allowed_times?.end_time);
  // const allowed_times_object = {
  //   start_time: allowed_times?.start_time,
  //   end_time: allowed_times?.end_time,
  // }
  // return JSON.stringify(allowed_times_object);
}

export async function getAllReservationsOfDateTimeServerAction(date: string) {
  const session = await auth()
  if (!session) {
    // redirect('/api/auth/signin?callbackUrl=/user');
    redirect('/api/auth/signin');
  }
  // TODO add checking user role functionallity

}


type StartReservationDateTime = {
  startDateYear: string;
  startDateMonth: string;
  startDateDay: string;
  startDateHour: string;
  startDateMinutes: string;
};

type EndReservationDateTime = {
  endDateYear: string;
  endDateMonth: string;
  endDateDay: string;
  endDateHour: string;
  endDateMinutes: string;
};

export async function addAllowedReservationDateTimeServerAction(
    startDate: StartReservationDateTime,
    endDate: EndReservationDateTime
) {
  const session = await auth()
  if (!session) {
    // redirect('/api/auth/signin?callbackUrl=/user');
    redirect('/api/auth/signin');
  }
  // TODO add checking user role functionallity

  // const {startDate, endDate} = data;
  if (!startDate || !endDate) {
    return;
  }

  try {
    const reservationDateTimeHasBeenAdded = await addAllowedReservationDateTime(startDate, endDate);
    if (reservationDateTimeHasBeenAdded?.success) {
      return true;
    } else if (reservationDateTimeHasBeenAdded?.success === false) {
      return false;
    } else if (reservationDateTimeHasBeenAdded === null) {
      return null;
    }
  } catch {
    return null;
  }
}

export async function getAllAllowedReservationsDateYearMonthDayServerAction() {
  getAllAllowedReservationsDateYearMonthDay();
}

export async function getUsersDataServerAction() {
  const session = await auth()
  if (!session) {
    // redirect('/api/auth/signin?callbackUrl=/user');
    redirect('/api/auth/signin');
  }

  try {
    const usersData = await getUsers();
    // console.log('usersData Server action', usersData);
    return usersData;
  } catch {
    return null;
  }
}

// TODO move this function
export async function getAllAvailableReservationsServerAction() {

  try {
    const aa = await getAllOpenReservations();
  } catch {
    return null;
  }
}