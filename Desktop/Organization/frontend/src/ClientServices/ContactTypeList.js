import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function ContactTypeList() {
    const [contactTypes, setcontactTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentContactType, setCurrentContactType] = useState({
        id: '',
        typeName: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5142/api/ContactType')
            .then(response => {
                setcontactTypes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the contactTypes!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentContactType({
            id: '',
            typeName: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (ContactType) => {
        setCurrentContactType(ContactType);
        setOpen(true);

    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5142/api/ContactType/${id}`)
            .then(response => {
                setcontactTypes(contactTypes.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the ContactType!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentContactType.id) {
            // Update existing ContactType
            axios.put(`http://localhost:5142/api/ContactType/${currentContactType.id}`, currentContactType)
                .then(response => {
                    console.log(response)
                    //setcontactTypes([...contactTypes, response.data]);
                    // setcontactTypes(response.data);
                    setcontactTypes(contactTypes.map(tech => tech.id === currentContactType.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the ContactType!', error);
                    setError(error);
                });

        } else {
            // Add new ContactType
            axios.post('http://localhost:5142/api/ContactType', currentContactType)
                .then(response => {
                    setcontactTypes([...contactTypes, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the ContactType!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentContactType({ ...currentContactType, [name]: value });
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
                <h3>ContactType Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add ContactType</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>TypeName</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contactTypes.map(ContactType => (
                            <TableRow key={ContactType.id}>
                                <TableCell>{ContactType.id}</TableCell>
                                <TableCell>{ContactType.typeName}</TableCell>
                                <TableCell>{ContactType.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{ContactType.createdBy}</TableCell>
                                <TableCell>{new Date(ContactType.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{ContactType.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{ContactType.updatedDate ? new Date(ContactType.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(ContactType)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(ContactType.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentContactType.id ? 'Update ContactType' : 'Add ContactType'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="TypeName"
                        name="typeName"
                        value={currentContactType.typeName}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentContactType.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentContactType.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentContactType.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentContactType.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentContactType.updatedDate}
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

export default ContactTypeList;
