'use client'

import { useRouter } from 'next/navigation'
import { redirectToReservingDetailsPageServerAction } from '@/lib/actions/user_reservation_server_actions';
import { useEffect, useState } from "react";
import dayjs, {type Dayjs} from "dayjs";
import 'dayjs/locale/ar-sa' // import locale
dayjs.locale('ar-sa') // use locale
import utc from 'dayjs/plugin/utc' // import utc plugin
import timezone from 'dayjs/plugin/timezone' // import timezone plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Riyadh");
import { CloseOutlined } from '@ant-design/icons';
import { Button, Calendar, Grid, Modal, Typography, Splitter } from "antd";
const { useBreakpoint } = Grid;
const { Title } = Typography;
const { Panel } = Splitter;
import { ReservationTimeSlotsForDateList } from '@/components/ui/main_pages/reservation_page/reservation_time_slots_for_date_list';
import { ReserverDetailsComponent } from "@/components/ui/main_pages/reservation_page/reserver_details_component";


export function UserReservePage(
    {
        userEmail,
        userName,
        userPhoneNumber,
        userSex,
        userFullName
    }:
    {
        userEmail: string | null | undefined;
        userName: string | null | undefined
        userPhoneNumber: string | null | undefined;
        userSex: string | null | undefined;
        userFullName: string | null | undefined;
    }
) {
    const router = useRouter()
    const screens = useBreakpoint();
    const [calenderValue, setCalenderValue] = useState<Dayjs>(dayjs().set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).tz('Asia/Riyadh'));
    const [modalClickCounter, setModalClickCounter] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [showTimeSlotsPanel, setShowTimeSlotsPanel] = useState(false);
    const [panelClickCounter, setPanelClickCounter] = useState(0);
    const [modalLoading, setModalLoading] = useState(true);
    const [showReserverDetails, setShowReserverDetails] = useState<boolean>(false);
    const [selectedTimePeriod, setSelectedTimePeriod] = useState<[string,string]>(['','']);

    useEffect(() => {

    }, [screens, showReserverDetails, selectedTimePeriod]);

    const incrementPanelClickCounter = () => {
        setPanelClickCounter(panelClickCounter + 1);
    }

    const incrementModalClickCounter = () => {
        setModalClickCounter(modalClickCounter + 1);
    }

    const handleOnSelectCalenderDate = (date: Dayjs) => {
        if (!screens.lg) {
            // if (date.isSame(calenderValue)) {
            //     if (modalClickCounter >= 1) {
            //         setModalClickCounter(0);
            //         showModal();
            //         return;
            //     }
            //     incrementModalClickCounter();
            //     return;
            // }
            setCalenderValue(date);
            showModal();
            setModalClickCounter(0);
        } else {
            // if (date.isSame(calenderValue)) {
            //     if (panelClickCounter >= 1) {
            //         setPanelClickCounter(0);
            //         setShowTimeSlotsPanel(true);
            //         return;
            //     }
            //     incrementPanelClickCounter();
            // }
            setCalenderValue(date);
            setShowTimeSlotsPanel(true);
        }
    }

    const disabledDate = (currentDate: Dayjs) => {
        return currentDate.isBefore(dayjs(), 'date');
    }

    const showModal = () => {
        setModalOpen(true);
    }

    const handleOk = () => {
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    const handleOnClickCloseButton = () => {
        setShowTimeSlotsPanel(false);
    }

    const handleTimeSlotClick = async (selectedStartTime: string, selectedEndTime: string) => {
        // TODO create a server action that
        // router.push('/reservation/reserving_details');  // TODO with the datetimes !
        const result = await redirectToReservingDetailsPageServerAction(selectedStartTime, selectedEndTime);
    }

    const toggleGoBackButtonClick = () => {
        setShowReserverDetails(prevState => !prevState);
    }

    return (
        <>
            <div className="p-10 h-min">
                <Title level={3}>الرجاء اختيار وقت لحجزه:</Title>
                <div className='border rounded-xl p-4'>
                    {
                        !screens.lg
                        &&
                        (
                            <>
                                {/*<Button type="primary" onClick={showModal}>*/}
                                {/*    Open Modal*/}
                                {/*</Button>*/}
                                <Modal title="الاوقات المتاحة:"
                                       open={modalOpen}
                                       onOk={handleOk}
                                       onCancel={handleCancel}
                                       // loading={modalLoading}
                                >
                                    <ReservationTimeSlotsForDateList dateInISO8601Format={calenderValue.toISOString()} timeSlotClickFunctionAction={handleTimeSlotClick} />
                                </Modal>
                                <Calendar value={calenderValue} disabledDate={disabledDate} onSelect={handleOnSelectCalenderDate} />
                            </>
                        )
                    }
                    {
                        screens.lg
                        &&
                        (
                            <div style={{ width: '100%', height: '500px' }}>
                                <Splitter lazy={true}>
                                    <Panel resizable={false}>
                                        <Calendar value={calenderValue} disabledDate={disabledDate} onSelect={handleOnSelectCalenderDate} />
                                    </Panel>
                                    {
                                        showTimeSlotsPanel &&
                                        <Panel resizable={false} className='p-8'>
                                            <Button size={'small'} icon={<CloseOutlined />} onClick={handleOnClickCloseButton}/>
                                            <ReservationTimeSlotsForDateList dateInISO8601Format={calenderValue.toISOString()}  timeSlotClickFunctionAction={handleTimeSlotClick}/>
                                        </Panel>
                                    }
                                </Splitter>
                            </div>
                        )
                    }
                </div>
            </div>

        </>
    )
}