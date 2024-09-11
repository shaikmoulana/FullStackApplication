import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function ClientContactList() {
    const [ClientContact, setClientContact] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentClientContact, setCurrentClientContact] = useState({
        id: '',
        client: '',
        contactValue: '',
        contactType: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        //axios.get('http://localhost:5142/api/ClientContact')
        axios.get('http://172.17.31.61:5142/api/clientContact')
            .then(response => {
                setClientContact(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the ClientContact!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentClientContact({
            id: '',
            client: '',
            contactValue: '',
            contactType: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (ClientContact) => {
        setCurrentClientContact(ClientContact);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5142/api/ClientContact/${id}`)
        axios.delete(`http://172.17.31.61:5142/api/clientContact/${id}`)
            .then(response => {
                setClientContact(ClientContact.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the ClientContact!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentClientContact.id) {
            // Update existing ClientContact
            //axios.put(`http://localhost:5142/api/ClientContact/${currentClientContact.id}`, currentClientContact)
            axios.put(`http://172.17.31.61:5142/api/clientContact/${currentClientContact.id}`, currentClientContact)
                .then(response => {
                    console.log(response)
                    //setClientContact([...ClientContact, response.data]);
                    // setClientContact(response.data);
                    setClientContact(ClientContact.map(tech => tech.id === currentClientContact.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the ClientContact!', error);
                    setError(error);
                });

        } else {
            // Add new ClientContact
            //axios.post('http://localhost:5142/api/ClientContact', currentClientContact)
            axios.post('http://172.17.31.61:5142/api/clientContact', currentClientContact)
                .then(response => {
                    setClientContact([...ClientContact, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the ClientContact!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentClientContact({ ...currentClientContact, [name]: value });
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
                <h3>ClientContact Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add ClientContact</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Id</TableCell> */}
                            <TableCell>Client</TableCell>
                            <TableCell>ContactValue</TableCell>
                            <TableCell>ContactType</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ClientContact.map(ClientContact => (
                            <TableRow key={ClientContact.id}>
                                {/* <TableCell>{ClientContact.id}</TableCell> */}
                                <TableCell>{ClientContact.client}</TableCell>
                                <TableCell>{ClientContact.contactValue}</TableCell>
                                <TableCell>{ClientContact.contactType}</TableCell>
                                <TableCell>{ClientContact.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{ClientContact.createdBy}</TableCell>
                                <TableCell>{new Date(ClientContact.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{ClientContact.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{ClientContact.updatedDate ? new Date(ClientContact.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(ClientContact)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(ClientContact.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentClientContact.id ? 'Update ClientContact' : 'Add ClientContact'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Client"
                        name="client"
                        value={currentClientContact.client}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="ContactValue"
                        name="contactValue"
                        value={currentClientContact.contactValue}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="ContactType"
                        name="contactType"
                        value={currentClientContact.contactType}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentClientContact.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentClientContact.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentClientContact.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentClientContact.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentClientContact.updatedDate}
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

export default ClientContactList;
