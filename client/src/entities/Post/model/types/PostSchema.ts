import { Post } from './Post';

export interface PostSchema {
    data?: Post;
    isLoading: boolean;
    error?: string;
}
