import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const RequireAuth = ({allowedRoles}) => {
  
    const { isAuthenticated, user, loading, loadUser } = useAuth();
    const location = useLocation();

    let roleAccessPermission = false;

    
    if (!loading && user ) {
        console.log(user);
        roleAccessPermission = allowedRoles.includes(user.Role);
        console.log({ roleAccessPermission });
        allowedRoles.forEach(element => {
            console.log({element});
        });
    }

    useEffect(() => {
        loadUser()
    }, []);
  
    return (
        loading ? "Loading"
            :isAuthenticated && roleAccessPermission
                ? <Outlet />
                :<Navigate to='/login'/>
        // loading ? <Loading /> :
        //     !roleAccessPermission
        //         ? <Navigate to='/unauth' state={{ from: location }} replace />
        //         : isAuthenticated
        //             ? <Outlet />
        //             : <Navigate to='/login' state={{ from: location }} replace />
        // loading ? <Loading />
        //     :isAuthenticated && roleAccessPermission
        //         ? <Outlet />
        //         : isAuthenticated
        //             ? <Navigate to='/unauth' state={{ from: location }} replace />
        //             : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth