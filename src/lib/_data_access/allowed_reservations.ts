import 'server-only'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/dbConnect';
import AllowedReservationsModel from "@/lib/database_models/allowed_reservations_model";
import DisallowedReservationsDatesModel from "@/lib/database_models/disallowed_reservations_dates_model";
import { StartReservationDateTime, EndReservationDateTime } from "@/lib/schemas/types";
import { getPendingOrConfirmedReservationsForSpecificDate } from '@/lib/_data_access/reservations';

// type allowedTimesPlainOldJavascriptType = {
//     start_time: {
//         hour: string;
//         minutes: string;
//     };
//     end_time: {
//         hour: string;
//         minutes: string;
//     };
//     status: string;
// };

// function getAllAllowedReservationsDateTimeDTO(allowedTimesPlainOldJavascriptObject: allowedTimesPlainOldJavascriptType[]) {
//     const allowedReservationDetailsDateList = [];
//
//     for (const x of allowedTimesPlainOldJavascriptObject) {
//         // let startTime =  x['start_time']['hour'] + ":" + x['start_time']['minutes'];
//         let startTimeHour = x['start_time']['hour'];
//         let startTimeMinutes = x['start_time']['minutes'];
//         let startTimeMeridiem = '';
//         let endTimeHour = x['end_time']['hour'];
//         let endTimeMinutes = x['end_time']['minutes'];
//         let endTimeMeridiem = '';
//         let status = x['status'];
//
//         // let endTime = x['end_time']['hour'] + ":" + x['end_time']['minutes'];
//
//         if (parseInt(startTimeHour) < 12) {
//             // startTime = x['start_time']['hour'] + ":" + x['start_time']['minutes'] + " am";
//             startTimeHour = '' + startTimeHour;
//             // startTimeMeridiem = 'am';
//             startTimeMeridiem = 'ص';
//         } else if (parseInt(startTimeHour) === 12) {
//             // startTime = x['start_time']['hour'] + ":" + x['start_time']['minutes'] + " pm";
//             // startTimeMeridiem = 'pm';
//             startTimeMeridiem = 'م';
//         } else {
//             // let startHour = parseInt(x['start_time']['hour'])%12;
//             // const startHourString = startHour.toString();
//             // startTime = startHour.toString() + ":" + x['start_time']['minutes'] + " pm";
//             // startTime = (parseInt(x['start_time']['hour'])%12).toString() + ":" + x['start_time']['minutes'] + " pm";
//             // startTimeMeridiem = 'pm';
//             startTimeHour = (parseInt(startTimeHour)%12).toString();
//             startTimeMeridiem = 'م';
//         }
//
//         if (parseInt(startTimeMinutes) < 10) {
//             startTimeMinutes = '0' + startTimeMinutes;
//         }
//
//         if (parseInt(endTimeHour) < 12) {
//             // startTime = x['start_time']['hour'] + ":" + x['start_time']['minutes'] + " am";
//             endTimeHour = '' + endTimeHour;
//             // endTimeMeridiem = 'am';
//             endTimeMeridiem = 'م';
//         } else if (parseInt(endTimeHour) === 12) {
//             // startTime = x['start_time']['hour'] + ":" + x['start_time']['minutes'] + " pm";
//             // endTimeMeridiem = 'pm';
//             endTimeMeridiem = 'م';
//         } else {
//             // let startHour = parseInt(x['start_time']['hour'])%12;
//             // const startHourString = startHour.toString();
//             // startTime = startHour.toString() + ":" + x['start_time']['minutes'] + " pm";
//             // startTime = (parseInt(x['start_time']['hour'])%12).toString() + ":" + x['start_time']['minutes'] + " pm";
//             // endTimeMeridiem = 'pm';
//             endTimeHour = (parseInt(endTimeHour)%12).toString();
//             endTimeMeridiem = 'م';
//         }
//
//         if (parseInt(endTimeMinutes) < 10) {
//             endTimeMinutes = '0' + endTimeMinutes;
//         }
//
//         if (status === 'open') {
//             status = 'مفتوح';
//         }
//
//         const allowedEeservationDetailsDateObject = {
//             // year: x['date']['year'],
//             // month: x['date']['month'],
//             // day: x['date']['day'],
//             // start_time: {
//             //     hour: x['start_time']['hour'],
//             //     minutes: x['start_time']['minutes'],
//             // },
//             start_time: startTimeHour + ':' + startTimeMinutes + ' ' + startTimeMeridiem,
//             // end_time: {
//             //     hour: x['end_time']['hour'],
//             //     minutes: x['end_time']['minutes'],
//             // },
//             end_time: endTimeHour + ':' + endTimeMinutes + ' ' + endTimeMeridiem,
//             status: status,
//         }
//         allowedReservationDetailsDateList.push(allowedEeservationDetailsDateObject);
//     }
//     return allowedReservationDetailsDateList;
// }

