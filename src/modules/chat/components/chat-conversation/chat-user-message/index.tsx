import React from "react";
import { ISendMessageItem } from "../../../interfaces/chat.interface";
import "./styles.scss";

interface IChatUserMessageProps {
  message: ISendMessageItem;
}
const ChatUserMessage: React.FC<IChatUserMessageProps> = ({ message }) => {
  return (
    <article id="chat-user-message">
      <h2>You</h2>
      <pre>{message.content}</pre>
    </article>
  );
};

export default ChatUserMessage;
