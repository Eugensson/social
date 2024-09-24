import { useState } from "react";
import { Loader, SendHorizonal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { PostData } from "@/lib/types";
import { useSubmitCommentMutation } from "@/components/comments/mutations";

interface CommentInputProps {
  post: PostData;
}

export const CommentInput:React.FC<CommentInputProps> = ({ post }) => {
  const [input, setInput] = useState("");

  const mutation = useSubmitCommentMutation(post.id);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input) return;

    mutation.mutate(
      {
        post,
        content: input,
      },
      {
        onSuccess: () => setInput(""),
      },
    );
  }

  return (
    <form className="flex w-full items-center gap-2" onSubmit={onSubmit}>
      <Input
        placeholder="Write a comment..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={!input.trim() || mutation.isPending}
      >
        {!mutation.isPending ? (
          <SendHorizonal />
        ) : (
          <Loader className="animate-spin" />
        )}
      </Button>
    </form>
  );
}
