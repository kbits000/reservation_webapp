'use client'

import {CheckCircleTwoTone} from "@ant-design/icons";
import { Space } from "antd";
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import { Typography } from "antd";
const { Title } = Typography;
import Image from "next/image";

const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
);

// TODO consider using overrideSrc attribute in Image component

export function MainPageSection() {
    return (
        <div>
            <div className="relative w-full min-h-[500px] overflow-hidden">

                <div className="absolute inset-0">
                    <Image src='/images/retina3x_1280x720.jpg'  alt="room image" fill={true} sizes="100vw" priority={true} className='overflow-hidden'/>

                    {/*<img src="/images/hero.jpeg" alt="room image"*/}
                    {/*     className="w-full h-full object-cover"/>*/}

                    <div className="absolute inset-0 bg-black/0 dark:bg-black/40"></div>
                </div>

                <div className="relative w-full md:w-[600px] lg:w-[700px] p-8 md:p-12 mt-8 md:mt-12 mx-auto md:mr-8 lg:mr-12">
                    <div className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-lg backdrop-blur-sm">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
                                مركز تعليمي للتدريب
                            </h2>

                            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-6">
                                نحو مستقبل افضل
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                        <div className="max-w-lg">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">اكتشف قدراتك ونمِّ مهاراتك بإستراتيجيات مبتكرة</h2>
                            <p className="font-medium italic">فى مركز الشرقية المتميز للتدريب</p>
                            <ul>
                                <li>
                                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '150%' }}/>
                                    <p className='text-lg inline m-2'>
                                        ملزمة لكل طالب: نقدم ملزمة
                                        شاملة ومحدثة لكل طالب يسجل في المركز، وتشمل الملزمة محتوى
                                        تعليمي متكامل لدعم عملية التعلم والاستعداد للاختبارات.
                                    </p>
                                </li>
                                <li className='text-lg'>
                                    <Space align="start">
                                        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '150%' }}/>
                                        شرح استراتيجيات الحل: يعتبر
                                        شرح استراتيجيات الحل أحد أهم خدماتنا. نحن نركز على تعليم
                                        الطلاب الطرق والاستراتيجيات الفعالة لحل المسائل والمشكلات بطرق
                                        مبتكرة وذكية.
                                    </Space>
                                </li>
                                <li className='text-lg'>
                                    <Space align="start">
                                        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '150%' }}/>
                                        اختبار تجريبي محسوب: نقدم
                                        اختبارات تجريبية محسوبة تساعد الطلاب على قياس مستواهم وتحديد
                                        نقاط القوة والضعف، مما يساعدهم على التركيز على المجالات التي
                                        تحتاج إلى تطوير.
                                    </Space>
                                </li>
                                <li className='text-lg'>
                                    <Space align="start">
                                        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '150%' }}/>
                                        مدربون أكفاء لهم نتائج
                                        مبهرة: قمنا باستقطاب أفضل المدربين ذوي الشهرة والخبرة في مجال
                                        تنمية مهارات الطلاب. فريقنا يتمتع بكفاءة عالية في تدريب الطلاب
                                        وتحقيق نتائج مبهرة.
                                    </Space>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-12 md:mt-0">

                            <Image src="/images/retina3x_1280x720.jpg" width={600} height={600} alt="About Us Image" className='object-cover rounded-lg shadow-md'/>

                            {/*<img src="/images/about.jpeg" alt="About Us Image"*/}
                            {/*     className="object-cover rounded-lg shadow-md"/>*/}

                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-gray-100'>
                <div className='container mx-auto py-16 px-4 sm:px-6 lg:px-8'>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Statistic title="طلاب" value={1232} formatter={formatter} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="دورات" value={12} precision={2} formatter={formatter} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="سنوات خبرة" value={10} precision={2} formatter={formatter} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="مدربين" value={15} precision={2} formatter={formatter} />
                        </Col>
                    </Row>
                </div>
            </section>

            <section className='pb-16'>
                <div className='container mx-auto py-16 px-4 sm:px-6 lg:px-8'>
                    <Title level={5}>معلومات التواصل  -------------</Title>
                    {/*<p className='font-light'>تواصل معنا</p>*/}
                    <Title level={2}>تواصل معنا</Title>
                </div>

                {/*<iframe*/}
                {/*    className='w-full h-[350px] border-0'*/}
                {/*    src=""*/}
                {/*    allowFullScreen*/}
                {/*>*/}
                    <Image className='max-w-full w-full h-[350px] border-0' width={2048} height={350} src='/images/iframe_google_maps_location_link_2048x350.svg' alt='google maps location link'/>
                {/*</iframe>*/}
            </section>



        </div>
    )
}