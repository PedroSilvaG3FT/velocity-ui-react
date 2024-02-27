import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import ChatSideMenuItem from "./chat-side-menu-item";

import { Icon } from "@iconify/react/dist/iconify.js";
import { AuthContext } from "../../../../../contexts/auth.context";
import "./styles.scss";

const ChatSideMenu: React.FC = () => {
  const { shortUserName, logout } = useContext(AuthContext);
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
          <span>Hello, {shortUserName}</span>
        </button>

        <button onClick={logout}>
          <Icon icon="mdi-light:logout" />
        </button>
      </footer>
    </section>
  );
};

export default ChatSideMenu;
