'use client'

import { Button, Flex, Form, Input, Select, DatePicker, TimePicker } from 'antd';
const {Option} = Select;
const { Item } = Form;
const { TextArea } = Input;
const { RangePicker } = TimePicker;
import type { GetRef, Carousel } from 'antd';
import { ArrowRightOutlined }from '@ant-design/icons';
import dayjs, {type Dayjs} from "dayjs";
import 'dayjs/locale/ar-sa' // import locale
dayjs.locale('ar-sa') // use locale
import utc from 'dayjs/plugin/utc' // import utc plugin
import timezone from 'dayjs/plugin/timezone' // import timezone plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Riyadh");

export function ReserverDetailsComponent(x: {
    carouselRef: GetRef<typeof Carousel> | null;
    toggleGoBackButtonClick: () => void;
    dateInH: Dayjs;
    userEmail: string | null | undefined;
    userName: string | null | undefined;
    reservationDateInISO8601: Dayjs;
    // reservationStartTimeInISO8601: Dayjs;
    // reservationEndTimeInISO8601: Dayjs;
    reservationTimePeriodInISO8601: [string, string];
}) {

    const prefixSelector = (
        <Item name="prefix" noStyle>
            <Select style={{ width: 100 }}>
                <Option value="966">+966</Option>
            </Select>
        </Item>
    );

    return (
        <div dir='rtl'>
            <Button
                onClick={() => {
                    if (x.carouselRef) {
                        x.carouselRef.prev();
                        x.toggleGoBackButtonClick();
                    }
                }}
                icon={<ArrowRightOutlined/>}
                className='mb-4'
            >الرجوع للوراء</Button>
            <Form
                initialValues={{
                    username: x.userName,
                    email: x.userEmail,
                    gender: 'Male',     // TODO fetch it
                    reservationDate: x.reservationDateInISO8601.tz('Asia/Riyadh'),
                    reservationTimePeriod: [dayjs(x.reservationTimePeriodInISO8601[0]).tz('Asia/Riyadh'), dayjs(x.reservationTimePeriodInISO8601[1]).tz('Asia/Riyadh')]}}
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
                    name='full-name'
                    rules={[{required: true, message: 'الرجاء كتابة اسمك كاملاً!'}]}
                >
                    <Input />
                </Item>
                <Item name={'email'} label="البريد الالكتروني" rules={[{ required: true, type: 'email', message: 'الرجاء ادخال البريد الالكتروني!' }]}>
                    <Input disabled={true} required={true}/>
                </Item>
                <Item
                    name="phone-number"
                    label="رقم الهاتف"
                    rules={[{ required: true, type: 'number', message: 'الرجاء ادخال رقم الهاتف!' }]}
                >
                    <Input addonAfter={prefixSelector} style={{ width: '100%' }} />
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
                <Item label={'سبب الحجز'} name='reservation-reason'  rules={[{ required: true, message: 'الرجاء ذكر سبب الحجز!' }]}>
                    <TextArea showCount={true} required={true}/>
                </Item>
                <Item label='ملاحظات اضافية'>
                    <TextArea showCount={true}/>
                </Item>
            </Form>
            <Flex >
                <p>Name is:  john</p>
                <p>Date is: {x.dateInH.tz('Asia/Riyadh').format('YY/MM/DD h:mm a')}</p>
                <p>الايميل:</p>
            </Flex>
        </div>
    )
}