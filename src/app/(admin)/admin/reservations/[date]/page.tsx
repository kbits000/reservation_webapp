import AdminLayout from "@/app/(admin)/admin/admin_layout";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {getUserRoleByEmail} from "@/lib/_data_access/users";
import React from "react";
import { z } from "zod";
import DateDetails from '@/components/ui/admin_pages/reservation_pages/date_detils_page/date_details_component';

// interface DataType {
//     key: number;
//     start_time: string;
//     end_time: string;
//     status: string;
// }

// type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

// const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
//     {
//         title: 'بداية الوقت',
//         dataIndex: 'start_time',
//         width: '30%',
//         // editable: true,
//     },
//     {
//         title: 'نهاية الوقت',
//         dataIndex: 'end_time',
//     },
//     {
//         title: 'الحالة',
//         dataIndex: 'status',
//     }
// ];
// const format = "h:mm a";

export default async function AdminReservationsDateDetailsPage({params,}: { params: Promise<{ date: string }> }) {
    const session = await auth();
    if (!session) {
        // TODO should redirect to unauthorized page
        redirect("/");
    }

    const userRole = await getUserRoleByEmail(session.user?.email);

    if (userRole !== "admin") {
        return redirect("/");
    }

    const { date } = await params;
    const re = new RegExp(/\d{1}\d{1}\d{1}\d{1}_\d{1}\d{1}_\d{1}\d{1}/);
    // const reg = /\d{1}\d{1}\d{1}\d{1}_\d{1}\d{1}_\d{1}\d{1}/
    if (!re.test(date)) {
        redirect("/admin/reservations");
    }

    const dateZod = z.string().date();

    if (!dateZod.safeParse(date.replaceAll("_","-")).success) {
        redirect("/admin/reservations");
    }

    // const onChange = (dates: [Dayjs, Dayjs] | null, dateStrings: [string, string]) => {
    //     // if (!dates) {
    //     //     setTimeRangePickerValue(null); // or handle accordingly
    //     //     return;
    //     // }
    //     // console.log('timeString: ', dateStrings);
    //     // console.log('time[0]: ', dates[0].toObject());
    //     // console.log('time[0]: ', dates[0].day());
    //     //
    //     // console.log('time[1]: ', dates[1].toString());
    //     // setTimeRangePickerValue(dates);
    // }

    return (
        <>
            <AdminLayout role={userRole}>

                {/*<Button type="primary">اضافة حجز جديد</Button>*/}
                {/*/!*<RangePicker  allowEmpty={[false, false]} use12Hours needConfirm={true} minuteStep={5} hourStep={1} format={format} showNow={true} />*!/*/}
                {/*/!*<RangePicker showTime format="YYYY-MM-DD h:mm a"> </RangePicker>*!/*/}
                {/*<Table<DataType> columns={defaultColumns} > </Table>*/}
                <DateDetails date={date}/>
            </AdminLayout>
        </>
    );
}