export async function getAllAllowedReservationsDateTime(date: string) {
    const session = await auth()
    if (!session) {
    // redirect('/api/auth/signin?callbackUrl=/user');
    redirect('/api/auth/signin');
    }
    // TODO add checking user role functionallity
    if (!date) {
        return null;
    }
    try {
        await dbConnect();
        const dateSplitted =  date.split('_');
        let month = dateSplitted[1];
        if (dateSplitted[1][0] === '0') {
            month = dateSplitted[1][1];
        }

        let day = dateSplitted[2];
        if (dateSplitted[2][0] === '0') {
            day = dateSplitted[2][1];
        }
        const allowedTimes = await AllowedReservationsModel.find({'date.year': dateSplitted[0],
                'date.month': month,
                'date.day': day,
        }).lean();

        // const allowedTimesDTO = getAllAllowedReservationsDateTimeDTO(allowedTimes);
        // getAllAllowedReservationsDateTimeDTO function
        // allowedTimesDTO
        // ------------start------------------
        const allowedReservationDetailsDateList = [];

        for (const x of allowedTimes) {
            let startTimeHour = x['start_time']['hour'];
            let startTimeMinutes = x['start_time']['minutes'];
            let startTimeMeridiem = '';
            let endTimeHour = x['end_time']['hour'];
            let endTimeMinutes = x['end_time']['minutes'];
            let endTimeMeridiem = '';
            let status = x['status'];

            if (parseInt(startTimeHour) < 12) {
                startTimeHour = '' + startTimeHour;
                startTimeMeridiem = 'ص';
            } else if (parseInt(startTimeHour) === 12) {
                startTimeMeridiem = 'م';
            } else {
                startTimeHour = (parseInt(startTimeHour)%12).toString();
                startTimeMeridiem = 'م';
            }

            if (parseInt(startTimeMinutes) < 10) {
                startTimeMinutes = '0' + startTimeMinutes;
            }

            if (parseInt(endTimeHour) < 12) {
                endTimeHour = '' + endTimeHour;
                endTimeMeridiem = 'م';
            } else if (parseInt(endTimeHour) === 12) {
                endTimeMeridiem = 'م';
            } else {
                endTimeHour = (parseInt(endTimeHour)%12).toString();
                endTimeMeridiem = 'م';
            }

            if (parseInt(endTimeMinutes) < 10) {
                endTimeMinutes = '0' + endTimeMinutes;
            }

            if (status === 'open') {
                status = 'مفتوح';
            }

            const allowedEeservationDetailsDateObject = {
                start_time: startTimeHour + ':' + startTimeMinutes + ' ' + startTimeMeridiem,
                end_time: endTimeHour + ':' + endTimeMinutes + ' ' + endTimeMeridiem,
                status: status,
            }
            allowedReservationDetailsDateList.push(allowedEeservationDetailsDateObject);
        }
        return allowedReservationDetailsDateList;

        // ------------end--------------------


        // return allowedTimesDTO;
    } catch {
        return null;
    }
}

export async function addAllReservationofDate(date: string) {
    const session = await auth()
    if (!session) {
    // redirect('/api/auth/signin?callbackUrl=/user');
    redirect('/api/auth/signin');
    }
    // TODO add checking user role functionallity
    try {
        await dbConnect();

        // const allowedTimes = await AllowedReservationsModel.findOne({'date': date});
        // return allowedTimes;
    } catch {

    }

}

