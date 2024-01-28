
import { UserAuthentication } from "../../entities/user-authentication/user-authentication";

export interface UserAuthenticationRepository {
  findById(id: number): Promise<UserAuthentication | null>;
  findByUsername(username: string): Promise<UserAuthentication | null>;
  save(user: UserAuthentication): Promise<void>;
  update(user: UserAuthentication): Promise<void>;
  delete(id: string): Promise<void>;
}