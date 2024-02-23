import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import ChatSideMenuItem from "./chat-side-menu-item";

import "./chat-side-menu.scss";

const ChatSideMenu: React.FC = () => {
  const { userData } = useSelector((state: RootState) => state.auth);
  const { modules } = useSelector((state: RootState) => state.chatSetup);
  const { selectedModuleId } = useSelector((state: RootState) => state.chat);

  return (
    <section id="chat-side-menu">
      <article>
        {modules.map((item, index) => (
          <ChatSideMenuItem
            key={index}
            data={item}
            isOpen={selectedModuleId === item.id}
          />
        ))}
      </article>

      <footer>
        <button>
          <i className="iconify" data-icon="mingcute:settings-6-line"></i>
          <span>{userData.name}</span>
        </button>
      </footer>
    </section>
  );
};

export default ChatSideMenu;
