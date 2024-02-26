import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store";
import { chatActions } from "../../../../store/reducers/chat.reducer";
import { ChatFacede } from "../../facedes/chat.facede";
import { ISubjectItem } from "../../interfaces/chat.interface";
import { ChatService } from "../../services/chat.service";

import "./styles.scss";

const chatFacede = new ChatFacede();
const chatService = new ChatService();

const History: React.FC = () => {
  const navigate = useNavigate();

  const [submoduleId, setSubmoduleId] = useState(0);
  const [subjects, setSubjects] = useState<ISubjectItem[]>([]);

  const [moduleName, setModuleName] = useState("");
  const [submoduleName, setSubmoduleName] = useState("");

  const { userData } = useSelector((state: RootState) => state.auth);

  const { selectedModuleId, selectedSubmoduleId } = useSelector(
    (state: RootState) => state.chat
  );

  const getTitle = () => {
    const currentModule = chatFacede.getModuleById(selectedModuleId);

    if (currentModule) {
      const currentSubmodule = chatFacede.getSubmoduleById(
        currentModule,
        selectedSubmoduleId
      );

      setModuleName(currentModule?.name || "");
      setSubmoduleName(currentSubmodule?.name || "");
    }
  };

  const getSubjects = async () => {
    try {
      console.log("submoduleId :", submoduleId);
      const data = await chatService.getSubjects(
        selectedSubmoduleId,
        userData.id
      );
      setSubjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectSubject = (item: ISubjectItem) => {
    chatActions.setSubjectId(item.id);
    navigate("/chat");
  };

  useEffect(() => {
    const isSubmoduleChanged = submoduleId !== selectedSubmoduleId;

    console.log("effect selectedSubmoduleId :", selectedSubmoduleId);
    if (isSubmoduleChanged && selectedSubmoduleId) {
      setSubmoduleId(selectedSubmoduleId);

      getTitle();
      getSubjects();
    }
  }, [selectedSubmoduleId]);

  return (
    <section id="history">
      <h1>
        History from {moduleName} - {submoduleName}
      </h1>

      <section>
        {subjects.map((item, index) => (
          <article key={index} onClick={() => handleSelectSubject(item)}>
            {item.name}
          </article>
        ))}
      </section>
    </section>
  );
};

export default History;
