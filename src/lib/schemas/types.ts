import type {Dayjs} from "dayjs";

export type StartReservationDateTime = {
    startDateYear: string;
    startDateMonth: string;
    startDateDay: string;
    startDateHour: string;
    startDateMinutes: string;
};

export type EndReservationDateTime = {
    endDateYear: string;
    endDateMonth: string;
    endDateDay: string;
    endDateHour: string;
    endDateMinutes: string;
};

export type FieldTypesOfUserReservationForm = {
    username: string;
    full_name: string;
    email: string;
    phone_number: string;
    gender: string;
    reservationDate: Dayjs;
    reservationTimePeriod: Dayjs[];
    reservation_reason?: string;
}

export type formattedFieldTypesOfUserReservationForm = {
    username: string;
    full_name: string;
    email: string;
    phone_number: string;
    gender: string;
    reservationDate: string;
    reservationTimePeriod: string[];
    reservation_reason?: string;
}