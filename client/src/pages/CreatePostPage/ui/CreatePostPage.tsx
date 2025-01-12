import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './CreatePostPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { TextEditor } from '@/widgets/TextEditor';
import { VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { createPost } from '@/entities/Post';
import { toastDispatch } from '@/widgets/Toaster';
import { RoutePath } from '@/shared/config/routeConfig';

interface CreatePostPageProps {
    className?: string;
}

const CreatePostPage = memo((props: CreatePostPageProps) => {
    const { className } = props;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleCloseWindow = (ev: BeforeUnloadEvent) => {
            ev.preventDefault();
        };
        document.title = 'Создание поста';

        window.addEventListener('beforeunload', handleCloseWindow);

        return () => {
            window.removeEventListener('beforeunload', handleCloseWindow);
        };
    }, []);

    const handleSavePost = useCallback(
        async (content: FormData) => {
            const result = await toastDispatch(dispatch(createPost(content)), {
                error: 'Что-то сломалось(',
                loading: 'Отправляем на сервер...',
                success: 'Статья опубликована!',
            });

            if (result.meta.requestStatus === 'fulfilled') {
                navigate(RoutePath.main);
            }
        },
        [dispatch, navigate],
    );

    return (
        <Page className={classNames(classes.CreatePostPage, {}, [className])}>
            <VStack maxW>
                <h1 className="text-white text-2xl font-bold">Создание статьи</h1>
                <p className="italic text-l text-white text-opacity-70 mb-7 ">
                    Расскажите всем, что Вы думаете! Публикуйте свои мысли, наработки или просто
                    забавные истории!
                </p>
                <TextEditor onSave={handleSavePost} />
            </VStack>
        </Page>
    );
});

export default CreatePostPage;
