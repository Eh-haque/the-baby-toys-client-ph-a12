import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Products = ({ service }) => {

    return (
        <Grid item xs={2} sm={4} md={4}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={service.data.img}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {service.data.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify' }}>
                            {service.data.desc.slice(0, 220)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        ${service.data.price}
                    </Typography>
                    <Link as={Link} to={`/product_details/${service._id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained">
                            Buy Now
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Products;