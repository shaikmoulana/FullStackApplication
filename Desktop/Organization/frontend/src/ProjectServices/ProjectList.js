import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function ProjectList() {
    const [Projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const [currentProject, setCurrentProject] = useState({
        id: '',
        clientId: '',
        projectName: '',
        technicalProjectManager: '',
        salesContact: '',
        pmo: '',
        sowSubmittedDate: '',
        sowSignedDate: '',
        sowValidTill: '',
        sowLastExtendedDate: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5151/api/Project')
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the Projects!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentProject({
            id: '',
            clientId: '',
            projectName: '',
            technicalProjectManager: '',
            salesContact: '',
            pmo: '',
            sowSubmittedDate: '',
            sowSignedDate: '',
            sowValidTill: '',
            sowLastExtendedDate: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (Project) => {
        setCurrentProject(Project);
        setOpen(true);

    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5151/api/Project/${id}`)
            .then(response => {
                setProjects(Projects.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the Project!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentProject.id) {
            // Update existing Project
            axios.put(`http://localhost:5151/api/Project/${currentProject.id}`, currentProject)
                .then(response => {
                    console.log(response)
                    //setProjects([...Projects, response.data]);
                    // setProjects(response.data);
                    setProjects(Projects.map(tech => tech.id === currentProject.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the Project!', error);
                    setError(error);
                });

        } else {
            // Add new Project
            axios.post('http://localhost:5151/api/Project', currentProject)
                .then(response => {
                    setProjects([...Projects, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the Project!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentProject({ ...currentProject, [name]: value });
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
                <h3>Project Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Project</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>ClientId</TableCell>
                            <TableCell>ProjectName</TableCell>
                            <TableCell>TechnicalProjectManager</TableCell>
                            <TableCell>SalesContact</TableCell>
                            <TableCell>PMO</TableCell>
                            <TableCell>SOWSubmittedDate</TableCell>
                            <TableCell>SOWSigniedDate</TableCell>
                            <TableCell>SOWValidTill</TableCell>
                            <TableCell>SOWLastExtendedDate</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Projects.map(Project => (
                            <TableRow key={Project.id}>
                                <TableCell>{Project.id}</TableCell>
                                <TableCell>{Project.clientId}</TableCell>
                                <TableCell>{Project.projectName}</TableCell>
                                <TableCell>{Project.technicalProjectManager}</TableCell>
                                <TableCell>{Project.salesContact}</TableCell>
                                <TableCell>{Project.pmo}</TableCell>
                                <TableCell>{Project.sowSubmittedDate}</TableCell>
                                <TableCell>{Project.sowSignedDate}</TableCell>
                                <TableCell>{Project.sowValidTill}</TableCell>
                                <TableCell>{Project.sowLastExtendedDate}</TableCell>
                                <TableCell>{Project.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{Project.createdBy}</TableCell>
                                <TableCell>{new Date(Project.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{Project.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{Project.updatedDate ? new Date(Project.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(Project)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(Project.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentProject.id ? 'Update Project' : 'Add Project'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="ClientId"
                        name="clientId"
                        value={currentProject.clientId}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="ProjectName"
                        name="projectName"
                        value={currentProject.projectName}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="TechnicalProjectManager"
                        name="technicalProjectManager"
                        value={currentProject.technicalProjectManager}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="SalesContact"
                        name="salesContact"
                        value={currentProject.salesContact}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="PMO"
                        name="pmo"
                        value={currentProject.pmo}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="SOWSubmittedDate"
                        name="SOWSubmittedDate"
                        value={currentProject.SOWSubmittedDate}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="SOWSignedDate"
                        name="SOWSignedDate"
                        value={currentProject.SOWSignedDate}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="SOWValidTill"
                        name="SOWValidTill"
                        value={currentProject.SOWValidTill}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="SOWLastExtendedDate"
                        name="SOWLastExtendedDate"
                        value={currentProject.SOWLastExtendedDate}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentProject.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentProject.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentProject.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentProject.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentProject.updatedDate}
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

export default ProjectList;
