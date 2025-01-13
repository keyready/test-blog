import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { PostsList } from '@/entities/Post';
import { VStack } from '@/shared/ui/Stack';

export const MainPage = () => (
    <Page className={classNames(classes.MainPage, {}, [])}>
        <VStack maxW gap="24px">
            <h1 className="text-2xl leading-8 font-bold italic">
                Платформа для авторов, созданная авторами
            </h1>
            <p className="text-l">Пишите, читайте, познавайте новое!</p>
            <PostsList />
        </VStack>
    </Page>
);
