import 'server-only'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export async function addNotification() {
    const session = await auth()
    if (!session) {
        redirect('/api/auth/signin');
    }
}

export async function updateNotificationReadStatus() {
    const session = await auth()
    if (!session) {
        redirect('/api/auth/signin');
    }
}

export async function deleteNotification() {
    const session = await auth()
    if (!session) {
        redirect('/api/auth/signin');
    }
}