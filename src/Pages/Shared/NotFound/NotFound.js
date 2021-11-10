import { Button, Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <React.Fragment>
            <Container sx={{ display: 'block', width: '100vw', height: '100vh' }}>
                <Card>
                    <CardContent>
                        <Typography variant='h2'>
                            404
                        </Typography>
                        <Typography sx={{ p: 3 }} variant='h4'>
                            Page NotFound
                        </Typography>
                        <Link to='/' style={{ textDecoration: 'none' }}><Button variant='contained'>Go Home</Button></Link>
                    </CardContent>
                </Card>
            </Container>
        </React.Fragment>
    );
};

export default NotFound;