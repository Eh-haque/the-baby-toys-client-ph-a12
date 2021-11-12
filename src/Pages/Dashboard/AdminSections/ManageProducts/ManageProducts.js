import React, { useEffect, useState } from 'react';
import { Alert, Button, Typography } from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ManageProducts = () => {

    const [orders, setOrders] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        axios.get('https://rocky-retreat-26040.herokuapp.com/services')
            .then((response) => {
                setOrders(response.data);
                // console.log(response.data);
            });
    }, []);

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`https://rocky-retreat-26040.herokuapp.com/delete_service/${id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        setSuccess(true);
                        const remainingOrders = orders.filter(user => user._id !== id);
                        setOrders(remainingOrders);
                    }
                })
        }
    }

    return (
        <Paper>
            <Typography variant="h4" sx={{ py: 2 }}>
                Manage All Product
            </Typography>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Price</TableCell>
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
                                    {row?.data?.title}
                                </TableCell>
                                <TableCell align="right">{row?.data?.email}</TableCell>
                                <TableCell align="right">{row?.data?.desc.slice(0, 20)}</TableCell>
                                <TableCell align="right">{row?.data?.price}</TableCell>

                                <TableCell align="right">
                                    <Button size="small" onClick={() => handleDelete(row._id)} variant="outlined" startIcon={<DeleteOutlineIcon />}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {success && <Alert severity="success">Service Deleted Successfully!</Alert>}
            </TableContainer>
        </Paper>
    );
};

export default ManageProducts;