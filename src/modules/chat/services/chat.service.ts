import { httpClient } from "@/modules/@shared/http";
import { ChatFacede } from "../facedes/chat.facede";
import {
  ICreateSubject,
  ICreateSubjectResponse,
  ISendMessage,
  ISendMessageResponse,
  ISubjectItem,
  ISubjectResponse,
} from "../interfaces/chat.interface";

export class ChatService {
  private chatFacede = new ChatFacede();

  public createSubject(data: ICreateSubject) {
    return httpClient.post<ICreateSubjectResponse>(
      `/subject/send-subject`,
      data
    );
  }

  public async getSubjects(idSubModule: number, idUser: number) {
    try {
      const { data } = await httpClient.post<ISubjectResponse[]>(
        `/subjects/list-subjects`,
        { idSubModule, idUser }
      );

      return data.map((item) => ({
        id: item.ID,
        name: item.Name,
      })) as ISubjectItem[];
    } catch (error) {
      throw error;
    }
  }

  public getMessages(idSubject: number) {
    return httpClient.post<any[]>(`/messages/list-messages`, { idSubject });
  }

  public sendMessage(data: ISendMessage) {
    const { submoduleName } = this.chatFacede.buildRequestURLParams(data);
    return httpClient.post<ISendMessageResponse>(
      `/${submoduleName}/send-${submoduleName}`,
      data
    );
  }
}
