import { httpClient } from "@/modules/@shared/http";
import {
  IChatSetupOptionResponse,
  IChatSetupOptionsItem,
} from "../interfaces/chat-setup.interface";

export class ChatSetupService {
  private handlerResponseMap(
    data: IChatSetupOptionResponse[]
  ): IChatSetupOptionsItem[] {
    return data.map((item) => ({
      id: item.ID,
      name: item.Name,
      createdAt: item.CreatedAt,
    }));
  }

  private async handlerRequest(path: string) {
    try {
      const { data } = await httpClient.get<IChatSetupOptionResponse[]>(path);
      return this.handlerResponseMap(data);
    } catch (error) {
      throw error;
    }
  }

  public async getSubmodules(idModule: number) {
    try {
      const { data } = await httpClient.post<IChatSetupOptionResponse[]>(
        `/submodules/list-submodules`,
        { idModule }
      );

      return data.map((item) => ({
        id: item.ID,
        name: item.Name,
        typeId: item.SubModulesTypeID,
        typeName: item.SubModulesTypeName,
      }));
    } catch (error) {
      throw error;
    }
  }

  public getModules() {
    return this.handlerRequest("/modules/list-modules");
  }

  public getFrameworks() {
    return this.handlerRequest("/frameworks/list-frameworks");
  }

  public getIDEs() {
    return this.handlerRequest("/ides/list-ides");
  }

  public getLanguages() {
    return this.handlerRequest(
      "/programming-languages/list-programming-languages"
    );
  }
}
