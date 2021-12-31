import React from 'react';
import { Redirect, Route } from 'react-router';
import Auth from './Auth';

export const ProctedRoute = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={
            (props) => {
                if (Auth.isAuthenticated()) {
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to={
                        {
                            pathname: "/signin",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    );
};