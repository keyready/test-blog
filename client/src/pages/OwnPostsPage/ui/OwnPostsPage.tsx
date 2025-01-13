import { memo, useEffect } from 'react';

import classes from './OwnPostsPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { PostsList } from '@/entities/Post';
import { VStack } from '@/shared/ui/Stack';

interface OwnPostsPageProps {
    className?: string;
}

const OwnPostsPage = memo((props: OwnPostsPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Ваши публикации';
    }, []);

    return (
        <Page className={classNames(classes.OwnPostsPage, {}, [className])}>
            <VStack maxW gap="12px">
                <h1 className="text-2xl leading-8 font-bold italic">
                    Здесь Вы можете посмотреть и отредактировать свои публикации
                </h1>
                <PostsList own />
            </VStack>
        </Page>
    );
});

export default OwnPostsPage;
