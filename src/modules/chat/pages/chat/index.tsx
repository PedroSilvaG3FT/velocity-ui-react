import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import ChatConversation, {
  ChatConversationHandler,
} from "../../components/chat-conversation";
import ChatFooter, { ISubmitSearch } from "../../components/chat-footer";
import ChatHeader from "../../components/chat-header";
import { EAuthorRole } from "../../enums/chat-author-role.enum";
import { EMessageType } from "../../enums/chat-message-type.enum";
import { EChatSubmodulesType } from "../../enums/chat-submodules-type.enum";
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

  const handleSendText = async (model: ISubmitSearch) => {
    try {
      const { data } = await chatService.sendMessage({
        idUser: userData.id,
        idIDE: selectedIdeId,
        idModule: selectedModuleId,
        idSubject: selectedSubjectId,
        idLanguage: selectedLanguageId,
        idSubModule: selectedSubmoduleId,
        idFramework: selectedFrameworkId,
        message: [
          {
            role: EAuthorRole.User,
            type: EMessageType.Text,
            content: "```" + model.prompt + "```",
          },
        ],
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleSendImage = async (model: ISubmitSearch) => {
    try {
      const { data } = await chatService.sendMessage({
        idUser: userData.id,
        idIDE: selectedIdeId,
        idModule: selectedModuleId,
        idSubject: selectedSubjectId,
        idLanguage: selectedLanguageId,
        idSubModule: selectedSubmoduleId,
        idFramework: selectedFrameworkId,
        message: [
          {
            role: EAuthorRole.User,
            type: EMessageType.Image,
            content: "```" + model.prompt + "```",
          },
        ],
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleSearch = async (model: ISubmitSearch) => {
    try {
      console.log("MODEL", model);

      const messageTypeDisct = {
        [EChatSubmodulesType.Text]: EMessageType.Text,
        [EChatSubmodulesType.Image]: EMessageType.Image,
      };

      const messageType = messageTypeDisct[model.type];

      setMessages([
        ...messages,
        {
          type: messageType,
          content: model.prompt,
          role: EAuthorRole.User,
        },
      ]);

      setIsLoading(true);
      handleScrollDown();

      const $request =
        model.type === EChatSubmodulesType.Text
          ? handleSendText(model)
          : handleSendImage(model);

      const { content } = await $request;

      setIsLoading(false);
      setMessages([
        ...messages,
        { role: EAuthorRole.Assistant, type: messageType, content },
      ]);

      scrollToLastMessage();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getMessages = async () => {
    try {
      setIsLoading(true);
      const { data } = await chatService.getMessages(selectedSubjectId);

      const formattedMessages = data
        .map((item) => ({
          role: item.Role,
          content: item.Content,
          type: EMessageType.Text,
        }))
        .filter((item) => !!item.content);

      setMessages(formattedMessages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
