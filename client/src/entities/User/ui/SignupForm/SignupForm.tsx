import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
    SignupValidationSchema,
    UserLoginSchema,
    UserSignupSchema,
} from '../../model/schemas/ValidateSchema';
import { signupUser } from '../../model/services/authServices/signupUser';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserError, getUserIsLoading } from '@/entities/User';

interface SignupFormProps {
    className?: string;
    onChangeAuth: () => void;
    onSuccess: () => void;
}

export const SignupForm = (props: SignupFormProps) => {
    const { className, onChangeAuth, onSuccess } = props;

    const dispatch = useAppDispatch();

    const isUserLoading = useSelector(getUserIsLoading);
    const userLoginError = useSelector(getUserError);

    const {
        handleSubmit,
        formState: { errors, isValid },
        control,
    } = useForm<UserSignupSchema>({
        mode: 'onChange',
        resolver: yupResolver(SignupValidationSchema),
    });

    const handleLoginPress = useCallback(() => {
        onChangeAuth();
    }, [onChangeAuth]);

    const handleFormSubmit = useCallback(
        async (user: UserLoginSchema) => {
            const result = await dispatch(signupUser(user));

            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess();
            }
        },
        [dispatch, onSuccess],
    );

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={classNames('', {}, [className])}>
            <VStack gap="12px" maxW>
                <h1 className="text-default-200 text-l font-bold">Создадим учетную запись?</h1>
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
                <Controller
                    control={control}
                    render={({ field }) => (
                        <Input
                            isDisabled={isUserLoading}
                            isInvalid={!!errors.firstname?.message}
                            errorMessage={errors.firstname?.message}
                            value={field.value}
                            onValueChange={(val) => field.onChange(val)}
                            isRequired
                            label="Имя"
                        />
                    )}
                    name="firstname"
                />
                <Controller
                    control={control}
                    render={({ field }) => (
                        <Input
                            isDisabled={isUserLoading}
                            isInvalid={!!errors.lastname?.message}
                            errorMessage={errors.lastname?.message}
                            value={field.value}
                            onValueChange={(val) => field.onChange(val)}
                            isRequired
                            label="Фамилия"
                        />
                    )}
                    name="lastname"
                />

                {userLoginError && <p className="text-danger">{userLoginError}</p>}

                <HStack maxW justify="end">
                    <Button isDisabled={isUserLoading} onPress={handleLoginPress} type="button">
                        Я тут уже бывал...
                    </Button>
                    <Button
                        isLoading={isUserLoading}
                        color="success"
                        type="submit"
                        isDisabled={!isValid}
                    >
                        {isUserLoading ? 'Ожидайте...' : 'Зарегистрироваться!'}
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
};
