import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth"

export default {
    providers: [Google],
    // trustHost: true,     // TODO make true in production
    secret: [
        process.env.AUTHJS_SECRET_1 as string
    ],
    // useSecureCookies: true,      // TODO make true in production
    session: {
        maxAge: 1800
    },
    theme: {
        logo: '/images/logo_160x160_png.png'
    },
} satisfies NextAuthConfig