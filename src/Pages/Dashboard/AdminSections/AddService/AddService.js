import React, { useState } from 'react';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import useAuth from '../../../../hooks/useAuth'
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddService = () => {
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
        <Box sx={{
            '& .MuiTextField-root': { m: 1, width: '75%' }
        }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Add a Service
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
                    type="number"
                    step="any"
                    sx={{ mx: 'auto', width: '75%' }}
                    {...register("price", {
                        required: "Required",
                    })}
                />

                {errors.email && errors.email.message}
                <br />
                <Button type="submit" sx={{ my: 3 }} variant="contained">Add Service</Button>
            </form>
            {success && <Alert severity="success">Service Added successfully!</Alert>}
        </Box>
    );
};

export default AddService;