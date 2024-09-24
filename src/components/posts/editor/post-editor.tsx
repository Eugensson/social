"use client";

import Image from "next/image";
import StarterKit from "@tiptap/starter-kit";
import { useRef, ClipboardEvent } from "react";
import { useDropzone } from "@uploadthing/react";
import { ImageIcon, Loader, X } from "lucide-react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";

import { cn } from "@/lib/utils";
import { useSession } from "@/app/(main)/session-provider";
import { useSubmitPostMutation } from "@/components/posts/editor/mutations";
import { Attachment, useMediaUpload } from "@/components/posts/editor/use-media-upload";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { LoadingButton } from "@/components/loading-button";

import "@/app/globals.css";

export const PostEditor = () => {
    const { user } = useSession();

    const mutation = useSubmitPostMutation();

    const {
        startUpload,
        attachments,
        isUploading,
        uploadProgress,
        removeAttachment,
        reset: resetMediaUploads,
    } = useMediaUpload();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: startUpload,
    });

    const { onClick, ...rootProps } = getRootProps();
    
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false,
            }),
            Placeholder.configure({
                placeholder: "What's crack-a-lackin'?",
            }),
        ],
    });

    const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

    const onSubmit = () => {
        mutation.mutate({
            content: input,
            mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
        }, {
            onSuccess: () => {
                editor?.commands.clearContent();
                resetMediaUploads();
            },
            onError: () => {
                editor?.commands.clearContent();
            },
        });
        editor?.commands.clearContent();
    };

    const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
      const files = Array.from(e.clipboardData.items)
        .filter((item) => item.kind === "file")
        .map((item) => item.getAsFile()) as File[];
      startUpload(files);
    }
        
    return (
        <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex gap-5">
                <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
                <div {...rootProps} className="w-full">
                  <EditorContent editor={editor} onPaste={onPaste} className={cn("w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3", isDragActive && "outline-dashed")} />
                  <input {...getInputProps()} />
                </div>
            </div>
            {!!attachments.length && (
                <AttachmentPreviewsList
                    attachments={attachments}
                    removeAttachment={removeAttachment}
                />
            )}
            <div className="flex justify-end items-center gap-3">
                {isUploading && (
                    <>
                        <span className="text-sm">{uploadProgress ?? 0}%</span>
                        <Loader className="size-5 animate-spin text-primary" />
                    </>
                )}
                <AddAttachmentsButton
                    onFilesSelected={startUpload}
                    disabled={isUploading || attachments.length >= 5}
                />
                <LoadingButton
                    onClick={onSubmit}
                    loading={mutation.isPending}
                    disabled={!input.trim() || isUploading}
                    className="min-w-20"
                >
                    Post
                </LoadingButton>
            </div>
        </div>
    )    
}

interface AddAttachmentsButtonProps {
    onFilesSelected: (files: File[]) => void;
    disabled: boolean;
}

const AddAttachmentsButton:React.FC<AddAttachmentsButtonProps> = ({
    onFilesSelected,
    disabled
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);   

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:text-primary"
                disabled={disabled}
                onClick={() => fileInputRef.current?.click()}
            >
                <ImageIcon size={20} />
            </Button>
            <input
                type="file"
                accept="image/*, video/*"
                multiple
                ref={fileInputRef}
                className="sr-only hidden"
                onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length) {
                        onFilesSelected(files);
                        e.target.value = "";
                    }
                }}
            />
        </>
    );
}

interface AttachmentPreviewListProps {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}

const AttachmentPreviewsList:React.FC<AttachmentPreviewListProps> = ({
  attachments,
  removeAttachment,
}) => {
  return (
    <ul
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((attachment) => (
        <li key={attachment.file.name}>
          <AttachmentPreview            
            attachment={attachment}
            onRemoveClick={() => removeAttachment(attachment.file.name)}
          />
        </li>
      ))}
    </ul>
  );
}

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemoveClick: () => void;
}

const AttachmentPreview:React.FC<AttachmentPreviewProps> = ({
  attachment: { file, mediaId, isUploading },
  onRemoveClick,
}) => {
  const src = URL.createObjectURL(file);

  return (
    <div
      className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
    >
      {file.type.startsWith("image") ? (
        <Image
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      ) : (
        <video controls className="size-fit max-h-[30rem] rounded-2xl">
          <source src={src} type={file.type} />
        </video>
      )}
      {!isUploading && (
        <button
          onClick={onRemoveClick}
          className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}