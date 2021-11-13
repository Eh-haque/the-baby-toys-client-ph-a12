import { Alert, Button, FormControl, InputLabel, NativeSelect, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useForm } from "react-hook-form";
import AutorenewIcon from '@mui/icons-material/Autorenew';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [id, setId] = useState('');
    const [success, setSuccess] = useState(false);
    const [success2, setSuccess2] = useState(false);

    useEffect(() => {
        axios.get('https://rocky-retreat-26040.herokuapp.com/orders')
            .then((response) => {
                setOrders(response.data)
                // console.log(response.data)
            });
    }, []);

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const proceed = window.confirm('Are you sure, you want to update status?');
        if (proceed) {
            axios.put(`https://rocky-retreat-26040.herokuapp.com/update_status/${id}`, data)
                .then(res => {
                    console.log(res.data);
                    setSuccess(true);
                })
        }
        // console.log(data)
    };

    const handleDelete = id => {
        console.log(id);
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`https://rocky-retreat-26040.herokuapp.com/delete_order/${id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        setSuccess2(true);
                        const remainingOrders = orders.filter(user => user._id !== id);
                        setOrders(remainingOrders);
                    }
                })
        }
    };
    const handleUpdate = (id) => {
        setId(id);
    }
    return (
        <Paper>
            <Typography variant="h4" sx={{ py: 2 }}>
                Manage All Order
            </Typography>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row?.order?.title}
                                </TableCell>
                                <TableCell align="right">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">

                                    <FormControl as='form' onSubmit={handleSubmit(onSubmit)}>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Status
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={row.status}
                                            inputProps={{
                                                name: 'status',
                                                id: 'uncontrolled-native',
                                            }}  {...register("status")}
                                        >
                                            <option value={row?.status} style={{ fontStyle: 'italic' }}>{row?.status}</option>
                                            <option value='Approved'>approve</option>
                                            <option value='Shipped'>ship</option>
                                            <option value='Rejected'>reject</option>
                                        </NativeSelect>
                                        <Button size="small" type="submit" onClick={() => handleUpdate(row._id)} variant="outlined" endIcon={<AutorenewIcon />}>
                                            Update
                                        </Button>
                                    </FormControl>
                                    {/* <form onSubmit={handleSubmit(onSubmit)}>
                                    <select {...register("status")}>
                                        <option value={row.status}>{row?.status}</option>
                                        <option value="Approved">approve</option>
                                        <option value="Shipped">Ship</option>
                                    </select>
                                    <Button size="small" type="submit" onClick={() => handleUpdate(row._id)} variant="outlined" endIcon={<AutorenewIcon />}>
                                        Update
                                    </Button>
                                </form> */}
                                </TableCell>

                                <TableCell align="right">
                                    <Button size="small"
                                        onClick={() => handleDelete(row._id)} variant="outlined" startIcon={<DeleteOutlineIcon />}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {success && <Alert severity="success">Service Updated Successfully!</Alert>}
                {success2 && <Alert severity="success">Service Deleted Successfully!</Alert>}
            </TableContainer>
        </Paper>
    );
};

export default ManageOrders;