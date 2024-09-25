import Link from "next/link";
import { Sprout } from "lucide-react";

import {UserButton} from "@/components/user-button";
import {SearchField} from "@/components/search-field";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto max-w-7xl flex flex-wrap justify-center items-center gap-5 md:gap-x-10 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <Sprout size={34} />
          <p>eco<span className="text-muted-foreground">book</span></p>
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}
