'use client'
import {  Layout } from 'antd';
const { Footer } = Layout;

export default function FooterCustomized() {
    return (
        <Footer style={{ textAlign: 'center' }}>
            مركز تعليمي @{new Date().getFullYear()} تطوير MH<br/>
            Eastern Excellence Center for Training ©{new Date().getFullYear()} Created by MH
        </Footer>
    )
}