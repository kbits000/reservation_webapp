import SignInGoogle from "@/components/sign_in_google";
import { SignInGoogleCustomButton} from "@/components/sign_in_google_custom_button";


export default async function LoginPage() {
  // const onFinish = (values: string) => {
  //   console.log("Received values of form: ", values);
  // };
  //   let csrfToken = (await cookies()).get("authjs.csrf-token")?.value ?? "";

    // if (csrfToken === '') {
    // const csrfToken = (await cookies()).get("_Host-authjs.csrf-token")?.value ?? "";
    // }
    // console.log('csrfToken COOKIE_TOKEN', csrfToken);
  return (
    <div className="min-h-screen flex flex-col justify-center items-start md:items-center p-8 bg-blue-50">
      <div>
        <SignInGoogle />
        <SignInGoogleCustomButton/>
      </div>
    </div>
  );
}
