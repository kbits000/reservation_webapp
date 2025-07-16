'use client'

import {useState} from "react";
import {Button} from "antd";
import {Space} from "antd";

import ReservationCalender from "@/components/ui/admin_pages/reservation_pages/reservation_calender";
import DisallowedReservationDatesTimesSlotsPage from "@/components/ui/admin_pages/reservation_pages/disallowed_reservation_dates_times_slots_page";
import ReservationRequestsPage from "@/components/ui/admin_pages/reservation_pages/reservation_requests_page";
import ReservationsSettingsPage from "@/components/ui/admin_pages/reservation_pages/reservations_settings_page";

export default function ReservationsPageMainButtons() {
    const [componentType, setComponentType] = useState("A");
    const [buttonVariants, setButtonVariants] = useState<{
        A: "solid" | "filled" | "link" | "text" | "outlined" | "dashed" | undefined
        B: "solid" | "filled" | "link" | "text" | "outlined" | "dashed" | undefined
        C: "solid" | "filled" | "link" | "text" | "outlined" | "dashed" | undefined
        D: "solid" | "filled" | "link" | "text" | "outlined" | "dashed" | undefined
    }>({
        A: "solid",
        B: "filled",
        C: "filled",
        D: "filled",
    });

    const handleButtonClick = (key: string) => {
        setButtonVariants({
            A: "filled",
            B: "filled",
            C: "filled",
            D: "filled",
            [key]: "solid",
        });
        setComponentType(key);
    };

    const renderComponent = () => {
        switch (componentType) {
            case "A":
                return <ReservationCalender/>;
            case "B":
                return <DisallowedReservationDatesTimesSlotsPage/>;
            case "C":
                return <ReservationRequestsPage/>;
            case "D":
                return <ReservationsSettingsPage/>;
            default:
                return null;
        }
    };
    // TODO solve incorrect error alert
    return (
        <>
            <Space wrap>
                <Button color="blue" variant={buttonVariants.A} onClick={() => handleButtonClick("A")}>التقويم</Button>
                <Button id='BB' color="blue" variant={buttonVariants.B} onClick={() => handleButtonClick("B")}>الايام والاوقات المحجوبة / المغلقة</Button>
                <Button color="blue" variant={buttonVariants.C} onClick={() => handleButtonClick("C")}>قائمة طلبات الحجوزات</Button>
                <Button color="blue" variant={buttonVariants.D} onClick={() => handleButtonClick("D")}>اعدادات فتح المواعيد للحجز تلقائياً</Button>
            </Space>
            <div>{renderComponent()}</div>
        </>
    )
}