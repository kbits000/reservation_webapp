import 'server-only'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/dbConnect';
import ReservationsModel from '@/lib/database_models/reservations_model';
import UsersModel from "@/lib/database_models/users_model";
import DisallowedReservationsDatesModel from '@/lib/database_models/disallowed_reservations_dates_model';
import { formattedFieldTypesOfUserReservationForm } from "@/lib/schemas/types";
import mongoose, { ClientSession } from 'mongoose';
import { getUserRoleByEmail } from "@/lib/_data_access/users";
// import { v4 as uuidv4 } from "uuid";
import { validate as uuidValidate } from "uuid";

// export type ReservationStatus = 'pending' | 'rejected' | 'cancelled' | 'confirmed';

// export interface CurrentUserReservationDTO {
//     id: string;
//     key: string;
//     date: string;
//     start_time: string;
//     end_time: string;
//     reason: string;
//     status: ReservationStatus;
//     created_at: string;
// }

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

export async function getCurrentUserReservations() {
    const authSession = await auth();
    if (!authSession) {
        redirect('/api/auth/signin');
    }

    if (!authSession.user?.email) {
        return null;
    }

    try {
        await dbConnect();

        const user = await UsersModel.findOne(
            { email: authSession.user.email },
            '_id'
        ).lean() as { _id: mongoose.Types.ObjectId } | null;

        if (!user) {
            return null;
        }

        // const reservations = await ReservationsModel.find(
        //     { customer: user._id },
        //     'date start_time end_time reason status createdAt'
        // ).sort({ createdAt: -1, date: -1 }).lean() as Array<{
        //     _id: mongoose.Types.ObjectId;
        //     date: Date;
        //     start_time: Date;
        //     end_time: Date;
        //     reason: string;
        //     status: ReservationStatus;
        //     createdAt?: Date;
        // }>;

        const reservations = await ReservationsModel.find(
            { customer: user._id },
            'public_id date start_time end_time reason status createdAt'
        ).sort({ createdAt: -1, date: -1 }).lean();

        return reservations.map((reservation) => ({
            public_id: (reservation.public_id ?? reservation._id).toString(),
            key: (reservation.public_id ?? reservation._id).toString(),
            date: reservation.date.toISOString(),
            start_time: reservation.start_time.toISOString(),
            end_time: reservation.end_time.toISOString(),
            reason: reservation.reason,
            status: reservation.status,
            created_at: (reservation.createdAt ?? reservation.date).toISOString(),
        }));
    } catch {
        return null;
    }
}

export async function cancelCurrentUserReservation(reservationPublicId: string): Promise<boolean | null> {
    const authSession = await auth();

    if (!authSession) {
        redirect('/api/auth/signin');
    }

    // if (!authSession.user?.email || !mongoose.Types.ObjectId.isValid(reservationPublicId)) {
    //     return null;
    // }

    if (!authSession.user?.email || !uuidValidate(reservationPublicId)) {
        return null;
    }

    try {
        await dbConnect();
        const user = await UsersModel.findOne(
            { email: authSession.user.email },
            '_id'
        ).lean() as { _id: mongoose.Types.ObjectId } | null;

        if (!user) {
            return null;
        }

        const updateResult = await ReservationsModel.updateOne(
            {
                public_id: reservationPublicId,
                customer: user._id,
                status: { $in: ['pending', 'confirmed'] }
            },
            {
                $set: {
                    status: 'cancelled'
                }
            }
        );

        return updateResult.modifiedCount === 1;
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

export type AdminReservationRequestStatus = 'pending' | 'rejected' | 'cancelled' | 'confirmed';

// export interface AdminReservationRequestDTO {
//     public_id: string;
//     key: string;
//     date: string;
//     start_time: string;
//     end_time: string;
//     reason: string;
//     status: AdminReservationRequestStatus;
//     created_at: string;
//     customer_name: string;
//     customer_email: string;
//     customer_phone_number: string;
// }

async function assertAdminSession() {
    const authSession = await auth();
    if (!authSession) {
        redirect('/api/auth/signin');
    }

    const userRole = await getUserRoleByEmail(authSession.user?.email);
    if (userRole !== 'admin') {
        redirect('/');
    }
}

export async function getAdminReservationRequests() {
    await assertAdminSession();
  
    try {
        await dbConnect();
        // TODO solve populating customer info problem
        const reservations = await ReservationsModel.find(
            {},
            'public_id date start_time end_time reason status createdAt customer'
        )
            .sort({ createdAt: -1, date: -1 })
            .lean().exec();
            // .populate<{ customer: { name?: string; email?: string; phone_number?: string } }>('customer', 'name email phone_number')


        // console.log('reservations BEFORE: ' )
        // console.log(reservations[1].customer)
        // console.log('reservations AFTER: ' )

        return reservations.map((reservation) => ({
            public_id: String(reservation.public_id ?? reservation._id),
            key: String(reservation.public_id ?? reservation._id),
            date: reservation.date.toISOString(),
            start_time: reservation.start_time.toISOString(),
            end_time: reservation.end_time.toISOString(),
            reason: reservation.reason ?? '',
            status: reservation.status as AdminReservationRequestStatus,
            created_at: (reservation.createdAt ?? reservation.date).toISOString(),
            customer_name: reservation.customer?.name ?? '-',
            customer_email: reservation.customer?.email ?? '-',
            customer_phone_number: reservation.customer?.phone_number ?? '-',
        }));
    } catch {
        // console.error("DEBUG ERROR:", error);
        return null;
    }
}

export async function confirmReservationRequestByAdmin(reservationPublicId: string) {
    await assertAdminSession();

    if (!reservationPublicId || !uuidValidate(reservationPublicId)) {
        return null;
    }

    try {
        await dbConnect();

        const reservation = await ReservationsModel.findOne({
            public_id: reservationPublicId,
            status: 'pending',
        });

        if (!reservation) {
            return false;
        }

        reservation.status = 'confirmed';
        const savedDoc = await reservation.save();
        return savedDoc===reservation;
    } catch {
        return null;
    }
}

export async function rejectReservationRequestByAdmin(reservationPublicId: string) {
    await assertAdminSession();

    if (!reservationPublicId || !uuidValidate(reservationPublicId)) {
        return null;
    }

    try {
        await dbConnect();

        const reservation = await ReservationsModel.findOne({
            public_id: reservationPublicId,
            status: 'pending',
        });

        if (!reservation) {
            return false;
        }

        reservation.status = 'rejected';
        const savedDoc = await reservation.save();
        return savedDoc===reservation;
    } catch {
        return null;
    }
}