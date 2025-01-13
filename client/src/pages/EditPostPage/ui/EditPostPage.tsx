import { memo, useCallback, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './EditPostPage.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { Page } from '@/widgets/Page';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getPost, getPostData, getPostError, getPostIsLoading } from '@/entities/Post';
import { TextEditor } from '@/widgets/TextEditor';
import { VStack } from '@/shared/ui/Stack';
import { RoutePath } from '@/shared/config/routeConfig';
import { Skeleton } from '@/shared/ui/Skeleton';
import { editPost } from '@/entities/Post/model/services/editPost';
import { deletePost } from '@/entities/Post/model/services/deletePost';
import { toastDispatch } from '@/widgets/Toaster';

interface EditPostPageProps {
    className?: string;
}

const EditPostPage = memo((props: EditPostPageProps) => {
    const { className } = props;

    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const post = useSelector(getPostData);
    const isPostLoading = useSelector(getPostIsLoading);
    const postError = useSelector(getPostError);

    useEffect(() => {
        document.title = 'Редактирование статьи';
    }, []);

    useEffect(() => {
        const getPostData = async () => {
            console.log(id);
            if (id) {
                await dispatch(getPost(id));
            }
        };

        getPostData();
    }, [id]);

    const handleSaveChanges = useCallback(
        async (post: FormData) => {
            if (id) {
                await dispatch(editPost({ post, id }));
            }
        },
        [dispatch, id],
    );

    const handleDeletePost = useCallback(async () => {
        if (id) {
            const result = await toastDispatch(dispatch(deletePost(id)), {
                loading: 'Удаляем...',
                success: 'Статья удалена',
                error: 'Что-то сломалось (',
            });

            if (result.meta.requestStatus === 'fulfilled') navigate(RoutePath.own_posts);
        }
    }, [id, dispatch, navigate]);

    if (isPostLoading) {
        return (
            <Page className={classNames(classes.EditPostPage, {}, [className])}>
                <VStack maxW gap="24px">
                    <h1 className="text-2xl leading-8 font-bold italic">
                        Редактирование публикации
                    </h1>
                    <Skeleton width="100%" height={50} className="mb-10" />
                    <Skeleton width="100%" height={40} />
                    <Skeleton width="100%" height={400} />
                </VStack>
            </Page>
        );
    }

    if (postError?.code === 403) {
        return (
            <Page className={classNames(classes.EditPostPage, {}, [className])}>
                <VStack justify="center" align="center" maxH maxW>
                    <h1 className="text-3xl leading-10 text-danger italic font-bold">
                        У вас нет прав для редактирования этой статьи
                    </h1>
                </VStack>
            </Page>
        );
    }

    if (postError?.code === 404) {
        return (
            <Page className={classNames(classes.EditPostPage, {}, [className])}>
                <Navigate to={RoutePath.not_found} />
            </Page>
        );
    }

    return (
        <Page className={classNames(classes.EditPostPage, {}, [className])}>
            <VStack maxW gap="24px">
                <h1 className="text-2xl leading-8 font-bold italic">Редактирование публикации</h1>
                <TextEditor
                    onDeletePost={handleDeletePost}
                    defaultContent={post}
                    onSave={handleSaveChanges}
                />
            </VStack>
        </Page>
    );
});

export default EditPostPage;
