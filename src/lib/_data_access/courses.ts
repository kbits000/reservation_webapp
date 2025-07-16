import 'server-only'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export async function addCourses() {
    const session = await auth()
    if (!session) {
    // redirect('/api/auth/signin?callbackUrl=/user');
    redirect('/api/auth/signin');
    }
}

export async function getCourses() {

}

export async function updateCourses() {
  const session = await auth()
  if (!session) {
    // redirect('/api/auth/signin?callbackUrl=/user');
    redirect('/api/auth/signin');
  }
}

export async function deleteCourses() {
  const session = await auth()
  if (!session) {
    // redirect('/api/auth/signin?callbackUrl=/user');
    redirect('/api/auth/signin');
  }
}