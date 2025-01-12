import { Divider } from '@nextui-org/react';
import { useState } from 'react';

import { Post } from '../../model/types/Post';

import { classNames } from '@/shared/lib/classNames';
import { TextEditorPreview } from '@/widgets/TextEditor';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';

interface PostCardProps {
    className?: string;
    post: Post;
}

export const PostCard = (props: PostCardProps) => {
    const { className, post } = props;

    const [isHidden, setIsHidden] = useState<boolean>(true);

    return (
        <VStack
            gap="12px"
            maxW
            className={classNames('bg-default-800 p-5 rounded-md', {}, [className])}
        >
            <HStack justify="between" maxW>
                <VStack>
                    <h1 className="text-m">{post.user.username}</h1>
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
            <Button
                color={isHidden ? 'success' : 'warning'}
                className="self-end"
                onPress={() => setIsHidden((ps) => !ps)}
            >
                {isHidden ? 'Читать полностью...' : 'Скрыть'}
            </Button>
        </VStack>
    );
};
