import 'server-only'
import { auth } from "@/auth";
import dbConnect from '@/lib/dbConnect';
import ReservationsSettingsModel from "@/lib/database_models/reservations_settings_model";
import {redirect} from "next/navigation";
import {getUserRoleByEmail} from "@/lib/_data_access/users";


async function isUserAnAdminAndPermitted() {
    try {
        const session = await auth();
        if (!session) {
            return redirect('/api/auth/signin');
        }
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }
        return true;
    } catch {
        return null;
    }
}


export async function setMaxReservationsPerDayPerUser(numberOfMaxReservationsPerDayPerUser: number) {
    try {
        if (numberOfMaxReservationsPerDayPerUser <= 0) {
            return false;
        }
        const session = await auth();
        if (!session) {
            return redirect('/api/auth/signin');
        }

        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        const documentOfReservationsSettings = await ReservationsSettingsModel.findOne({});
        if (!documentOfReservationsSettings) {
            return false;
        }
        documentOfReservationsSettings.max_reservations_per_day_per_user = numberOfMaxReservationsPerDayPerUser;
        const saved = await documentOfReservationsSettings.save();
        return saved === documentOfReservationsSettings;
    } catch {
        return null;
    }
}


export async function setAdvanceReservationsDays(advanceReservationsDays: number) {
    try {
        if (advanceReservationsDays < 0) {
            return false;
        }
        const session = await auth();
        if (!session) {
            return redirect('/api/auth/signin');
        }
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        const documentOfReservationsSettings = await ReservationsSettingsModel.findOne({});
        if (!documentOfReservationsSettings) {
            return false;
        }
        documentOfReservationsSettings.advance_reservations_days = advanceReservationsDays;
        const saved = await documentOfReservationsSettings.save();
        return saved === documentOfReservationsSettings;
    } catch {
        return null;
    }
}


export async function setSundayReservationsSettings(
    parameters: {
        start_time: string,
        end_time: string
    }) {
    try {
        // const userIsAnAdminAndPermitted = await isUserAnAdminAndPermitted();
        // if (!userIsAnAdminAndPermitted) {
        //     return false;
        // }

        const session = await auth();
        if (!session) {
            return redirect('/api/auth/signin');
        }
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        const documentOfReservationsSettings = await ReservationsSettingsModel.findOne({});
        if (!documentOfReservationsSettings) {
            return false;
        }

        const { start_time, end_time } = parameters;

        // let counter = 0;
        // for (const shift of shifts) {
        //     console.log(shift);
        //
        //     documentOfReservationsSettings.sunday_reservations_settings = shift.start_time;
        //     counter = counter + 1;
        // }

        documentOfReservationsSettings.sunday_reservations_settings.start_time = start_time;
        documentOfReservationsSettings.sunday_reservations_settings.end_time = end_time;
        const saved = await documentOfReservationsSettings.save();
        return saved === documentOfReservationsSettings;
    } catch {
        return null;
    }
}

export async function setMondayReservationsSettings(
    parameters: {
        start_time: string,
        end_time: string
    }) {
    try {
        // const userIsAnAdminAndPermitted = await isUserAnAdminAndPermitted();
        // if (!userIsAnAdminAndPermitted) {
        //     return false;
        // }

        const session = await auth();
        if (!session) {
            return redirect('/api/auth/signin');
        }
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        const documentOfReservationsSettings = await ReservationsSettingsModel.findOne({});
        if (!documentOfReservationsSettings) {
            return false;
        }

        const {start_time, end_time} = parameters;

        // let counter = 0;
        // for (const shift of shifts) {
        //     console.log(shift);
        //
        //     documentOfReservationsSettings.monday_reservations_settings = shift.start_time;
        //     counter = counter + 1;
        // }

        documentOfReservationsSettings.monday_reservations_settings.start_time = start_time;
        documentOfReservationsSettings.monday_reservations_settings.end_time = end_time;
        const saved = await documentOfReservationsSettings.save();
        return saved === documentOfReservationsSettings;
    } catch {
        return null;
    }
}

export async function setTuesdayReservationsSettings(
    parameters: {
        start_time: string,
        end_time: string
    }) {
    try {
        // const userIsAnAdminAndPermitted = await isUserAnAdminAndPermitted();
        // if (!userIsAnAdminAndPermitted) {
        //     return false;
        // }

        const session = await auth();
        if (!session) {
            return redirect('/api/auth/signin');
        }
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        const documentOfReservationsSettings = await ReservationsSettingsModel.findOne({});
        if (!documentOfReservationsSettings) {
            return false;
        }

        const {start_time, end_time} = parameters;

        // let counter = 0;
        // for (const shift of shifts) {
        //     console.log(shift);
        //
        //     documentOfReservationsSettings.tuesday_reservations_settings = shift.start_time;
        //     counter = counter + 1;
        // }

        documentOfReservationsSettings.tuesday_reservations_settings.start_time = start_time;
        documentOfReservationsSettings.tuesday_reservations_settings.end_time = end_time;
        const saved = await documentOfReservationsSettings.save();
        return saved === documentOfReservationsSettings;
    } catch {
        return null;
    }
}

