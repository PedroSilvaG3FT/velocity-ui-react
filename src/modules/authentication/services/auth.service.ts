import { httpClient } from "../../@shared/http";
import { IAuthUserByEmailResponse } from "../interfaces/authentication.interface";

export class AuthService {
  public getUserByEmail(email: string) {
    return httpClient.post<IAuthUserByEmailResponse>(`/login/list-login`, {
      email,
    });
  }

  public microsoftCreateUser(email: string, name: string) {
    return httpClient.post(`/user/send-user`, {
      name,
      email,
    });
  }
}
