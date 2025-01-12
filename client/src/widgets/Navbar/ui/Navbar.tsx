import { useState } from 'react';

import classes from './Navbar.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { RoutePath } from '@/shared/config/routeConfig';
import { AuthModal } from '@/entities/User/ui/AuthModal/AuthModal';
import { Button } from '@/shared/ui/Button';

interface NavbarProps {
    className?: string;
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props;

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    return (
        <HStack
            className={classNames(classes.Navbar, {}, [className])}
            align="center"
            justify="between"
            gap="64px"
        >
            <AppLink to={RoutePath.main}>FSD App</AppLink>
            <Button onPress={() => setIsModalOpened(true)}>Login</Button>
            <AuthModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />
        </HStack>
    );
};
