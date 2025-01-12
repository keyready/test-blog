import { useNavigate } from 'react-router-dom';
import { MutableRefObject, useCallback, useRef, useState } from 'react';

import { PostCard } from '../PostCard/PostCard';
import { PostsApiProps, usePosts } from '../../api/PostApi';
import { FiltersBlock } from '../FiltersBlock/FiltersBlock';

import { classNames } from '@/shared/lib/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { RoutePath } from '@/shared/config/routeConfig';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';

interface PostsListProps {
    className?: string;
}

export const PostsList = (props: PostsListProps) => {
    const { className } = props;

    const navigate = useNavigate();

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const [filters, setFilters] = useState<PostsApiProps>({ page: 1 });

    const {
        data: posts,
        isLoading: isPostsLoading,
        isFetching: isPostsFetching,
    } = usePosts(filters, {
        refetchOnMountOrArgChange: true,
    });

    const handleLoadMorePosts = useCallback(() => {
        if (posts?.hasMore) {
            setFilters((ps) => ({
                ...ps,
                page: ps.page + 1,
            }));
        }
    }, [posts]);

    useInfiniteScroll({
        callback: handleLoadMorePosts,
        triggerRef,
        wrapperRef,
    });

    if (!posts?.posts.length && !isPostsLoading) {
        return (
            <VStack maxW>
                <FiltersBlock filters={filters} onFiltersChange={setFilters} />

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
        <VStack
            ref={wrapperRef}
            gap="24px"
            maxW
            className={classNames('relative', {}, [className])}
        >
            <FiltersBlock filters={filters} onFiltersChange={setFilters} />

            {posts?.posts.map((post) => (
                <PostCard post={post} key={post.id} />
            ))}

            {(isPostsLoading || isPostsFetching) &&
                new Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton width="100%" height={300} rounded="12px" key={index} />
                    ))}

            <div className="w-full h-1" ref={triggerRef} />
        </VStack>
    );
};
