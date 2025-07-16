'use client'
import {Menu, type MenuProps} from "antd";
import React, { useEffect, useState } from "react";

import {CalendarOutlined, HomeOutlined, PoweroffOutlined, UserOutlined} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function AdminSidebar() {
    const [selectedKey, setSelectedKey] = useState("home");
    const pathname = usePathname();

    useEffect(() => {

        if (pathname.includes("/admin/reservations")) setSelectedKey("reservations");
        else if (pathname.includes("/admin/customers")) setSelectedKey("customers");
        else if (pathname.includes("/admin/users_management")) setSelectedKey("users_management");
        else setSelectedKey("home");
    }, [pathname]); // ✅ Runs whenever the URL changes

    const items: MenuProps['items'] = [
        { key: "home", icon: <HomeOutlined />, label: <Link href="/admin">الرئيسية</Link> },
        { key: "reservations", icon: <CalendarOutlined />, label: <Link href="/admin/reservations">الحجوزات</Link> },
        { key: "customers", icon: <UserOutlined />, label: <Link href="/admin">العملاء</Link> },
        { key: "users_management", icon: <UserOutlined />, label: <Link href="/admin/users_management">المستخدمين</Link> },
        {  type: "divider" },
        { key: "sign out", icon: <PoweroffOutlined />, label: <Link href="/api/auth/signout">تسحيل الخروج</Link>, danger: true },
    ];

    return (
        <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={items}
            style={{
                borderRadius: 10
            }}
        />
    );
}