import NextAuth from "next-auth";
import {isUserRegistered} from "@/lib/_data_access/users";
import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {
        async signIn(params) {
            // check if email is registered or not
            // if it is, then continue sign-in flow otherwise return false;
            if (params.profile?.email != null || params.profile?.email != undefined) {
                const userIsRegistered = await isUserRegistered(params.profile?.email);
                if (userIsRegistered) {
                    return true;
                } else {
                    return '/signup';
                }
            }
            return true;        // TODO check the validity of this return
        },
        authorized({ request, auth }) {
            return false
        }
    },
    ...authConfig,
})