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
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

import { Video } from '../../extensions/video';
import { TextEditorToolbar } from '../TextEditorToolbar/TextEditorToolbar';
import { TextEditorFloatingMenu } from '../TextEditorFloatingMenu/TextEditorFloatingMenu';

const CustomDocument = Document.extend({
    content: 'heading block*',
});

export const TextEditor = () => {
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
        content: `
      <h1>
        Как я появился на свет?
      </h1>
      <p>
        Всем привет! Меня зовут Родион. Я прохожу собеседование на Middle React Developer
      </p>
    `,
    });

    useEffect(() => {
        console.log(editor?.getHTML());
    }, [editor?.getHTML()]);

    return (
        <>
            <TextEditorToolbar editor={editor} />
            <EditorContent editor={editor} />
            {editor && <TextEditorFloatingMenu editor={editor} />}
        </>
    );
};
