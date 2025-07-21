'use client';
import {useEffect, useState} from "react";
import {Typography, Calendar, Modal, Button, Grid} from "antd";
const {Title} = Typography;
const {useBreakpoint} = Grid;

import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ar-sa';
dayjs.locale('ar-sa');
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);


export default function AnonymousUserReservationPage() {
    const screens = useBreakpoint();
    const [calenderValue, setCalenderValue] = useState<Dayjs>(dayjs());
    const [modalClickCounter, setModalClickCounter] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

    }, [screens]);

    const incrementModalClickCounter = () => {
        setModalClickCounter(modalClickCounter + 1);
    }

    const handleOnSelectCalenderDate = (date: Dayjs) => {
        if (!screens.lg) {
            if (date.isSame(calenderValue)) {
                if (modalClickCounter >= 1) {
                    setModalClickCounter(0);
                    showModal();
                    return;
                }
                incrementModalClickCounter();
                return;
            }
            setCalenderValue(date);
            setModalClickCounter(0);
        } else {
            setCalenderValue(date);
        }
    }

    const disabledDate = (currentDate: Dayjs) => {
        return !currentDate.isSameOrAfter(dayjs(), 'date');
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-10 h-min">
            <Title level={3}>الرجاء تسجيل الدخول للحجز:</Title>
            <div className='border rounded-xl p-4'>
                {
                    !screens.lg
                    &&
                    (
                        <>
                            <Button type="primary" onClick={showModal}>
                                Open Modal
                            </Button>
                            <Modal title="Basic Modal"
                                   open={isModalOpen}
                                   onOk={handleOk}
                                   onCancel={handleCancel}
                            >
                            </Modal>
                        </>
                    )
                }
                <Calendar value={calenderValue} disabledDate={disabledDate} onSelect={handleOnSelectCalenderDate}/>
            </div>
        </div>
    )
}