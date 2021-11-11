import { CircularProgress } from '@mui/material';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { user, admin, isLoading } = useAuth();
    if (isLoading) { return <CircularProgress /> }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email && admin ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/dashboard" || "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default AdminRoute;

/* 
REACT_APP_API_KEY=AIzaSyBDr_DHVIDODtjlq98NOnBIozbFdZybvhg
REACT_APP_AUTH_DOMAIN=assignment-12-f4b0d.firebaseapp.com
REACT_APP_PROJECT_ID=assignment-12-f4b0d
REACT_APP_STORAGE_BUCKET=assignment-12-f4b0d.appspot.com
REACT_APP_MESSAGING_SENDER_ID=697851709
REACT_APP_APP_ID=1:697851709:web:23ff342eea0a41bc422f54
*/