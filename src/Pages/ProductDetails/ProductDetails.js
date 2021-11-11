import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Typography, Alert, TextField, Grid, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';


const ProductDetails = () => {

    const { id } = useParams();
    const [order, setOrder] = useState();

    useEffect(() => {
        axios.get(`https://rocky-retreat-26040.herokuapp.com/services/${id}`)
            .then((response) => {
                setOrder(response.data);
                // console.log(response.data);
            });
    }, [id]);

    const { user } = useAuth();
    const [success, setSuccess] = useState(false);

    /*  const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [price, setPrice] = useState(''); */
    /*  useEffect(() => {
        const  name = user?.displayName;
        const email = user?.email;
        const price = order?.data?.price;
         setName(name);
         setEmail(email);
         setPrice(price);
     }, [user, order?.data?.price]); */

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.status = 'pending';
        data.order = order.data;
        // data.email = user.email;
        // data.name = user.displayName;
        axios.post('https://rocky-retreat-26040.herokuapp.com/orders', data)
            .then(res => {
                console.log(res.data);
                setSuccess(true);
            })
        reset();
        // console.log(data);
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
                                    label='Your Name'
                                    variant="standard"
                                    value={user?.displayName}
                                    sx={{ mx: 'auto', width: '75%' }}
                                    {...register("name")}
                                />

                                {<TextField fullWidth
                                    id="standard-search2"
                                    label="Your Email"
                                    variant="standard"
                                    value={user?.email}
                                    sx={{ mx: 'auto', width: '75%' }}
                                    {...register("email")}
                                />}
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
                                    label="Product Price"
                                    variant="standard"
                                    type="number"
                                    value={order?.data?.price}
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
                            <Button sx={{ border: 'none', mb: 3 }} as={Link} to='/' variant="contained">Home</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </React.Fragment>
    );
};

export default ProductDetails;