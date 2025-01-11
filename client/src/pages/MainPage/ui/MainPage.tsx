import classes from './MainPage.module.scss';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames';
import { PostsList } from '@/entities/Post';

export const MainPage = () => (
    <Page className={classNames(classes.MainPage, {}, [])}>
        <PostsList />
    </Page>
);