export async function setWednesdayReservationsSettings(
    parameters: {
        start_time: string,
        end_time: string
    }) {
    try {
        // const userIsAnAdminAndPermitted = await isUserAnAdminAndPermitted();
        // if (!userIsAnAdminAndPermitted) {
        //     return false;
        // }

        const session = await auth();
        if (!session) {
            return redirect('/api/auth/signin');
        }
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        const documentOfReservationsSettings = await ReservationsSettingsModel.findOne({});
        if (!documentOfReservationsSettings) {
            return false;
        }

        const {start_time, end_time} = parameters;

        // let counter = 0;
        // for (const shift of shifts) {
        //     console.log(shift);
        //
        //     documentOfReservationsSettings.wednesday_reservations_settings = shift.start_time;
        //     counter = counter + 1;
        // }

        documentOfReservationsSettings.wednesday_reservations_settings.start_time = start_time;
        documentOfReservationsSettings.wednesday_reservations_settings.end_time = end_time;
        const saved = await documentOfReservationsSettings.save();
        return saved === documentOfReservationsSettings;
    } catch {
        return null;
    }
}

export async function setThursdayReservationsSettings(
    parameters: {
        start_time: string,
        end_time: string
    }) {
    try {
        // const userIsAnAdminAndPermitted = await isUserAnAdminAndPermitted();
        // if (!userIsAnAdminAndPermitted) {
        //     return false;
        // }

        const session = await auth();
        if (!session) {
            return redirect('/api/auth/signin');
        }
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        const documentOfReservationsSettings = await ReservationsSettingsModel.findOne({});
        if (!documentOfReservationsSettings) {
            return false;
        }

        const {start_time, end_time} = parameters;

        // let counter = 0;
        // for (const shift of shifts) {
        //     console.log(shift);
        //
        //     documentOfReservationsSettings.thursday_reservations_settings = shift.start_time;
        //     counter = counter + 1;
        // }

        documentOfReservationsSettings.thursday_reservations_settings.start_time = start_time;
        documentOfReservationsSettings.thursday_reservations_settings.end_time = end_time;
        const saved = await documentOfReservationsSettings.save();
        return saved === documentOfReservationsSettings;
    } catch {
        return null;
    }
}

export async function setFridayReservationsSettings(
    parameters: {
        start_time: string,
        end_time: string
    }) {
    try {
        // const userIsAnAdminAndPermitted = await isUserAnAdminAndPermitted();
        // if (!userIsAnAdminAndPermitted) {
        //     return false;
        // }

        const session = await auth();
        if (!session) {
            return redirect('/api/auth/signin');
        }
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        const documentOfReservationsSettings = await ReservationsSettingsModel.findOne({});
        if (!documentOfReservationsSettings) {
            return false;
        }

        const {start_time, end_time} = parameters;

        // let counter = 0;
        // for (const shift of shifts) {
        //     console.log(shift);
        //
        //     documentOfReservationsSettings.friday_reservations_settings = shift.start_time;
        //     counter = counter + 1;
        // }

        documentOfReservationsSettings.friday_reservations_settings.start_time = start_time;
        documentOfReservationsSettings.friday_reservations_settings.end_time = end_time;
        const saved = await documentOfReservationsSettings.save();
        return saved === documentOfReservationsSettings;
    } catch {
        return null;
    }
}

export async function setSaturdayReservationsSettings(
    parameters: {
        start_time: string,
        end_time: string
    }) {
    try {
        // const userIsAnAdminAndPermitted = await isUserAnAdminAndPermitted();
        // if (!userIsAnAdminAndPermitted) {
        //     return false;
        // }

        const session = await auth();
        if (!session) {
            return redirect('/api/auth/signin');
        }
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        const documentOfReservationsSettings = await ReservationsSettingsModel.findOne({});
        if (!documentOfReservationsSettings) {
            return false;
        }

        const {start_time, end_time} = parameters;

        // let counter = 0;
        // for (const shift of shifts) {
        //     console.log(shift);
        //
        //     documentOfReservationsSettings.saturday_reservations_settings = shift.start_time;
        //     counter = counter + 1;
        // }

        documentOfReservationsSettings.saturday_reservations_settings.start_time = start_time;
        documentOfReservationsSettings.saturday_reservations_settings.end_time = end_time;
        const saved = await documentOfReservationsSettings.save();
        return saved === documentOfReservationsSettings;
    } catch {
        return null;
    }
}

// export async function getSundayReservationsSettings() {
//     try {
//         // const userIsAnAdminAndPermitted = await isUserAnAdminAndPermitted();
//         // if (!userIsAnAdminAndPermitted) {
//         //     return false;
//         // }
//
//         const session = await auth();
//         if (!session) {
//             return redirect('/api/auth/signin');
//         }
//         await dbConnect();
//         const userRole = await getUserRoleByEmail(session.user?.email);
//         if (userRole === null || userRole === undefined || userRole !== "admin") {
//             return null;
//         }
//
//         const documentOfReservationsSettings = await ReservationsSettingsModel.findOne({}).lean();
//         if (!documentOfReservationsSettings) {
//             return false;
//         }
//
//         // const a = documentOfReservationsSettings.
//         // return saved === documentOfReservationsSettings;
//     } catch {
//         return null;
//     }
// }

export async function getReservationsSettings() {
    try {
        await dbConnect();

        const response = await ReservationsSettingsModel.find({}).sort({_id:-1}).limit(1).lean();    // .sort({_id:-1}) sorts from newest to oldest document
        if (response) {
            return response;
        } else {
            return false;
        }
    } catch {
        return null;
    }
}