'use server'

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
    addDisallowedReservationDateFullDay,
    addDisallowedReservationDateTimePeriod,
    getAllDisallowedReservationDatesTimesSlots,
    deleteDisallowedReservationDate
} from "@/lib/_data_access/disallowed_reservations_dates";


export async function getAllDisallowedReservationDatesTimesSlotsServerAction() {
    const session = await auth()
    if (!session) {
        redirect('/api/auth/signin');
    }
    try {
        const response = await getAllDisallowedReservationDatesTimesSlots();
        if (response === null || response === undefined) {
            return null;
        }
        return response;
    } catch {
        return null;
    }
}

export async function addDisallowedReservationDateFullDayServerAction(parameters : {
    dateInISO8601Format: string,
    is_full_day: boolean
}) {
    const session = await auth()
    if (!session) {
        redirect('/api/auth/signin');
    }
    try {

        // check if string is in ISO 8601 format
        const date = new Date(parameters.dateInISO8601Format);
        if (!isNaN(date.getTime()) && parameters.dateInISO8601Format === date.toISOString()) {

        } else {
            return null;
        }

        const hasBeenAdded = await addDisallowedReservationDateFullDay({
            dateInISO8601Format: parameters.dateInISO8601Format,
            is_full_day: parameters.is_full_day
        });
        if (hasBeenAdded === null) {
            return null;
        }

        return hasBeenAdded;
    } catch {
        return null;
    }
}

export async function addDisallowedReservationDateTimePeriodServerAction(parameters : {
    dateInISO8601Format: string,
    startTimeISO8601Format: string,
    endTimeISO8601Format: string,
}) {
    const session = await auth()
    if (!session) {
        redirect('/api/auth/signin');
    }
    try {
        // check if string is in ISO 8601 format
        const dateObject = new Date(parameters.dateInISO8601Format);
        const startTimeObject = new Date(parameters.startTimeISO8601Format);
        const endTimeObject = new Date(parameters.endTimeISO8601Format);

        if (!isNaN(dateObject.getTime()) && parameters.dateInISO8601Format === dateObject.toISOString()) {

        } else {
            return null;
        }
        if (!isNaN(startTimeObject.getTime()) && parameters.startTimeISO8601Format === startTimeObject.toISOString()) {

        } else {
            return null;
        }
        if (!isNaN(endTimeObject.getTime()) && parameters.endTimeISO8601Format === endTimeObject.toISOString()) {

        } else {
            return null;
        }

        const hasBeenAdded = await addDisallowedReservationDateTimePeriod({
            dateInISO8601Format: parameters.dateInISO8601Format,
            startTimeISO8601Format: parameters.startTimeISO8601Format,
            endTimeISO8601Format: parameters.endTimeISO8601Format
        });

        if (hasBeenAdded === null) {
            return null;
        }

        return hasBeenAdded;
    } catch {
        return null;
    }
}

export async function deleteDisallowedReservationDateTimeServerAction(
    params:
    {
        dateInISO8601Format: string;
        isFullDay: boolean;
        startTimeInISO8601Format?: string;
        endTimeInISO8601Format?: string;
    }) {
    const session = await auth();
    if (!session) {
        redirect('/api/auth/signin');
    }
    try {
        const dateInISO8601Format: string = params['dateInISO8601Format'];
        const isFullDay: boolean = params['isFullDay'];
        if (isFullDay) {
            const response = await deleteDisallowedReservationDate({dateInISO8601Format: dateInISO8601Format, isFullDay: true});
            return !!response;
        } else {
            const startTimeInISO8601Format: string = params['startTimeInISO8601Format']!;
            const endTimeInISO8601Format: string = params['endTimeInISO8601Format']!;
            const response = await deleteDisallowedReservationDate({dateInISO8601Format: dateInISO8601Format, isFullDay: false, startTimeInISO8601Format: startTimeInISO8601Format, endTimeInISO8601Format: endTimeInISO8601Format});
            return !!response;
        }
    } catch {
        return null;
    }
}