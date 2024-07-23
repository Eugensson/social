import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

export const GoogleSignInButton = () => {
  return (
    <Button
      variant="outline"
      className="rounded bg-white text-black hover:bg-gray-100 hover:text-black"
      asChild
    >
      <Link href="/login/google" className="flex w-full items-center gap-2">
        <FcGoogle className="size-5" />
        Sign in with Google
      </Link>
    </Button>
  );
};
