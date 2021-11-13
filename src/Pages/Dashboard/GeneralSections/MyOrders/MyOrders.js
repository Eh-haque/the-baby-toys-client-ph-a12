import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth'
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

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [myOrders, setMyOrders] = useState([]);

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        axios.get('https://rocky-retreat-26040.herokuapp.com/orders')
            .then((response) => {
                setOrders(response.data)
            });
    }, []);

    useEffect(() => {
        const myOrders = orders.filter((order) => order.email === user.email)
        setMyOrders(myOrders)
    }, [orders, user.email]);

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`https://rocky-retreat-26040.herokuapp.com/delete_order/${id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        setSuccess(true);
                        const remainingOrders = myOrders.filter(user => user._id !== id);
                        setMyOrders(remainingOrders);
                    }
                })
        }
    };
    return (
        <Paper>
            <Typography variant="h4" sx={{ py: 2 }}>
                My Orders
            </Typography>
            <TableContainer>

                {myOrders.length > 0 ?
                    <> <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Product Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myOrders.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row?.email}</TableCell>
                                    <TableCell align="right">{row?.order?.title}</TableCell>
                                    <TableCell align="right">${row?.order?.price}</TableCell>
                                    <TableCell align="right">{row?.address}</TableCell>
                                    <TableCell align="right">{row?.status}</TableCell>

                                    <TableCell align="right">
                                        <Button onClick={() => handleDelete(row?._id)} size="small" variant="outlined" startIcon={<DeleteOutlineIcon />}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </> :
                    <Typography variant="h5" sx={{ textAlign: 'center', py: 3, color: 'red' }}>Sorry! No Order Found</Typography>
                }
                {success && <Alert severity="success">Order Deleted Successfully!</Alert>}
            </TableContainer>
        </Paper>
    );
};

export default MyOrders;