export class UserAuthentication {
    public id: number;
    public username: string;
    public token: string;
    public password: string;
    public createdAt: Date;
    public updatedAt: Date;
    public isActive: boolean;
  
    constructor(
      id: number,
      username: string,
      token: string,
      password: string,
      createdAt: Date,
      updatedAt: Date,
      isActive: boolean
    ) {
      this.id = id;
      this.username = username;
      this.token = token;
      this.password = password;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.isActive = isActive;
    }
  }
  