'use client'

import {useState, useEffect} from 'react';
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ar-sa';
import {Table, Button, Modal, DatePicker, Switch, TimePicker, message, Popconfirm, Space, Divider } from 'antd';
import type {TableColumnsType} from 'antd';
import {
    addDisallowedReservationDateFullDayServerAction,
    addDisallowedReservationDateTimePeriodServerAction,
    getAllDisallowedReservationDatesTimesSlotsServerAction,
    deleteDisallowedReservationDateTimeServerAction
} from "@/lib/actions/disallowed_reservation_dates_server_actions";

const {RangePicker} = TimePicker;
dayjs.locale('ar-sa');
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

interface DisallowedReservationDate {
    key: number;
    date: string;
    start_time?: string;
    end_time?: string;
    is_full_day: string;
}


export default function DisallowedReservationDatesTimesSlotsPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeRange, setTimeRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
    const [timeRangeDisabled, setTimeRangeDisabled] = useState<[boolean, boolean]>([false, false]);
    const [timeRangeStatus, setTimeRangeStatus] = useState<"" | "error" | "warning" | undefined>("");
    const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(null);
    const [modalConfirmLoading, setModalConfirmLoading] = useState<boolean>(false);
    const [datePickerStatus, setDatePickerStatus] = useState<"" | "error" | "warning" | undefined>("");
    const [checkedSwitch, setCheckedSwitch] = useState<boolean>(false);
    const [tableDataLoading, setTableLoading] = useState<boolean>(false);
    const [tableData, setTableData] = useState<DisallowedReservationDate[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        async function fetchTableData() {
            setTableLoading(true);
            const allDisallowedReservationsDates = await getAllDisallowedReservationDatesTimesSlotsServerAction();

            if (allDisallowedReservationsDates !== null) {
                // const allDisallowedReservationsDatesObject = Object.assign({}, allDisallowedReservationsDates);
                for (const singleDisallowedReservationDate of allDisallowedReservationsDates) {
                    if (singleDisallowedReservationDate['is_full_day'] === 'نعم') {
                        singleDisallowedReservationDate['start_time'] = 'كل اليوم';
                        singleDisallowedReservationDate['end_time'] = 'كل اليوم';
                    }
                }
                for (const i in allDisallowedReservationsDates) {
                    allDisallowedReservationsDates[i]['date'] = (dayjs(allDisallowedReservationsDates[i]['date'])).format('YYYY-MM-DD dddd');
                    if (allDisallowedReservationsDates[i]['is_full_day'] === 'لا') {
                        allDisallowedReservationsDates[i]['start_time'] = (dayjs(allDisallowedReservationsDates[i]['start_time'])).format('hh:mm a');
                        allDisallowedReservationsDates[i]['end_time'] = (dayjs(allDisallowedReservationsDates[i]['end_time'])).format('hh:mm a');
                    }
                }
                setTableData(allDisallowedReservationsDates);
            }
            // setTableData([
            //     {
            //         key: 0,
            //         date: 'string',
            //         start_time: 'string',
            //         end_time: 'string',
            //         is_full_day: 'false'
            //     },
            //     {
            //         key: 1,
            //         date: 'string',
            //         is_full_day: 'true'
            //     }]);
            setTableLoading(false);
        }
        fetchTableData();
    }, [refreshTrigger]);

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleDelete = async (key: number) => {
        const dateDayjsObject: Dayjs = dayjs(tableData[key]['date'], 'YYYY-MM-DD dddd', 'ar-sa', true);
        const dateInISO8601Format: string = dateDayjsObject.toISOString(); // assume it is always valid
        const isFullDay: boolean = tableData[key]['is_full_day'] === 'نعم';
        if (isFullDay) {
            const response = await deleteDisallowedReservationDateTimeServerAction({
                dateInISO8601Format: dateInISO8601Format,
                isFullDay: isFullDay
            });
            if (response) {
                handleRefresh();
                messageApi.open({
                    type: 'success',
                    content: 'تم حذف اليوم المحجوب/المغلق بنجاح',
                    duration: 10
                });
                return;
            }
            messageApi.open({
                type: 'error',
                content: 'حدثت مشكلة اثناء حذف اليوم المحجوب/المغلق',
                duration: 10
            });
            return;
        } else {
            const startTimeInISO8601Format: string = dayjs(tableData[key]['start_time'], 'hh:mm a', 'ar-sa', true).set('year', dateDayjsObject.year()).set('month', dateDayjsObject.month()).set('date', dateDayjsObject.date()).toISOString(); // assume it is always valid
            const endTimeInISO8601Format: string = dayjs(tableData[key]['end_time'], 'hh:mm a', 'ar-sa', true).set('year', dateDayjsObject.year()).set('month', dateDayjsObject.month()).set('date', dateDayjsObject.date()).toISOString(); // assume it is always valid

            const response = await deleteDisallowedReservationDateTimeServerAction({
                dateInISO8601Format: dateInISO8601Format,
                isFullDay: isFullDay,
                startTimeInISO8601Format: startTimeInISO8601Format,
                endTimeInISO8601Format: endTimeInISO8601Format
            });
            if (response) {
                handleRefresh();
                messageApi.open({
                    type: 'success',
                    content: 'تم حذف الموعد المحجوب/المغلق بنجاح',
                    duration: 10
                });
                return;
            }
            messageApi.open({
                type: 'error',
                content: 'حدثت مشكلة اثناء حذف الموعد المحجوب/المغلق',
                duration: 10
            });
            return;
        }
    }

    const columns: TableColumnsType<DisallowedReservationDate> = [
        {
            title: 'التاريخ',
            dataIndex: 'date',
            key: '1',
        },
        {
            title: 'بداية الوقت',
            dataIndex: 'start_time',
            width: '30%',
            // editable: true,
            key: '2',
        },
        {
            title: 'نهاية الوقت',
            dataIndex: 'end_time',
            key: '3',
        },
        {
            title: 'كل اليوم؟',
            dataIndex: 'is_full_day',
            key: '4',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm title="هل أنت متأكد بأنك تريد حذفه ؟" onConfirm={() => handleDelete(record.key)}>
                    <Button color="danger" variant="text">حذف</Button>
                </Popconfirm>
            ),
        }
    ];


    const showModal = () => {
        setIsModalOpen(true);
    };

    const setDatePickerStatusAfter10s = async (status: "" | "warning" | "error" | undefined) => {
        setDatePickerStatus(status);
        return;
    }

    const setTimeRangeStatusAfter10s = async (status: "" | "warning" | "error" | undefined) => {
        setTimeRangeStatus(status);
        return;
    }

    const handleOk = async () => {
        setModalConfirmLoading(true);
        if (datePickerValue === null || datePickerValue === undefined) {
            setModalConfirmLoading(false);
            messageApi.open({
                type: 'error',
                content: 'الرجاء اختيار تاريخ يوم لإغلاقه',
                duration: 10,
            });
            setDatePickerStatus("error");
            setTimeout(setDatePickerStatusAfter10s, 10000, "");
            return;
        }
        if (!checkedSwitch && (timeRange[0] === null || timeRange[1] === null)) {
            setModalConfirmLoading(false);
            messageApi.open({
                type: 'error',
                content: 'الرجاء اختيار فترة زمنية لاغلاقها',
                duration: 10,
            });
            setTimeRangeStatus("error");
            setTimeout(setTimeRangeStatusAfter10s, 10000, "");
            return;
        }

        if ((timeRange[0] === null || timeRange[1] === null || timeRange[0] === undefined || timeRange[1] === undefined) && checkedSwitch) {
            // is_full_day is true
            const response = await addDisallowedReservationDateFullDayServerAction(
                {
                    dateInISO8601Format: datePickerValue.toISOString(),
                    is_full_day: checkedSwitch
                }
            );

            if (response) {
                messageApi.open({
                    type: 'success',
                    content: 'تمت اضافة اليوم المحدد لقائمة الايام والاوقات المحجوبة / المحجوبة',
                    duration: 10,
                });
                handleRefresh();
            } else if (response === false) {
                messageApi.open({
                    type: 'error',
                    content: 'التاريخ المحدد مضاف مسبقاً',
                    duration: 10,
                });
            } else if (response === null) {
                messageApi.open({
                    type: 'error',
                    content: 'حدثت مشكلة اثناء اضافة اليوم لقائمة الايام والاوقات المحجوبة / المغلقة',
                    duration: 10,
                });
            }

        } else if (!checkedSwitch && timeRange[0] !== null && timeRange[1] !== null) {
            // is_full_day is false
            if (timeRange[0]?.isSame(timeRange[1])) {
                setModalConfirmLoading(false);
                messageApi.open({
                    type: 'error',
                    content: 'لا يمكن ان تكون قيمة بداية الفترة ونهايتها نفسها',
                    duration: 10,
                });
                setTimeRangeStatus("error");
                setTimeout(setTimeRangeStatusAfter10s, 10000, "");
                return;
            }

            const response = await addDisallowedReservationDateTimePeriodServerAction({
                dateInISO8601Format: datePickerValue.toISOString(),
                startTimeISO8601Format: timeRange[0]!.toISOString(),
                endTimeISO8601Format: timeRange[1]!.toISOString()
            });

            if (response) {
                messageApi.open({
                    type: 'success',
                    content: 'تمت اضافة اليوم المحدد لقائمة الايام والاوقات المحجوبة / المغلقة',
                    duration: 10,
                });
                handleRefresh();
            } else if (response === false) {
                messageApi.open({
                    type: 'error',
                    content: 'التاريخ المحدد مضاف مسبقاً',
                    duration: 10,
                });
            } else if (response === null) {
                messageApi.open({
                    type: 'error',
                    content: 'حدثت مشكلة اثناء اضافة اليوم لقائمة الايام والاوقات المحجوبة / المغلقة',
                    duration: 10,
                });
            }
        }

        setIsModalOpen(false);
        setModalConfirmLoading(false);
        resetModalValues();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDatePickerValue(null);
        setCheckedSwitch(false);
        setTimeRangeDisabled([false, false]);
        setTimeRange([null, null]);
        setModalConfirmLoading(false);
    };

    const resetModalValues = () => {
        setDatePickerValue(null);
        setCheckedSwitch(false);
        setTimeRangeDisabled([false, false]);
        setTimeRange([null, null]);
    };

    return (
        <div className='pt-4'>
            {contextHolder}
            <Modal
                title="حدد موعد لاغلاقه"
                closable={{'aria-label': 'Custom Close Button'}}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                confirmLoading={modalConfirmLoading}
            >
                <div className='my-4'>
                    <div className='pb-2'>
                        التاريخ:
                        <DatePicker
                            status={datePickerStatus}
                            defaultValue={null}
                            value={datePickerValue}
                            onChange={(date) => {
                                if (date !== null && date !== undefined) {
                                    setDatePickerValue(date);
                                    if (timeRange[0] !== null && timeRange[1] !== null) {
                                        setTimeRange([timeRange[0].set('year', date.year()).set('month', date.month()).set('day', date.date()), timeRange[1].set('year', date.year()).set('month', date.month()).set('day', date.date())]);
                                    } else {
                                        setTimeRange([dayjs(date), dayjs(date)]);
                                    }
                                }
                            }}
                            needConfirm={true}
                            format='YYYY/MM/DD dddd'
                            disabledDate={(currentDate: Dayjs) => {return currentDate.isBefore(dayjs(), 'day')}}
                        />
                    </div>
                    <div className='pb-2'>
                        اليوم كاملاً ؟
                        <Switch
                            checked={checkedSwitch}
                            onChange={(checked) => {
                                if (checked) {
                                    setCheckedSwitch(checked);
                                    setTimeRangeDisabled([true, true]);
                                    setTimeRange([null, null]);
                                } else {
                                    setCheckedSwitch(checked);
                                    setTimeRangeDisabled([false, false]);
                                }
                            }}
                        />
                    </div>
                    <div className='pb-2'>
                        الفترة:
                        <RangePicker
                            defaultValue={[null, null]}
                            onChange={(dates) => {
                                if (dates !== null && dates !== undefined) {
                                    if (dates[0] !== null && dates[1] !== null && dates[0] !== undefined && dates[1] !== undefined) {
                                        if (datePickerValue !== null) {
                                            setTimeRange([dates[0].set('year', datePickerValue.year()).set('month', datePickerValue.month()).set('date', datePickerValue.date()), dates[1].set('year', datePickerValue.year()).set('month', datePickerValue.month()).set('date', datePickerValue.date())]);
                                        }
                                    }
                                }
                            }}
                            value={[timeRange[0], timeRange[1]]}
                            allowClear
                            placeholder={['بداية الوقت', 'نهاية الوقت']}
                            format="h:mm a"
                            hourStep={1}
                            minuteStep={5}
                            use12Hours
                            needConfirm={true}
                            showNow={true}
                            disabled={timeRangeDisabled}
                            status={timeRangeStatus}
                        />
                    </div>
                </div>
            </Modal>

            <Space split={<Divider type="vertical" />} wrap>
                <Button type="primary" onClick={() => handleRefresh()}>تحديث القائمة</Button>
                <Button type="primary" onClick={showModal}>اغلق يوم او وقت</Button>
            </Space>

            <Table columns={columns} loading={tableDataLoading} dataSource={tableData} className='mt-2' scroll={{ x: 'max-content', y: '60vh' }}/>
        </div>
    )
}