import '../TextEditor.scss';

export const TextEditorPreview = ({ content }: { content: string }) => (
    <div className="tiptap" dangerouslySetInnerHTML={{ __html: content }} />
);
