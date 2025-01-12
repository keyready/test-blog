import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
} from '@nextui-org/react';

import classes from './Navbar.module.scss';

import { classNames } from '@/shared/lib/classNames';
import { HStack } from '@/shared/ui/Stack';
import { AppLink } from '@/shared/ui/AppLink';
import { RoutePath } from '@/shared/config/routeConfig';
import { AuthModal } from '@/entities/User/ui/AuthModal/AuthModal';
import { getUserData, getUserIsLoading, logoutService } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface NavbarProps {
    className?: string;
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();

    const userProfile = useSelector(getUserData);
    const isProfileFetching = useSelector(getUserIsLoading);

    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

    const handleLogout = useCallback(async () => {
        await dispatch(logoutService());
    }, [dispatch]);

    const renderButtonContent = useMemo(() => {
        if (userProfile?.username) {
            return (
                <HStack maxW>
                    <Image width={25} height={25} src="https://avatar.iran.liara.run/public" />
                    <p>{userProfile.firstname}</p>
                </HStack>
            );
        }

        return isProfileFetching ? 'Загрузка...' : 'Login';
    }, [userProfile, isProfileFetching]);

    return (
        <HStack
            className={classNames(classes.Navbar, {}, [className])}
            align="center"
            justify="between"
            gap="64px"
        >
            <AppLink to={RoutePath.main}>FSD App</AppLink>

            {userProfile?.username ? (
                <Dropdown className="relative">
                    <DropdownTrigger>
                        <Button>{renderButtonContent}</Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem href="/posts/my" key="my-posts">
                            Мои статьи
                        </DropdownItem>
                        <DropdownItem href={RoutePath.create_post} key="create-post">
                            Написать статью
                        </DropdownItem>
                        <DropdownItem
                            classNames={{
                                title: 'text-danger font-bold',
                                base: 'data-[hover=true]:bg-danger-300 bg-danger-100',
                            }}
                            key="logout"
                            onPress={handleLogout}
                        >
                            Выйти
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <Button onPress={() => setIsModalOpened(true)}>{renderButtonContent}</Button>
            )}
            <AuthModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />
        </HStack>
    );
};
