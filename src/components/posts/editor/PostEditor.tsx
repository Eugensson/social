"use client";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";

import { submitPost } from "./actions";
import { Button } from "@/components/ui/button";
import { useSubmitPostMutation } from "./mutations";
import { UserAvatar } from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";

import "./styles.css";
import { LoadingButton } from "@/components/LoadingButton";

export const PostEditor = () => {
  const { user } = useSession();

  const mutation = useSubmitPostMutation();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bold: false, italic: false }),
      Placeholder.configure({ placeholder: "What's crack-a-lackin'?" }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const onSubmit = () => {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 rounded bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded bg-background px-5 py-3"
        ></EditorContent>
      </div>
      <div className="flex justify-end">
        <LoadingButton
          onClick={onSubmit}
          loading={mutation.isPending}
          disabled={!input.trim()}
          className="min-w-20 rounded"
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
};
