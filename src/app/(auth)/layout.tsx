import { redirect } from "next/navigation";

import { validateRequest } from "@/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest();

  if (user) redirect("/");

  return <>{children}</>;
};

export default Layout;
