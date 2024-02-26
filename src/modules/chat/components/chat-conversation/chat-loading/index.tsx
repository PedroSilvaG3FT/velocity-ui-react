import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import "./styles.scss";

const ChatLoading: React.FC = () => {
  return (
    <section id="chat-loading">
      <article></article>
      <Icon icon="eos-icons:three-dots-loading" />
    </section>
  );
};

export default ChatLoading;
