'use client'

import React, { useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { submitReservationRequest } from '@/lib/actions/user_reservation_server_actions';
// import { redirectToReservingDetailsPageServerAction } from '@/lib/actions/user_reservation_server_actions';
import { Button, Form, Input, Select, DatePicker, TimePicker, FormInstance, message } from 'antd';
const {Option} = Select;
const { Item } = Form;
const { TextArea } = Input;
const { RangePicker } = TimePicker;
import { ArrowRightOutlined }from '@ant-design/icons';
import dayjs, {type Dayjs} from "dayjs";
import 'dayjs/locale/ar-sa' // import locale
dayjs.locale('ar-sa') // use locale
import utc from 'dayjs/plugin/utc' // import utc plugin
import timezone from 'dayjs/plugin/timezone'
import { FieldTypesOfUserReservationForm } from "@/lib/schemas/types";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Riyadh");


type SubmitButtonProps = {
    form: FormInstance;
    loading: boolean;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, loading, children }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button type="primary" htmlType="submit" loading={loading} disabled={!submittable}>
            {children}
        </Button>
    );
};

export function ReserverDetailsComponent(x: {
    userEmail: string | null | undefined;
    userName: string | null | undefined;
    reservationTimePeriodInISO8601: [string, string];
    userPhoneNumber: string | null | undefined;
    userSex: string | null | undefined;
    userFullName: string | null | undefined;
}) {
    const router = useRouter()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const prefixSelector = (
        <Item name="prefix" noStyle>
            <Select style={{ width: 100 }}>
                <Option value="966">+966</Option>
            </Select>
        </Item>
    );

    const onFinish = async (values: FieldTypesOfUserReservationForm) => {
        setLoading(true);

        const formattedValues = {
            ...values,
            reservationDate: values.reservationDate.toISOString(),
            reservationTimePeriod: [values.reservationTimePeriod[0].toISOString(), values.reservationTimePeriod[1].toISOString()],
        };

        try {
            const response = await submitReservationRequest(formattedValues);
            if (response) {
                messageApi.open({
                    type: 'success',
                    content: 'تم الحجز بنجاح',
                    duration: 10,
                });
                router.replace('/reservation');
            } else if (response===false) {
                messageApi.open({
                    type: 'error',
                    content: 'لم يتم الحجز !',
                    duration: 10,
                });
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'لم يتم الحجز ! حدثت مشكلة ما',
                    duration: 10,
                });
            }
        } catch {

        } finally {
            setLoading(false);
        }
    }

    return (
        <div dir='rtl' className='p-8'>
            {contextHolder}
            <Link href='/reservation' replace={true}>
                <Button
                    icon={<ArrowRightOutlined/>}
                    className='mb-4'
                >الرجوع للوراء</Button>
            </Link>
            <Form
                form={form}
                initialValues={
                    {
                        username: x.userName,
                        phone_number: x.userPhoneNumber,
                        full_name: x.userFullName,
                        email: x.userEmail,
                        gender: x.userSex,
                        reservationDate: dayjs(x.reservationTimePeriodInISO8601[0]).tz('Asia/Riyadh'),
                        reservationTimePeriod: [dayjs(x.reservationTimePeriodInISO8601[0]).tz('Asia/Riyadh'), dayjs(x.reservationTimePeriodInISO8601[1]).tz('Asia/Riyadh')]
                    }}
                onFinish={onFinish}
            >
                <Item
                    label="اسم المستخدم"
                    name="username"
                    rules={[{ required: true, message: 'الرجاء ادخال اسم المستخدم!' }]}
                >
                    <Input disabled={true} required={true}/>
                </Item>
                <Item
                    label='الاسم كاملا'
                    name='full_name'
                    rules={[{required: true, message: 'الرجاء كتابة اسمك كاملاً!'}]}
                >
                    <Input disabled={true} required={true}/>
                </Item>
                <Item name={'email'} label="البريد الالكتروني" rules={[{ required: true, type: 'email', message: 'الرجاء ادخال البريد الالكتروني!' }]}>
                    <Input disabled={true} required={true}/>
                </Item>
                <Item
                    name="phone_number"
                    label="رقم الهاتف"
                    rules={[{ required: true, message: 'الرجاء ادخال رقم الهاتف!' }]}
                >
                    <Input suffix={prefixSelector} style={{ width: '100%' }} disabled={true} required={true}/>
                </Item>
                <Item
                    name='gender'
                    label='الجنس'
                    rules={[{ required: true, message: 'الرجاء ادخال الجنس!' }]}
                >
                    <Input disabled={true} required={true}/>
                </Item>
                <Item
                    name='reservationDate'
                    label='تاريخ الحجز'
                    rules={[{required: true, message: 'الرجاء اختيار تاريخ الحجز!'}]}
                >
                    <DatePicker format={'YYYY-MM-DD dddd'} disabled={true} />
                </Item>
                <Item
                    name='reservationTimePeriod'
                    label='فترة الحجز'
                    rules={[{required: true, message: 'الرجاء اختيار فترة زمنية للحجز!'}]}
                >
                    <RangePicker disabled={true} format='h:mm a'/>
                </Item>
                <Item label={'سبب الحجز'} name={'reservation_reason'}  rules={[{ required: true, message: 'الرجاء ذكر سبب الحجز!' }]}>
                    <TextArea showCount={true} required={true}/>
                </Item>
                <Item label='ملاحظات اضافية' name={'additional_information'}>
                    <TextArea showCount={true}/>
                </Item>
                {/*<Button type="primary" htmlType="submit">*/}
                {/*    Submit*/}
                {/*</Button>*/}
                <SubmitButton form={form} loading={loading}>Submit</SubmitButton>
            </Form>
        </div>
    )
}