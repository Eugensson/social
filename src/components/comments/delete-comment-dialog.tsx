import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {LoadingButton} from "@/components/loading-button";

import { CommentData } from "@/lib/types";
import { useDeleteCommentMutation } from "@/components/comments/mutations";

interface DeleteCommentDialogProps {
  comment: CommentData;
  open: boolean;
  onClose: () => void;
}

export const DeleteCommentDialog:React.FC<DeleteCommentDialogProps> = ({
  comment,
  open,
  onClose,
}) => {
  const mutation = useDeleteCommentMutation();

  const handleOpenChange = (open: boolean) => {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete comment?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>          
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="destructive"
            onClick={() => mutation.mutate(comment.id, { onSuccess: onClose })}
            loading={mutation.isPending}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
