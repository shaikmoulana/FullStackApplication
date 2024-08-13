import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function SOWProposedTeamList() {
    const [SOWProposedTeams, setSOWProposedTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentSOWProposedTeam, setCurrentSOWProposedTeam] = useState({
        id: '',
        sowRequirement: '',
        employee: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5041/api/SOWProposedTeam')
            .then(response => {
                setSOWProposedTeams(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the SOWProposedTeams!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentSOWProposedTeam({
            id: '',
            sowRequirement: '',
            employee: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (SOWProposedTeam) => {
        setCurrentSOWProposedTeam(SOWProposedTeam);
        setOpen(true);

    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5041/api/SOWProposedTeam/${id}`)
            .then(response => {
                setSOWProposedTeams(SOWProposedTeams.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the SOWProposedTeam!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentSOWProposedTeam.id) {
            // Update existing SOWProposedTeam
            axios.put(`http://localhost:5041/api/SOWProposedTeam/${currentSOWProposedTeam.id}`, currentSOWProposedTeam)
                .then(response => {
                    console.log(response)
                    //setSOWProposedTeams([...SOWProposedTeams, response.data]);
                    // setSOWProposedTeams(response.data);
                    setSOWProposedTeams(SOWProposedTeams.map(tech => tech.id === currentSOWProposedTeam.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the SOWProposedTeam!', error);
                    setError(error);
                });

        } else {
            // Add new SOWProposedTeam
            axios.post('http://localhost:5041/api/SOWProposedTeam', currentSOWProposedTeam)
                .then(response => {
                    setSOWProposedTeams([...SOWProposedTeams, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the SOWProposedTeam!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentSOWProposedTeam({ ...currentSOWProposedTeam, [name]: value });
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
                <h3>SOWProposedTeam Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add SOWProposedTeam</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>SOWRequirement</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {SOWProposedTeams.map(SOWProposedTeam => (
                            <TableRow key={SOWProposedTeam.id}>
                                <TableCell>{SOWProposedTeam.id}</TableCell>
                                <TableCell>{SOWProposedTeam.sowRequirement}</TableCell>
                                <TableCell>{SOWProposedTeam.employee}</TableCell>
                                <TableCell>{SOWProposedTeam.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{SOWProposedTeam.createdBy}</TableCell>
                                <TableCell>{new Date(SOWProposedTeam.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{SOWProposedTeam.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{SOWProposedTeam.updatedDate ? new Date(SOWProposedTeam.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(SOWProposedTeam)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(SOWProposedTeam.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentSOWProposedTeam.id ? 'Update SOWProposedTeam' : 'Add SOWProposedTeam'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="SowRequirement"
                        name="sowRequirement"
                        value={currentSOWProposedTeam.sowRequirement}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Employee"
                        name="employee"
                        value={currentSOWProposedTeam.employee}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentSOWProposedTeam.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentSOWProposedTeam.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentSOWProposedTeam.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentSOWProposedTeam.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentSOWProposedTeam.updatedDate}
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

export default SOWProposedTeamList;
