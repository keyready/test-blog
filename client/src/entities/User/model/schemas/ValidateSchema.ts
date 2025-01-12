import { object, ObjectSchema, string } from 'yup';

import { User } from '../types/User';

export type UserLoginSchema = Omit<User, 'id' | 'firstname' | 'lastname' | 'created_at'>;

export type UserSignupSchema = Omit<User, 'id' | 'created_at'>;

export const LoginValidationSchema: ObjectSchema<UserLoginSchema> = object({
    password: string()
        .required('Это обязательное поле')
        .matches(
            /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
            'Пароль может содержать только латинские буквы, цифры и специальные символы',
        )
        .min(8, 'Минимальная длина пароля - 8 символов'),
    username: string()
        .required('Это обязательное поле')
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'Используйте только латинские буквы, цифры и знак подчеркивания',
        ),
});

export const SignupValidationSchema: ObjectSchema<UserSignupSchema> = object({
    password: string()
        .required('Это обязательное поле')
        .matches(
            /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
            'Пароль может содержать только латинские буквы, цифры и специальные символы',
        )
        .min(8, 'Минимальная длина пароля - 8 символов'),
    lastname: string()
        .required('Это обязательное поле')
        .matches(/^[а-яА-Я]*$/, 'Фамилия может содержать только кириллицу'),
    firstname: string()
        .required('Это обязательное поле')
        .matches(/^[а-яА-Я]*$/, 'Имя может содержать только кириллицу'),
    username: string()
        .required('Это обязательное поле')
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'Используйте только латинские буквы, цифры и знак подчеркивания',
        ),
});
