'use client'

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ar-sa';
import { useRouter } from 'next/navigation';
import { Button, Empty, message, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableColumnsType } from 'antd';

import { cancelCurrentUserReservationServerAction } from '@/lib/actions/user_reservation_server_actions';

dayjs.locale('ar-sa');

type ReservationStatus = 'pending' | 'rejected' | 'cancelled' | 'confirmed';

interface ReservationRow {
    public_id: string;
    key: string;
    date: string;
    start_time: string;
    end_time: string;
    reason: string;
    status: ReservationStatus;
    created_at: string;
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

function canCancelReservation(status: ReservationStatus) {
    return status === 'pending' || status === 'confirmed';
}

export default function MyReservationsList({
    initialReservations
}: {
    initialReservations: ReservationRow[];
}) {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [reservations, setReservations] = useState<ReservationRow[]>(initialReservations);
    const [cancellingReservationPublicId, setCancellingReservationPublicId] = useState<string | null>(null);

    useEffect(() => {
        setReservations(initialReservations);
    }, [initialReservations]);

    const handleRefresh = () => {
        router.refresh();
    };

    const handleCancelReservation = async (reservationPublicId: string) => {
        setCancellingReservationPublicId(reservationPublicId);

        try {
            const result = await cancelCurrentUserReservationServerAction(reservationPublicId);

            if (result) {
                setReservations((currentReservations) =>
                    currentReservations.map((reservation) =>
                        reservation.public_id === reservationPublicId
                            ? { ...reservation, status: 'cancelled' }
                            : reservation
                    )
                );
                messageApi.open({
                    type: 'success',
                    content: 'تم إلغاء الطلب بنجاح',
                    duration: 6,
                });
                router.refresh();
                return;
            }

            messageApi.open({
                type: 'error',
                content: 'تعذر إلغاء الطلب. قد يكون قد تغيرت حالته بالفعل.',
                duration: 6,
            });
        } catch {
            messageApi.open({
                type: 'error',
                content: 'حدث خطأ أثناء محاولة إلغاء الطلب',
                duration: 6,
            });
        } finally {
            setCancellingReservationPublicId(null);
        }
    };

    const columns: TableColumnsType<ReservationRow> = [
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
            title: 'سبب الحجز',
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: 'وقت الطلب',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (value: string) => dayjs(value).format('YYYY/MM/DD hh:mm a'),
        },
        {
            title: 'الحالة',
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
                const cancellable = canCancelReservation(record.status);

                return (
                    <Popconfirm
                        title="هل تريد إلغاء هذا الطلب؟"
                        okText="نعم"
                        cancelText="لا"
                        disabled={!cancellable}
                        onConfirm={() => handleCancelReservation(record.public_id)}
                    >
                        <Button
                            danger
                            disabled={!cancellable}
                            loading={cancellingReservationPublicId === record.public_id}
                        >
                            إلغاء الطلب
                        </Button>
                    </Popconfirm>
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
                columns={columns}
                dataSource={reservations}
                locale={{
                    emptyText: <Empty description="لا توجد طلبات حجز حتى الآن" />,
                }}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
                rowKey="id"
            />
        </div>
    );
}
