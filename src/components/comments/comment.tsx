import Link from "next/link";

import { CommentData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/session-provider";

import {UserAvatar} from "@/components/user-avatar";
import {UserTooltip} from "@/components/user-tooltip";
import {CommentMoreButton} from "@/components/comments/comment-more-button";

interface CommentProps {
  comment: CommentData;
}

export const Comment:React.FC<CommentProps> = ({ comment }) => {
  const { user } = useSession();

  return (
    <div className="group/comment flex gap-3 py-3">
      <span className="hidden sm:inline">
        <UserTooltip user={comment.user}>
          <Link href={`/users/${comment.user.username}`}>
            <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
          </Link>
        </UserTooltip>
      </span>
      <div>
        <div className="flex items-center gap-1 text-sm">
          <UserTooltip user={comment.user}>
            <Link
              href={`/users/${comment.user.username}`}
              className="font-medium hover:underline"
            >
              {comment.user.displayName}
            </Link>
          </UserTooltip>
          <span className="text-muted-foreground">
            {formatRelativeDate(comment.createdAt)}
          </span>
        </div>
        <p>{comment.content}</p>
      </div>
      {comment.user.id === user.id && (
        <CommentMoreButton
          comment={comment}
          className="ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
        />
      )}
    </div>
  );
}
