import {
    RiAlignCenter,
    RiAlignJustify,
    RiAlignLeft,
    RiAlignRight,
    RiBold,
    RiItalic,
    RiStrikethrough,
} from '@remixicon/react';
import { Editor, FloatingMenu } from '@tiptap/react';
import '../TextEditor.scss';

export const TextEditorFloatingMenu = ({ editor }: { editor: Editor }) => (
    <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <div className="control-group">
            <div className="floating-button-group">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <RiBold size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <RiItalic size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    <RiStrikethrough size={16} />
                </button>
            </div>

            <div className="flex flex-row w-full">
                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                >
                    <RiAlignLeft size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                >
                    <RiAlignCenter size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                >
                    <RiAlignRight size={16} />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                >
                    <RiAlignJustify size={16} />
                </button>
            </div>
        </div>
    </FloatingMenu>
);
