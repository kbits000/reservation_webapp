import 'server-only'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';


export async function addHistory() {

}

export async function getHistory() {
    const session = await auth()
    if (!session) {
        redirect('/api/auth/signin');
    }
}