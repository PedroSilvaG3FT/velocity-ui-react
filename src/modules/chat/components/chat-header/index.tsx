import React from "react";
import { useSelector } from "react-redux";
import LogoCBYK from "../../../../assets/images/logo-cbyk.svg";
import { RootState } from "../../../../store";
import "./styles.scss";

const ChatHeader: React.FC = () => {
  const { ides, languages, frameworks } = useSelector(
    (state: RootState) => state.chatSetup
  );

  return (
    <article id="chat-header">
      <img src={LogoCBYK} alt="Velocity" />

      <section>
        <select name="langage">
          {languages.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <select name="framework">
          {frameworks.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <select name="ide">
          {ides.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </section>
    </article>
  );
};

export default ChatHeader;
