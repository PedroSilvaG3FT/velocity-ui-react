import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ChatSideMenu from "./chat-side-menu";
import "./layout.scss";

const ChatLayout: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

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
