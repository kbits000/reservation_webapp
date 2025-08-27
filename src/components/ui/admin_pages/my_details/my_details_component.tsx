'use client'

import { Flex, Typography, Divider } from 'antd';
const { Title, Text } = Typography;

export function MyDetailsComponent() {
    return (
        <div>
            <Title level={2}>بياناتي</Title>
            {/*<Flex justify-content='flex-start' align="start">*/}
                {/*<dl className="sm:divide-y sm:divide-gray-200" >*/}
                {/*    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">*/}

                {/*    </div>*/}
            <Flex vertical={true}>
                <Flex vertical={false} >
                    <Text>aaaaaaaaaaa</Text>
                    <Text>mohammmmm</Text>
                </Flex>
                <Text>gfgdfsgdg</Text>
                <Divider />

            </Flex>


                    <Text>
                        الاسم كاملاً
                    </Text>
                    <Text >
                        محمد محمد
                    </Text>

                <Divider />
                    {/*<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">*/}
                    {/*    <Text>*/}
                    {/*        الاسم في البريد الالكتروني*/}
                    {/*    </Text>*/}
                    {/*    <Text>*/}
                    {/*        محمد أحمد*/}
                    {/*    </Text>*/}
                    {/*</div>*/}
                    {/*<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">*/}
                    {/*    <Text>*/}
                    {/*        البريد الالكتروني*/}
                    {/*    </Text>*/}
                    {/*    <Text>*/}
                    {/*        example@example.com*/}
                    {/*    </Text>*/}
                    {/*</div>*/}
                    {/*<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">*/}
                    {/*    <Text>*/}
                    {/*        رقم الهاتف*/}
                    {/*    </Text>*/}
                    {/*    <Text editable={true}>*/}
                    {/*        (+966) 5555-55555*/}
                    {/*    </Text>*/}
                    {/*</div>*/}
                    {/*<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">*/}
                    {/*    <Text>*/}
                    {/*        الجنس*/}
                    {/*    </Text>*/}
                    {/*    <Text>*/}
                    {/*        ذكر*/}
                    {/*    </Text>*/}
                    {/*</div>*/}
                {/*</dl>*/}
            {/*</Flex>*/}
        </div>
    )
}