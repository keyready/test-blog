export interface Post {
    id: number;
    userId: number;

    title: string;
    body: string;
    files: string;
    createdAt: Date;
}