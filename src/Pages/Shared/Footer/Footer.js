import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import logo from '../../../media/logo/23497640-removebg-preview.png'

const Footer = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Divider />
            <Container>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }} sx={{ py: 3 }}>
                    <Grid item xs={2} sm={4} md={3}>
                        <img style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem', marginBottom: '2rem' }} src={logo} alt="" />
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et aliqua.
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={4} md={3}>
                        <Box>
                            <nav aria-label="secondary mailbox folders">
                                <h3>Account</h3>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary="My Account" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component="a" href="#simple-list">
                                            <ListItemText sx={{ textAlign: 'center' }} primary="Order History" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component="a" href="#simple-list">
                                            <ListItemText sx={{ textAlign: 'center' }} primary="Wishlist" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component="a" href="#simple-list">
                                            <ListItemText sx={{ textAlign: 'center' }} primary="Specials" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </nav>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={4} md={3}>
                        <Box>
                            <nav aria-label="secondary mailbox folders">
                                <h3>Services</h3>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary="Discount" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component="a" href="#simple-list">
                                            <ListItemText sx={{ textAlign: 'center' }} primary="Return Policy" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component="a" href="#simple-list">
                                            <ListItemText sx={{ textAlign: 'center' }} primary="Customer Service" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton component="a" href="#simple-list">
                                            <ListItemText sx={{ textAlign: 'center' }} primary="Term & condition" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </nav>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={4} md={3}>
                        <Box>
                            <nav aria-label="secondary mailbox folders">
                                <h3>Contact us</h3>
                                <List>
                                    <Typography>
                                        Box 565, Charlestown, Nevis, West Indies, Caribbean
                                    </Typography>
                                    <Typography sx={{ my: 2 }}>
                                        Email: haque@gmail.com
                                    </Typography>
                                    <Typography>
                                        Phone: 012 3456789
                                    </Typography>
                                </List>
                            </nav>
                        </Box>
                    </Grid>
                </Grid><hr />
                <Typography sx={{ p: 3 }}>
                    Copyright © 2020. All Rights Reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;