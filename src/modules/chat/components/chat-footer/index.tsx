import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useContext, useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { ChatContext } from "../../../../contexts/chat.context";
import { EChatSubmodulesType } from "../../enums/chat-submodules-type.enum";
import ChatInputFile from "../chat-input-file";
import "./styles.scss";

export interface ISubmitSearch {
  prompt: string;
  file: File | null;
  type: EChatSubmodulesType;
}
interface IChatFooterProps {
  onSearch: (value: ISubmitSearch) => void;
}

const ChatFooter: React.FC<IChatFooterProps> = (props) => {
  const { onSearch } = props;
  const [prompt, setPrompt] = useState("");
  const chatContext = useContext(ChatContext);
  const [file, setFile] = useState<File | null>(null);

  const handleSearch = () => {
    onSearch({
      file,
      prompt,
      type: chatContext.isMediaMode
        ? EChatSubmodulesType.Image
        : EChatSubmodulesType.Text,
    });

    setPrompt("");
  };

  const getIsDisabledSubmit = () => {
    if (chatContext.isMediaMode) return !(file || prompt);
    else return !prompt;
  };

  return (
    <section
      id="chat-footer"
      className={chatContext.isMediaMode ? "media-mode" : ""}
    >
      <CodeEditor
        padding={15}
        value={prompt}
        className="code-editor"
        placeholder="Enter your prompt..."
        onChange={(event) => setPrompt(event.target.value)}
      />

      {getIsDisabledSubmit()}

      <article>
        {chatContext.isMediaMode && (
          <ChatInputFile onFileChanged={(value) => setFile(value)} />
        )}

        <button onClick={handleSearch} disabled={getIsDisabledSubmit()}>
          <span>Send</span>
          <Icon icon="cil:send" />
        </button>
      </article>
    </section>
  );
};

export default ChatFooter;
