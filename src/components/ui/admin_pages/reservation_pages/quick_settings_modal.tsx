'use client'
import { useState } from 'react';
import { Modal, FloatButton } from 'antd';
import { SettingOutlined, CalendarOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons';
import Form from 'next/form';

export default function QuickSettingsToolbarModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <FloatButton.Group shape="circle">
                <FloatButton icon={<CalendarOutlined />} tooltip="تعيين القواعد الافتراضية" />
                <FloatButton icon={<EditOutlined />} tooltip="Bulk Edit Availability" />
                <FloatButton icon={<CopyOutlined />} tooltip="Copy from Previous Month" />
                <FloatButton icon={<SettingOutlined />} tooltip="Quick Settings" onClick={() => setIsModalOpen(true)} />
            </FloatButton.Group>

            <Modal
                title="تعيين القواعد الافتراضية"
                footer={null}
            >
                <Form action="#">

                </Form>
            </Modal>

            <Modal
                title="Quick Reservation Settings"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
            </Modal>
        </>
    );
};
