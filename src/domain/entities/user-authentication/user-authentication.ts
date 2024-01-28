export class UserAuthentication {
    public id: string;
    public username: string;
    public token: string;
    public password: string;
    public createdAt: Date;
    public updatedAt: Date;
    public isActive: boolean;
  
    constructor({
      id,
      username,
      token,
      password,
      createdAt,
      updatedAt,
      isActive
    }: UserAuthenticationDTO) {
      this.id = id;
      this.username = username;
      this.token = token;
      this.password = password;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.isActive = isActive;
    }
  }
  