import {
    RiAlignCenter,
    RiAlignJustify,
    RiAlignLeft,
    RiAlignRight,
    RiBold,
    RiCodeBlock,
    RiDoubleQuotesL,
    RiH1,
    RiH2,
    RiH3,
    RiItalic,
    RiListOrdered,
    RiListUnordered,
    RiStrikethrough,
} from '@remixicon/react';
import { Editor } from '@tiptap/react';
import { Tooltip } from '@nextui-org/react';

export const TextEditorToolbar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="control-group">
            <div className="button-group">
                <Tooltip content="Большой заголовок">
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        <RiH1 />
                    </button>
                </Tooltip>
                <Tooltip content="Средний заголовок">
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        <RiH2 />
                    </button>
                </Tooltip>
                <Tooltip content="Обычный текст">
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                    >
                        <RiH3 />
                    </button>
                </Tooltip>
            </div>

            <div className="button-group">
                <Tooltip content="Выравнивание: слева">
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                    >
                        <RiAlignLeft />
                    </button>
                </Tooltip>
                <Tooltip content="Выравнивание: по центру">
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                    >
                        <RiAlignCenter />
                    </button>
                </Tooltip>
                <Tooltip content="Выравнивание: справа">
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                    >
                        <RiAlignRight />
                    </button>
                </Tooltip>
                <Tooltip content="Выравнивание: по ширине">
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                    >
                        <RiAlignJustify />
                    </button>
                </Tooltip>
            </div>

            <div className="button-group">
                <Tooltip content="Жирный">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        <RiBold />
                    </button>
                </Tooltip>
                <Tooltip content="Курсив">
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        <RiItalic />
                    </button>
                </Tooltip>
                <Tooltip content="Зачеркнутый">
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                        <RiStrikethrough />
                    </button>
                </Tooltip>
            </div>

            <div className="button-group">
                <Tooltip content="Ненумерованный список">
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        <RiListUnordered />
                    </button>
                </Tooltip>
                <Tooltip content="Нумерованный список">
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        <RiListOrdered />
                    </button>
                </Tooltip>
            </div>

            <div className="button-group">
                <Tooltip content="Цитата">
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? 'is-active' : ''}
                    >
                        <RiDoubleQuotesL />
                    </button>
                </Tooltip>
                <Tooltip content="Код">
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'is-active' : ''}
                    >
                        <RiCodeBlock />
                    </button>
                </Tooltip>
            </div>

            <div className="button-group">
                <Tooltip content="Текст: белый">
                    <button
                        onClick={() => editor.chain().focus().setColor('#fff').run()}
                        className={
                            editor.isActive('textStyle', { color: '#fff' }) ? 'is-active' : ''
                        }
                    >
                        <div className="bg-black text-white h-5 w-5 rounded-md">T</div>
                    </button>
                </Tooltip>
                <Tooltip content="Текст: черный">
                    <button
                        onClick={() => editor.chain().focus().setColor('#000').run()}
                        className={
                            editor.isActive('textStyle', { color: '#000' }) ? 'is-active' : ''
                        }
                    >
                        <div className="bg-white text-black h-5 w-5 rounded-md">T</div>
                    </button>
                </Tooltip>
                <Tooltip content="Текст: фиолетовый">
                    <button
                        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                        className={
                            editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''
                        }
                    >
                        <div className="bg-black text-[#958DF1] h-5 w-5 rounded-md">T</div>
                    </button>
                </Tooltip>
                <Tooltip content="Текст: красный">
                    <button
                        onClick={() => editor.chain().focus().setColor('#F98181').run()}
                        className={
                            editor.isActive('textStyle', { color: '#F98181' }) ? 'is-active' : ''
                        }
                    >
                        <div className="bg-black text-[#F98181] h-5 w-5 rounded-md">T</div>
                    </button>
                </Tooltip>
            </div>

            <div className="button-group">
                <Tooltip content="Фон: оранжевый">
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()
                        }
                        className={
                            editor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''
                        }
                    >
                        <div className="bg-[#ffc078] h-5 w-5 rounded-md" />
                    </button>
                </Tooltip>
                <Tooltip content="Фон: красный">
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleHighlight({ color: 'red' }).run()
                        }
                        className={
                            editor.isActive('highlight', { color: 'red' }) ? 'is-active' : ''
                        }
                    >
                        <div className="bg-[red] h-5 w-5 rounded-md" />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};
