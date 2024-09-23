import { redirect } from "next/navigation";

import { validateRequest } from "@/auth"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout:React.FC<AuthLayoutProps> = async ({children}) => {
    const {user} = await validateRequest();

    if(user) redirect("/");

    return (
        <main>{children}</main>
    )
}

export default AuthLayout