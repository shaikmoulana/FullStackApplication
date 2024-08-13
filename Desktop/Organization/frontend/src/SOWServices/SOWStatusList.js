import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function SOWStatusList() {
    const [SOWStatuss, setSOWStatuss] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentSOWStatus, setCurrentSOWStatus] = useState({
        id: '',
        status: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5041/api/SOWStatus')
            .then(response => {
                setSOWStatuss(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the SOWStatuss!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentSOWStatus({
            id: '',
            status: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (SOWStatus) => {
        setCurrentSOWStatus(SOWStatus);
        setOpen(true);

    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5041/api/SOWStatus/${id}`)
            .then(response => {
                setSOWStatuss(SOWStatuss.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the SOWStatus!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentSOWStatus.id) {
            // Update existing SOWStatus
            axios.put(`http://localhost:5041/api/SOWStatus/${currentSOWStatus.id}`, currentSOWStatus)
                .then(response => {
                    console.log(response)
                    //setSOWStatuss([...SOWStatuss, response.data]);
                    // setSOWStatuss(response.data);
                    setSOWStatuss(SOWStatuss.map(tech => tech.id === currentSOWStatus.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the SOWStatus!', error);
                    setError(error);
                });

        } else {
            // Add new SOWStatus
            axios.post('http://localhost:5041/api/SOWStatus', currentSOWStatus)
                .then(response => {
                    setSOWStatuss([...SOWStatuss, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the SOWStatus!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentSOWStatus({ ...currentSOWStatus, [name]: value });
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
                <h3>SOWStatus Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add SOWStatus</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {SOWStatuss.map(SOWStatus => (
                            <TableRow key={SOWStatus.id}>
                                <TableCell>{SOWStatus.id}</TableCell>
                                <TableCell>{SOWStatus.status}</TableCell>
                                <TableCell>{SOWStatus.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{SOWStatus.createdBy}</TableCell>
                                <TableCell>{new Date(SOWStatus.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{SOWStatus.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{SOWStatus.updatedDate ? new Date(SOWStatus.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(SOWStatus)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(SOWStatus.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentSOWStatus.id ? 'Update SOWStatus' : 'Add SOWStatus'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Status"
                        name="status"
                        value={currentSOWStatus.status}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentSOWStatus.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentSOWStatus.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentSOWStatus.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentSOWStatus.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentSOWStatus.updatedDate}
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

export default SOWStatusList;
