import { RouteProps } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import { NotFound } from '@/pages/NotFound';
import { CreatePostPage } from '@/pages/CreatePostPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    CRETE_POST = 'create_post',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CRETE_POST]: '/post/create',

    // last
    [AppRoutes.NOT_FOUND]: '/*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    // авторизация
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.CRETE_POST]: {
        path: RoutePath.create_post,
        element: <CreatePostPage />,
        // authOnly: true,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
