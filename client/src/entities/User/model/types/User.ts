export interface Tokens {
    accessToken: string;
}

export interface ServerUser {
    id: number;

    username: string;
    password: string;

    firstname: string;
    lastname: string;

    created_at: Date;
}

export type User = Partial<ServerUser>;
