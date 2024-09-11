import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function SOWList() {
    const [SOWs, setSOWs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentSOW, setCurrentSOW] = useState({
        id: '',
        client: '',
        project: '',
        preparedDate: '',
        submittedDate: '',
        status: '',
        comments: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        //axios.get('http://localhost:5041/api/SOW')
        axios.get('http://172.17.31.61:5041/api/sow')
            .then(response => {
                setSOWs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the SOWs!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentSOW({
            id: '',
            client: '',
            project: '',
            preparedDate: '',
            submittedDate: '',
            status: '',
            comments: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (SOW) => {
        setCurrentSOW(SOW);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5041/api/SOW/${id}`)
        axios.delete(`http://172.17.31.61:5041/api/sow/${id}`)
            .then(response => {
                setSOWs(SOWs.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the SOW!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentSOW.id) {
            // Update existing SOW
            //axios.put(`http://localhost:5041/api/SOW/${currentSOW.id}`, currentSOW)
            axios.put(`http://172.17.31.61:5041/api/sow/${currentSOW.id}`, currentSOW)
                .then(response => {
                    console.log(response)
                    //setSOWs([...SOWs, response.data]);
                    // setSOWs(response.data);
                    setSOWs(SOWs.map(tech => tech.id === currentSOW.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the SOW!', error);
                    setError(error);
                });

        } else {
            // Add new SOW
            //axios.post('http://localhost:5041/api/SOW', currentSOW)
            axios.post('http://172.17.31.61:5041/api/sow', currentSOW)
                .then(response => {
                    setSOWs([...SOWs, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the SOW!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentSOW({ ...currentSOW, [name]: value });
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
                <h3>SOW Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add SOW</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Id</TableCell> */}
                            <TableCell>Client</TableCell>
                            <TableCell>Project</TableCell>
                            <TableCell>preparedDate</TableCell>
                            <TableCell>SubmittedDate</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Comments</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {SOWs.map(SOW => (
                            <TableRow key={SOW.id}>
                                {/* <TableCell>{SOW.id}</TableCell> */}
                                <TableCell>{SOW.client}</TableCell>
                                <TableCell>{SOW.project}</TableCell>
                                <TableCell>{SOW.preparedDate}</TableCell>
                                <TableCell>{SOW.submittedDate}</TableCell>
                                <TableCell>{SOW.status}</TableCell>
                                <TableCell>{SOW.comments}</TableCell>
                                <TableCell>{SOW.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{SOW.createdBy}</TableCell>
                                <TableCell>{new Date(SOW.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{SOW.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{SOW.updatedDate ? new Date(SOW.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(SOW)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(SOW.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentSOW.id ? 'Update SOW' : 'Add SOW'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Client"
                        name="client"
                        value={currentSOW.client}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Project"
                        name="project"
                        value={currentSOW.project}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                            margin="dense"
                            label="PreparedDate"
                            name="preparedDate"
                            value={currentSOW.preparedDate}
                            onChange={handleChange}
                            fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="SubmittedDate"
                        name="submittedDate"
                        value={currentSOW.submittedDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Status"
                        name="status"
                        value={currentSOW.status}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Comments"
                        name="comments"
                        value={currentSOW.comments}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentSOW.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentSOW.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentSOW.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentSOW.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentSOW.updatedDate}
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

export default SOWList;
