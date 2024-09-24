import { Metadata } from "next";

import { TrendsSidebar } from "@/components/trends-sidebar";
import { Bookmarks } from "@/app/(main)/bookmarks/bookmarks";

export const metadata:Metadata = {
  title: "Bookmarks",
}

const BookmarksPage = () => {
  return (
    <div className="w-full min-w-0 flex gap-5">
        <div className="w-full min-w-0 space-y-5">
            <div className="rounded-2xl bg-card p-5 shadow-sm">
                <h1 className="text-2xl font-bold text-center">Bookmarks</h1>
            </div>
            <Bookmarks />
        </div>
        <TrendsSidebar />
    </div>
  )
}

export default BookmarksPage