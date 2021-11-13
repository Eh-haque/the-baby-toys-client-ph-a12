import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { CircularProgress, Container, Grid } from '@mui/material';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import Products2 from '../Shared/Products2/Products';

const Explore = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        axios.get('https://rocky-retreat-26040.herokuapp.com/services')
            .then((response) => {
                setServices(response.data);
                setIsLoading(true);
                // console.log(response.data);
            });
    }, []);

    if (!isLoading) { return <CircularProgress sx={{ mt: 5 }} /> }
    return (
        <div>
            <Header />

            <Container sx={{ my: 5 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    All Products
                </Typography>
                <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    {services.map((service) =>
                        <Products2 service={service} key={service._id} />
                    )}
                </Grid>
            </Container >

            <Footer />
        </div>
    );
};

export default Explore;