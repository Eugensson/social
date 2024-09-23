import { redirect } from "next/navigation";

import Navbar from "@/app/(main)/navbar";
import { MenuBar } from "@/app/(main)/menu-bar";

import { validateRequest } from "@/auth"
import SessionProvider from "@/app/(main)/session-provider";

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout:React.FC<MainLayoutProps> = async ({children}) => {
    const session = await validateRequest();

    if(!session.user) redirect("/login");

    return (
        <SessionProvider value={session}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="w-full max-w-7xl mx-auto p-5 flex grow gap-5">
              <MenuBar className="sticky top-[5.25rem] h-fit xl:w-80 hidden sm:block flex-none space-y-3 rounded-2xl bg-card px-3 py-5 lg:px-5 shadow-sm" />
              {children}
            </main>
            <MenuBar className="sticky bottom-0 w-full flex justify-center gap-5 border-t bg-card p-3 sm:hidden"/>
          </div>
        </SessionProvider>
    )
}

export default MainLayout;