import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Shared/Header/Header';
import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Typography, Alert, TextField, Grid, Paper } from '@mui/material';
import Footer from '../Shared/Footer/Footer';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';


const ProductDetails = () => {

    const { id } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        axios.get(`https://rocky-retreat-26040.herokuapp.com/services/${id}`)
            .then((response) => {
                setOrder(response.data);
                // console.log(response.data);
            });
    }, [id]);

    const { user } = useAuth();
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.status = 'pending';
        data.order = order.data;
        data.email = user.email;
        data.name = user.displayName;
        axios.post('https://rocky-retreat-26040.herokuapp.com/orders', data)
            .then(res => {
                // console.log(res.data);
                setSuccess(true);
            })
        reset();
        // console.log(data);
    };

    return (
        <>
            <Header />

            <Container sx={{ my: 5 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>Product Details</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={7} md={8}>

                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={order?.data?.img}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Name:  {order?.data?.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify', my: 2 }}>
                                        Description: {order?.data?.desc}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Price: ${order?.data?.price}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={5} md={4}>
                        <Paper sx={{ position: 'sticky', top: 0, left: 0, '& .MuiTextField-root': { m: 1, width: 'auto' } }} elevation={3}>
                            <Typography variant="h5" sx={{ pt: 3 }}>
                                Want to Purchase?
                            </Typography><br />
                            <Typography variant="body1">
                                Your Name: {user?.displayName}
                            </Typography>
                            <Typography variant="body1">
                                Your  Email: {user?.email}
                            </Typography><br />

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField fullWidth
                                    id="standard-search2"
                                    label="Type Your Address"
                                    variant="standard"
                                    type="text"
                                    sx={{ mx: 'auto', width: '75%' }}
                                    {...register("address", {
                                        required: "Required",
                                    })}
                                />
                                <TextField fullWidth
                                    id="standard-search2"
                                    label="Type Your Phone Number"
                                    variant="standard"
                                    type="number"
                                    defaultValue={+880}
                                    sx={{ mx: 'auto', width: '75%' }}
                                    {...register("price", {
                                        required: "Required",
                                    })}
                                />
                                {errors.email && errors.email.message}
                                <br />
                                <Button type="submit" sx={{ my: 3 }} variant="contained">Buy Now</Button>
                            </form>
                            {success && <Alert severity="success">Order Placed successfully!</Alert>}
                            <Link to='/' style={{ textDecoration: 'none' }}><Button sx={{ mb: 3 }} variant='contained'>Home</Button></Link>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </>
    );
};

export default ProductDetails;