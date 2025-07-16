import 'server-only'
import { auth } from "@/auth";
import dbConnect from '@/lib/dbConnect';
import {redirect} from "next/navigation";
import {getUserRoleByEmail} from "@/lib/_data_access/users";
import DisallowedReservationsDatesModel from "@/lib/database_models/disallowed_reservations_dates_model";


export async function getAllDisallowedReservationDatesTimesSlots() {
    const session = await auth();
    if (!session) {
        redirect('/api/auth/signin');
    }
    try {
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        const response = await DisallowedReservationsDatesModel.find({}).lean();
        const allDisallowedReservationsDatesTimesSlotsDTO = [];
        let id_counter = 0;
        for (const disallowedReservationsDate of response) {
            const disallowedReservationsDatesTimesSlotsDTOObject: {
                key: number;
                date: string;
                is_full_day: string;
                start_time?: string;
                end_time?: string;
            } = {
                'key': id_counter,
                'date': disallowedReservationsDate['date'].toISOString(),
                'is_full_day': 'نعم'
            };
            if (disallowedReservationsDate['is_full_day']) {
                Object.assign(disallowedReservationsDatesTimesSlotsDTOObject, {
                    'is_full_day': 'نعم'
                });
            } else {
                Object.assign(disallowedReservationsDatesTimesSlotsDTOObject, {
                    'is_full_day': 'لا',
                    'start_time': disallowedReservationsDate['start_time'].toISOString(),
                    'end_time': disallowedReservationsDate['end_time'].toISOString()
                });
            }
            allDisallowedReservationsDatesTimesSlotsDTO.push(disallowedReservationsDatesTimesSlotsDTOObject);
            id_counter = id_counter + 1;
        }
        return allDisallowedReservationsDatesTimesSlotsDTO;
    } catch {
        return null;
    }
}


async function doesDisallowedReservationDateFullDayExist(dateInISO8601Format: string) {
    try {
        await dbConnect();

        const dateObj = new Date(dateInISO8601Format);

        const response = await DisallowedReservationsDatesModel.findOne({date: dateObj, is_full_day: true}).lean();
        if (response === null) {
            return false;
        } else {
            return true;
        }
    } catch {
        return null;
    }
}

export async function addDisallowedReservationDateFullDay(parameters: {dateInISO8601Format: string; is_full_day: boolean}) {
    const session = await auth();
    if (!session) {
        redirect('/api/auth/signin');
    }
    try {
        await dbConnect();

        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }
        // check if string is in ISO 8601 format
        const dateObj = new Date(parameters.dateInISO8601Format);
        if (!isNaN(dateObj.getTime()) && parameters.dateInISO8601Format === dateObj.toISOString()) {
        } else {
            return null;
        }

        // check if disallowed reservation date already exists
        const exists = await doesDisallowedReservationDateFullDayExist(parameters.dateInISO8601Format);
        if (exists === null) {
            return null;
        } else if (exists) {
            return false;
        }

        const newDisallowedReservationDateFullDayDocument = new DisallowedReservationsDatesModel(
            {
                date: dateObj,
                is_full_day: parameters.is_full_day
            }
        );

        const addNewDocumentResponse = await newDisallowedReservationDateFullDayDocument.save();

        return addNewDocumentResponse === newDisallowedReservationDateFullDayDocument;
    } catch {
        return null;
    }
}


async function doesDisallowedReservationDateTimePeriodExist(parameters: {
    dateInISO8601Format: string;
    startTimeISO8601Format: string;
    endTimeISO8601Format: string;
}) {
    try {
        await dbConnect();

        const dateObject = new Date(parameters.dateInISO8601Format);
        const startTimeObject = new Date(parameters.startTimeISO8601Format);
        const endTimeObject = new Date(parameters.endTimeISO8601Format);
        console.log(dateObject, startTimeObject, endTimeObject);
        const response = await DisallowedReservationsDatesModel.findOne(
            {
                date: dateObject,
                start_time: startTimeObject,
                end_time: endTimeObject,
                is_full_day: false
            }
        ).lean();

        if (response === null) {
            return false;
        } else {
            return true;
        }
    } catch {
        return null;
    }
}


