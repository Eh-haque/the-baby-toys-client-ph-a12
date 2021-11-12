import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <Container sx={{ my: 5 }} >
            <Typography variant="h4" sx={{ mb: 2 }}>About Us</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>There are many variations passages Lorem Ipsum variatio , but the majority suffered alteration.</Typography>
            <Link to='/explore' style={{ textDecoration: 'none' }}><Button sx={{ mb: 3 }} variant='contained'>Explore</Button></Link>
        </Container >
    );
};

export default About;