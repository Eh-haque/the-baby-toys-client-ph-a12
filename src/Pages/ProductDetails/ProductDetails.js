import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Typography, Alert, TextField, Grid, Paper, } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';


const ProductDetails = () => {

    const { id } = useParams();
    console.log(id);
    const [order, setOrder] = useState();
    useEffect(() => {
        axios.get(`http://localhost:5000/services/${id}`)
            .then((response) => {
                setOrder(response.data);
                console.log(response.data);
            });
    }, [id]);

    const { user } = useAuth();
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.email = user.email;
        data.name = user.displayName;
        axios.post('https://rocky-retreat-26040.herokuapp.com/services', { data })
            .then(res => {
                console.log(res.data);
                setSuccess(true);
            })
        reset();
    };
    return (
        <React.Fragment>
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
                            </Typography>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <TextField fullWidth
                                    id="standard-search1"
                                    label="Service Name"
                                    variant="standard"
                                    type="text"
                                    sx={{ mx: 'auto', width: '75%' }}
                                    {...register("title", {
                                        required: "Required",
                                    })}
                                />
                                <TextField fullWidth
                                    id="standard-search2"
                                    label="Service Description"
                                    variant="standard"
                                    type="text"
                                    sx={{ mx: 'auto', width: '75%' }}
                                    {...register("desc", {
                                        required: "Required",
                                    })}
                                />
                                <TextField fullWidth
                                    id="standard-search2"
                                    label="Product Image Live Url"
                                    variant="standard"
                                    type="text"
                                    sx={{ mx: 'auto', width: '75%' }}
                                    {...register("img", {
                                        required: "Required",
                                    })}
                                />
                                <TextField fullWidth
                                    id="standard-search2"
                                    label="Service Price"
                                    variant="standard"
                                    type="Number"
                                    sx={{ mx: 'auto', width: '75%' }}
                                    {...register("price", {
                                        required: "Required",
                                    })}
                                />

                                {errors.email && errors.email.message}
                                <br />
                                <Button type="submit" sx={{ my: 3 }} variant="contained">Buy Now</Button>
                            </form>
                            {success && <Alert severity="success">Service Added successfully!</Alert>}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </React.Fragment>
    );
};

export default ProductDetails;