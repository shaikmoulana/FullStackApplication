import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function ClientList() {
    const [Clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentClient, setCurrentClient] = useState({
        id: '',
        name: '',
        lineofBusiness: '',
        salesEmployee: '',
        country: '',
        city: '',
        state: '',
        address: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        //axios.get('http://localhost:5142/api/Client')
        axios.get('http://172.17.31.61:5142/api/client')
            .then(response => {
                setClients(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the Clients!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentClient({
            id: '',
            name: '',
            lineofBusiness: '',
            salesEmployee: '',
            country: '',
            city: '',
            state: '',
            address: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (Client) => {
        setCurrentClient(Client);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5142/api/Client/${id}`)
        axios.delete(`http://172.17.31.61:5142/api/client/${id}`)
            .then(response => {
                setClients(Clients.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the Client!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentClient.id) {
            // Update existing Client
            //axios.put(`http://localhost:5142/api/Client/${currentClient.id}`, currentClient)
            axios.put(`http://172.17.31.61:5142/api/client/${currentClient.id}`, currentClient)
                .then(response => {
                    console.log(response)
                    //setClients([...Clients, response.data]);
                    // setClients(response.data);
                    setClients(Clients.map(tech => tech.id === currentClient.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the Client!', error);
                    setError(error);
                });

        } else {
            // Add new Client
            //axios.post('http://localhost:5142/api/Client', currentClient)
            axios.post('http://172.17.31.61:5142/api/client', currentClient)
                .then(response => {
                    setClients([...Clients, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the Client!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentClient({ ...currentClient, [name]: value });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>There was an error loading the data: {error.message}</p>;
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <h3>Client Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Client</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            <TableCell>Name</TableCell>
                            <TableCell>LineofBusiness</TableCell>
                            <TableCell>SalesEmployee</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Clients.map(Client => (
                            <TableRow key={Client.id}>
                                {/* <TableCell>{Client.id}</TableCell> */}
                                <TableCell>{Client.name}</TableCell>
                                <TableCell>{Client.lineofBusiness}</TableCell>
                                <TableCell>{Client.salesEmployee}</TableCell>
                                <TableCell>{Client.country}</TableCell>
                                <TableCell>{Client.city}</TableCell>
                                <TableCell>{Client.state}</TableCell>
                                <TableCell>{Client.address}</TableCell>
                                <TableCell>{Client.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{Client.createdBy}</TableCell>
                                <TableCell>{new Date(Client.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{Client.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{Client.updatedDate ? new Date(Client.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(Client)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(Client.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentClient.id ? 'Update Client' : 'Add Client'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={currentClient.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="LineofBusiness"
                        name="lineofBusiness"
                        value={currentClient.lineofBusiness}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="SalesEmployee"
                        name="salesEmployee"
                        value={currentClient.salesEmployee}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Country"
                        name="country"
                        value={currentClient.country}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        name="city"
                        value={currentClient.city}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="State"
                        name="state"
                        value={currentClient.state}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        name="address"
                        value={currentClient.address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentClient.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentClient.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentClient.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentClient.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentClient.updatedDate}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ClientList;
