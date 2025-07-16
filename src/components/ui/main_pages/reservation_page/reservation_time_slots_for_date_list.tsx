'use client'

import {useEffect, useState} from "react";
import { List, Button} from "antd";
const { Item } = List;
import {getAllAvailableTimeSlotsForDateServerAction} from '@/lib/actions/user_reservation_server_actions';


interface TimeSlot {
    start_time: string;
    end_time: string;
}

export function ReservationTimeSlotsForDateList({dateInISO8601Format}: { dateInISO8601Format: string }) {
    const [timeSlotsForDate, setTimeSlotsForDate] = useState<TimeSlot[] | null>(null);

    useEffect(() => {
        // generate list items of time slots
        async function fetchAllAvailableTimeSlotsForDate() {
            try {
                console.log("fetchAllAvailableTimeSlotsForDate");
                const atwet = await getAllAvailableTimeSlotsForDateServerAction('dateInISO8601Format');
                console.log(atwet);

                setTimeSlotsForDate(atwet);
            } catch {
                setTimeSlotsForDate(null);
            }
        }

        fetchAllAvailableTimeSlotsForDate()
    }, []);

    return (
        <>
            <List
                itemLayout="vertical"
                header={<div>الاوقات المتاحة:</div>}
                bordered
                dataSource={timeSlotsForDate || undefined}
                renderItem={(item) => (
                    <Item><Button>{item.start_time} end {item.end_time}</Button></Item>
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