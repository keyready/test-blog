import { Modal, ModalContent } from '@nextui-org/react';
import { useCallback, useEffect } from 'react';

import { classNames } from '@/shared/lib/classNames';
import { TextEditor } from '@/widgets/TextEditor';
import { createPost } from '@/entities/Post/model/services/createPost';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface CreatePostModalProps {
    className?: string;
    isModalOpened: boolean;
    setIsModalOpened: (state: boolean) => void;
}

export const CreatePostModal = (props: CreatePostModalProps) => {
    const { className, setIsModalOpened, isModalOpened } = props;

    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleCloseWindow = (ev: BeforeUnloadEvent) => {
            ev.preventDefault();
        };

        window.addEventListener('beforeunload', handleCloseWindow);

        return () => {
            window.removeEventListener('beforeunload', handleCloseWindow);
        };
    }, []);

    const handleSavePost = useCallback(
        async (content: FormData) => {
            await dispatch(createPost(content));
        },
        [dispatch],
    );

    return (
        <Modal
            size="5xl"
            scrollBehavior="outside"
            isOpen={isModalOpened}
            onClose={() => {
                const result = confirm('Введенные Вами данные не сохранятся!');
                if (result) {
                    setIsModalOpened(false);
                }
            }}
        >
            <ModalContent className={classNames('bg-main-bg p-5', {}, [className])}>
                <h1 className="text-white text-2xl font-bold">Создание статьи</h1>
                <p className="italic text-l text-white text-opacity-70 mb-7 ">
                    Расскажите всем, что Вы думаете! Публикуйте свои мысли, наработки или просто
                    забавные истории!
                </p>
                <TextEditor onSave={handleSavePost} />
            </ModalContent>
        </Modal>
    );
};
