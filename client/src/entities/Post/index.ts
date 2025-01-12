export type { Post } from './model/types/Post';
export type { PostSchema } from './model/types/PostSchema';
export { PostActions, PostReducer } from './model/slice/PostSlice';
export { createPost } from './model/services/createPost';
export { getPostData, getPostIsLoading, getPostError } from './model/selectors/PostSelectors';

export { PostsList } from './ui/PostsList/PostsList';
