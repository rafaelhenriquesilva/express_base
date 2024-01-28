interface UserAuthenticationDTO {
    id: string;
    username: string;
    token: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}