import { Post } from '../model/types/Post';

import { rtkApi } from '@/shared/api/rtkApi';

export interface PostsApiProps {
    page: number;
    query?: string;
    order?: 'ASC' | 'DESC';
    owner?: 'any' | 'own';
}

const PostApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPost: build.query<{ posts: Post[]; hasMore: boolean }, PostsApiProps>({
            query: ({ owner = 'any', page = 1, query = '', order = 'DESC' }) => ({
                url: `/api/posts?page=${page}&q=${query}&order=${order}&owner=${owner}`,
            }),
        }),
    }),
});

export const usePosts = PostApi.useGetPostQuery;
