import { RouteProps } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import { NotFound } from '@/pages/NotFound';
import { CreatePostPage } from '@/pages/CreatePostPage';
import { LoadingPage } from '@/pages/LoadingPage';
import { OwnPostsPage } from '@/pages/OwnPostsPage';
import { EditPostPage } from '@/pages/EditPostPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    CRETE_POST = 'create_post',
    LOADING = 'loading',
    OWN_POSTS = 'own_posts',
    POST_EDIT = 'post_edit',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CRETE_POST]: '/posts/create',
    [AppRoutes.LOADING]: '/auth/welcome/again',
    [AppRoutes.OWN_POSTS]: '/posts/my',
    [AppRoutes.POST_EDIT]: '/posts/',

    // last
    [AppRoutes.NOT_FOUND]: '/*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    // авторизация
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.LOADING]: {
        path: RoutePath.loading,
        element: <LoadingPage />,
    },

    [AppRoutes.CRETE_POST]: {
        path: RoutePath.create_post,
        element: <CreatePostPage />,
        authOnly: true,
    },
    [AppRoutes.OWN_POSTS]: {
        path: RoutePath.own_posts,
        element: <OwnPostsPage />,
        authOnly: true,
    },
    [AppRoutes.POST_EDIT]: {
        path: `${RoutePath.post_edit}:id/edit`,
        element: <EditPostPage />,
        authOnly: true,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
