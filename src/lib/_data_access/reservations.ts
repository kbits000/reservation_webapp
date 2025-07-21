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

export async function getPendingReservationsForSpecificDate(dateInISO8601Format: string) {
    try {
        // check if string is in ISO 8601 format
        const dateObj = new Date(dateInISO8601Format);
        if (!isNaN(dateObj.getTime()) && dateInISO8601Format === dateObj.toISOString()) {
        } else {
            return null;
        }

        await dbConnect();

        // Pending Reservations
        const pendingReservations = await ReservationsModel.find({date: dateObj, status: 'pending'}).lean();
        const pendingReservationsDTOList = [];
        let id = 0;
        for (const reservation of pendingReservations) {
            const reservationDTO = {
                key: id,
                date: reservation['date'],
                start_time: reservation['start_time'],
                end_time: reservation['end_time']
            }
            pendingReservationsDTOList.push(reservationDTO);
            id++;
        }

        return pendingReservationsDTOList;
    } catch {
        return null;
    }
}

export async function getPendingOrConfirmedReservationsForSpecificDate(dateInISO8601Format: string) {
    try {
        // check if string is in ISO 8601 format
        const dateObj = new Date(dateInISO8601Format);
        if (!isNaN(dateObj.getTime()) && dateInISO8601Format === dateObj.toISOString()) {
        } else {
            return null;
        }

        await dbConnect();

        // Pending Reservations
        const pendingReservations = await ReservationsModel.find({date: dateObj, status: 'pending'}).lean();
        const pendingReservationsDTOList = [];
        let id = 0;
        for (const reservation of pendingReservations) {
            const reservationDTO = {
                key: id,
                date: reservation['date'],
                start_time: reservation['start_time'],
                end_time: reservation['end_time']
            }
            pendingReservationsDTOList.push(reservationDTO);
            id++;
        }

        // Confirmed Reservations
        const confirmedReservations = await ReservationsModel.find({date: dateObj, status: 'confirmed'}).lean();
        const confirmedReservationsDTOList = [];
        id = 0;
        for (const reservation of confirmedReservations) {
            const reservationDTO = {
                key: id,
                date: reservation['date'],
                start_time: reservation['start_time'],
                end_time: reservation['end_time']
            }
            confirmedReservationsDTOList.push(reservationDTO);
            id++;
        }

        const pendingOrConfirmedReservationsDTOList = pendingReservationsDTOList.concat(confirmedReservationsDTOList);

        return pendingOrConfirmedReservationsDTOList;
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