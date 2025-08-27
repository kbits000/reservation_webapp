'use client'

import { useEffect, useState, useRef } from "react";
import dayjs, {type Dayjs} from "dayjs";
import 'dayjs/locale/ar-sa' // import locale
dayjs.locale('ar-sa') // use locale
import utc from 'dayjs/plugin/utc' // import utc plugin
import timezone from 'dayjs/plugin/timezone' // import timezone plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Riyadh");
import { CloseOutlined } from '@ant-design/icons';
import { Button, Calendar, Grid, Modal, Typography, Splitter, Carousel, Space } from "antd";
const { useBreakpoint } = Grid;
const { Title } = Typography;
const { Panel } = Splitter;
import { ReservationTimeSlotsForDateList } from '@/components/ui/main_pages/reservation_page/reservation_time_slots_for_date_list';
import { ReserverDetailsComponent } from "@/components/ui/main_pages/reservation_page/reserver_details_component";
import type { GetRef } from 'antd';


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
) {    const carouselRef = useRef<GetRef<typeof Carousel>>(null);
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
        console.log(date);
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

    const handleTimeSlotClick = (selectedStartTime: string, selectedEndTime: string) => {
        console.log('before showReserverDetails: ', showReserverDetails);
        setShowReserverDetails(prevState => !prevState);
        console.log('after showReserverDetails: ', showReserverDetails);
        // carouselRef.current.next();
        if (carouselRef.current) {
            carouselRef.current.next();
            if (selectedStartTime != null && selectedEndTime != null) {
                setSelectedTimePeriod((prevState) => [selectedStartTime, selectedEndTime]);
            }
        }
    }

    const toggleGoBackButtonClick = () => {
        setShowReserverDetails(prevState => !prevState);
        console.log('go back button clicked');
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
                            <>
                                <Carousel ref={carouselRef} effect="fade">
                                    <Space >
                                        <Splitter>
                                            <Panel resizable={false}>
                                                <Calendar value={calenderValue} disabledDate={disabledDate} onSelect={handleOnSelectCalenderDate} />
                                            </Panel>
                                            {
                                                showTimeSlotsPanel &&
                                                <Panel resizable={false} className='p-8'>
                                                    <Button size={'small'} icon={<CloseOutlined />} onClick={handleOnClickCloseButton}/>
                                                    {/*<Empty*/}
                                                    {/*    description={*/}
                                                    {/*        <Text>*/}
                                                    {/*            لا يوجد اوقات متاحة*/}
                                                    {/*        </Text>*/}
                                                    {/*    }*/}
                                                    {/*/>*/}
                                                    <ReservationTimeSlotsForDateList dateInISO8601Format={calenderValue.toISOString()}  timeSlotClickFunctionAction={handleTimeSlotClick}/>
                                                </Panel>
                                            }
                                        </Splitter>
                                    </Space>
                                    {
                                        showReserverDetails ? (
                                            <div className='hidden'>
                                                <ReserverDetailsComponent
                                                    carouselRef={carouselRef.current}
                                                    toggleGoBackButtonClick={toggleGoBackButtonClick}
                                                    dateInH={calenderValue}
                                                    userEmail={userEmail}
                                                    userName={userName}
                                                    reservationDateInISO8601={calenderValue}
                                                    reservationTimePeriodInISO8601={selectedTimePeriod}
                                                    userPhoneNumber={userPhoneNumber}
                                                    userSex={userSex}
                                                    userFullName={userFullName}
                                                />
                                            </div>
                                        ) : (
                                            <div className='hidden'></div>
                                        )
                                    }
                                </Carousel>
                            </>
                        )
                    }
                    {/*<Calendar value={calenderValue} disabledDate={disabledDate} onSelect={handleOnSelectCalenderDate} />*/}
                </div>
            </div>
            {/*<div className="flex items-center justify-center p-12">*/}
            {/*    <div className="mx-auto">*/}
            {/*        <form>*/}

            {/*            <div className="flex">*/}

            {/*                <div className="w-1/2  p-4">*/}
                                {/*Right Section*/}
                        {/*        <div className='mb-3'>*/}
                        {/*            <label htmlFor="fName" className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*                الاسم كاملا*/}
                        {/*            </label>*/}
                        {/*            <input type="text" name="fName" id="fName" placeholder="First Name" value='محمد'*/}
                        {/*                   disabled={true}*/}
                        {/*                   className="rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*        </div>*/}
                        {/*        <div className='mb-3'>*/}
                        {/*            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*                البريد الالكتروني*/}
                        {/*            </label>*/}
                        {/*            <input type="text" name="email" id="email" value='example@gmail.com' disabled={true}*/}
                        {/*                   className="appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*        </div>*/}
                        {/*        <div className='mb-3'>*/}
                        {/*            <label htmlFor="phonenumber" className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*                رقم الجوال*/}
                        {/*            </label>*/}
                        {/*            <input type="text" name="phonenumber" id="phonenumber" value='+966500000000' disabled={true}*/}
                        {/*                   className="appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*        </div>*/}
                        {/*        <div className='mb-3'>*/}
                        {/*            <label htmlFor="reservation-reason"*/}
                        {/*                   className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*                سبب الحجز*/}
                        {/*            </label>*/}
                        {/*            <textarea name="reservation-reason" id="reservation-reason" placeholder='سبب الحجز' required={true}*/}
                        {/*                      className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*        </div>*/}
                        {/*        <div className='mb-3'>*/}
                        {/*            <label htmlFor="additional-info"*/}
                        {/*                   className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*                معلومات اضافية*/}
                        {/*            </label>*/}
                        {/*            <textarea name="additional-info" id="additional-info" placeholder='معلومات اضافية'*/}
                        {/*                      className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*    <div className="w-1/2  p-4">*/}
                        {/*        /!*Left Section*!/*/}
                        {/*        <RangePicker*/}
                        {/*            // disabledDate={disabledDate}*/}
                        {/*            // disabledTime={disabledRangeTime}*/}
                        {/*            needConfirm={true}*/}
                        {/*            showTime={{*/}
                        {/*                hideDisabledOptions: true,*/}
                        {/*                defaultValue: [dayjs('00:00:00', 'HH:mm'), dayjs('11:59:59', 'HH:mm')],*/}
                        {/*            }}*/}
                        {/*            minuteStep={5}*/}
                        {/*            format="YYYY/MM/DD HH:mm"*/}
                        {/*        />*/}
                        {/*    </div>*/}

                        {/*</div>*/}


                        {/*<div className="-mx-3 flex flex-wrap">*/}
                        {/*    <div className="w-full px-3 sm:w-1/2">*/}
                        {/*        <div className="mb-5">*/}
                        {/*            <label htmlFor="fName" className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*                الاسم كاملا*/}
                        {/*            </label>*/}
                        {/*            <input type="text" name="fName" id="fName" placeholder="First Name" value='محمد'*/}
                        {/*                   disabled={true}*/}
                        {/*                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="mb-5">*/}
                        {/*    <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*        البريد الالكتروني*/}
                        {/*    </label>*/}
                        {/*    <input type="text" name="email" id="email" value='example@gmail.com' disabled={true}*/}
                        {/*           className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*</div>*/}

                        {/*<div className="mb-5">*/}
                        {/*    <label htmlFor="phonenumber" className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*        رقم الجوال*/}
                        {/*    </label>*/}
                        {/*    <input type="text" name="phonenumber" id="phonenumber" value='+966500000000' disabled={true}*/}
                        {/*           className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*</div>*/}

                        {/*<div className="mb-5">*/}
                        {/*    <label htmlFor="reservationreason"*/}
                        {/*           className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*        سبب الحجز*/}
                        {/*    </label>*/}
                        {/*    <textarea name="reservationreason" id="reservationreason" placeholder='سبب الحجز'*/}
                        {/*              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*</div>*/}

                        {/*<div className="mb-5">*/}
                        {/*    <label htmlFor="reservationreason"*/}
                        {/*           className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*        معلومات اضافية*/}
                        {/*    </label>*/}
                        {/*    <textarea name="reservationreason" id="reservationreason" placeholder='معلومات اضافية'*/}
                        {/*              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*</div>*/}

                        {/*<div className="-mx-3 flex flex-wrap">*/}
                        {/*    <div className="w-full px-3 sm:w-1/2">*/}
                        {/*        <div className="mb-5">*/}
                        {/*            <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*                Date*/}
                        {/*            </label>*/}
                        {/*            <input type="date" name="date" id="date"*/}
                        {/*                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="w-full px-3 sm:w-1/2">*/}
                        {/*        <div className="mb-5">*/}
                        {/*            <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*                Time*/}
                        {/*            </label>*/}
                        {/*            <input type="time" name="time" id="time"*/}
                        {/*                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="mb-5">*/}
                        {/*    <label className="mb-3 block text-base font-medium text-[#07074D]">*/}
                        {/*        Are you coming to the event?*/}
                        {/*    </label>*/}
                        {/*    <div className="flex items-center space-x-6">*/}
                        {/*        <div className="flex items-center">*/}
                        {/*            <input type="radio" name="radio1" id="radioButton1" className="h-5 w-5"/>*/}
                        {/*            <label htmlFor="radioButton1" className="pl-3 text-base font-medium text-[#07074D]">*/}
                        {/*                Yes*/}
                        {/*            </label>*/}
                        {/*        </div>*/}
                        {/*        <div className="flex items-center">*/}
                        {/*            <input type="radio" name="radio1" id="radioButton2" className="h-5 w-5"/>*/}
                        {/*            <label htmlFor="radioButton2" className="pl-3 text-base font-medium text-[#07074D]">*/}
                        {/*                No*/}
                        {/*            </label>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                {/*        <div>*/}
                {/*            <button*/}
                {/*                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">*/}
                {/*                Submit*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </form>*/}
                {/*</div>*/}
            {/*</div>*/}

            {/*<div className="p-2.5">*/}
            {/*    <Title level={3}>الرجاء ملء الخانات المطلوبة لاكمال الحجز:</Title>*/}
            {/*    <Form action={printMeg}>*/}
            {/*        <div className="p-2.5 flex flex-col flex-wrap gap-y-4 md:flex-row md:gap-4">*/}
            {/*            <div className="border rounded-md text-right p-2.5 min-w-80 min-h-96 lg:min-w-96 lg:min-h-120">*/}
            {/*                <p>المعلومات الشخصية</p>*/}
            {/*                <div className="mb-4">*/}
            {/*                    <Title level={5}>الاسم كامل</Title>*/}
            {/*                    <Input placeholder="الاسم كامل" type="text" required />*/}
            {/*                </div>*/}
            {/*                <div className="mb-4">*/}
            {/*                    <Title level={5}>رقم الهاتف</Title>*/}
            {/*                    <InputNumber*/}
            {/*                        controls={false}*/}
            {/*                        type="tel"*/}
            {/*                        maxLength={13}*/}
            {/*                        placeholder="رقم الهاتف"*/}
            {/*                        required />*/}
            {/*                </div>*/}
            {/*                <div className="mb-4">*/}
            {/*                    <Title level={5}>البريد الالكتروني</Title>*/}
            {/*                    <Input placeholder="البريد الالكتروني" type="email" required />*/}
            {/*                </div>*/}
            {/*                <div className="mb-4">*/}
            {/*                    /!* <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">سبب الحجز:</label> *!/*/}
            {/*                    /!* <input type="text" id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="اذكر سبب الحجز" required /> *!/*/}
            {/*                    /!* <p className="text-red-500 text-sm mt-2 hidden" id="reservationCause">يجب ذكر سبب الحجز</p> *!/*/}
            {/*                    <Title level={5}>سبب الحجز</Title>*/}
            {/*                    <TextArea placeholder="سبب الحجز" />*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="border rounded-md text-right p-2.5 min-w-80 min-h-96 lg:min-w-96 lg:min-h-120">*/}
            {/*                <p className="mb-2">الايام والاوقات المطلوبة</p>*/}
            {/*                <div className="mb-4">*/}
            {/*                    <DatePicker*/}
            {/*                        disabledDate={disabledDate}*/}
            {/*                        showTime={true}*/}
            {/*                        format={"YYYY/MM/DD HH:mm"}*/}
            {/*                        needConfirm*/}
            {/*                        style={{*/}
            {/*                            marginBottom: "18px",*/}
            {/*                        }} />*/}
            {/*                    <Radio.Group*/}
            {/*                        // value={value}*/}
            {/*                        style={{*/}
            {/*                            display: "flex",*/}
            {/*                            flexDirection: "column",*/}
            {/*                            gap: 8,*/}
            {/*                        }}*/}
            {/*                        optionType="button"*/}
            {/*                        options={[*/}
            {/*                            { value: "3:00pm", label: "3:00pm" },*/}
            {/*                            { value: "4:00pm", label: "4:00pm" },*/}
            {/*                            { value: "5:00pm", label: "5:00pm" },*/}
            {/*                        ]} />*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="border rounded-md text-right p-2.5 min-w-80 min-h-96 lg:min-w-96 lg:min-h-120">*/}
            {/*                <p>معلومات اضافية</p>*/}
            {/*                <div className="mb-4">*/}
            {/*                    <TextArea placeholder="معلومات اضافية" />*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            /!* <div className="border rounded-md"> Card</div> *!/*/}
            {/*            <Button type="primary" htmlType="submit">حجز</Button>*/}
            {/*        </div>*/}
            {/*    </Form>*/}
            {/*</div>*/}

        </>
    )
}