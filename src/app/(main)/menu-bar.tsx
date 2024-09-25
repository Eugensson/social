import Link from "next/link";
import { Bookmark, Home, Mail } from "lucide-react";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

import { Button } from "@/components/ui/button";
import { NotificationsButton } from "@/app/(main)/notifications-button";

interface MenuBarProps {
  className?: string;
}

export const MenuBar:React.FC<MenuBarProps> = async ({ className }) => {

    const {user} = await validateRequest();

    if (!user) return null;

    const unreadNotificationCount = await prisma.notification.count({
        where: {
            recipientId: user.id,
            read: false
        }
    });

    return (
        <div className={className}>
            <Button
                variant="ghost"
                className="flex justify-start items-center gap-3"
                title="Home"
                asChild
            >
                <Link href="/">
                <Home />
                <span className="hidden lg:inline">Home</span>
                </Link>
            </Button>
            <NotificationsButton initialState={{unreadCount: unreadNotificationCount}} />
            <Button
                variant="ghost"
                className="flex justify-start items-center gap-3"
                title="Messages"
                asChild
            >
                <Link href="/messages">
                    <Mail />
                    <span className="hidden lg:inline">Messages</span>
                </Link>
            </Button>
            <Button
                variant="ghost"
                className="flex justify-start items-center gap-3"
                title="Bookmarks"
                asChild
            >
                <Link href="/bookmarks">
                    <Bookmark />
                    <span className="hidden lg:inline">Bookmarks</span>
                </Link>
            </Button>
        </div>
    )
}