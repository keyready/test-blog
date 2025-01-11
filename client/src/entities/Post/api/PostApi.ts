import { Post } from '../model/types/Post';

import { rtkApi } from '@/shared/api/rtkApi';

const PostApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPost: build.query<Post[], void>({
            query: () => ({
                url: `/api/posts`,
            }),
        }),
    }),
});

export const usePosts = PostApi.useGetPostQuery;
