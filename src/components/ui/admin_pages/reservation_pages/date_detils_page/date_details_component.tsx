'use client'
import React, {useEffect, useState} from 'react';
import {Table, Button, TimePicker, Popconfirm, message} from 'antd';
const {RangePicker} = TimePicker;
import type {TableProps} from 'antd';
import {addAllowedReservationDateTimeServerAction, getAllowedDateTimesServerAction} from "@/lib/actions/server_actions";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ar-sa';
import toObject from 'dayjs/plugin/toObject';
// import locale from "antd/locale/ar_EG";
dayjs.locale('ar-sa');
dayjs.extend(toObject);

// interface DataType {
//     // key: number;
//     start_time: {
//         hour: string;
//         minutes: string;
//     };
//     end_time: {
//         hour: string;
//         minutes: string;
//     };
//     status: string;
// }

interface DataType {
    // key: number;
    start_time: string;
    end_time: string;
    status: string;
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
        title: 'بداية الوقت',
        dataIndex: 'start_time',
        width: '30%',
        // editable: true,
    },
    {
        title: 'نهاية الوقت',
        dataIndex: 'end_time',
    },
    {
        title: 'الحالة',
        dataIndex: 'status',
    }
];

const format = "h:mm a";
type TimeRange = [start: Dayjs | null | undefined, end: Dayjs | null | undefined];

export default function DateDetails({ date }: {date: string}) {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [timeRangePickedDefaultValue, setTimeRangePickedDefaultValue] = useState<TimeRange>([null, null]);     // TODO check if it is on to set it to null
    const [timeRangePickerValue, setTimeRangePickerValue] = useState<TimeRange | null>([null, null]);
    // const [timeRangePickerValue, setTimeRangePickerValue] = useState<[Dayjs, Dayjs] | null>(null);
    // const [timeRangePickedDefaultValue, setTimeRangePickedDefaultValue] = useState<[Dayjs, Dayjs] | null>(null);

    const [loading, setLoading] = useState(false);
    const [dataSourceCount, setDataSourceCount] = useState(0);
    // const [data, setData] = useState<DataType[] | undefined | null>([]);
    const [data, setData] = useState<DataType[]>([]);


    useEffect(() => {
        // fetchAllowedDateTimes();
        async function fetchData() {
            setLoading(true);
            const allowedDateTimes = await getAllowedDateTimesServerAction(date); // your server action
            // setData([
            //     {
            //         start_time: {
            //             hour: '19',
            //             minutes: '0',
            //         },
            //         end_time: {
            //             hour: '20',
            //             minutes: '0',
            //         },
            //         status: 'open',
            //     },
            //     {
            //         start_time: {
            //             hour: '21',
            //             minutes: '0',
            //         },
            //         end_time: {
            //             hour: '22',
            //             minutes: '0',
            //         },
            //         status: 'open',
            //     },
            // ]);
            if (allowedDateTimes === null) {
                setData([])
            } else {
                setData(allowedDateTimes!);
            }
            // console.log('page data: ', allowedDateTimes);
            setLoading(false);
        }
        fetchData();
    },[]);

    // const onChange = (dates: [Dayjs, Dayjs] | null, dateStrings: [string, string]) => {
    //     if (!dates) {
    //         setTimeRangePickerValue(null); // or handle accordingly
    //         // console.log('clear date: ', timeRangePickerValue);
    //         return;
    //     }
    //     // console.log('timeString: ', dateStrings);
    //     // console.log('time[0]: ', dates[0].toObject());
    //     // console.log('time[0]: ', dates[0].day());
    //
    //     // console.log('time[1]: ', dates[1].toString());
    //     setTimeRangePickerValue(dates);
    //     // await saveReservation({start:'fafe', end:'fsdgfeg'});
    //     // setTimeRangePickerValue([null, null]);
    // }

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        if (timeRangePickerValue === null || timeRangePickerValue === undefined) {
            setOpen(false);
            setConfirmLoading(false);
            setTimeRangePickerValue(null);
            messageApi.open({
                type: 'error',
                content: 'الرجاء اختيار وقت بداية ونهاية',
                duration: 10,
            });
            return;
        }
        setConfirmLoading(true);

        const dateSplitter = date.split('_');

        const startDate: {
            startDateYear: string;
            startDateMonth: string;
            startDateDay: string;
            startDateHour: string;
            startDateMinutes: string;
        } = {
            startDateYear: dateSplitter[0],
            startDateMonth: parseInt(dateSplitter[1]).toString(),
            startDateDay: parseInt(dateSplitter[2]).toString(),
            startDateHour: timeRangePickerValue[0]!.toObject().hours!.toString(),
            startDateMinutes: timeRangePickerValue[0]!.toObject().minutes!.toString()
        }

        const endDate: {
            endDateYear: string;
            endDateMonth: string;
            endDateDay: string;
            endDateHour: string;
            endDateMinutes: string;
        } = {
            endDateYear: dateSplitter[0],
            endDateMonth: parseInt(dateSplitter[1]).toString(),
            endDateDay: parseInt(dateSplitter[2]).toString(),
            endDateHour: timeRangePickerValue[1]!.toObject().hours!.toString(),
            endDateMinutes: timeRangePickerValue[1]!.toObject().minutes!.toString()
        }

        const addedSuccessfully = await addAllowedReservationDateTimeServerAction(startDate, endDate);
        if (addedSuccessfully) {
            setOpen(false);
            setConfirmLoading(false);
            setTimeRangePickerValue(null);
            messageApi.open({
                type: 'success',
                content: 'تمت اتاحة الحجز بنجاح',
                duration: 10,
            });
        } else if (addedSuccessfully === false) {
            setOpen(false);
            setConfirmLoading(false);
            setTimeRangePickerValue(null);
            messageApi.open({
                type: 'error',
                content: 'تعذر اتاحة الحجز. وقت ويوم الحجز متاحان مسبقاً.',
                duration: 10,
            });
        } else if (addedSuccessfully === null) {
            setOpen(false);
            setConfirmLoading(false);
            setTimeRangePickerValue(null);
            messageApi.open({
                type: 'error',
                content: 'حدثت مشكلة في النظام',
                duration: 10,
            });
        }
    };

    const handleCancel = () => {
        // console.log('Clicked cancel button');
        setOpen(false);
    };

    const reloadList = async () => {
        console.log('reloadList');
        getAllowedDateTimesServerAction(date);
    }

    const addDataSourceOnPageReload = async () => {

    }
    addDataSourceOnPageReload();

    return (
        <>
            {contextHolder}
            <Popconfirm
                title="اضافة حجز جديد"
                description="هل انت متأكد من اضافة حجز جديد ؟"
                open={open}
                onConfirm={handleOk}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={handleCancel}
                okText="نعم"
                cancelText="لا"
            >
                <Button className="ml-5 mb-5" type="primary" onClick={showPopconfirm}>
                    اضافة حجز جديد
                </Button>
            </Popconfirm>
            <RangePicker className="mr-5" defaultValue={timeRangePickedDefaultValue} value={timeRangePickerValue}
                         // onChange={onChange}
                         allowEmpty={[false, false]} use12Hours needConfirm={true} minuteStep={5}
                         hourStep={1} format={format} showNow={true}/>
            <div>
                <Button type="primary" onClick={reloadList}>
                    تحديث القائمة
                </Button>
                <Table<DataType> columns={defaultColumns} loading={loading} dataSource={data}> </Table>
            </div>
        </>
    )
}