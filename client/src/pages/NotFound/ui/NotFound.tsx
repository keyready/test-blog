import React from 'react';

import classes from './NotFound.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { RoutePath } from '@/shared/config/routeConfig';

interface NotFoundProps {
    className?: string;
}

export const NotFound = ({ className }: NotFoundProps) => (
    <Page className={classNames(classes.page, {}, [className])}>
        <VStack maxH align="center" justify="center" maxW gap="8px">
            <VStack gap="12px" align="center" className={classes.NotFound}>
                <h1 className="text-white text-2xl text-center font-bold">
                    Запрашиваемый ресурс не найден
                </h1>
                <AppLink className="text-white text-l" to={RoutePath.main}>
                    Вернитесь на главную страницу
                </AppLink>
            </VStack>
        </VStack>
    </Page>
);
