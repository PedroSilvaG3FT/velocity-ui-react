import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import ChatConversation, {
  ChatConversationHandler,
} from "../../components/chat-conversation";
import ChatFooter from "../../components/chat-footer";
import ChatHeader from "../../components/chat-header";
import { ISendMessageItem } from "../../interfaces/chat.interface";
import { ChatService } from "../../services/chat.service";
import "./styles.scss";

const chatService = new ChatService();

const Chat: React.FC = () => {
  const messagesContainerRef = useRef<HTMLElement>(null);
  const conversationComponentRef = useRef<ChatConversationHandler>(null);

  const [subjectId, setSubjectId] = useState(0);
  const [submoduleId, setSubmoduleId] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ISendMessageItem[]>([]);

  const { userData } = useSelector((state: RootState) => state.auth);

  const {
    selectedIdeId,
    selectedModuleId,
    selectedSubjectId,
    selectedLanguageId,
    selectedFrameworkId,
    selectedSubmoduleId,
  } = useSelector((state: RootState) => state.chat);

  const handleScrollDown = (position: number | null = null) => {
    if (messagesContainerRef.current) {
      const value = position || messagesContainerRef.current.scrollHeight;
      messagesContainerRef.current.scrollTop = value;
    }
  };

  const scrollToLastMessage = () => {
    if (conversationComponentRef.current) {
      const position =
        conversationComponentRef.current.getScrollPositionLastMessage();

      if (position) handleScrollDown(position - 210);
      else handleScrollDown();
    }
  };

  const handleSearch = async (prompt: string) => {
    try {
      setMessages([...messages, { role: "system", content: prompt }]);
      setIsLoading(true);

      handleScrollDown();

      const { data } = await chatService.sendMessage({
        idUser: userData.id,
        idIDE: selectedIdeId,
        idModule: selectedModuleId,
        idSubject: selectedSubjectId,
        idLanguage: selectedLanguageId,
        idSubModule: selectedSubmoduleId,
        idFramework: selectedFrameworkId,
        message: [{ role: "system", content: "```" + prompt + "```" }],
      });
      setIsLoading(false);
      setMessages([...messages, { role: "assistant", content: data.content }]);

      scrollToLastMessage();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getMessages = async () => {
    try {
      const { data } = await chatService.getMessages(selectedSubjectId);
      console.log("MESSAGES ", data);
      const formattedMessages = data
        .map((item) => ({ role: item.Role, content: item.Content }))
        .filter((item) => !!item.content);

      setMessages(formattedMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isSubjectChanged = subjectId !== selectedSubjectId;
    const isSubmoduleChanged = submoduleId !== selectedSubmoduleId;

    if (isSubjectChanged || isSubmoduleChanged) {
      setSubjectId(selectedSubjectId);
      setSubmoduleId(selectedSubmoduleId);

      getMessages();
    }
  }, [selectedSubjectId, selectedSubmoduleId]);

  return (
    <section id="chat">
      <header>
        <ChatHeader />
      </header>

      <article ref={messagesContainerRef}>
        <section>
          <ChatConversation
            ref={conversationComponentRef}
            messages={messages}
            loading={isLoading}
          />
        </section>
      </article>

      <footer>
        <section>
          <ChatFooter onSearch={handleSearch} />
        </section>
      </footer>
    </section>
  );
};

export default Chat;
