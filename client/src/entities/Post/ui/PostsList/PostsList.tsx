import { useNavigate } from 'react-router-dom';

import { PostCard } from '../PostCard/PostCard';
import { usePosts } from '../../api/PostApi';

import { classNames } from '@/shared/lib/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { RoutePath } from '@/shared/config/routeConfig';

interface PostsListProps {
    className?: string;
}

export const PostsList = (props: PostsListProps) => {
    const { className } = props;

    const navigate = useNavigate();

    const { data: posts, isLoading: isPostsLoading } = usePosts();

    if (isPostsLoading) {
        return (
            <VStack maxW gap="12px">
                {new Array(5).fill(0).map((_, index) => (
                    <Skeleton width="100%" height={300} rounded="12px" key={index} />
                ))}
            </VStack>
        );
    }

    if (!posts?.length) {
        return (
            <VStack maxW>
                <h1 className="text-xl">В блоге пока нет постов (</h1>
                <h2 className="text-l">Будьте первым!</h2>
                <Button
                    onPress={() => navigate(RoutePath.create_post)}
                    className="py-2 px-5 h-fit rounded-md"
                >
                    Рассказать всем!
                </Button>
            </VStack>
        );
    }

    return (
        <VStack gap="24px" maxW className={classNames('', {}, [className])}>
            {posts.map((post) => (
                <PostCard post={post} key={post.id} />
            ))}
        </VStack>
    );
};