async function doesAllowedReservationDateTimeExist(startDate: StartReservationDateTime, endDate: EndReservationDateTime) {
    const session = await auth()
    if (!session) {
        // redirect('/api/auth/signin?callbackUrl=/user');
        redirect('/api/auth/signin');
    }
    // TODO add checking user role functionallity
    if (!startDate || !endDate) {
        return null;
    }
    try {
        await dbConnect();
        const allowedReservationDateTimeDocument = await AllowedReservationsModel.findOne({
            'date.year': startDate.startDateYear,
            'date.month': startDate.startDateMonth,
            'date.day': startDate.startDateDay,
            'start_time.hour': startDate.startDateHour,
            'start_time.minutes': startDate.startDateMinutes,
            'end_time.hour': endDate.endDateHour,
            'end_time.minutes': endDate.endDateMinutes
        })

        if (!allowedReservationDateTimeDocument) {
            // already exists
            return {
                success: false,
                message: 'Allowed reservation date time already exists',
            };
        } else {
            return {
                success: true,
                message: 'Allowed reservation date time does not exist',
            };
        }
    } catch {
        return null;
    }
}

export async function addAllowedReservationDateTime(startDate: StartReservationDateTime, endDate: EndReservationDateTime) {
    const session = await auth()
    if (!session) {
        // redirect('/api/auth/signin?callbackUrl=/user');
        redirect('/api/auth/signin');
    }
    // TODO add checking user role functionallity
    if (!startDate || !endDate) {
        return null;
    }
    try {
        await dbConnect();
        const exists = await doesAllowedReservationDateTimeExist(startDate, endDate);
        if (exists?.success) {
            // it is added
            return {
                success: false,
                message: 'Allowed reservation date time already exists',
            }
        } else if (exists === null) {
            // error
            return null;
        }

        const reservationDateTimeDetailsDocument = new AllowedReservationsModel(
            {
                date: {
                    year: startDate.startDateYear,
                    month: startDate.startDateMonth,
                    day: startDate.startDateDay
                },
                start_time: {
                    hour: startDate.startDateHour,
                    minutes: startDate.startDateMinutes
                },
                end_time: {
                    hour: endDate.endDateHour,
                    minutes: endDate.endDateMinutes
                }
            }
        );
        // const added = await reservationDateTimeDetailsDocument.save().then(
        //     savedDoc => {
        //         try {
        //             if (savedDoc === reservationDateTimeDetailsDocument) {
        //                 return {
        //                     success: true,
        //                     message: 'reservation date time added successfully',
        //                 };
        //             }
        //         } catch {
        //             return null;
        //         }
        //
        //     }
        // )
        const savedDoc = await reservationDateTimeDetailsDocument.save();
        if (savedDoc === reservationDateTimeDetailsDocument) {
            return {
                success: true,
                message: 'reservation date time added successfully',
            };
        }

        // it is not added
        // 1- check if the date time is already added
        // if yes, then do
        // else, add the reservation date time
        // const allowedReservationDateTime = await AllowedReservationsModel.findOne({'date': date});
        // return allowedTimes;
        return {
            success: true,
            message: 'reservation date time added successfully',
        };
    } catch {
        return null;
    }
}

