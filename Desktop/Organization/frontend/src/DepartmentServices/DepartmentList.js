import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function DepartmentList() {
    const [departments, setdepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState({
        id: '',
        name: '',
        isActive: true,
        createdBy: 'SYSTEM',
        createdDate: new Date(),
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        //axios.get('http://localhost:5160/api/Department')
        axios.get('http://172.17.31.61:5160/api/department')
            .then(response => {
                setdepartments(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the departments!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentDepartment({
            id: '',
            name: '',
            isActive: true,
            createdBy: 'SYSTEM',
            createdDate: new Date(),
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (Department) => {
        setCurrentDepartment(Department);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5160/api/Department/${id}`)
        axios.delete(`http://172.17.31.61:5160/api/department/${id}`)
            .then(response => {
                setdepartments(departments.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the Department!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentDepartment.id) {
            // Update existing Department
            //axios.put(`http://localhost:5160/api/Department/${currentDepartment.id}`, currentDepartment)
            axios.put(`http://172.17.31.61:5160/api/department/${currentDepartment.id}`, currentDepartment)
                .then(response => {
                    console.log(response)
                    //setdepartments([...departments, response.data]);
                    // setdepartments(response.data);
                    setdepartments(departments.map(tech => tech.id === currentDepartment.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the Department!', error);
                    setError(error);
                });

        } else {
            // Add new Department
            //axios.post('http://localhost:5160/api/Department', currentDepartment)
            axios.post('http://172.17.31.61:5160/api/department', currentDepartment)
                .then(response => {
                    setdepartments([...departments, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the Department!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentDepartment({ ...currentDepartment, [name]: value });
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
                <h3>Department Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Department</Button>
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
                        {departments.map(Department => (
                            <TableRow key={Department.id}>
                                {/* <TableCell>{Department.id}</TableCell> */}
                                <TableCell>{Department.name}</TableCell>
                                <TableCell>{Department.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{Department.createdBy}</TableCell>
                                <TableCell>{new Date(Department.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{Department.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{Department.updatedDate ? new Date(Department.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(Department)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(Department.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentDepartment.id ? 'Update Department' : 'Add Department'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={currentDepartment.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentDepartment.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentDepartment.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentDepartment.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentDepartment.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentDepartment.updatedDate}
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

export default DepartmentList;
