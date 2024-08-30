
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function EmployeeList() {
    const [Employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({
        id: '',
        name: '',
        designation: '',
        employeeID: '',
        emailId: '',
        department: '',
        reportingTo: '',
        joiningDate: '',
        relievingDate: '',
        projection: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: '',
        password: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5033/api/Employee')
            .then(response => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the Employees!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentEmployee({
            id: '',
            name: '',
            designation: '',
            employeeId: '',
            emailId: '',
            department: '',
            reportingTo: '',
            joiningDate: '',
            relievingDate: '',
            projection: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: '',
            password: ''
        });
        setOpen(true);
    };

    const handleUpdate = (Employee) => {
        setCurrentEmployee(Employee);
        setOpen(true);

    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5033/api/Employee/${id}`)
            .then(response => {
                setEmployees(Employees.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the Employee!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentEmployee.id) {
            // Update existing Employee
            axios.put(`http://localhost:5033/api/Employee/${currentEmployee.id}`, currentEmployee)
                .then(response => {
                    console.log(response)
                    //setEmployees([...Employees, response.data]);
                    // setEmployees(response.data);
                    setEmployees(Employees.map(tech => tech.id === currentEmployee.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the Employee!', error);
                    setError(error);
                });

        } else {
            // Add new Employee
            axios.post('http://localhost:5033/api/Employee', currentEmployee)
                .then(response => {
                    setEmployees([...Employees, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the Employee!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentEmployee({ ...currentEmployee, [name]: value });
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
                <h3>Employee Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Employee</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>EmployeeId</TableCell>
                            <TableCell>EmailId</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>ReportingTo</TableCell>
                            <TableCell>JoiningDate</TableCell>
                            <TableCell>RelievingDate</TableCell>
                            <TableCell>Projection</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Password</TableCell>

                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Employees.map(Employee => (
                            <TableRow key={Employee.id}>
                                <TableCell>{Employee.id}</TableCell>
                                <TableCell>{Employee.name}</TableCell>
                                <TableCell>{Employee.designation}</TableCell>
                                <TableCell>{Employee.employeeID}</TableCell>
                                <TableCell>{Employee.emailId}</TableCell>
                                <TableCell>{Employee.department}</TableCell>
                                <TableCell>{Employee.reportingTo}</TableCell>
                                <TableCell>{Employee.joiningDate}</TableCell>
                                <TableCell>{Employee.relievingDate}</TableCell>
                                <TableCell>{Employee.projection}</TableCell>
                                <TableCell>{Employee.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{Employee.createdBy}</TableCell>
                                <TableCell>{new Date(Employee.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{Employee.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{Employee.updatedDate ? new Date(Employee.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>{Employee.password}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(Employee)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(Employee.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentEmployee.id ? 'Update Employee' : 'Add Employee'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={currentEmployee.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Designation"
                        name="designation"
                        value={currentEmployee.designation}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="EmployeeId"
                        name="employeeId"
                        value={currentEmployee.employeeID}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="emailId"
                        value={currentEmployee.emailId}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="DepartmentId"
                        name="department"
                        value={currentEmployee.department}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Reporting To"
                        name="reportingTo"
                        value={currentEmployee.reportingTo}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Joining Date"
                        name="joiningDate"
                        value={currentEmployee.joiningDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="RelievingDate"
                        name="relievingDate"
                        value={currentEmployee.relievingDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Projection"
                        name="projection"
                        value={currentEmployee.projection}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentEmployee.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentEmployee.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentEmployee.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentEmployee.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentEmployee.updatedDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        name="password"
                        value={currentEmployee.password}
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

export default EmployeeList;
