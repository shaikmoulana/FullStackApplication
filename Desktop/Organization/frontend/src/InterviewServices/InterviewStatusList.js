import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function InterviewStatusList() {
    const [InterviewStatuss, setInterviewStatuss] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentInterviewStatus, setCurrentInterviewStatus] = useState({
        id: '',
        status: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5200/api/InterviewStatus')
            .then(response => {
                setInterviewStatuss(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the InterviewStatuss!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentInterviewStatus({
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

    const handleUpdate = (InterviewStatus) => {
        setCurrentInterviewStatus(InterviewStatus);
        setOpen(true);

    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5200/api/InterviewStatus/${id}`)
            .then(response => {
                setInterviewStatuss(InterviewStatuss.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the InterviewStatus!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentInterviewStatus.id) {
            // Update existing InterviewStatus
            axios.put(`http://localhost:5200/api/InterviewStatus/${currentInterviewStatus.id}`, currentInterviewStatus)
                .then(response => {
                    console.log(response)
                    //setInterviewStatuss([...InterviewStatuss, response.data]);
                    // setInterviewStatuss(response.data);
                    setInterviewStatuss(InterviewStatuss.map(tech => tech.id === currentInterviewStatus.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the InterviewStatus!', error);
                    setError(error);
                });

        } else {
            // Add new InterviewStatus
            axios.post('http://localhost:5200/api/InterviewStatus', currentInterviewStatus)
                .then(response => {
                    setInterviewStatuss([...InterviewStatuss, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the InterviewStatus!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentInterviewStatus({ ...currentInterviewStatus, [name]: value });
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
                <h3>InterviewStatus Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add InterviewStatus</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
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
                        {InterviewStatuss.map(InterviewStatus => (
                            <TableRow key={InterviewStatus.id}>
                                <TableCell>{InterviewStatus.id}</TableCell>
                                <TableCell>{InterviewStatus.status}</TableCell>
                                <TableCell>{InterviewStatus.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{InterviewStatus.createdBy}</TableCell>
                                <TableCell>{new Date(InterviewStatus.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{InterviewStatus.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{InterviewStatus.updatedDate ? new Date(InterviewStatus.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(InterviewStatus)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(InterviewStatus.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentInterviewStatus.id ? 'Update InterviewStatus' : 'Add InterviewStatus'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Status"
                        name="status"
                        value={currentInterviewStatus.status}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentInterviewStatus.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentInterviewStatus.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentInterviewStatus.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentInterviewStatus.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentInterviewStatus.updatedDate}
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

export default InterviewStatusList;
