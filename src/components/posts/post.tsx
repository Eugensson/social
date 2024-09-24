"use client";

import Link from "next/link";
import Image from "next/image";
import { Media } from "@prisma/client";

import { cn } from "@/lib/utils";
import { PostData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/session-provider";

import {Linkify} from "@/components/linkify";
import { UserAvatar } from "@/components/user-avatar";
import { PostMoreButton } from "@/components/posts/post-more-button";
import { UserTooltip } from "@/components/user-tooltip";

interface PostProps {
  post: PostData;
}

export const Post:React.FC<PostProps> = ({ post }) => {
  const {user} = useSession();
  
  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">      
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>          
          <div>
            <UserTooltip user={post.user}>
              <Link href={`/users/${post.user.username}`} className="block font-medium hover:underline">
                {post.user.displayName}
              </Link>
            </UserTooltip>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
      {!!post.attachments.length && (
        <MediaPreviewList attachments={post.attachments} />
      )}
    </article>
  );
}

interface MediaPreviewListProps {
  attachments: Media[];
}

const MediaPreviewList:React.FC<MediaPreviewListProps> = ({ attachments }) => {
  return (
    <ul
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((m) => (
        <li key={m.id}>
          <MediaPreview media={m} />
        </li>
      ))}
    </ul>
  );
}

interface MediaPreviewProps {
  media: Media;
}

const MediaPreview:React.FC<MediaPreviewProps> = ({ media }) => {
  if (media.type === "IMAGE") {
    return (
      <Image
        src={media.url}
        alt="Attachment"
        width={500}
        height={500}
        className="mx-auto size-fit max-h-[30rem] rounded-2xl"
      />
    );
  }

  if (media.type === "VIDEO") {
    return (      
        <div>
          <video
            src={media.url}
            controls
            className="mx-auto size-fit max-h-[30rem] rounded-2xl"
          />
        </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}