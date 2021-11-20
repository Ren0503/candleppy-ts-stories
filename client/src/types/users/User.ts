export interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
}

export interface TokenUser extends User {
    token: string
}

export interface PasswordUser extends User {
    password: string;
}