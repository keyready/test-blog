import '../TextEditor.scss';

import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Image from '@tiptap/extension-image';
import FileHandler from '@tiptap-pro/extension-file-handler';
import Paragraph from '@tiptap/extension-paragraph';
import Blockquote from '@tiptap/extension-blockquote';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Video } from '../../extensions/video';
import { TextEditorToolbar } from '../TextEditorToolbar/TextEditorToolbar';
import { TextEditorFloatingMenu } from '../TextEditorFloatingMenu/TextEditorFloatingMenu';

import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Post } from '@/entities/Post';

const CustomDocument = Document.extend({
    content: 'heading block*',
});

interface TextEditorProps {
    onSave: (content: FormData) => void;
    defaultContent?: Post;
    isLoading?: boolean;
}

export const TextEditor = (props: TextEditorProps) => {
    const { onSave, isLoading = false, defaultContent } = props;

    const [postTitle, setPostTitle] = useState<string>(defaultContent?.title || '');

    const editor = useEditor({
        extensions: [
            CustomDocument,
            Paragraph,
            Color,
            TextStyle,
            Blockquote,
            Text,
            Code,
            Typography,
            CodeBlock,
            Image,
            Video,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            StarterKit.configure({
                document: false,
            }),

            FileHandler.configure({
                // allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
                onDrop: (currentEditor: Editor, files, pos) => {
                    files.forEach((file) => {
                        const fileReader = new FileReader();

                        fileReader.readAsDataURL(file);
                        fileReader.onload = () => {
                            currentEditor
                                .chain()
                                .insertContentAt(pos, {
                                    type: 'image',
                                    attrs: {
                                        src: fileReader.result,
                                    },
                                })
                                .focus()
                                .run();
                        };
                    });
                },
                onPaste: (currentEditor, files, htmlContent) => {
                    files.forEach((file) => {
                        if (htmlContent) {
                            return false;
                        }

                        const fileReader = new FileReader();

                        fileReader.readAsDataURL(file);
                        fileReader.onload = () => {
                            currentEditor
                                .chain()
                                .insertContentAt(currentEditor.state.selection.anchor, {
                                    type: 'image',
                                    attrs: {
                                        src: fileReader.result,
                                    },
                                })
                                .focus()
                                .run();
                        };
                    });
                },
            }),

            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                        return 'О чем напишем сегодня?';
                    }

                    return 'Отлично! А теперь подробнее...';
                },
            }),
        ],
        content: defaultContent?.body || '',
    });

    useEffect(() => {
        if (!editor) {
            return undefined;
        }

        editor.setEditable(!isLoading);
    }, [editor, isLoading]);

    const isButtonDisabled = useMemo(
        () => !editor?.getText().length || !postTitle,
        [editor?.getText(), postTitle],
    );

    const handleSaveClick = useCallback(async () => {
        if (!editor) return;

        const content = editor.getHTML();
        const formData = new FormData();

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const images = doc.querySelectorAll('img');
        const videos = doc.querySelectorAll('video');

        const files: { element: HTMLImageElement | HTMLVideoElement; file: File }[] = [];

        images.forEach((img, index) => {
            if (img.src.includes('/static/')) return;

            const base64Data = img.src.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteArrays = new Uint8Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i += 1) {
                byteArrays[i] = byteCharacters.charCodeAt(i);
            }

            const blob = new Blob([byteArrays], { type: img.src.split(':')[1].split(';')[0] });
            const file = new File([blob], `image-${index}.png`, { type: blob.type });
            files.push({ element: img, file });
        });

        videos.forEach((video, index) => {
            if (video.src.includes('/static/')) return;

            const base64Data = video.src.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteArrays = new Uint8Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i += 1) {
                byteArrays[i] = byteCharacters.charCodeAt(i);
            }

            const blob = new Blob([byteArrays], { type: video.src.split(':')[1].split(';')[0] });
            const file = new File([blob], `video-${index}.mp4`, { type: blob.type });
            files.push({ element: video, file });
        });

        files.forEach(({ element, file }, index) => {
            element.src = `/static/${file.name}`;
            formData.append(`files`, file);
        });

        formData.append('body', doc.body.innerHTML);
        formData.append('title', postTitle);

        onSave(formData);
    }, [editor?.getHTML(), onSave, editor, postTitle]);

    return (
        <VStack maxW gap="12px">
            <Input
                isRequired
                value={postTitle}
                onValueChange={setPostTitle}
                label="Название статьи"
                className="mb-10"
            />
            <TextEditorToolbar editor={editor} />
            <EditorContent className="w-full" editor={editor} />
            {editor && <TextEditorFloatingMenu editor={editor} />}
            <Button isDisabled={isButtonDisabled} onPress={handleSaveClick} className="self-end">
                {defaultContent ? 'Сохранить!' : 'Опубликовать!'}
            </Button>
        </VStack>
    );
};
