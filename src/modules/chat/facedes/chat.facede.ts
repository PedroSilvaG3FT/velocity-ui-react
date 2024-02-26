import store from "../../../store";

import { ObjectUtil } from "../../@shared/util/object.util";
import { IChatSetupModuleItem } from "../interfaces/chat-setup.interface";
import { ISendMessage } from "../interfaces/chat.interface";

export class ChatFacede {
  public getModuleById(id: number) {
    const modules: IChatSetupModuleItem[] = ObjectUtil.clone(
      store.getState().chatSetup.modules
    );
    return modules.find((item) => item.id === id);
  }

  public getSubmoduleById(moduleApp: IChatSetupModuleItem, id: number) {
    const submodules = moduleApp.submodules;
    return submodules.find((item) => item.id === id);
  }

  public buildRequestURLParams(data: ISendMessage) {
    let moduleName: string = "";
    let submoduleName: string = "";

    const module = this.getModuleById(data.idModule);
    if (!module) return { moduleName, submoduleName };

    const submodule = this.getSubmoduleById(module, data.idSubModule);

    const formatName = (name: string = "") =>
      name.toLocaleLowerCase().replace(" ", "-");

    moduleName = formatName(module?.name);
    submoduleName = formatName(submodule?.name);

    return { moduleName, submoduleName };
  }

  public buildMessage(response: any) {
    const createMessage = (sender: string, value: string, status?: string) => {
      return { status, value, sender, timestamp: new Date() };
    };

    const errorMessage = `Connection Timeout`;
    const warnMessage = `This content might not align with our content guidelines.`;

    if (response && response.codeSnippet)
      return createMessage("Chat", response.codeSnippet, "ok");
    else if (response?.codeSnippet === null)
      return createMessage("Chat", warnMessage, "warn");
    else return createMessage("Chat", errorMessage, "error");
  }
}