export async function addDisallowedReservationDateTimePeriod(parameters: {
    dateInISO8601Format: string;
    startTimeISO8601Format: string;
    endTimeISO8601Format: string;
}) {
    const session = await auth();
    if (!session) {
        redirect('/api/auth/signin');
    }
    try {
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        // check if date string is in ISO 8601 format
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

        // check if the date is fully disallowed
        const disallowedFullDayExists = await doesDisallowedReservationDateFullDayExist(parameters.dateInISO8601Format);
        if (disallowedFullDayExists === null) {
            return null;
        } else if (disallowedFullDayExists) {
            return false;
        }

        // check if disallowed reservation date time period already exists
        const exists = await doesDisallowedReservationDateTimePeriodExist({
            dateInISO8601Format: parameters.dateInISO8601Format,
            startTimeISO8601Format: parameters.startTimeISO8601Format,
            endTimeISO8601Format: parameters.endTimeISO8601Format,
        });
        if (exists === null) {
            return null;
        } else if (exists) {
            return false;
        }

        const newDisallowedReservationDateTimePeriodDocument = new DisallowedReservationsDatesModel(
            {
                date: dateObject,
                start_time: startTimeObject,
                end_time: endTimeObject,
                is_full_day: false
            }
        );

        const addNewDocumentResponse = await newDisallowedReservationDateTimePeriodDocument.save();

        return addNewDocumentResponse === newDisallowedReservationDateTimePeriodDocument;
    } catch {
        return null;
    }
}

export async function deleteDisallowedReservationDate(
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
        await dbConnect();
        const userRole = await getUserRoleByEmail(session.user?.email);
        if (userRole === null || userRole === undefined || userRole !== "admin") {
            return null;
        }

        const dateInISO8601Format: string = params['dateInISO8601Format'];
        const dateObject: Date = new Date(dateInISO8601Format);
        if (!isNaN(dateObject.getTime()) && dateInISO8601Format === dateObject.toISOString()) {
        } else {
            return null;
        }
        const isFullDay: boolean = params['isFullDay'];
        if (isFullDay) {
            const exists = await doesDisallowedReservationDateFullDayExist(dateInISO8601Format);
            if (exists === null) {
                return null;
            } else if (!exists) {
                return false;
            }
            const response = await DisallowedReservationsDatesModel.deleteOne({date: dateObject, is_full_day: true});
            return !!response['acknowledged'];
        } else {
            const startTimeInISO8601Format: string = params['startTimeInISO8601Format']!;
            const startTimeDateObject: Date = new Date(startTimeInISO8601Format);
            if (!isNaN(startTimeDateObject.getTime()) && startTimeInISO8601Format === startTimeDateObject.toISOString()) {
            } else {
                return null;
            }
            const endTimeInISO8601Format: string = params['endTimeInISO8601Format']!;
            const endTimeDateObject: Date = new Date(endTimeInISO8601Format);
            if (!isNaN(endTimeDateObject.getTime()) && endTimeInISO8601Format === endTimeDateObject.toISOString()) {
            } else {
                return null;
            }

            const exists = await doesDisallowedReservationDateTimePeriodExist({
                dateInISO8601Format: dateInISO8601Format,
                startTimeISO8601Format: startTimeInISO8601Format,
                endTimeISO8601Format: endTimeInISO8601Format
            });

            if (exists === null) {
                return null;
            } else if (!exists) {
                return false;
            }
            const response = await DisallowedReservationsDatesModel.deleteOne({date: dateObject, is_full_day: false, start_time: startTimeDateObject, end_time: endTimeDateObject});
            return !!response['acknowledged'];
        }
    } catch {
        return null;
    }
}


export async function getAllDisallowedTimeSlotsForDate(dateInISO8601Format: string) {
    try {
        await dbConnect();

        const dateObject: Date = new Date(dateInISO8601Format);
        if (!isNaN(dateObject.getTime()) && dateInISO8601Format === dateObject.toISOString()) {
        } else {
            return null;
        }

        const response = await DisallowedReservationsDatesModel.find({date: dateObject}).lean();

        const allDisallowedTimeSlotsForDateDTO= [];
        let id_counter = 0;
        for (const disallowedReservationTimeSlot of response) {
            const disallowedTimeSlotsForDateDTO: {
                key: number;
                date: string;
                is_full_day: string;
                start_time?: string;
                end_time?: string;
            } = {
                'key': id_counter,
                'date': disallowedReservationTimeSlot['date'].toISOString(),
                'is_full_day': disallowedReservationTimeSlot['is_full_day']
            };
            if (!disallowedReservationTimeSlot['is_full_day']) {
                Object.assign(disallowedTimeSlotsForDateDTO, {
                    'start_time': disallowedReservationTimeSlot['start_time'].toISOString(),
                    'end_time': disallowedReservationTimeSlot['end_time'].toISOString()
                })
            }
            allDisallowedTimeSlotsForDateDTO.push(disallowedTimeSlotsForDateDTO);
            id_counter = id_counter + 1;
        }
        return allDisallowedTimeSlotsForDateDTO;
    } catch {
        return null;
    }
}