'use server';

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