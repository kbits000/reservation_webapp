'use client'
import React, { useState } from 'react';
import {Alert, Calendar} from 'antd';
import type { TableProps } from 'antd';
import {redirect} from "next/navigation";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ar-sa';
import toObject from 'dayjs/plugin/toObject';
dayjs.locale('ar-sa');
dayjs.extend(toObject);
import {getAllAllowedReservationsDateYearMonthDayServerAction} from '@/lib/actions/server_actions';
interface DataType {
    key: number;
    start_time: string;
    end_time: string;
    status: string;
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;
type TimeRange = [start: Dayjs | null | undefined, end: Dayjs | null | undefined];

type StatusType = "" | "warning" | "error" | undefined;

export default function ReservationCalendar() {
    const [value, setValue] = useState(() => dayjs(dayjs()));
    const [selectedValue, setSelectedValue] = useState(() => dayjs(new Date()));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalClickCounter, setModalClickCounter] = useState(0);
    const [timeRangePickedDefaultValue, setTimeRangePickedDefaultValue] = useState<TimeRange>([null, null]);     // TODO check if it is on to set it to null
    const [timeRangePickerValue, setTimeRangePickerValue] = useState<TimeRange | null>([null, null]);
    const [timeRangePickerStatus, setTimeRangePickerStatus] = useState<StatusType>("");
    const [count, setCount] = useState(2);
    const [dataSource, setDataSource] = useState<DataType[]>([
        {
            key: 0,
            start_time: '19:20 2025-03-20 ',
            end_time: '20:20 2025-03-20',
            status: 'محجوز',
        },
        {
            key: 1,
            start_time: '20:20 2025-03-20',
            end_time: '21:20 2025-03-20',
            status: 'مفتوح',
        },
    ]);
    const [isTrue, setIsTrue] = useState<boolean>(false);

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
        },
    ];

    const modalCountClick = () => {
        setModalClickCounter(modalClickCounter + 1);
    };

    const onSelect = async (date: Dayjs, info: { source: 'year' | 'month' | 'date' | 'customize' }) => {
        await getAllAllowedReservationsDateYearMonthDayServerAction();
        if (!date.isSame(value, 'day') || !date.isSame(selectedValue, 'day')) {

            setValue(date);
            setSelectedValue(date);
            setModalClickCounter(0);
        } else {
            modalCountClick();
        }

        if (modalClickCounter == 2) {
            setIsModalOpen(true); // ✅ Show modal when a date is selected
            setModalClickCounter(0);

            // 1- fetch reservation data
            redirect(`/admin/reservations/${value.format('YYYY_MM_DD')}`);

        }
    };

    const onPanelChange = (value: Dayjs, mode: string) => {
        setValue(value);
    };


    const disabledDateFunction = (currentDate: Dayjs) => {
        if (currentDate.isSame('2025-02-06', 'day')) {
            return false;
        }
        return currentDate.isBefore(dayjs(), 'day');
    }
    return (
        <>
            <Alert
                style={{ marginTop: 15, marginBottom: 15 }}
                message={`التاريخ المحدد هو: ${selectedValue?.format('YYYY-MM-DD')}`}
            />
            <Calendar
                value={value}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                disabledDate={disabledDateFunction}
            />
        </>
    );
}
