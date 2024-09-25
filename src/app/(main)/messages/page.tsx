import { Metadata } from "next";

import {Chat} from "@/app/(main)/messages/chat";

export const metadata: Metadata = {
  title: "Messages",
};

const ChatPage = () => {
    return <Chat />;
}

export default ChatPage;
