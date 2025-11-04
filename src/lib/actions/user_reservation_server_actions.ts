'use server';

import { auth } from "@/auth";
import { redirect, RedirectType } from 'next/navigation';
import { getAllAvailableTimeSlotsForDate } from '@/lib/_data_access/allowed_reservations';

export async function getAvailableTimeSlotsForDate(dateInISO8601Format: string) {
    try {
        // check if string is in ISO 8601 format
        const dateObj = new Date(dateInISO8601Format);
        if (!isNaN(dateObj.getTime()) && dateInISO8601Format === dateObj.toISOString()) {
        } else {
            return null;
        }

    } catch {
        return null;
    }
}

export async function getAllAvailableTimeSlotsForDateServerAction(dateInISO8601Format: string) {
    try {
        // check if string is in ISO 8601 format
        const dateObj = new Date(dateInISO8601Format);
        if (!isNaN(dateObj.getTime()) && dateInISO8601Format === dateObj.toISOString()) {
        } else {
            return null;
        }

        const allAvailableTimeSlotsForDate = await getAllAvailableTimeSlotsForDate(dateInISO8601Format);
        return allAvailableTimeSlotsForDate;
    } catch {
        return null;
    }
}


export async function makeReservationServerAction() {
    try {

    } catch {
        return null;
    }
}

export async function redirectToReservingDetailsPageServerAction(selectedStartTime: string, selectedEndTime: string) {
    try {
        const session = await auth()
        if (!session) {
            redirect('/api/auth/signin');
        }
    } catch {
        return null;
    }
    redirect('/reservation/reserving_details', RedirectType.push);
}