'use client'

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ar-sa';
dayjs.locale('ar-sa');
import {useState} from "react";
import { InputNumber, TimePicker, Space, Typography } from "antd";
const { RangePicker } = TimePicker;
const { Text } = Typography;

export default function ReservationsSettingsPage() {
    const [advanceBookingDaysValue, setAdvanceBookingDaysValue] = useState<number | string | null>(null);
    const [numberOfAllowedReservationsPerDay, setNumberOfAllowedReservationsPerDay] = useState<number | string | null>(null);
    const [timePeriodForSunday, setTimePeriodForSunday] = useState<[Dayjs, Dayjs] | [null, null]>([null, null]);

    return (
        <div className='pt-4'>
            <div className='pb-2'>
                <p className='ml-2 inline'>عدد مرات الحجز المسموحة في اليوم لمستخدم واحد</p>
                <InputNumber
                    min={1}
                    onChange={(value) => {
                        setNumberOfAllowedReservationsPerDay(value);
                    }}
                />
            </div>
            <div className='pb-2'>
                <p className='ml-2 inline'>عدد الايام القادمة التي يستطيع فيها المستخدم الحجز</p>
                <InputNumber
                    min={0}
                    onChange={(value) => {
                        setAdvanceBookingDaysValue(value);
                    }}
                />
            </div>
            <div className='pt-4 pl-8 pb-8 pr-2 border-2 max-w-fit'>
                <p className='ml-2 inline'>ايام الاسبوع</p>
                <div className='inline-block'>
                    <Space direction='vertical'>
                        <Space>
                            <Text>يوم الاحد</Text>
                            <RangePicker
                                defaultValue={[null, null]}
                                format='h:mm a'
                                minuteStep={5}
                                use12Hours={true}
                                needConfirm={true}
                                onChange={(dates) => {
                                    if (dates !== null && dates !== undefined) {
                                        if (dates[0] !== null && dates[1] !== null && dates[0] !== undefined && dates[1] !== undefined) {

                                        }
                                    }
                                }}
                            />
                        </Space>
                        <Space>
                            <Text>يوم الاثنين</Text>
                            <RangePicker
                                defaultValue={[null, null]}
                                format='h:mm a'
                                minuteStep={5}
                                use12Hours={true}
                                needConfirm={true}
                            />
                        </Space>
                        <Space>
                            <Text>يوم الثلاثاء</Text>
                            <RangePicker
                                defaultValue={[null, null]}
                                format='h:mm a'
                                minuteStep={5}
                                use12Hours={true}
                                needConfirm={true}
                            />
                        </Space>
                        <Space>
                            <Text>يوم الاربعاء</Text>
                            <RangePicker
                                defaultValue={[null, null]}
                                format='h:mm a'
                                minuteStep={5}
                                use12Hours={true}
                                needConfirm={true}
                            />
                        </Space>
                        <Space>
                            <Text>يوم الخميس</Text>
                            <RangePicker
                                defaultValue={[null, null]}
                                format='h:mm a'
                                minuteStep={5}
                                use12Hours={true}
                                needConfirm={true}
                            />
                        </Space>
                        <Space>
                            <Text>يوم الجمعة</Text>
                            <RangePicker
                                defaultValue={[null, null]}
                                format='h:mm a'
                                minuteStep={5}
                                use12Hours={true}
                                needConfirm={true}
                            />
                        </Space>
                        <Space>
                            <Text>يوم السبت</Text>
                            <RangePicker
                                defaultValue={[null, null]}
                                format='h:mm a'
                                minuteStep={5}
                                use12Hours={true}
                                needConfirm={true}
                            />
                        </Space>
                    </Space>
                </div>
            </div>
        </div>
    );
}