import { Divider } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Post } from '../../model/types/Post';

import { classNames } from '@/shared/lib/classNames';
import { TextEditorPreview } from '@/widgets/TextEditor';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { getUserData } from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig';

interface PostCardProps {
    className?: string;
    post: Post;
}

export const PostCard = (props: PostCardProps) => {
    const { className, post } = props;

    const userData = useSelector(getUserData);
    const location = useLocation();
    const navigate = useNavigate();

    const [isHidden, setIsHidden] = useState<boolean>(true);

    const handleEditPostPress = useCallback(() => {
        navigate(`${RoutePath.post_edit + post.id}/edit`);
    }, [navigate]);

    return (
        <VStack
            gap="12px"
            maxW
            className={classNames('bg-default-800 p-5 rounded-md', {}, [className])}
        >
            <HStack justify="between" maxW>
                <VStack>
                    <h1 className="text-m">
                        {post.user.firstname}
                        {' <'}
                        <i>{post.user.username}</i>
                        {'> '}
                        {post.user.lastname}
                    </h1>
                    <h1 className="text-l font-bold">{post.title}</h1>
                </VStack>
                <h2>
                    {new Date(post.createdAt).toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </h2>
            </HStack>
            <Divider className="bg-default-200 h-0.5 rounded-md" />
            <TextEditorPreview
                className={isHidden ? 'h-40 overflow-hidden opacity-20' : ''}
                content={post.body}
            />
            <Divider className="bg-default-200 h-0.5 rounded-md" />
            <HStack justify="end" maxW>
                {userData?.id === post.user.id && location.pathname === RoutePath.own_posts && (
                    <Button color="warning" className="self-end" onPress={handleEditPostPress}>
                        Редактировать
                    </Button>
                )}
                <Button
                    color={isHidden ? 'success' : 'warning'}
                    className="self-end"
                    onPress={() => setIsHidden((ps) => !ps)}
                >
                    {isHidden ? 'Читать полностью...' : 'Скрыть'}
                </Button>
            </HStack>
        </VStack>
    );
};
