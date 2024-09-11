
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function DesignationList() {
    const [Designations, setDesignations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentDesignation, setCurrentDesignation] = useState({
        id: '',
        name: '',
        departmentId: '',
        isActive: true,
        createdBy: 'SYSTEM',
        createdDate: new Date(),
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        //axios.get('http://localhost:5201/api/Designation')
        axios.get('http://172.17.31.61:5201/api/designation')
            .then(response => {
                setDesignations(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the Designations!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentDesignation({
            id: '',
            name: '',
            departmentId: '',
            isActive: true,
            createdBy: 'SYSTEM',
            createdDate: new Date(),
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (Designation) => {
        setCurrentDesignation(Designation);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5201/api/Designation/${id}`)
        axios.delete(`http://172.17.31.61:5201/api/designation/${id}`)
            .then(response => {
                setDesignations(Designations.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the Designation!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentDesignation.id) {
            // Update existing Designation
            //axios.put(`http://localhost:5201/api/Designation/${currentDesignation.id}`, currentDesignation)
            axios.put(`http://172.17.31.61:5201/api/designation/${currentDesignation.id}`, currentDesignation)
                .then(response => {
                    console.log(response)
                    //setDesignations([...Designations, response.data]);
                    // setDesignations(response.data);
                    setDesignations(Designations.map(tech => tech.id === currentDesignation.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the Designation!', error);
                    setError(error);
                });

        } else {
            // Add new Designation
            //axios.post('http://localhost:5201/api/Designation', currentDesignation)
            axios.post('http://172.17.31.61:5201/api/designation', currentDesignation)
                .then(response => {
                    setDesignations([...Designations, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the Designation!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentDesignation({ ...currentDesignation, [name]: value });
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
                <h3>Designation Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Designation</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            <TableCell>Name</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Designations.map(Designation => (
                            <TableRow key={Designation.id}>
                                {/* <TableCell>{Designation.id}</TableCell> */}
                                <TableCell>{Designation.name}</TableCell>
                                <TableCell>{Designation.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{Designation.createdBy}</TableCell>
                                <TableCell>{new Date(Designation.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{Designation.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{Designation.updatedDate ? new Date(Designation.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(Designation)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(Designation.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentDesignation.id ? 'Update Designation' : 'Add Designation'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={currentDesignation.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentDesignation.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentDesignation.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentDesignation.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentDesignation.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentDesignation.updatedDate}
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

export default DesignationList;
