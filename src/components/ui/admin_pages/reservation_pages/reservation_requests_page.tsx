'use client'
import {useEffect, useState} from 'react';
import { Table, Button, Space, Empty, message, Tag, Popconfirm } from 'antd';
import type { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ar-sa';
dayjs.locale('ar-sa');

import {
    confirmReservationRequestServerAction,
    getAdminReservationRequestsServerAction,
    rejectReservationRequestServerAction,
} from "@/lib/actions/admin_server_actions";

type ReservationStatus = 'pending' | 'rejected' | 'cancelled' | 'confirmed';

interface AdminReservationRequestRow {
    public_id: string;
    key: string;
    date: string;
    start_time: string;
    end_time: string;
    reason: string;
    status: ReservationStatus;
    created_at: string;
    customer_name: string;
    customer_email: string;
    customer_phone_number: string;
}

const statusLabels: Record<ReservationStatus, string> = {
    pending: 'قيد الانتظار',
    cancelled: 'ملغي',
    rejected: 'مرفوض',
    confirmed: 'مؤكد',
};
const statusColors: Record<ReservationStatus, string> = {
    pending: 'gold',
    cancelled: 'default',
    rejected: 'red',
    confirmed: 'green',
};

// const columns = [
//     {
//         title: 'التاريخ',
//         dataIndex: 'date',
//         key: 'date',
//         render: (value: string) => dayjs(value).format('YYYY/MM/DD dddd'),
//     },
//     {
//         title: 'بداية الوقت',
//         dataIndex: 'start_time',
//         key: 'start_time',
//         render: (value: string) => dayjs(value).format('hh:mm a'),
//     },
//     {
//         title: 'نهاية الوقت',
//         dataIndex: 'end_time',
//         key: 'end_time',
//         render: (value: string) => dayjs(value).format('hh:mm a'),
//     },
//     {
//         title: 'الطالب',
//         dataIndex: 'reservor',
//         key: 'reservor',
//     },
//     {
//         title: 'بريد الطالب',
//         dataIndex: 'customer_email',
//         key: 'customer_email',
//     },
//     {
//         title: 'رقم الجوال',
//         dataIndex: 'customer_phone_number',
//         key: 'customer_phone_number',
//     },
//     {
//         title: 'سبب الحجز',
//         dataIndex: 'reason',
//         key: 'reason',
//         render: (value: string) => value || '-',
//     },
//     {
//         title: 'وقت الطلب',
//         dataIndex: 'created_at',
//         key: 'created_at',
//         render: (value: string) => dayjs(value).format('YYYY/MM/DD hh:mm a'),
//     },
//     {
//         title: 'حالة الطلب',
//         dataIndex: 'status',
//         key: 'status',
//         render: (value: ReservationStatus) => (
//             <Tag color={statusColors[value]}>
//                 {statusLabels[value]}
//             </Tag>
//         ),
//     },
// ];

export default function ReservationRequestsPage() {
    const [messageApi, contextHolder] = message.useMessage();
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reservationRequests, setReservationRequests] = useState<AdminReservationRequestRow[]>([]);
    const [actionLoadingPublicId, setActionLoadingPublicId] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchReservationRequests = async () => {
            setLoading(true);
            try {
                const result = await getAdminReservationRequestsServerAction();
                setReservationRequests(result ?? []);
            } catch {
                setReservationRequests([]);
                messageApi.open({
                    type: 'error',
                    content: 'تعذر تحميل طلبات الحجز',
                    duration: 6,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchReservationRequests();
    }, [refreshTrigger]);

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleConfirmReservation = async (reservationPublicId: string) => {
        setActionLoadingPublicId(reservationPublicId);
        try {
            const result = await confirmReservationRequestServerAction(reservationPublicId);
            if (result) {
                messageApi.open({
                    type: 'success',
                    content: 'تم تأكيد طلب الحجز بنجاح',
                    duration: 6,
                });
                handleRefresh();
                return;
            }
            messageApi.open({
                type: 'error',
                content: 'تعذر تأكيد الطلب. قد يكون تم تعديله بالفعل.',
                duration: 6,
            });
        } catch {
            messageApi.open({
                type: 'error',
                content: 'حدث خطأ أثناء محاولة تأكيد الطلب',
                duration: 6,
            });
        } finally {
            setActionLoadingPublicId(null);
        }
    };

    const handleRejectReservation = async (reservationPublicId: string) => {
        setActionLoadingPublicId(reservationPublicId);
        try {
            const result = await rejectReservationRequestServerAction(reservationPublicId);
            if (result) {
                messageApi.open({
                    type: 'success',
                    content: 'تم رفض طلب الحجز بنجاح',
                    duration: 6,
                });
                handleRefresh();
                return;
            }
            messageApi.open({
                type: 'error',
                content: 'تعذر رفض الطلب. قد يكون تم تعديله بالفعل.',
                duration: 6,
            });
        } catch {
            messageApi.open({
                type: 'error',
                content: 'حدث خطأ أثناء محاولة رفض الطلب',
                duration: 6,
            });
        } finally {
            setActionLoadingPublicId(null);
        }
    };


    const columns: TableColumnsType<AdminReservationRequestRow> = [
        {
            title: 'التاريخ',
            dataIndex: 'date',
            key: 'date',
            render: (value: string) => dayjs(value).format('YYYY/MM/DD dddd'),
        },
        {
            title: 'بداية الوقت',
            dataIndex: 'start_time',
            key: 'start_time',
            render: (value: string) => dayjs(value).format('hh:mm a'),
        },
        {
            title: 'نهاية الوقت',
            dataIndex: 'end_time',
            key: 'end_time',
            render: (value: string) => dayjs(value).format('hh:mm a'),
        },
        {
            title: 'اسم طالب الحجز',
            dataIndex: 'reservor',
            key: 'reservor',
        },
        {
            title: 'بريد طالب الحجز',
            dataIndex: 'customer_email',
            key: 'customer_email',
        },
        {
            title: 'رقم الجوال',
            dataIndex: 'customer_phone_number',
            key: 'customer_phone_number',
        },
        {
            title: 'سبب الحجز',
            dataIndex: 'reason',
            key: 'reason',
            render: (value: string) => value || '-',
        },
        {
            title: 'وقت الطلب',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (value: string) => dayjs(value).format('YYYY/MM/DD hh:mm a'),
        },
        {
            title: 'حالة الطلب',
            dataIndex: 'status',
            key: 'status',
            render: (value: ReservationStatus) => (
                <Tag color={statusColors[value]}>
                    {statusLabels[value]}
                </Tag>
            ),
        },
        {
            title: 'الإجراء',
            key: 'action',
            render: (_, record) => {
                const isPending = record.status === 'pending';
                const isLoadingCurrentRow = actionLoadingPublicId === record.public_id;
                return (
                    <Space>
                        <Popconfirm
                            title="هل تريد تأكيد هذا الطلب؟"
                            okText="نعم"
                            cancelText="لا"
                            onConfirm={() => handleConfirmReservation(record.public_id)}
                            disabled={!isPending}
                        >
                            <Button
                                type="primary"
                                disabled={!isPending}
                                loading={isLoadingCurrentRow}
                            >
                                تأكيد
                            </Button>
                        </Popconfirm>
                        <Popconfirm
                            title="هل تريد رفض هذا الطلب؟"
                            okText="نعم"
                            cancelText="لا"
                            onConfirm={() => handleRejectReservation(record.public_id)}
                            disabled={!isPending}
                        >
                            <Button
                                danger
                                disabled={!isPending}
                                loading={isLoadingCurrentRow}
                            >
                                رفض
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];


    return (
        <div className='pt-4'>
            {contextHolder}

            <Space className='pb-4'>
                <Button type="primary" onClick={handleRefresh}>
                    تحديث القائمة
                </Button>
            </Space>

            <Table
                className='pt-2'
                columns={columns}
                dataSource={reservationRequests}
                loading={loading}
                locale={{
                    emptyText: <Empty description="لا توجد طلبات حجز" />,
                }}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
                rowKey='key'
            />
        </div>
    )
}