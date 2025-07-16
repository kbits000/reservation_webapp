import 'server-only'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/dbConnect';
import ReservationsModel from '@/lib/database_models/reservations_model';


export async function addReservations() {
    const session = await auth()
    if (!session) {
    // redirect('/api/auth/signin?callbackUrl=/user');
    redirect('/api/auth/signin');
    }
}

export async function getReservationsForDate(dateInISO8601Format: string) {
    try {
        await dbConnect();
        const reservations = await ReservationsModel.find({date: dateInISO8601Format, status: 'open'}).lean();  // TODO check if date is in ISO8601 format

        const reservationsDTOList = [];
        let id = 0;
        for (const reservation of reservations) {
            const reservationDTO = {
                key: id,
                date: reservation['date'],
                start_time: reservation['start_time'],
                end_time: reservation['end_time']
            }
            reservationsDTOList.push(reservationDTO);
            id++;
        }
        return reservationsDTOList;
    } catch {
        return null;
    }
}

export async function updateReservations() {
    const session = await auth()
    if (!session) {
    // redirect('/api/auth/signin?callbackUrl=/user');
    redirect('/api/auth/signin');
    }
}

export async function deleteReservations() {
    const session = await auth()
    if (!session) {
    // redirect('/api/auth/signin?callbackUrl=/user');
    redirect('/api/auth/signin');
    }
}