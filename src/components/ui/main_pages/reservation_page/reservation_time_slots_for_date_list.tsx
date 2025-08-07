'use client'

import { useEffect, useState } from "react";
import { List, Button} from "antd";
const { Item } = List;
import {getAllAvailableTimeSlotsForDateServerAction} from '@/lib/actions/user_reservation_server_actions';
import dayjs from "dayjs";
import 'dayjs/locale/ar-sa' // import locale
dayjs.locale('ar-sa') // use locale
import utc from 'dayjs/plugin/utc' // import utc plugin
import timezone from 'dayjs/plugin/timezone' // import timezone plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Riyadh");

interface TimeSlot {
    start_time: string;
    end_time: string;
}

export function ReservationTimeSlotsForDateList({dateInISO8601Format, timeSlotClickFunctionAction}: { dateInISO8601Format: string; timeSlotClickFunctionAction: (sto: string, eto: string) => void;}) {
    const [timeSlotsForDate, setTimeSlotsForDate] = useState<TimeSlot[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // generate list items of time slots
        async function fetchAllAvailableTimeSlotsForDate() {
            try {
                setLoading(true);
                const allTimeSlots = await getAllAvailableTimeSlotsForDateServerAction(dateInISO8601Format);
                setTimeSlotsForDate(allTimeSlots);
                setLoading(false);
            } catch {
                setTimeSlotsForDate(null);
                setLoading(false);
            }
        }

        fetchAllAvailableTimeSlotsForDate();
    }, [dateInISO8601Format]);

    const handleTimeSlotClick = (e) => {
        console.log('before working');
        console.log('e is: ', e.target.parentNode.dataset.itemStartTime)
        timeSlotClickFunctionAction(e.target.parentNode.dataset.itemStartTime, e.target.parentNode.dataset.itemEndTime);
    }

    return (
        <>
            <List
                loading={loading}
                itemLayout="vertical"
                header={<div>الاوقات المتاحة:</div>}
                bordered
                dataSource={timeSlotsForDate || undefined}
                renderItem={(item) => (
                    <Item>
                        <Button
                            data-item-start-time={item.start_time}
                            data-item-end-time={item.end_time}
                            onClick={handleTimeSlotClick}
                        >
                            {(dayjs(item.start_time)).tz("Asia/Riyadh").format('h:mm a')} إلى {(dayjs(item.end_time)).tz("Asia/Riyadh").format('h:mm a')}
                        </Button>
                    </Item>
                )}
            />
        </>


    )
}



// {/*<Item>*/}
// {/*    <Button>من 10 إلى 11</Button>*/}
// {/*</Item>*/}
// {/*<Item>*/}
// {/*    <Button>من 11 إلى 12</Button>*/}
// {/*</Item>*/}
// {/*<Item>*/}
// {/*    <Button>من 12 إلى 13</Button>*/}
// {/*</Item>*/}
// {/*<Item>*/}
// {/*    <Button>من 13 إلى 14</Button>*/}
// {/*</Item>*/}
// {/*</List>*/}