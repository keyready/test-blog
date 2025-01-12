import { Modal, ModalContent } from '@nextui-org/react';
import { useCallback, useState } from 'react';

import { LoginForm } from '../LoginForm/LoginForm';
import { SignupForm } from '../SignupForm/SignupForm';
import { UserActions } from '../../model/slice/UserSlice';

import { classNames } from '@/shared/lib/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface AuthModalProps {
    className?: string;
    isModalOpened: boolean;
    setIsModalOpened: (state: boolean) => void;
}

export const AuthModal = (props: AuthModalProps) => {
    const { className, setIsModalOpened, isModalOpened } = props;

    const dispatch = useAppDispatch();

    const [isLoginActive, setIsLoginActive] = useState<boolean>(true);

    const handleChangeAuthType = useCallback(() => {
        setIsLoginActive((ps) => !ps);
        dispatch(UserActions.clearAuthError());
    }, [dispatch]);

    const handleSuccessAuth = useCallback(() => {
        if (isLoginActive) {
            setIsModalOpened(false);
        } else {
            setIsLoginActive(true);
        }
    }, [isLoginActive]);

    return (
        <Modal
            size="4xl"
            isOpen={isModalOpened}
            onClose={() => setIsModalOpened(false)}
            className={classNames('', {}, [className])}
        >
            <ModalContent className="bg-default-800 p-5">
                {isLoginActive ? (
                    <LoginForm onSuccess={handleSuccessAuth} onChangeAuth={handleChangeAuthType} />
                ) : (
                    <SignupForm onSuccess={handleSuccessAuth} onChangeAuth={handleChangeAuthType} />
                )}
            </ModalContent>
        </Modal>
    );
};
