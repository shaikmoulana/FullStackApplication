import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, MenuItem, Table, InputLabel, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, TableSortLabel, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PaginationComponent from '../Components/PaginationComponent'; // Import your PaginationComponent

function EmployeeList() {
    const [Employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTechId, setDeleteTechId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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
        createdBy: 'SYSTEM',
        createdDate: new Date(),
        updatedBy: '',
        updatedDate: '',
        password: '',
        profile: '',
        phoneNo: ''
    });

    const [order, setOrder] = useState('asc'); // Order of sorting: 'asc' or 'desc'
    const [orderBy, setOrderBy] = useState('createdDate'); // Column to sort by
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                //const empResponse = await axios.get('http://localhost:5033/api/Employee');
                const empResponse = await axios.get('http://172.17.31.61:5033/api/employee');
                setEmployees(empResponse.data);
            } catch (error) {
                console.error('There was an error fetching the employees!', error);
                setError(error);
            }
            setLoading(false);
        };

        const fetchDepartments = async () => {
            try {
                //const deptResponse = await axios.get('http://localhost:5160/api/Department');
                const deptResponse = await axios.get('http://172.17.31.61:5160/api/Department');
                setDepartments(deptResponse.data);
            } catch (error) {
                console.error('There was an error fetching the departments!', error);
                setError(error);
            }
        };

        const fetchDesignations = async () => {
            try {
                const desigResponse = await axios.get('http://172.17.31.61:5201/api/Designation');
                setDesignations(desigResponse.data);
            } catch (error) {
                console.error('There was an error fetching the departments!', error);
                setError(error);
            }
        };

        fetchEmployees();
        fetchDepartments();
        fetchDesignations();
    }, []);

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedEmployees = [...Employees].sort((a, b) => {
        const valueA = a[orderBy] || '';
        const valueB = b[orderBy] || '';

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            return order === 'asc' ? (valueA > valueB ? 1 : -1) : (valueB > valueA ? 1 : -1);
        }
    });

    const filteredEmployees = sortedEmployees.filter((employee) =>
    (employee.name && employee.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (employee.designation && employee.designation.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (employee.employeeID && employee.employeeID.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
    (employee.emailId && employee.emailId.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (employee.department && employee.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (employee.reportingTo && employee.reportingTo.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (employee.projection && employee.projection.toLowerCase().includes(searchQuery.toLowerCase()))
);



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
            createdBy: 'SYSTEM',
            createdDate: new Date(),
            updatedBy: '',
            updatedDate: '',
            password: '',
            profile: '',
            phoneNo: '',
            role: ''
        });
        setOpen(true);
    };

    const handleUpdate = (Employee) => {
        setCurrentEmployee(Employee);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5033/api/Employee/${id}`)
        axios.delete(`http://172.17.31.61:5033/api/employee/${id}`)
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
            //axios.put(`http://localhost:5033/api/Employee/${currentEmployee.id}`, currentEmployee)
            axios.put(`http://172.17.31.61:5033/api/employee/${currentEmployee.id}`, currentEmployee)
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
            //axios.post('http://localhost:5033/api/Employee', currentEmployee)
            axios.post('http://172.17.31.61:5033/api/employee', currentEmployee)
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

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const confirmDelete = (id) => {
        setDeleteTechId(id);
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };

    const handleConfirmYes = () => {
        handleDelete(deleteTechId);
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
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    style={{ marginRight: '20px', width: '90%' }}
                />
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Employee</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={() => handleSort('name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'designation'}
                                    direction={orderBy === 'designation' ? order : 'asc'}
                                    onClick={() => handleSort('designation')}
                                >
                                    Designation
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'employeeId'}
                                    direction={orderBy === 'employeeId' ? order : 'asc'}
                                    onClick={() => handleSort('employeeId')}
                                >
                                    EmployeeId
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'emailId'}
                                    direction={orderBy === 'emailId' ? order : 'asc'}
                                    onClick={() => handleSort('emailId')}
                                >
                                    EmailId
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'department'}
                                    direction={orderBy === 'department' ? order : 'asc'}
                                    onClick={() => handleSort('department')}
                                >
                                    Department
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'reportingTo'}
                                    direction={orderBy === 'reportingTo' ? order : 'asc'}
                                    onClick={() => handleSort('reportingTo')}
                                >
                                    ReportingTo
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'joiningDate'}
                                    direction={orderBy === 'joiningDate' ? order : 'asc'}
                                    onClick={() => handleSort('joiningDate')}
                                >
                                    JoiningDate
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'relievingDate'}
                                    direction={orderBy === 'relievingDate' ? order : 'asc'}
                                    onClick={() => handleSort('relievingDate')}
                                >
                                    RelievingDate
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'projection'}
                                    direction={orderBy === 'projection' ? order : 'asc'}
                                    onClick={() => handleSort('projection')}
                                >
                                    Projection
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'phoneNo'}
                                    direction={orderBy === 'phoneNo' ? order : 'asc'}
                                    onClick={() => handleSort('phoneNo')}
                                >
                                    PhoneNo
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'profile'}
                                    direction={orderBy === 'profile' ? order : 'asc'}
                                    onClick={() => handleSort('profile')}
                                >
                                    Profile
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'isActive'}
                                    direction={orderBy === 'isActive' ? order : 'asc'}
                                    onClick={() => handleSort('isActive')}
                                >
                                    Is Active
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'createdBy'}
                                    direction={orderBy === 'createdBy' ? order : 'asc'}
                                    onClick={() => handleSort('createdBy')}
                                >
                                    Created By
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'createdDate'}
                                    direction={orderBy === 'createdDate' ? order : 'asc'}
                                    onClick={() => handleSort('createdDate')}
                                >
                                    Created Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'updatedBy'}
                                    direction={orderBy === 'updatedBy' ? order : 'asc'}
                                    onClick={() => handleSort('updatedBy')}
                                >
                                    Updated By
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'updatedDate'}
                                    direction={orderBy === 'updatedDate' ? order : 'asc'}
                                    onClick={() => handleSort('updatedDate')}
                                >
                                    Updated Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((Employee) => (
                            <TableRow key={Employee.id}>
                                <TableCell>{Employee.name}</TableCell>
                                <TableCell>{Employee.designation}</TableCell>
                                <TableCell>{Employee.employeeID}</TableCell>
                                <TableCell>{Employee.emailId}</TableCell>
                                <TableCell>{Employee.department}</TableCell>
                                <TableCell>{Employee.reportingTo}</TableCell>
                                <TableCell>{Employee.joiningDate}</TableCell>
                                <TableCell>{Employee.relievingDate}</TableCell>
                                <TableCell>{Employee.projection}</TableCell>
                                <TableCell>{Employee.phoneNo}</TableCell>
                                <TableCell>{Employee.profile}</TableCell>
                                <TableCell>{Employee.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{Employee.createdBy}</TableCell>
                                <TableCell>{new Date(Employee.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{Employee.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{Employee.updatedDate ? new Date(Employee.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                {/* <TableCell>{Employee.password}</TableCell> */}
                                <TableCell >
                                    <IconButton onClick={() => handleUpdate(Employee)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => confirmDelete(Employee.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <PaginationComponent
                    count={filteredEmployees.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handlePageChange={handlePageChange}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                />
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
                    <InputLabel>Designation</InputLabel>
                    <Select
                        margin="dense"
                        name="designation"
                        value={currentEmployee.designation}
                        onChange={handleChange}
                        fullWidth
                    >
                        {designations.map((designation) => (
                            <MenuItem key={designation.id} value={designation.name}>
                                {designation.name}
                            </MenuItem>
                        ))}
                    </Select>
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
                    <InputLabel>Department</InputLabel>
                    <Select
                        margin="dense"
                        name="department"
                        value={currentEmployee.department}
                        onChange={handleChange}
                        fullWidth
                    >
                        {departments.map((department) => (
                            <MenuItem key={department.id} value={department.name}>
                                {department.name}
                            </MenuItem>
                        ))}
                    </Select>
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
                    <TextField
                        margin="dense"
                        label="PhoneNumber"
                        name="phoneNo"
                        value={currentEmployee.phoneNo}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Profile"
                        name="profile"
                        value={currentEmployee.profile}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">
                        {currentEmployee.id ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this technology?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>No</Button>
                    <Button onClick={handleConfirmYes} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EmployeeList;
