import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function ProjectTechnologyList() {
    const [ProjectTechnologys, setProjectTechnologys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentProjectTechnology, setCurrentProjectTechnology] = useState({
        id: '',
        project: '',
        technology: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5151/api/ProjectTechnology')
            .then(response => {
                setProjectTechnologys(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the ProjectTechnologys!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentProjectTechnology({
            id: '',
            project: '',
            technology: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (ProjectTechnology) => {
        setCurrentProjectTechnology(ProjectTechnology);
        setOpen(true);

    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5151/api/ProjectTechnology/${id}`)
            .then(response => {
                setProjectTechnologys(ProjectTechnologys.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the ProjectTechnology!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentProjectTechnology.id) {
            // Update existing ProjectTechnology
            axios.put(`http://localhost:5151/api/ProjectTechnology/${currentProjectTechnology.id}`, currentProjectTechnology)
                .then(response => {
                    console.log(response)
                    //setProjectTechnologys([...ProjectTechnologys, response.data]);
                    // setProjectTechnologys(response.data);
                    setProjectTechnologys(ProjectTechnologys.map(tech => tech.id === currentProjectTechnology.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the ProjectTechnology!', error);
                    setError(error);
                });

        } else {
            // Add new ProjectTechnology
            axios.post('http://localhost:5151/api/ProjectTechnology', currentProjectTechnology)
                .then(response => {
                    setProjectTechnologys([...ProjectTechnologys, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the ProjectTechnology!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentProjectTechnology({ ...currentProjectTechnology, [name]: value });
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
                <h3>ProjectTechnology Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add ProjectTechnology</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Project</TableCell>
                            <TableCell>Technology</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ProjectTechnologys.map(ProjectTechnology => (
                            <TableRow key={ProjectTechnology.id}>
                                <TableCell>{ProjectTechnology.id}</TableCell>
                                <TableCell>{ProjectTechnology.project}</TableCell>
                                <TableCell>{ProjectTechnology.technology}</TableCell>
                                <TableCell>{ProjectTechnology.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{ProjectTechnology.createdBy}</TableCell>
                                <TableCell>{new Date(ProjectTechnology.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{ProjectTechnology.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{ProjectTechnology.updatedDate ? new Date(ProjectTechnology.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(ProjectTechnology)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(ProjectTechnology.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentProjectTechnology.id ? 'Update ProjectTechnology' : 'Add ProjectTechnology'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Project"
                        name="project"
                        value={currentProjectTechnology.project}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Technology"
                        name="technology"
                        value={currentProjectTechnology.technology}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentProjectTechnology.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentProjectTechnology.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentProjectTechnology.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentProjectTechnology.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentProjectTechnology.updatedDate}
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

export default ProjectTechnologyList;
