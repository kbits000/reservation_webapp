'use client'

import { useActionState } from 'react'
import Form from "next/form";
import { submitSignupForm } from "@/lib/actions/server_actions";
import Link from "next/link";
import { UserRegistrationSchema, ActionResponse } from "@/lib/schemas/user_registration_schema";
import { Alert } from "antd";

const initialState: ActionResponse = {
    success: false,
    message: '',
  }

export default function UserRegistrationForm() {


    const clientAction = async (prevState: ActionResponse | null, formData: FormData) => {
        const newUser = {
            name: formData.get('name'),
            email: formData.get('email'),
            phoneNumber: formData.get('phonenumber'),
            sex: formData.get('sex'),
            role: 'user'
        }

        const validatedData = UserRegistrationSchema.safeParse(newUser);

        if (!validatedData.success) {
            return {
                success: false,
                message: 'Please fix the errors in the form',
                errors: validatedData.error.flatten().fieldErrors,
              }
        }
        
        const response = await submitSignupForm(validatedData.data);

        if (!response?.success) {
            console.log(response?.errors);
            return {
              success: false,
              message: response.message,
              errors: response.errors,
              emailExists: response.emailExists
            }
        }
        return {
            success: true,
            message: 'User has been registered.',
        }
    }

    const [state, action] = useActionState(clientAction, initialState)    // TODO add pending variable

    return (
        <Form className="space-y-4 md:space-y-6" action={action}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">الاسم كاملاً</label>
          <input type="text" name="name" id="name" className={state?.errors?.name ? 'border-red-500 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} placeholder="الاسم كاملاً" required />
          {state?.errors?.name && (
                <p id="name-error" className="text-sm text-red-500">
                  {/* {state.errors.name[0]} */}
                  الاسم الكامل المدخل غير صحيح
                </p>
              )}
        </div>
        {/* <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">اسم المستخدم</label>
          <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="اسم المستخدم" required />
        </div> */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">البريد الالكتروني</label>
          <input type="email" name="email" id="email" className={state?.errors?.email ? 'border-red-500 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} placeholder="البريد الالكتروني" required />
          {state?.errors?.email && (
                <p id="email-error" className="text-sm text-red-500 pt-1">
                  {/* {state.errors?.email[0]} */}
                  البريد الالكتروني المدخل غير صحيح
                </p>
              )}
        </div>
        {/* <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div> */}
        <div>
          <label htmlFor="phonenumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">رقم الجوال</label>
          <input type="text" name="phonenumber" id="phonenumber" className={state?.errors?.phoneNumber ? 'border-red-500 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} placeholder="رقم الجوال" required />
          {state?.errors?.phoneNumber && (
                <p id="name-error" className="text-sm text-red-500">
                  {/* {state.errors.phoneNumber[0]} */}
                  رقم الهاتف المدخل غير صحيح
                </p>
              )}
        </div>
        <div className="mb-4">
          <label htmlFor="sex" className="mb-2 text-base font-medium text-[#07074D]">
            الجنس
          </label>
          <select id="sex" name="sex" className={state?.errors?.sex ? 'border-red-500 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} required>
            <option value=""></option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
          {state?.errors?.sex && (
                <p id="name-error" className="text-sm text-red-500">
                  {/* {state.errors.sex[0]} */}
                  الجنس المدخل غير صحيح
                </p>
              )}
        </div>
        {state?.success && (
                <Alert message="تم تسجيل الحساب بنجاح" type="success" showIcon closable />
              )}
        {state?.emailExists && (
                <Alert message="البريد الالكتروني مسجل مسبقاً." type="error" showIcon closable />
            )}
        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">انشىء حساب جديد</button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">لديك حساب <Link
            className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/">سجل الدخول من هنا</Link>
        </p>
      </Form>
    )
}