"use server";

import { revalidatePath } from "next/cache";

import {
    confirmReservationRequestByAdmin,
    getAdminReservationRequests,
    rejectReservationRequestByAdmin,
} from "@/lib/_data_access/reservations";

export async function getAdminReservationRequestsServerAction() {
    try {
        return await getAdminReservationRequests();
    } catch {
        return null;
    }
}

export async function confirmReservationRequestServerAction(reservationPublicId: string) {
    if (!reservationPublicId) {
        return null;
    }

    try {
        const result = await confirmReservationRequestByAdmin(reservationPublicId);
        if (result) {
            revalidatePath('/admin/reservations');
        }

        return result;
    } catch {
        return null;
    }
}

export async function rejectReservationRequestServerAction(reservationPublicId: string) {
    if (!reservationPublicId) {
        return null;
    }

    try {
        const result = await rejectReservationRequestByAdmin(reservationPublicId);
        if (result) {
            revalidatePath('/admin/reservations');
        }

        return result;
    } catch {
        return null;
    }
}
