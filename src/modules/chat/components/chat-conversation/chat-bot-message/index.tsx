import MarkdownPreview from "@uiw/react-markdown-preview";
import React from "react";
import LogoCBYK from "../../../../../assets/images/logo-cbyk.svg";
import { ISendMessageItem } from "../../../interfaces/chat.interface";

import { EMessageType } from "../../../enums/chat-message-type.enum";
import "./styles.scss";

interface IChatBotMessageProps {
  message: ISendMessageItem;
}
const ChatBotMessage: React.FC<IChatBotMessageProps> = ({ message }) => {
  const isImage = message.type === EMessageType.Image;

  return (
    <article id="chat-bot-message">
      <nav>
        <img src={LogoCBYK} alt="V" />
        <h2>Velocity</h2>
      </nav>

      {isImage ? (
        <img src="https://static.escolakids.uol.com.br/2023/08/paisagem-natural.jpg" />
      ) : (
        <MarkdownPreview
          className="markdown-preview"
          source={message.content}
        />
      )}
    </article>
  );
};

export default ChatBotMessage;
