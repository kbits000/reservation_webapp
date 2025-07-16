'use client'
import {useEffect, useState} from 'react';
import { Table, Button } from 'antd';

const columns = [
    {
        title: 'التاريخ',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'بداية الوقت',
        dataIndex: 'start_time',
        key: 'start_time',
    },
    {
        title: 'نهاية الوقت',
        dataIndex: 'end_time',
        key: 'end_time',
    },
    {
        title: 'الطالب',
        dataIndex: 'reservor',
        key: 'reservor',
    },
    {
        title: 'وقت الطلب',
        dataIndex: 'request_time',
        key: 'request_time',
    },
    {
        title: 'حالة الطلب',
        dataIndex: 'status',
        key: 'status',
    },
];

export default function ReservationRequestsPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {

    }, [refreshTrigger]);

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };


    return (
        <div className='pt-4'>
            <Button type="primary" onClick={() => handleRefresh()}>تحديث القائمة</Button>

            <Table className='pt-2' columns={columns} />
        </div>
    )
}