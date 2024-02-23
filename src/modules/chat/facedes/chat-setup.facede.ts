import { chatSetupActions } from "@/store/reducers/chat-setup.reducer";
import {
  IChatSetupModuleItem,
  IChatSetupOptionsItem,
} from "../interfaces/chat-setup.interface";
import { ChatSetupService } from "../services/chat-setup.service";

export class ChatSetupFacade {
  _service = new ChatSetupService();

  public async init() {
    try {
      await this.updateIDEs();
      await this.updateModules();
      await this.updateLanguages();
      await this.updateFrameworks();
    } catch (error) {
      throw error;
    }
  }

  private async buildSubmodules(modules: IChatSetupOptionsItem[]) {
    const result: IChatSetupModuleItem[] = [];

    for await (let module of modules) {
      try {
        const submodules = await this._service.getSubmodules(module.id);
        result.push({ ...module, submodules });
      } catch (error) {
        throw error;
      }
    }

    chatSetupActions.setModules(result);
  }

  public async updateModules() {
    try {
      const response = await this._service.getModules();
      await this.buildSubmodules(response);
    } catch (error) {
      throw error;
    }
  }

  public async updateIDEs() {
    try {
      const response = await this._service.getIDEs();
      chatSetupActions.setIDEs(response);
    } catch (error) {
      throw error;
    }
  }

  public async updateLanguages() {
    try {
      const response = await this._service.getLanguages();
      chatSetupActions.setLanguages(response);
    } catch (error) {
      throw error;
    }
  }

  public async updateFrameworks() {
    try {
      const response = await this._service.getFrameworks();
      chatSetupActions.setFrameworks(response);
    } catch (error) {
      throw error;
    }
  }
}
