import React from "react";
import { EMessageType } from "../../../enums/chat-message-type.enum";
import { ISendMessageItem } from "../../../interfaces/chat.interface";
import "./styles.scss";

interface IChatUserMessageProps {
  message: ISendMessageItem;
}
const ChatUserMessage: React.FC<IChatUserMessageProps> = ({ message }) => {
  const isImage = message.type === EMessageType.Image;

  return (
    <article id="chat-user-message">
      <h2>You</h2>

      {isImage ? (
        <img src="https://static.escolakids.uol.com.br/2023/08/paisagem-natural.jpg" />
      ) : (
        <pre>{message.content}</pre>
      )}
    </article>
  );
};

export default ChatUserMessage;
