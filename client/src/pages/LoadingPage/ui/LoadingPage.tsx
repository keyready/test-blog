import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import classes from './LoadingPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { getUserData, getUserIsLoading } from '@/entities/User';
import { USER_ACCESS_TOKEN } from '@/shared/const';
import { VStack } from '@/shared/ui/Stack';
import { RoutePath } from '@/shared/config/routeConfig';

interface LoadingPageProps {
    className?: string;
}

const LoadingPage = memo((props: LoadingPageProps) => {
    const { className } = props;

    const location = useLocation();
    const isUserLoading = useSelector(getUserIsLoading);
    const userData = useSelector(getUserData);

    if (localStorage.getItem(USER_ACCESS_TOKEN) && isUserLoading) {
        return (
            <Page className={classNames(classes.LoginPage, {}, [className, 'justify-center'])}>
                <VStack maxW align="center" justify="center" gap="24px">
                    <h1 className="text-2xl text-main leading-none">
                        Пытаемся вас авторизовать...
                    </h1>
                </VStack>
            </Page>
        );
    }

    if (userData) {
        let originLocation = '';
        if (location.state?.from) {
            const { pathname, search } = location.state.from;
            originLocation = pathname + search;
        }
        return <Navigate to={originLocation || RoutePath.main} />;
    }

    return <Navigate to={RoutePath.main} />;
});

export default LoadingPage;
