import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';

import { LoginValidationSchema, UserLoginSchema } from '../../model/schemas/ValidateSchema';
import { loginUser } from '../../model/services/authServices/loginUser';
import { getUserError, getUserIsLoading } from '../../model/selectors/UserSelectors';

import { Input } from '@/shared/ui/Input';
import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface LoginFormProps {
    className?: string;
    onChangeAuth: () => void;
    onSuccess: () => void;
}

export const LoginForm = (props: LoginFormProps) => {
    const { className, onSuccess, onChangeAuth } = props;

    const dispatch = useAppDispatch();

    const isUserLoading = useSelector(getUserIsLoading);
    const userLoginError = useSelector(getUserError);

    const {
        handleSubmit,
        formState: { errors, isValid },
        control,
    } = useForm<UserLoginSchema>({
        mode: 'onChange',
        resolver: yupResolver(LoginValidationSchema),
    });

    const handleSignupPress = useCallback(() => {
        onChangeAuth();
    }, [onChangeAuth]);

    const handleFormSubmit = useCallback(
        async (user: UserLoginSchema) => {
            const result = await dispatch(loginUser(user));

            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess();
            }
        },
        [dispatch, onSuccess],
    );

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={classNames('', {}, [className])}>
            <VStack gap="12px" maxW>
                <h1 className="text-default-200 text-l font-bold">
                    Авторизуйтесь, что мы Вас узнали!
                </h1>
                <Controller
                    control={control}
                    render={({ field }) => (
                        <Input
                            isDisabled={isUserLoading}
                            isInvalid={!!errors.username}
                            errorMessage={errors.username?.message}
                            value={field.value}
                            onValueChange={(val) => field.onChange(val)}
                            isRequired
                            label="Имя пользователя"
                        />
                    )}
                    name="username"
                />
                <Controller
                    control={control}
                    render={({ field }) => (
                        <Input
                            isDisabled={isUserLoading}
                            isInvalid={!!errors.password?.message}
                            errorMessage={errors.password?.message}
                            value={field.value}
                            onValueChange={(val) => field.onChange(val)}
                            isRequired
                            label="Пароль"
                        />
                    )}
                    name="password"
                />

                {userLoginError && <p className="text-danger">{userLoginError}</p>}

                <HStack maxW justify="end">
                    <Button isDisabled={isUserLoading} onPress={handleSignupPress} type="button">
                        Впервые у нас?
                    </Button>
                    <Button
                        color="success"
                        isLoading={isUserLoading}
                        type="submit"
                        isDisabled={!isValid}
                    >
                        {isUserLoading ? 'Ожидайте...' : 'Войти!'}
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
};
