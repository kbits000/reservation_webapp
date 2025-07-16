'use client'
import {getCsrfToken } from "next-auth/react"
import {useState , useEffect } from 'react';
export function SignInGoogleCustomButton() {
    const [csrfToken, setCsrfToken] = useState("")

    useEffect(() => {
        async function loadProviders() {
            const csrf = await getCsrfToken()
            setCsrfToken(csrf)
        }
        loadProviders()
    }, [])

    // const csrfToken = csrfTokenParameter;
    // const a = getCsrfToken();
    // const csrfToken = use (a);
    return (
        <>
            <form action="/api/auth/callback/google" method="POST">
                <input type="hidden" name="csrfToken" value={csrfToken} />
                <input type='submit' value={'سوي تسجيل دخول'} />
            </form>


            {/*<button onClick={() => signIn("github", {redirectTo: "/admin"})}>*/}
            {/*    Sign In*/}
            {/*</button>*/}
        </>

    )
}