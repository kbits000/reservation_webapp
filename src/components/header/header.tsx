import PublicNavbar from "@/components/header/public_navbar";
import { auth } from "@/auth";
import NavbarSignedIn from "@/components/header/navbar_signedin";
import { getUserRoleByEmail } from "@/lib/_data_access/users";

export default async function Header() {
  const session = await auth();
  if (!session) {
    return (
      <header className="sticky top-0 z-[1] bg-white mx-auto flex flex-wrap w-full items-center justify-between pt-2">

        <PublicNavbar />
      </header>
    );
  }


  const userRole = await getUserRoleByEmail(session.user?.email);

  if (userRole === "admin") {
    // userRole is "admin"
    return (
        <header className="sticky top-0 z-[1] bg-white mx-auto flex flex-wrap w-full items-center justify-between pt-2">
          <NavbarSignedIn userRole={userRole}/>
        </header>
    )
  } else {
    // userRole is "user"
    return (
        <header className="sticky top-0 z-[1] bg-white mx-auto flex flex-wrap w-full items-center justify-between pt-2">
          <NavbarSignedIn userRole={'user'}/>
        </header>
    );
  }
}
