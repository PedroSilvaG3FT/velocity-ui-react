import React, { useImperativeHandle, useRef } from "react";
import { ISendMessageItem } from "../../interfaces/chat.interface";
import ChatBotMessage from "./chat-bot-message";
import ChatLoading from "./chat-loading";
import ChatUserMessage from "./chat-user-message";
import "./styles.scss";

export type ChatConversationHandler = {
  getScrollPositionLastMessage: () => number | null;
};

interface IChatConversationProps {
  loading: boolean;
  messages: ISendMessageItem[];
}

const ChatConversation: React.ForwardRefRenderFunction<
  ChatConversationHandler,
  IChatConversationProps
> = (props, ref) => {
  const { loading, messages } = props;
  const botMessageRole: string = "assistant";
  const messagesContainerRef = useRef<HTMLElement>(null);

  const getScrollPositionLastMessage = (): number | null => {
    const lastMessageEl = messagesContainerRef.current?.lastElementChild;

    const rect = lastMessageEl?.getBoundingClientRect();

    if (rect) return rect.top + window.pageYOffset || null;
    else return null;
  };

  useImperativeHandle(ref, () => ({
    getScrollPositionLastMessage,
  }));

  return (
    <section id="chat-conversation" ref={messagesContainerRef}>
      {messages.map((item, index) => {
        if (item.role === botMessageRole)
          return <ChatBotMessage key={index} message={item} />;
        else return <ChatUserMessage key={index} message={item} />;
      })}

      {loading && <ChatLoading />}
    </section>
  );
};

export default React.forwardRef(ChatConversation);
