'use client'
import {Affix, FloatButton} from 'antd';
import {SettingOutlined, CalendarOutlined, CopyOutlined, EditOutlined} from '@ant-design/icons';
import QuickSettingsModal from "@/components/ui/admin_pages/reservation_pages/quick_settings_modal";

export default function QuickSettingsToolbar() {

    const onClick = () => {

    }
    return (
        <>
            <Affix offsetTop={80}>
                <FloatButton.Group shape="circle">
                    <FloatButton icon={<CalendarOutlined/>} tooltip="تحديد " onClick={onClick} />
                    <FloatButton icon={<EditOutlined/>} tooltip="Bulk Edit Availability"/>
                    <FloatButton icon={<CopyOutlined/>} tooltip="Copy from Previous Month"/>
                    <FloatButton icon={<SettingOutlined/>} tooltip="المزيد من الإعدادات"/>
                </FloatButton.Group>
            </Affix>
            <QuickSettingsModal />
        </>
    );
};
