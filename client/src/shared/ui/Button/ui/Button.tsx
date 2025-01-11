import { Button as NextButton, ButtonProps } from '@nextui-org/react';

import { classNames } from '@/shared/lib/classNames';

export const Button = (props: ButtonProps) => {
    const { className, children } = props;

    return (
        <NextButton
            type={props.type}
            {...props}
            className={classNames('py-2 px-5 h-fit rounded-md', {}, [className])}
        >
            {children}
        </NextButton>
    );
};
