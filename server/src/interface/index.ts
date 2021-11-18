export interface AuthUser {
    _id?: string;
    id: string;
    isAdmin: boolean;
    fullName?: string;
    email?: string;
    createdAt: Date;
}
