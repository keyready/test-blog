import { Suspense, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames';
import { AppRouter } from '@/app/providers/AppRouter';
import { Toaster } from '@/widgets/Toaster';
import { Navbar } from '@/widgets/Navbar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserDataService } from '@/entities/User';
import { USER_ACCESS_TOKEN } from '@/shared/const';

export const App = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem(USER_ACCESS_TOKEN);
        if (token) {
            dispatch(getUserDataService());
        }
    }, [dispatch]);

    return (
        <NextUIProvider navigate={navigate}>
            <div className={classNames('app', {}, [])}>
                <Suspense fallback="">
                    <Navbar />
                    <AppRouter />
                    <Toaster />
                </Suspense>
            </div>
        </NextUIProvider>
    );
};
