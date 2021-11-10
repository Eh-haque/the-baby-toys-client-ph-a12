import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, Typography } from "@mui/material";

const MakeAdmin = () => {
    const [success, setSuccess] = useState(false);

    const { handleSubmit, register, reset, formState: { errors } } = useForm();

    const onSubmit = values => {
        const user = values.email;
        console.log(values, user);
        fetch('https://rocky-retreat-26040.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
    };

    return (
        <Box sx={{ maxWidth: '100%', }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Ad as Admin
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField fullWidth
                    id="standard-search"
                    label="Enter A Valid Email"
                    variant="standard"
                    type="email"
                    sx={{ mx: 'auto', width: '75%' }}
                    {...register("email", {
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}
                />
                {errors.email && errors.email.message}
                <br />
                <Button type="submit" sx={{ mt: 3 }} variant="contained">Contained</Button>
            </form>
            {success && <Alert severity="success">Made Admin successfully!</Alert>}
        </Box>
    );
};

export default MakeAdmin;