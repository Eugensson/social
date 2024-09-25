import {
    Channel,
    ChannelHeader,
    ChannelHeaderProps,
    MessageInput,
    MessageList,
    Window,
} from "stream-chat-react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface ChatChannelProps {
  open: boolean;
  openSidebar: () => void;
}

export const ChatChannel:React.FC<ChatChannelProps> = ({ open, openSidebar }) => {
  return (
    <div className={cn("w-full md:block", !open && "hidden")}>
      <Channel>
        <Window>
          <CustomChannelHeader openSidebar={openSidebar} />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </div>
  );
}

interface CustomChannelHeaderProps extends ChannelHeaderProps {
  openSidebar: () => void;
}

const CustomChannelHeader:React.FC<CustomChannelHeaderProps> = ({
  openSidebar,
  ...props
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-full p-2 md:hidden">
        <Button size="icon" variant="ghost" onClick={openSidebar}>
          <Menu className="size-5" />
        </Button>
      </div>
      <ChannelHeader {...props} />
    </div>
  );
}
