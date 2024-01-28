export class UserAuthentication {
    private _id: string;
    private _username: string;
    private _token: string;
    private _password: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _isActive: boolean;
  
    constructor({
      id,
      username,
      token,
      password,
      createdAt,
      updatedAt,
      isActive
    }: UserAuthenticationDTO) {
      this._id = id;
      this._username = username;
      this._token = token;
      this._password = password;
      this._createdAt = createdAt;
      this._updatedAt = updatedAt;
      this._isActive = isActive;
    }

    get id(): string {
      return this._id
    }

    get username(): string {
      return this._username
    }

    get token(): string {
      return this._token
    }

    get password(): string {
      return this._password
    }

    get createdAt(): Date {
      return this._createdAt
    }

    get updatedAt(): Date {
      return this._updatedAt
    }

    get isActive(): Boolean {
      return this._isActive
    }

    changeUsername(username: string): void {
      this._username = username
    }

    changeToken(token: string): void {
      this._token = token
    }

    changePassword(password: string) : void {
      this._password = password
    }

    changeActivity(isActive: boolean) : void {
      this._isActive = isActive
    }

    changeUpdatedAt(updatedAt: Date) : void {
      this._updatedAt = updatedAt
    }
  }
  
  