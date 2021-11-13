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
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

const Header = () => {
    const { user, logout } = useAuth();

    const theme = useTheme();
    const useStyle = makeStyles({
        navIcon: {
            [theme.breakpoints.up('md')]: {
                display: 'none !important'
            }
        },
        navItem: {
            [theme.breakpoints.down('md')]: {
                display: 'none !important'
            }
        },
        navLogo: {
            [theme.breakpoints.down('md')]: {
                textAlign: 'left'
            }
        }
    })

    const { navIcon, navItem, navLogo } = useStyle()

    const [state, setState] = React.useState(false);

    const list = (
        <Box
            sx={{ width: 250, background: '#1976d2', flexDirection: 'column' }}
            role="presentation"
        >
            <List>
                <ListItem button>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/home">Home</Link>
                </ListItem>
                <ListItem button>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/explore">Explore</Link>
                </ListItem>
                {user.email && (
                    <ListItem button>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/dashboard">Dashboard</Link>
                    </ListItem>
                )}

                {user.email ?
                    <ListItem button>
                        <Button variant="contained" onClick={logout}>Logout</Button>
                    </ListItem>
                    :
                    <ListItem button>
                        <Link style={{ textDecoration: 'none' }} to="/login"><Button variant="contained">Login</Button></Link>
                    </ListItem>}
            </List>

            <Divider />
        </Box>
    );

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1, position: 'sticky', top: '0', left: '0', zIndex: 1 }}>
                <AppBar position="static">
                    <Toolbar>

                        <Typography className={navLogo} variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            Baby Toys
                        </Typography>

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            className={navIcon}
                            onClick={() => setState(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Link className={navItem} style={{ textDecoration: 'none' }} to="/home"><Button sx={{ color: 'white' }} variant="text">Home</Button></Link>
                        <Link className={navItem} style={{ textDecoration: 'none' }} to="/explore"><Button sx={{ color: 'white' }} variant="text">Explore</Button></Link>

                        {user.email && (
                            <div style={{ marginRight: '20px', marginLeft: '10px' }} className={navItem}>
                                <Link style={{ color: 'white', textDecoration: 'none' }} to="/dashboard">Dashboard</Link>
                            </div>)}

                        {user.email ?


                            <Button className={navItem} variant="contained" onClick={logout}>Logout</Button> :
                            <Link className={navItem} style={{ textDecoration: 'none' }} to="/login"><Button variant="contained">Login</Button></Link>}
                    </Toolbar>
                </AppBar>
            </Box>
            <div>
                <React.Fragment>
                    <Drawer
                        open={state}
                        onClose={() => setState(false)}
                    >
                        {list}
                    </Drawer>
                </React.Fragment>
            </div>
        </React.Fragment >
    );
};

export default Header;