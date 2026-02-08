import 'server-only'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/dbConnect';
import ReservationsModel from '@/lib/database_models/reservations_model';
import DisallowedReservationsDatesModel from '@/lib/database_models/disallowed_reservations_dates_model';
import { formattedFieldTypesOfUserReservationForm } from "@/lib/schemas/types";
import UsersModel from "@/lib/database_models/users_model";
import mongoose, { ClientSession } from 'mongoose';


export async function addReservation(formData: formattedFieldTypesOfUserReservationForm) {
    const authSession = await auth();
    if (!authSession) {
        redirect('/api/auth/signin');
    }

    const dateObj = new Date(formData.reservationDate);
    const startTimeObj = new Date(formData.reservationTimePeriod[0]);
    const endTimeObj = new Date(formData.reservationTimePeriod[1]);

    if (isNaN(dateObj.getTime()) || isNaN(startTimeObj.getTime()) || isNaN(endTimeObj.getTime())) {
        return null;
    }

    if (!formData.reservation_reason) {
        return null;
    }

    try {
        const mongooseInstance = await dbConnect();

        return await mongooseInstance.connection.transaction(async function (session: ClientSession) {
            const user = await UsersModel.findOne({ email: authSession.user?.email }, '_id email').session(session).lean() as { _id: mongoose.Types.ObjectId; email: string } | null;

            if (!user) {
                throw new Error('User not found!');
            }

            const disallowed = await DisallowedReservationsDatesModel.findOne({
                date: dateObj,
                $or: [
                    { is_full_day: true },
                    { start_time: startTimeObj, end_time: endTimeObj }
                ]
            }).session(session).lean();

            if (disallowed) {
                throw new Error('Reservation date/time is disallowed!');
            }

            const existingReservation = await ReservationsModel.findOne({
                date: dateObj,
                start_time: startTimeObj,
                end_time: endTimeObj,
                status: { $in: ['pending', 'confirmed'] }
            }).session(session).lean();

            if (existingReservation) {
                throw new Error('A reservation already exists for this date and time!');
            }

            const reservationObject = new ReservationsModel({
                customer: user._id,     // TODO fix the false warning/error
                date: dateObj,
                start_time: startTimeObj,
                end_time: endTimeObj,
                reason: formData.reservation_reason,
                status: 'pending'
            });

            const successfullySaved = await reservationObject.save({ session });

            if (successfullySaved === reservationObject) {
                return true;
            } else {
                throw new Error('An unexpected error occurred!');
            }
        });
    } catch {
        console.error('Failed to add reservation');
        return false;
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