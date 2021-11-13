import React from 'react';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const About = () => {
    return (
        <Container sx={{ my: 5 }} >
            <Typography variant="h4" sx={{ mb: 2 }}>About Us</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>There are many variations passages Lorem Ipsum variatio , but the majority suffered alteration.</Typography>

            <Grid sx={{ flexGrow: 1, mb: 4, mt: 2 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-around" spacing={4}>
                        <Grid item>
                            <Paper sx={{ p: 3 }}>
                                <CardTravelIcon sx={{ width: '20vw', height: '20vh', color: '#1976d2' }} />
                                <Typography variant="h5">Free Worldwide Shipping</Typography>
                                <Typography>on all orders $99+</Typography>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper sx={{ p: 3 }}>
                                <PaymentIcon sx={{ width: '20vw', height: '20vh', color: '#1976d2' }} />
                                <Typography variant="h5">Easy & Secure Payments</Typography>
                                <Typography>Papal / Stripe / COD</Typography>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper sx={{ p: 3 }}>
                                <LocalAtmIcon sx={{ width: '20vw', height: '20vh', color: '#1976d2' }} />
                                <Typography variant="h5">Money Back Guarantee</Typography>
                                <Typography>30 days, no questions asked</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Link to='/explore' style={{ textDecoration: 'none' }}><Button variant='contained'>Explore</Button></Link>
        </Container >
    );
};

export default About;