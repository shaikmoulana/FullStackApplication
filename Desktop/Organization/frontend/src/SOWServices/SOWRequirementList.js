import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function SOWRequirementList() {
    const [SOWRequirements, setSOWRequirements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentSOWRequirement, setCurrentSOWRequirement] = useState({
        id: '',
        sow: '',
        designation: '',
        technologies: '',
        teamSize:'',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        //axios.get('http://localhost:5041/api/SOWRequirement')
        axios.get('http://172.17.31.61:5041/api/sowRequirement')
            .then(response => {
                setSOWRequirements(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the SOWRequirements!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentSOWRequirement({
            id: '',
            sow: '',
            designation: '',
            technologies: '',
            teamSize: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (SOWRequirement) => {
        setCurrentSOWRequirement(SOWRequirement);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5041/api/SOWRequirement/${id}`)
        axios.delete(`http://172.17.31.61:5041/api/sowRequirement/${id}`)
            .then(response => {
                setSOWRequirements(SOWRequirements.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the SOWRequirement!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentSOWRequirement.id) {
            // Update existing SOWRequirement
            //axios.put(`http://localhost:5041/api/SOWRequirement/${currentSOWRequirement.id}`, currentSOWRequirement)
            axios.put(`http://172.17.31.61:5041/api/sowRequirement/${currentSOWRequirement.id}`, currentSOWRequirement)
                .then(response => {
                    console.log(response)
                    //setSOWRequirements([...SOWRequirements, response.data]);
                    // setSOWRequirements(response.data);
                    setSOWRequirements(SOWRequirements.map(tech => tech.id === currentSOWRequirement.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the SOWRequirement!', error);
                    setError(error);
                });

        } else {
            // Add new SOWRequirement
            //axios.post('http://localhost:5041/api/SOWRequirement', currentSOWRequirement)
            axios.post('http://172.17.31.61:5041/api/sowRequirement', currentSOWRequirement)
                .then(response => {
                    setSOWRequirements([...SOWRequirements, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the SOWRequirement!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentSOWRequirement({ ...currentSOWRequirement, [name]: value });
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
                <h3>SOWRequirement Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add SOWRequirement</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Id</TableCell> */}
                            <TableCell>SOW</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Technologies</TableCell>
                            <TableCell>TeamSize</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {SOWRequirements.map(SOWRequirement => (
                            <TableRow key={SOWRequirement.id}>
                                {/* <TableCell>{SOWRequirement.id}</TableCell> */}
                                <TableCell>{SOWRequirement.sow}</TableCell>
                                <TableCell>{SOWRequirement.designation}</TableCell>
                                <TableCell>{SOWRequirement.technologies}</TableCell>
                                <TableCell>{SOWRequirement.teamSize}</TableCell>
                                <TableCell>{SOWRequirement.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{SOWRequirement.createdBy}</TableCell>
                                <TableCell>{new Date(SOWRequirement.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{SOWRequirement.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{SOWRequirement.updatedDate ? new Date(SOWRequirement.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(SOWRequirement)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(SOWRequirement.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentSOWRequirement.id ? 'Update SOWRequirement' : 'Add SOWRequirement'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="SOW"
                        name="sow"
                        value={currentSOWRequirement.sow}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Designation"
                        name="designation"
                        value={currentSOWRequirement.designation}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Technologies"
                        name="technologies"
                        value={currentSOWRequirement.technologies}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="TeamSize"
                        name="teamSize"
                        value={currentSOWRequirement.teamSize}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentSOWRequirement.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentSOWRequirement.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentSOWRequirement.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentSOWRequirement.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentSOWRequirement.updatedDate}
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

export default SOWRequirementList;
