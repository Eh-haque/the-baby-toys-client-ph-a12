import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import useAuth from '../../../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={auth}
                            onChange={handleChange}
                            aria-label="login switch"
                        />
                    }
                    label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup> */}
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Baby Care
                    </Typography>
                    <Link style={{ textDecoration: 'none' }} to="/home"><Button sx={{ color: 'white' }} variant="text">Home</Button></Link>
                    <Link style={{ textDecoration: 'none' }} to="/explore"><Button sx={{ color: 'white' }} variant="text">Explore</Button></Link>

                    {user.email && (
                        <div>
                            <Link style={{ textDecoration: 'none' }} to="/dashboard"><Button variant="contained">Dashboard</Button></Link>
                        </div>)}

                    {user.email ?
                        <Button variant="contained" onClick={logout}>Logout</Button> :
                        <Link style={{ textDecoration: 'none' }} to="/login"><Button variant="contained">Login</Button></Link>}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;