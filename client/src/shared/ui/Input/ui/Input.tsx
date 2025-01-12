import { Input as NextInput, InputProps } from '@nextui-org/react';

import { classNames } from '@/shared/lib/classNames';

export const Input = (props: InputProps) => {
    const { className } = props;

    return (
        <NextInput
            className={classNames('', {}, [className])}
            classNames={{
                label: 'text-default-100 group-data-[filled-within]:text-default-400 group-data-[focus=true]:text-default-400',
                inputWrapper:
                    'text-white bg-default group-data-[focus=true]:bg-default-700 data-[hover=true]:bg-default-500',
            }}
            {...props}
        />
    );
};
