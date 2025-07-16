"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Logo from "@/components/logo/logo";

import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';


const navNameLinks = [
  {
    navName: "الرئيسية",
    page_url: "/",
  },
  {
    navName: "الدورات والورش",
    page_url: "/courses",
  },
  {
    navName: "حجز",
    page_url: "/reservation",
  },
  {
    navName: "من نحن",
    page_url: "/#",
  },
];






export default function NavbarSignedIn({ userRole }: { userRole: string; }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // const userImage = user?.image;  // TODO this image is actually a link from provider. However, it should be saved in the database and passed here.
  // console.log(userImage);

  const items: MenuProps['items'] = [

  ]

  if (userRole === "admin") {
    items.push(
        {
          label: (
            // <a href="/user" target="_blank" rel="noopener noreferrer">
            //   الحساب
            // </a>
            <Link href="/admin">الحساب</Link>
          ),
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: (
              <Link href="/api/auth/signout">تسجيل الخروج</Link>
          ),
          key: '2',
        }
    )
  } else {
    items.push(
        {
          label: (
              // <a href="/user" target="_blank" rel="noopener noreferrer">
              //   الحساب
              // </a>
              <Link href="/user">الحساب</Link>
          ),
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: (
              <Link href="/api/auth/signout">تسجيل الخروج</Link>
          ),
          key: '2',
        }
    )
  }

  return (
    <>
    <Logo />
      <nav className="w-1/6 md:mx-auto md:w-1/2">


        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="hidden md:flex md:flex-wrap md:flex-row md:justify-between md:gap-4">
            {navNameLinks.map((navItem) => (
              <Link href={navItem.page_url} key={navItem.navName}>
                {navItem.navName}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex md:flex-row md:justify-between md:gap-4">
            
            <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                <Space>
                    {/*<Avatar src={userImage} />*/}
                    <Avatar  />
                </Space>
                </a>
            </Dropdown>
          </div>
        </div>


        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            {" "}
            {isOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="flex basis-full flex-col items-center md:hidden">
          {navNameLinks.map((navItem) => (
            <Link href={navItem.page_url} key={navItem.navName}>
              {navItem.navName}
            </Link>
          ))}
            <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                <Space>
                    {/*<Avatar src={userImage} />*/}
                    <Avatar  />
                </Space>
                </a>
            </Dropdown>
        </div>
      )}

    </>
  );
}