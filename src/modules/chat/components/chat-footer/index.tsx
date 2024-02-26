import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import "./styles.scss";

interface IChatFooterProps {
  onSearch: (value: string) => void;
}

const ChatFooter: React.FC<IChatFooterProps> = (props) => {
  const { onSearch } = props;
  const [value, setValue] = useState("");

  const handleSearch = () => {
    onSearch(value);
    setValue("");
  };

  return (
    <section id="chat-footer">
      <CodeEditor
        padding={15}
        value={value}
        className="code-editor scroll"
        placeholder="Enter your prompt..."
        onChange={(event) => setValue(event.target.value)}
      />

      <article>
        <button onClick={handleSearch}>
          <span>Send</span>
          <Icon icon="cil:send" />
        </button>
      </article>
    </section>
  );
};

export default ChatFooter;
