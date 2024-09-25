"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { createCommentSchema } from "@/lib/validation";
import { getCommentDataInclude, PostData } from "@/lib/types";

export const submitComment = async ({
  post,
  content,
}: {
  post: PostData;
  content: string;
}) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const [newComment] =await prisma.$transaction([
    prisma.comment.create({
      data: {
        content: contentValidated,
        postId: post.id,
        userId: user.id,
      },
      include: getCommentDataInclude(user.id),
    }),
    ...(user.id !== post.user.id
      ? [prisma.notification.create({
          data: {
            issuerId: user.id,
            recipientId: post.user.id,
            postId: post.id,
            type: "COMMENT",
          },
        })]
      : []),
  ]);

  return newComment;
}

export const deleteComment = async (id: string) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) throw new Error("Comment not found");

  if (comment.userId !== user.id) throw new Error("Unauthorized");

  const deletedComment = await prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(user.id),
  });

  return deletedComment;
}
