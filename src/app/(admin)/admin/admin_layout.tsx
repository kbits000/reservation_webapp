"use client";
import React, { useEffect, useState } from "react";
import { Button, Layout, Space  } from "antd";

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons";
import Logo from "@/components/logo/logo";

const { Header, Content, Sider } = Layout;
import {redirect} from "next/navigation";
import AdminSidebar from "@/app/(admin)/admin/admin_sidebar";
import FooterCustomized from "@/components/footer_customized";

export default function AdminLayout({ role, children }: { role?: string, children?: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // // Track screen width and update isMobile state
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
                setCollapsed(true);
            } else {
                setIsMobile(false);
                setCollapsed(false);

            }
        };

        // Initial check
        handleResize();

        // Listen for resize events
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         const path = window.location.pathname;
    //         if (path.includes("/admin/reservations")) setSelectedKey("reservations");
    //         else if (path.includes("/admin/customers")) setSelectedKey("customers");
    //         else if (path.includes("/admin/users")) setSelectedKey("users");
    //         else setSelectedKey("home");
    //     }
    // }, []);

    // useEffect(() => {
    //
    //     if (pathname.includes("/admin/reservations")) setSelectedKey("reservations");
    //     else if (pathname.includes("/admin/customers")) setSelectedKey("customers");
    //     else if (pathname.includes("/admin/users")) setSelectedKey("users");
    //     else setSelectedKey("home");
    // }, [pathname]); // ✅ Runs whenever the URL changes
    if (role !== "admin") {
        return redirect('/login');
    }

    // Redirect unauthorized users (move logic inside the component)
    // if (typeof window !== "undefined") {
    //     const role = "admin"; // TODO: Replace with actual authentication check
    //     if (role !== "admin") return redirect("/");
    // }

    // const items: MenuProps['items'] = [
    //     { key: "home", icon: <HomeOutlined />, label: <Link href="/admin">الرئيسية</Link> },
    //     { key: "reservations", icon: <CalendarOutlined />, label: <Link href="/admin/reservations">الحجوزات</Link> },
    //     { key: "customers", icon: <UserOutlined />, label: <Link href="/admin">العملاء</Link> },
    //     { key: "users", icon: <UserOutlined />, label: <Link href="/admin">المستخدمين</Link> },
    //     {  type: "divider" },
    //     { key: "sign out", icon: <PoweroffOutlined />, label: <Link href="/api/auth/signout">تسحيل الخروج</Link>, danger: true },
    // ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                breakpoint="md"
                collapsedWidth="0"
                trigger={null}
                className="pt-2.5"
                style={{
                    background: "white",
                }}
            >
                <Space>
                    <Logo />
                </Space>
                <AdminSidebar />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: "0 16px",
                        background: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                >
                    {isMobile && (
                        <Button
                            type="text"
                            icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                    )}

                </Header>
                <Content style={{ margin: "24px 16px 0" }}>
                    {children}
                </Content>
                <FooterCustomized />
            </Layout>
        </Layout>
    );
}
