import React from "react";
import ChatConversation from "../../components/chat-conversation";
import ChatFooter from "../../components/chat-footer";
import ChatHeader from "../../components/chat-header";
import "./styles.scss";

const Chat: React.FC = () => {
  return (
    <section id="chat">
      <header>
        <ChatHeader />
      </header>

      <article>
        <section>
          <ChatConversation />
        </section>
      </article>

      <footer>
        <section>
          <ChatFooter />
        </section>
      </footer>
    </section>
  );
};

export default Chat;
