"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Logo from "@/components/logo/logo";


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

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

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
            <Link href="/api/auth/signin" >
                <Button color="default" type="text">
                  <svg className="lucide lucide-user-round" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                  تسجيل الدخول
                </Button>
            </Link>
            <Link href="/signup" >
                <Button color="primary" variant="solid">
                  التسجيل
                </Button>
            </Link>
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
        <div className="flex basis-full flex-col items-center md:hidden gap-2">
          {navNameLinks.map((navItem) => (
            <Link href={navItem.page_url} key={navItem.navName}>
              {navItem.navName}
            </Link>
          ))}
          <Link href="/api/auth/signin" className="flex">
            <Button color="default" type="text" className="">
              <svg className="lucide lucide-user-round" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
              تسجيل الدخول
            </Button>
          </Link>
          <Link href="#" >
                <Button color="primary" variant="solid">
                  التسجيل
                </Button>
            </Link>
        </div>
      )}

    </>
  );
}