import React, { useState } from 'react';
import { Alert, Box, Button, InputLabel, NativeSelect, TextField, Typography } from '@mui/material';
import useAuth from '../../../../hooks/useAuth'
import { useForm } from 'react-hook-form';
import axios from 'axios';

const MyReview = () => {
    const { user } = useAuth();
    const [success, setSuccess] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        data.email = user.email;
        data.name = user.displayName;
        axios.post('https://rocky-retreat-26040.herokuapp.com/reviews', { data })
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
                Write a Review
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>

                <TextField fullWidth
                    id="standard-search1"
                    label="Your Review"
                    variant="standard"
                    type="text"
                    defaultValue='Hey there,'
                    multiline
                    rows={5}
                    sx={{ mx: 'auto', width: '75%' }}
                    {...register("review", {
                        required: "Required",
                    })}
                />

                <Box sx={{ mt: 2 }}>
                    <InputLabel variant="standard">
                        Rating
                    </InputLabel>
                    <NativeSelect sx={{ width: '75%' }}
                        defaultValue={5}
                        inputProps={{
                            name: 'status',
                            id: 'uncontrolled-native',
                        }}  {...register("status")}
                    >
                        <option value={5}>5</option>
                        <option value={4}>4</option>
                        <option value={3}>3</option>
                        <option value={2}>2</option>
                        <option value={1}>1</option>
                        <option value={0}>0</option>
                    </NativeSelect>
                </Box>

                {errors.email && errors.email.message}
                <br />
                <Button type="submit" sx={{ my: 3 }} variant="contained">Add Review</Button>
            </form>
            {success && <Alert severity="success">Review Submitted Successfully!</Alert>}
        </Box>
    );
};

export default MyReview;