import React, { createContext } from "react";
import {
  IChatSetupModuleItem,
  IChatSetupOptionsItem,
} from "../modules/chat/interfaces/chat-setup.interface";
import { ChatSetupService } from "../modules/chat/services/chat-setup.service";
import { chatSetupActions } from "../store/reducers/chat-setup.reducer";

interface IChatContext {
  initSetup: () => Promise<void>;
}

interface IChatProviderProps {
  children: React.ReactNode;
}

const chatSetupService = new ChatSetupService();

const ChatContext = createContext<IChatContext>({
  initSetup: () => new Promise<void>(() => {}),
});

const ChatProvider: React.FC<IChatProviderProps> = ({ children }) => {
  const buildSubmodules = async (modules: IChatSetupOptionsItem[]) => {
    const result: IChatSetupModuleItem[] = [];

    for await (let module of modules) {
      try {
        const submodules = await chatSetupService.getSubmodules(module.id);
        result.push({ ...module, submodules });
      } catch (error) {
        throw error;
      }
    }

    chatSetupActions.setModules(result);
  };

  const updateModules = async () => {
    try {
      const response = await chatSetupService.getModules();
      await buildSubmodules(response);
    } catch (error) {
      throw error;
    }
  };

  const updateIDEs = async () => {
    try {
      const response = await chatSetupService.getIDEs();
      chatSetupActions.setIDEs(response);
    } catch (error) {
      throw error;
    }
  };

  const updateLanguages = async () => {
    try {
      const response = await chatSetupService.getLanguages();
      chatSetupActions.setLanguages(response);
    } catch (error) {
      throw error;
    }
  };

  const updateFrameworks = async () => {
    try {
      const response = await chatSetupService.getFrameworks();
      chatSetupActions.setFrameworks(response);
    } catch (error) {
      throw error;
    }
  };

  const initSetup = async () => {
    try {
      await updateIDEs();
      await updateModules();
      await updateLanguages();
      await updateFrameworks();
    } catch (error) {
      throw error;
    }
  };

  const providerValue = { initSetup };

  return (
    <ChatContext.Provider value={providerValue}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
