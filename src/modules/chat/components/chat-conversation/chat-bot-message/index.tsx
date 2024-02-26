import MarkdownPreview from "@uiw/react-markdown-preview";
import React from "react";
import LogoCBYK from "../../../../../assets/images/logo-cbyk.svg";
import { ISendMessageItem } from "../../../interfaces/chat.interface";

import "./styles.scss";

interface IChatBotMessageProps {
  message: ISendMessageItem;
}
const ChatBotMessage: React.FC<IChatBotMessageProps> = ({ message }) => {
  return (
    <article id="chat-bot-message">
      <nav>
        <img src={LogoCBYK} alt="V" />
        <h2>Velocity</h2>
      </nav>

      <MarkdownPreview className="markdown-preview" source={message.content} />
    </article>
  );
};

export default ChatBotMessage;
