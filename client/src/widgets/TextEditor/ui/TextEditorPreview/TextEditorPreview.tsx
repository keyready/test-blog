import '../TextEditor.scss';
import { classNames } from '@/shared/lib/classNames';

export const TextEditorPreview = ({
    content,
    className,
}: {
    content: string;
    className?: string;
}) => (
    <div
        className={classNames('tiptap preview', {}, [className])}
        dangerouslySetInnerHTML={{ __html: content }}
    />
);
