import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../../../store";
import { chatActions } from "../../../../../../store/reducers/chat.reducer";
import { MODULES_ICONS } from "../../../../constants/modules-icon.contant";
import { SUBMODULES_ICONS } from "../../../../constants/submodules-icon.constant";
import { IChatSetupModuleItem } from "../../../../interfaces/chat-setup.interface";
import "./chat-side-menu-item.scss";

interface IChatSideMenuItemProps {
  isOpen: boolean;
  data: IChatSetupModuleItem;
}
const ChatSideMenuItem: React.FC<IChatSideMenuItemProps> = (props) => {
  const { isOpen, data } = props;

  const navigate = useNavigate();

  const defaultIcon: string = "streamline:pathfinder-trim";
  const modulesIcons: { [key: string]: string } = MODULES_ICONS;
  const submodulesIcons: { [key: string]: string } = SUBMODULES_ICONS;

  const [maxHeight, setMaxHeight] = useState("");
  const [isOpenControl, setIsOpenControl] = useState(isOpen);
  const { selectedSubmoduleId } = useSelector((state: RootState) => state.chat);

  const handleUpdateSelection = (moduleId: number, submoduleId: number) => {
    chatActions.setModuleId(moduleId);
    chatActions.setSubmoduleId(submoduleId);
  };

  const handleGoToHistory = (moduleId: number, submoduleId: number) => {
    handleUpdateSelection(moduleId, submoduleId);
    navigate("/chat/history");
  };

  const handleCreateNewChat = (moduleId: number, submoduleId: number) => {
    handleUpdateSelection(moduleId, submoduleId);
    navigate("/chat");
  };

  const handleToggleOpen = () => setIsOpenControl(!isOpenControl);
  const setMaxHeightSubmenu = () => {
    const count = data.submodules.reduce((acc) => acc + 48, 0);
    setMaxHeight(`${count}px`);
  };

  useEffect(() => {
    setMaxHeightSubmenu();
    setIsOpenControl(isOpen);
  }, []);

  return (
    <article id="chat-side-menu-item">
      <a onClick={handleToggleOpen}>
        <Icon icon={modulesIcons[data.name] || defaultIcon} />
        {data.name}

        {data.submodules.length && (
          <span className={`arrow ${isOpenControl ? "open" : ""}`}>
            <Icon icon="ep:arrow-up-bold" />
          </span>
        )}
      </a>

      <ul className={!isOpenControl ? "closed" : ""} style={{ maxHeight }}>
        {data.submodules.map((submodule, index) => (
          <li
            key={index}
            className={submodule.id === selectedSubmoduleId ? "active" : ""}
          >
            <Icon icon={submodulesIcons[submodule.name] || defaultIcon} />
            <span onClick={() => handleCreateNewChat(data.id, submodule.id)}>
              {submodule.name}
            </span>

            <section>
              <button onClick={() => handleGoToHistory(data.id, submodule.id)}>
                <Icon icon="solar:history-bold-duotone" />
              </button>
              <button
                onClick={() => handleCreateNewChat(data.id, submodule.id)}
              >
                <Icon icon="line-md:plus" />
              </button>
            </section>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ChatSideMenuItem;
