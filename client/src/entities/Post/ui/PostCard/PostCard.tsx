import { Post } from '../../model/types/Post';

import { classNames } from '@/shared/lib/classNames';
import { TextEditorPreview } from '@/widgets/TextEditor';

interface PostCardProps {
    className?: string;
    post: Post;
}

export const PostCard = (props: PostCardProps) => {
    const { className, post } = props;

    return (
        <div className={classNames('', {}, [className])}>
            <TextEditorPreview content={post.body} />
        </div>
    );
};
