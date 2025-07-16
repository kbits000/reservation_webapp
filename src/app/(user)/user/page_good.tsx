'use client'
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [sideBar, setSideBar] = useState(false);
  
  return (
    <section className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <nav
        className={`fixed top-0 ltr:left-0 rtl:right-0 z-20 h-full  pb-10 overflow-x-hidden overflow-y-auto transition origin-left transform bg-white border-l w-60 md:translate-x-0 ${sideBar ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center px-4 py-5">
        </div>
        <nav className="text-sm font-medium text-gray-600" aria-label="Main Navigation">
          <Link href="#" className="flex items-center px-4 py-3 transition group hover:bg-gray-100 hover:text-gray-900">
            <span>الرئيسية</span>
          </Link>
          <Link href="#" className="flex items-center px-4 py-3 transition group hover:bg-gray-100 hover:text-gray-900">
            <span>الحجوزات</span>
          </Link>
          <Link href="#" className="flex items-center px-4 py-3 text-gray-900 transition bg-gray-100 group hover:bg-gray-100 hover:text-gray-900">
            <span>Collections</span>
          </Link>
          <Link href="#" className="flex items-center px-4 py-3 transition group hover:bg-gray-100 hover:text-gray-900">
            <span>Checklists</span>
          </Link>
          <Link href="#" className="flex items-center px-4 py-3 transition group hover:bg-gray-100 hover:text-gray-900">
            <span>Changelog</span>
          </Link>
          <Link href="#" className="flex items-center px-4 py-3 transition group hover:bg-gray-100 hover:text-gray-900">
            <span>الإعدادات</span>
          </Link>
        </nav>
      </nav>
      {/* Main Content */}
      <div className="mr-0 transition md:mr-60">
        <header className="flex items-center justify-between w-full px-4 bg-white border-b h-14">
          <button
            className="block btn btn-light md:hidden"
            onClick={() => setSideBar(!sideBar)}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </header>
      </div>
      {sideBar && (
        <div
          className="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-25 md:hidden"
          onClick={() => setSideBar(false)} // Click to close sidebar
        ></div>
      )}
    </section>
  );
}
