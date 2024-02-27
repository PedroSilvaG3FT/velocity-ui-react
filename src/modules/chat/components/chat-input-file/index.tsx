import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useRef } from "react";
import "./styles.scss";

interface IChatInputFileProps {
  onFileChanged: (file: File | null) => void;
}

const ChatInputFile: React.FC<IChatInputFileProps> = (props) => {
  const { onFileChanged } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    onFileChanged(file);

    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <article id="chat-input-file">
      <label htmlFor="chat-input-file-control">
        <Icon icon="jam:upload" />
      </label>

      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleFileChange}
        id="chat-input-file-control"
      />
    </article>
  );
};

export default ChatInputFile;
