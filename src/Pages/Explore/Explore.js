import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import Products from '../Shared/Products/Products';

const Explore = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        axios.get('https://rocky-retreat-26040.herokuapp.com/services')
            .then((response) => {
                setServices(response.data);
                // console.log(response.data);
            });
    }, []);
    return (
        <div>
            <Header />

            <Container sx={{ my: 5 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    All Products
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {services.map((service) =>
                        <Products service={service} key={service._id} />
                    )}
                </Grid>
            </Container >

            <Footer />
        </div>
    );
};

export default Explore;