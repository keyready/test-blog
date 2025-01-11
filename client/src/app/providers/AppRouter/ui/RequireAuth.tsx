import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUserData } from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig';

interface RequireAuthProps {
    children: JSX.Element;
}
export function RequireAuth({ children }: RequireAuthProps) {
    const userData = useSelector(getUserData);

    const currentLocation = useLocation();

    if (!userData) {
        return <Navigate to={RoutePath.main} state={{ from: currentLocation }} replace />;
    }

    return children;
}
