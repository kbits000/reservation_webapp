"use client"

import { signIn } from "next-auth/react"
import { Button } from "antd";

export default function SignInGoogle() {
  return <Button className="border rounded-sm bg-white" onClick={() => signIn("google")}>سجل الدخول باستخدام الجيميل</Button>
}

// export default function SignInGoogle() {
//   return (

//     <Button className="border rounded-sm bg-white" onClick={() => signIn("google")}>سجل الدخول باستخدام الجيميل</Button>

//   )
//   return <button className="border rounded-sm bg-white" onClick={() => signIn("google")}>سجل الدخول باستخدام الجيميل</button>
// }