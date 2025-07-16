'use server';

import { getAllAvailableTimeSlotsForDate } from '@/lib/_data_access/allowed_reservations';

export async function getAvailalbleTimeSlotsForDate(dateInISO8601Format: string) {
    try {

    } catch {
        return null;
    }
}

export async function getAllAvailableTimeSlotsForDateServerAction(dateInISO8601Format: string) {
    try {
        console.log('server action start, ')

        const a = await getAllAvailableTimeSlotsForDate(dateInISO8601Format);
        console.log('server action, ', a)
        return a;
    } catch {
        return null;
    }
}