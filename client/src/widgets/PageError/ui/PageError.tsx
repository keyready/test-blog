import { useNavigate } from 'react-router-dom';

import classes from './PageError.module.scss';

import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { TextButton } from '@/shared/ui/TextButton';
import { RoutePath } from '@/shared/config/routeConfig';

export const PageError = () => {
    const navigate = useNavigate();

    const reloadPage = () => {
        navigate(RoutePath.main);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <Page className={classes.PageError}>
            <VStack maxW maxH align="center" justify="center">
                <VStack className={classes.wrapper} align="center" justify="center">
                    <h1 className={classes.error500Title}>Ошибка клиентского приложения</h1>
                    <TextButton onClick={reloadPage} className="text-white">
                        Вернитесь на главную, и попробуйте снова
                    </TextButton>
                </VStack>
            </VStack>
        </Page>
    );
};
