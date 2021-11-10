import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Products from '../../Shared/Products/Products';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        axios.get('https://rocky-retreat-26040.herokuapp.com/services')
            .then((response) => {
                setServices(response.data.slice(0, 6));
                // console.log(response.data);
            });
    }, []);
    return (
        <Container>
            <h2>this is products</h2>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {services.map((service) =>
                    <Products service={service} key={service._id} />
                )}
            </Grid>
        </Container >
    );
};

export default Services;