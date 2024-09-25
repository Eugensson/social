import Link from "next/link";
import { Bookmark, Home } from "lucide-react";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import streamServerClient from "@/lib/stream";

import { Button } from "@/components/ui/button";
import { MessagesButton } from "@/app/(main)/messages-button";
import { NotificationsButton } from "@/app/(main)/notifications-button";

interface MenuBarProps {
  className?: string;
}

export const MenuBar:React.FC<MenuBarProps> = async ({ className }) => {

    const {user} = await validateRequest();

    if (!user) return null;

    const [unreadNotificationCount, unreadMessagesCount] = await Promise.all([
        prisma.notification.count({
            where: {
                recipientId: user.id,
                read: false
            }
        }),
        (await streamServerClient.getUnreadCount(user.id)).total_unread_count
    ]);

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
            <MessagesButton initialState={{unreadCount: unreadMessagesCount}} />
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