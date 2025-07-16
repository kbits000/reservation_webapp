'use client'
import { Table } from 'antd';
import type {TableProps} from 'antd';
import {useState, useEffect} from "react";

import { getUsersDataServerAction } from '@/lib/actions/server_actions';

interface DataType {
    username: string;
    email: string;
    phone_number: string;
    sex: string;
    role: string;
    account_registration_date: string;
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
        title: 'اسم المستخدم',
        dataIndex: 'username',
        width: '30%',
        // editable: true,
    },
    {
        title: 'البريد الالكتروني',
        dataIndex: 'email',
    },
    {
        title: 'رقم الجوال',
        dataIndex: 'phone_number',
    },
    {
        title: 'الجنس',
        dataIndex: 'sex',
        // filters: [
        //     { text: 'ذكر', value: 'ذكر' },
        //     { text: 'انثى', value: 'انثى' },
        // ],
    },
    {
        title: 'دور المستخدم',
        dataIndex: 'role',
        // filters: [
        //     { text: 'مستخدم عادي', value: 'مستخدم عادي' },
        //     { text: 'اداري', value: 'اداري' },
        // ],
    },
    {
        title: 'يوم تسجيل الحساب',
        dataIndex: 'account_registration_date',
    },
    // {
    //     title: 'operation',
    //     dataIndex: 'operation',
    //     render: (_, record) =>
    //         dataSource.length >= 1 ? (
    //             <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
    //                 <a>Delete</a>
    //             </Popconfirm>
    //         ) : null,
    // },
];

export function UsersManagementTable() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {
        async function fetchUsersData() {
            setLoading(true);

            const usersData = await getUsersDataServerAction();
            if (usersData === null) {
                setData([])
            } else {
                setData(usersData!);
            }
            setLoading(false);
        }
        fetchUsersData();
    }, []);


    // const handleDelete = (key: React.Key) => {
    //     // const newData = dataSource.filter((item) => item.key !== key);
    //     // setDataSource(newData);
    // };


    return (
        <div className='p-2.5'>
            <Table<DataType> columns={defaultColumns} loading={loading} dataSource={data}/>
        </div>
    )
}