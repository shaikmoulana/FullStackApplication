import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function ProjectEmployeeList() {
    const [ProjectEmployees, setProjectEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentProjectEmployee, setCurrentProjectEmployee] = useState({
        id: '',
        project: '',
        employee: '',
        startDate: '',
        endDate: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        //axios.get('http://localhost:5151/api/ProjectEmployee')
        axios.get('http://172.17.31.61:5151/api/projectEmployee')
            .then(response => {
                setProjectEmployees(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the ProjectEmployees!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentProjectEmployee({
            id: '',
            project: '',
            employee: '',
            startDate: '',
            endDate: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (ProjectEmployee) => {
        setCurrentProjectEmployee(ProjectEmployee);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5151/api/ProjectEmployee/${id}`)
        axios.delete(`http://172.17.31.61:5151/api/projectEmployee/${id}`)
            .then(response => {
                setProjectEmployees(ProjectEmployees.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the ProjectEmployee!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentProjectEmployee.id) {
            // Update existing ProjectEmployee
            //axios.put(`http://localhost:5151/api/ProjectEmployee/${currentProjectEmployee.id}`, currentProjectEmployee)
            axios.put(`http://172.17.31.61:5151/api/projectEmployee/${currentProjectEmployee.id}`, currentProjectEmployee)
                .then(response => {
                    console.log(response)
                    //setProjectEmployees([...ProjectEmployees, response.data]);
                    // setProjectEmployees(response.data);
                    setProjectEmployees(ProjectEmployees.map(tech => tech.id === currentProjectEmployee.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the ProjectEmployee!', error);
                    setError(error);
                });

        } else {
            // Add new ProjectEmployee
            //axios.post('http://localhost:5151/api/ProjectEmployee', currentProjectEmployee)
            axios.post('http://172.17.31.61:5151/api/projectEmployee', currentProjectEmployee)
                .then(response => {
                    setProjectEmployees([...ProjectEmployees, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the ProjectEmployee!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentProjectEmployee({ ...currentProjectEmployee, [name]: value });
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
                <h3>ProjectEmployee Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add ProjectEmployee</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Id</TableCell> */}
                            <TableCell>Project</TableCell>
                            <TableCell>Empoyee</TableCell>
                            <TableCell>StartDate</TableCell>
                            <TableCell>EndDate</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ProjectEmployees.map(ProjectEmployee => (
                            <TableRow key={ProjectEmployee.id}>
                                {/* <TableCell>{ProjectEmployee.id}</TableCell> */}
                                <TableCell>{ProjectEmployee.project}</TableCell>
                                <TableCell>{ProjectEmployee.employee}</TableCell>
                                <TableCell>{ProjectEmployee.startDate}</TableCell>
                                <TableCell>{ProjectEmployee.endDate}</TableCell>
                                <TableCell>{ProjectEmployee.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{ProjectEmployee.createdBy}</TableCell>
                                <TableCell>{new Date(ProjectEmployee.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{ProjectEmployee.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{ProjectEmployee.updatedDate ? new Date(ProjectEmployee.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(ProjectEmployee)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(ProjectEmployee.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentProjectEmployee.id ? 'Update ProjectEmployee' : 'Add ProjectEmployee'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Project"
                        name="project"
                        value={currentProjectEmployee.project}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Employee"
                        name="employee"
                        value={currentProjectEmployee.employee}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="StartDate"
                        name="startDate"
                        value={currentProjectEmployee.startDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="EndDate"
                        name="endDate"
                        value={currentProjectEmployee.endDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentProjectEmployee.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentProjectEmployee.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentProjectEmployee.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentProjectEmployee.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentProjectEmployee.updatedDate}
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

export default ProjectEmployeeList;
