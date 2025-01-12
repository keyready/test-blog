import { User } from '@/entities/User';

export interface Post {
    id: number;
    user: User;

    title: string;
    body: string;
    files: string;
    createdAt: Date;
}
