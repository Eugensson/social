import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export const PATCH = async () => {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.notification.updateMany({
      where: {
        recipientId: user.id,
        read: false,
      },
      data: {
        read: true,
      },
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
