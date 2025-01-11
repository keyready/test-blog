export interface Tokens {
    access_token: string;
    refresh_token: string;
}

export interface ServerUser {
    id: number;

    username: string;
    password: string;
    avatar: string;

    firstname: string;
    lastname: string;

    created_at: Date;
}

export type User = Partial<ServerUser>;
