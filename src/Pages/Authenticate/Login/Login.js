import { Container, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import login from '../../../media/banner/xps-Qrjx2nTBHVo-unsplash.jpg'
import { NavLink, useLocation, useHistory, Link } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';
import { Box } from '@mui/system';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, signInWithGoogle, isLoading, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();
    // console.log(location, history);

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history)
    }
    return (
        <Container>
            <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h4" gutterBottom>Login</Typography>
                        {isLoading && <CircularProgress />}
                    </Box>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onChange={handleOnChange}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic2"
                            label="Your Password"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            variant="standard" />

                        <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Login</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/register">
                            <Button variant="text">New User? Please Register</Button>
                        </NavLink>
                        {user?.email && <Alert severity="success">Login successfully!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </form>
                    <hr /> <br />
                    <Box sx={{ display: 'flex', flexBasis: 3, flexDirection: 'column', width: '75%', mx: 'auto' }}>
                        <Button onClick={handleGoogleSignIn} variant="contained">Google Sign In</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={login} alt="" />
                </Grid>
            </Grid>
            <Link to='/' style={{ textDecoration: 'none' }}><Button sx={{ mt: 5 }} variant='contained'>Go Home</Button></Link> <br />
        </Container>
    );
};

export default Login;