import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LogoCBYK from "../../../../assets/images/logo-cbyk.svg";
import { RootState } from "../../../../store";
import { chatActions } from "../../../../store/reducers/chat.reducer";
import AppSelect from "../../../@shared/components/form/app-select";
import { IFormOption } from "../../../@shared/interfaces/app-form.interface";
import { IChatSetupOptionsItem } from "../../interfaces/chat-setup.interface";
import "./styles.scss";

const ChatHeader: React.FC = () => {
  const { ides, languages, frameworks } = useSelector(
    (state: RootState) => state.chatSetup
  );

  const { selectedIdeId, selectedLanguageId, selectedFrameworkId } =
    useSelector((state: RootState) => state.chat);

  const [ide, setIde] = useState(0);
  const [language, setLanguage] = useState(0);
  const [framework, setFramework] = useState(0);

  const [idesOptions, setIdesOptions] = useState<IFormOption[]>([]);
  const [languagesOptions, setLanguagesOptions] = useState<IFormOption[]>([]);
  const [frameworkOptions, setFrameworksOptions] = useState<IFormOption[]>([]);

  const initOptions = () => {
    const formatOptions = (value: IChatSetupOptionsItem[]): IFormOption[] => {
      return value.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    };

    setIdesOptions(formatOptions(ides));
    setLanguagesOptions(formatOptions(languages));
    setFrameworksOptions(formatOptions(frameworks));
  };

  useEffect(() => {
    initOptions();
  }, [ides, languages, frameworks]);

  useEffect(() => {
    chatActions.setIdeId(ide);
    chatActions.setLanguageId(language);
    chatActions.setFrameworkId(framework);
  }, [ide, language, framework]);

  useEffect(() => {
    setIde(selectedIdeId);
    setLanguage(selectedLanguageId);
    setFramework(selectedFrameworkId);
  }, []);

  return (
    <article id="chat-header">
      <img src={LogoCBYK} alt="Velocity" />

      <section>
        <AppSelect
          value={language}
          label="Language"
          options={languagesOptions}
          onChange={({ value }) => setLanguage(value)}
        />
        <AppSelect
          value={framework}
          label="Framework"
          options={frameworkOptions}
          onChange={({ value }) => setFramework(value)}
        />
        <AppSelect
          value={ide}
          label="IDE"
          options={idesOptions}
          onChange={({ value }) => setIde(value)}
        />
      </section>
    </article>
  );
};

export default ChatHeader;
