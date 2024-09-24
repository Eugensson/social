import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { CommentsPage, getCommentDataInclude } from "@/lib/types";

export const GET = async (
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) => {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const PAGE_SIZE = 5;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: getCommentDataInclude(user.id),
      orderBy: { createdAt: "asc" },
      take: -PAGE_SIZE - 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const previousCursor = comments.length > PAGE_SIZE ? comments[0].id : null;

    const data: CommentsPage = {
      comments: comments.length > PAGE_SIZE ? comments.slice(1) : comments,
      previousCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
