import prisma from "@/lib/prisma";
import { BookmarkInfo } from "@/lib/types";
import { validateRequest } from "@/auth";

export const GET = async(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) => {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: loggedInUser.id,
          postId,
        },
      },
    });

    const data: BookmarkInfo = {
      isBookmarkedByUser: !!bookmark,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const POST = async (
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) => {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.bookmark.upsert({
        where: {
            userId_postId: {
                userId: loggedInUser.id,
                postId
            }
        },
        create: {
            userId: loggedInUser.id,
            postId
        },
        update: {}
    })

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const DELETE = async (
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) => {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await prisma.bookmark.deleteMany({
      where: {
        userId: loggedInUser.id,
        postId,
      },
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
