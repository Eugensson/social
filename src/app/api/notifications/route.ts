import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { notificationsInclude, NotificationsPage } from "@/lib/types";

export const GET = async (req: NextRequest) => {
    try {
        const PAGE_SIZE = 10;

        const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

        const {user} = await validateRequest();

        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const notifications = await prisma.notification.findMany({
            where: {
                recipientId: user.id,
            },
            include: notificationsInclude,
            orderBy: {createdAt: "desc"},
            take: PAGE_SIZE + 1,
            cursor: cursor ? {id: cursor} : undefined,
        });

        const nextCursor = notifications.length > PAGE_SIZE ? notifications[PAGE_SIZE].id : null;

        const data: NotificationsPage = {
            notifications: notifications.slice(0, PAGE_SIZE),
            nextCursor,
        };

        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
};