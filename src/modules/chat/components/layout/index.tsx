import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ChatContext } from "../../../../contexts/chat.context";
import ChatSideMenu from "./chat-side-menu";
import "./styles.scss";

const ChatLayout: React.FC = () => {
  const chatContext = useContext(ChatContext);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

  const initChatSetup = () => {
    chatContext
      .initSetup()
      .then(() => console.warn("[chat setup]: loaded"))
      .catch((error) => console.error("[chat setup]: error", error));
  };

  useEffect(() => {
    initChatSetup();
  }, []);

  return (
    <section
      id="chat-layout"
      className={!isSideMenuOpen ? "side-menu-close" : ""}
    >
      <aside>
        <ChatSideMenu />
      </aside>

      <button onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>{">"}</button>

      <main className="app-container">
        <article>
          <Outlet />
        </article>
      </main>
    </section>
  );
};

export default ChatLayout;
