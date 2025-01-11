import { StateSchema } from '@/app/providers/StoreProvider';

export const getPostData = (state: StateSchema) => state.post?.data;
export const getPostIsLoading = (state: StateSchema) => state.post?.isLoading;
export const getPostError = (state: StateSchema) => state.post?.error;