export async function getAllAllowedReservationsDateYearMonthDay() {
    const session = await auth()
    if (!session) {
        // redirect('/api/auth/signin?callbackUrl=/user');
        redirect('/api/auth/signin');
    }
    // TODO add checking user role functionallity
    try {
        await dbConnect();
        // const allAllowedReservationsDateYearMonthDay = await AllowedReservationsModel.find({ }, 'date').lean().distinct(['date.year date.month date.day']);
        const allAllowedReservationsDateYearMonthDay = await AllowedReservationsModel.aggregate([
            {
                $project: {
                    year: "$date.year",
                    month: "$date.month",
                    day: "$date.day"
                }
            },
            {
                $group: {
                    _id: {
                        year: "$year",
                        month: "$month",
                        day: "$day"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    day: "$_id.day"
                }
            }
        ]);

        console.log("allAllowedReservationsDateYearMonthDay: ", allAllowedReservationsDateYearMonthDay);

        // return allAllowedReservationsDateYearMonthDayDTO(allAllowedReservationsDateYearMonthDay);
        return true;
    } catch {
        return null;
    }
}

// function allAllowedReservationsDateYearMonthDayDTO(allAllowedReservationsDateYearMonthDayPlainOldJavaScriptObject) {
//     console.log("Length: ", allAllowedReservationsDateYearMonthDayPlainOldJavaScriptObject.length);
//     return true;
// }

export async function getAllOpenReservations() {
    try {
        await dbConnect();

        const allOpenReservations = await AllowedReservationsModel.find({status: 'open'}).lean();
        console.log("allOpenReservations status: ", allOpenReservations);
        const allOpenReservationsDTO = [];

        for (const openReservation of allOpenReservations) {
            // const openReservationDayjsObject;
            allOpenReservationsDTO.push({

            })
        }
    } catch {
        return null;
    }
}

export async function getAllAvailableTimeSlotsForDate(dateInISO8601Format: string) {    // TODO complete this function
    try {
        // const dateInISO8601Format = '2025-07-06T21:00:00.000Z';        // TODO remove this variable

        // check if string is in ISO 8601 format
        const dateObj = new Date(dateInISO8601Format);
        if (!isNaN(dateObj.getTime()) && dateInISO8601Format === dateObj.toISOString()) {
        } else {
            return null;
        }

        await dbConnect();


        // console.log('server  start, ')
        const disallowedReservationsForDate = await DisallowedReservationsDatesModel.find({date: dateObj}).lean();

        const allDisallowedReservationsForDateList = [];
        let id = 0;
        for (const disallowedReservation of disallowedReservationsForDate) {
            const disallowedReservationDTO = {
                key: id,
                date: disallowedReservation['date'],
                start_time: disallowedReservation['start_time'],
                end_time: disallowedReservation['end_time']
            }
            allDisallowedReservationsForDateList.push(disallowedReservationDTO);
            id++;
        }

        // console.log("allDisallowedReservationsForDateList: ", allDisallowedReservationsForDateList);

        // ----------------------------Start----------------------------------------
        // -----------Get Pending or Confirmed Reservations for Specific Date----------
        const allPendingOrClosedReservations = await getPendingOrConfirmedReservationsForSpecificDate(dateInISO8601Format);
        if (!allPendingOrClosedReservations) {
            return null;
        }
        // ------------------------------end----------------------------------------


        // ----------------------------Start----------------------------------------
        // ---------Generate Reservations for Specific Date based on Settings-------
        // TODO implement auto generating time slots functionality
        const autoGeneratedReservationTimeSlots = [ //2025-07-06T21:00:00.000Z
            {start_time: '08:00', end_time: '09:00'},   // 2025-07-07T5:00:00.000Z  TO 2025-07-07T6:00:00.000Z
            {start_time: '09:00', end_time: '10:00'},   // 2025-07-07T6:00:00.000Z  TO 2025-07-07T7:00:00.000Z
            {start_time: '10:00', end_time: '11:00'},   // 2025-07-07T7:00:00.000Z  TO 2025-07-07T8:00:00.000Z
            {start_time: '11:00', end_time: '12:00'},   // 2025-07-07T8:00:00.000Z  TO 2025-07-07T9:00:00.000Z
            {start_time: '12:00', end_time: '13:00'},   // 2025-07-07T9:00:00.000Z  TO 2025-07-07T10:00:00.000Z
            {start_time: '13:00', end_time: '14:00'},   // 2025-07-07T10:00:00.000Z  TO 2025-07-07T11:00:00.000Z
            {start_time: '14:00', end_time: '15:00'},   // 2025-07-07T11:00:00.000Z  TO 2025-07-07T12:00:00.000Z
            {start_time: '15:00', end_time: '16:00'},   // 2025-07-07T12:00:00.000Z  TO 2025-07-07T13:00:00.000Z
            {start_time: '16:00', end_time: '17:00'},   // 2025-07-07T13:00:00.000Z  TO 2025-07-07T14:00:00.000Z
            {start_time: '17:00', end_time: '18:00'},   // 2025-07-07T14:00:00.000Z  TO 2025-07-07T15:00:00.000Z
            {start_time: '18:00', end_time: '19:00'},   // 2025-07-07T15:00:00.000Z  TO 2025-07-07T16:00:00.000Z
            {start_time: '19:00', end_time: '20:00'},   // 2025-07-07T16:00:00.000Z  TO 2025-07-07T17:00:00.000Z
            {start_time: '20:00', end_time: '21:00'},   // 2025-07-07T17:00:00.000Z  TO 2025-07-07T18:00:00.000Z
            {start_time: '21:00', end_time: '22:00'},   // 2025-07-07T18:00:00.000Z  TO 2025-07-07T19:00:00.000Z
            {start_time: '22:00', end_time: '23:00'}];  // 2025-07-07T19:00:00.000Z  TO 2025-07-07T20:00:00.000Z

        const autoGeneratedReservationTimeSlots2 = [ //2025-07-06T21:00:00.000Z
            {start_time: '2025-07-07T5:00:00.000Z', end_time: '2025-07-07T6:00:00.000Z'},
            {start_time: '2025-07-07T6:00:00.000Z', end_time: '2025-07-07T7:00:00.000Z'},
            {start_time: '2025-07-07T7:00:00.000Z', end_time: '2025-07-07T8:00:00.000Z'},
            {start_time: '2025-07-07T8:00:00.000Z', end_time: '2025-07-07T9:00:00.000Z'},
            {start_time: '2025-07-07T9:00:00.000Z', end_time: '2025-07-07T10:00:00.000Z'},
            {start_time: '2025-07-07T10:00:00.000Z', end_time: '2025-07-07T11:00:00.000Z'},
            {start_time: '2025-07-07T11:00:00.000Z', end_time: '2025-07-07T12:00:00.000Z'},
            {start_time: '2025-07-07T12:00:00.000Z', end_time: '2025-07-07T13:00:00.000Z'},
            {start_time: '2025-07-07T13:00:00.000Z', end_time: '2025-07-07T14:00:00.000Z'},
            {start_time: '2025-07-07T14:00:00.000Z', end_time: '2025-07-07T15:00:00.000Z'},
            {start_time: '2025-07-07T15:00:00.000Z', end_time: '2025-07-07T16:00:00.000Z'},
            {start_time: '2025-07-07T16:00:00.000Z', end_time: '2025-07-07T17:00:00.000Z'},
            {start_time: '2025-07-07T17:00:00.000Z', end_time: '2025-07-07T18:00:00.000Z'},
            {start_time: '2025-07-07T18:00:00.000Z', end_time: '2025-07-07T19:00:00.000Z'},
            {start_time: '2025-07-07T19:00:00.000Z', end_time: '2025-07-07T20:00:00.000Z'}];

        const filteredReservationsDTOList = [];
        // Do Intersection of disallowed times, pending or closed reservations and auto generated reservations
        loop1: for (const autoGeneratedReservation of autoGeneratedReservationTimeSlots2) {
            // console.log('autoGeneratedReservation: ', autoGeneratedReservation);
            for (const disallowedReservation of allDisallowedReservationsForDateList) {
                if (disallowedReservation['start_time'].toISOString() === autoGeneratedReservation['start_time']
                    && disallowedReservation['end_time'].toISOString() === autoGeneratedReservation['end_time']) {
                    continue loop1;
                }
            }
            for (const pendingOrClosedReservation of allPendingOrClosedReservations) {
                if (pendingOrClosedReservation['start_time'] === autoGeneratedReservation['start_time']
                    && pendingOrClosedReservation['end_time'] === autoGeneratedReservation['end_time']) {
                    continue loop1;
                }
            }
            filteredReservationsDTOList.push(autoGeneratedReservation);
        }

        // ------------------------------end----------------------------------------
        // console.log('filteredReservationsDTOList: ', filteredReservationsDTOList);

        return filteredReservationsDTOList;
    } catch {
        return null;
    }
}