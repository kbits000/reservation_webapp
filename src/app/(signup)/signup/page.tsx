import UserRegistrationForm from "@/components/user_registration_form";
import Logo from '@/components/logo/logo';

export default function SignupPage() {

    return (
        <section className="flex flex-col items-center pt-6">
            <Logo />
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              انشىء حساب جديد
            </h1>
            <UserRegistrationForm />
          </div>
        </div>
      </section>  
    );
}