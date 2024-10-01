import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled, ListItemText, Checkbox, Select, MenuItem, Table, InputLabel, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, TableSortLabel, InputAdornment, FormHelperText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PaginationComponent from '../Components/PaginationComponent'; // Import your PaginationComponent
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import '../App.css';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function EmployeeList() {
    const [Employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [reportingTo, setReporting] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTechId, setDeleteTechId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentEmployee, setCurrentEmployee] = useState({
        name: '',
        designation: '',
        employeeID: '',
        emailId: '',
        department: '',
        reportingTo: '',
        joiningDate: '',
        relievingDate: '',
        projection: '',
        password: '',
        profile: '',
        phoneNo: '',
        role: '',
        technology: []
    });

    const [order, setOrder] = useState('asc'); // Order of sorting: 'asc' or 'desc'
    const [orderBy, setOrderBy] = useState('createdDate'); // Column to sort by
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [validationErrors, setValidationErrors] = useState({}); // State for validation errors


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                // const empResponse = await axios.get('http://localhost:5733/api/Employee');
                const empResponse = await axios.get('http://172.17.31.61:5733/api/employee');
                setEmployees(empResponse.data);
            } catch (error) {
                console.error('There was an error fetching the employees!', error);
                setError(error);
            }
            setLoading(false);
        };

        const fetchReportingTo = async () => {
            try {
                // const repoResponse = await axios.get('http://localhost:5733/api/Employee');
                const repoResponse = await axios.get('http://172.17.31.61:5733/api/employee');
                setReporting(repoResponse.data);
            } catch (error) {
                console.error('There was an error fetching the repoting!', error);
                setError(error);
            }
            setLoading(false);
        };

        const fetchDepartments = async () => {
            try {
                // const deptResponse = await axios.get('http://localhost:5560/api/Department');
                const deptResponse = await axios.get('http://172.17.31.61:5160/api/department');
                setDepartments(deptResponse.data);
            } catch (error) {
                console.error('There was an error fetching the departments!', error);
                setError(error);
            }
            setLoading(false);
        };

        const fetchDesignations = async () => {
            try {
                // const desigResponse = await axios.get('http://localhost:5501/api/Designation');
                const desigResponse = await axios.get('http://172.17.31.61:5201/api/designation');
                setDesignations(desigResponse.data);
            } catch (error) {
                console.error('There was an error fetching the departments!', error);
                setError(error);
            }
            setLoading(false);
        };

        const fetchTechnologies = async () => {
            try {
                // const techResponse = await axios.get('http://localhost:5574/api/Technology');
                const techResponse = await axios.get('http://172.17.31.61:5274/api/technology');
                setTechnologies(techResponse.data);
            } catch (error) {
                console.error('There was an error fetching the technologies!', error);
                setError(error);
            }
            setLoading(false);
        };

        const fetchRole = async () => {
            try {
                // const roleResponse = await axios.get('http://localhost:5763/api/Role');
                const roleResponse = await axios.get('http://172.17.31.61:5063/api/role');
                setRoles(roleResponse.data);
            } catch (error) {
                console.error('There was an error fetching the roles!', error);
                setError(error);
            }
            setLoading(false);
        };

        fetchEmployees();
        fetchDepartments();
        fetchDesignations();
        fetchTechnologies();
        fetchReportingTo();
        fetchRole();
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
        (employee.name && typeof employee.name === 'string' &&
            employee.name.toLowerCase().includes(searchQuery.toLowerCase())) ||

        (employee.designation && typeof employee.designation === 'string' &&
            employee.designation.toLowerCase().includes(searchQuery.toLowerCase())) ||

        (employee.employeeID && typeof employee.employeeID === 'string' &&
            employee.employeeID.toLowerCase().includes(searchQuery.toLowerCase())) ||

        (employee.emailId && typeof employee.emailId === 'string' &&
            employee.emailId.toLowerCase().includes(searchQuery.toLowerCase())) ||

        (employee.department && typeof employee.department === 'string' &&
            employee.department.toLowerCase().includes(searchQuery.toLowerCase())) ||

        (employee.reportingTo && typeof employee.reportingTo === 'string' &&
            employee.reportingTo.toLowerCase().includes(searchQuery.toLowerCase())) ||

        (employee.projection && typeof employee.projection === 'string' &&
            employee.projection.toLowerCase().includes(searchQuery.toLowerCase()))
    );



    const handleAdd = () => {
        setCurrentEmployee({
            name: '',
            designation: '',
            employeeId: '',
            emailId: '',
            department: '',
            reportingTo: '',
            joiningDate: '',
            relievingDate: '',
            projection: '',
            password: '',
            profile: '',
            phoneNo: '',
            role: '',
            technology: []
        });
        setOpen(true);
    };

    const handleUpdate = (Employee) => {
        setCurrentEmployee(Employee);
        setOpen(true);

    };

    const handleDelete = (id) => {
        // axios.delete(`http://localhost:5733/api/Employee/${id}`)
        axios.delete(`http://172.17.31.61:5733/api/employee/${id}`)
            .then(response => {
                setEmployees(Employees.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the Employee!', error);
                setError(error);
            });
        setConfirmOpen(false);
    };

    // Validation logic for the form
    const validateForm = () => {
        let errors = {};
        // const errors = { name: '', designation: '', employeeID: '' };

        // Regex for validating the name field
        const nameValidationRegex = /^[a-zA-Z\s]+$/;

        if (!currentEmployee.name) {
            errors.name = "Name is required";
        } else if (!nameValidationRegex.test(currentEmployee.name)) {
            errors.name = "Name should only contain letters and spaces";
        }

        if (!currentEmployee.designation) {
            errors.designation = "Designation is required";
        }

        // // Log currentEmployee to debug
        console.log("Current Employee:", currentEmployee);

        // Ensure currentEmployee.employeeID is a string and trim it
        //const employeeID = currentEmployee.employeeID || '';  // Default to empty string

        const employeeIdPattern = /^\d+$/;
        // Check if EmployeeID is provided
        if (!currentEmployee.employeeID || !currentEmployee.employeeID.trim()) {
            errors.employeeID = "Employee ID is required";  // Check if Employee ID is empty or just whitespace
        }
        // Check if EmployeeID contains only digits
        else if (!employeeIdPattern.test(currentEmployee.employeeID)) {
            errors.employeeID = "Employee ID must contain digits only";  // Validate for numeric values
        }
        // Check if EmployeeID is unique
        else if (
            Employees.some(emp =>
                emp.employeeID === currentEmployee.employeeID && emp.id !== currentEmployee.id
            )
        ) {
            errors.employeeID = "Employee ID must be unique";  // Check for uniqueness
        }

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@miraclesoft\.com$/;  // Email must end with @miraclesoft.com
        const emailId = currentEmployee.emailId || '';  // Ensure emailId is a string
        if (!emailId.trim()) {
            errors.emailId = "Email ID is required";  // Check if Email ID is empty
        } else if (!emailPattern.test(emailId)) {
            errors.emailId = "Email ID must be in the format @miraclesoft.com";  // Validate email format
        } else if (
            Employees.some(emp => emp.emailId === emailId && emp.id !== currentEmployee.id)) {
            errors.emailId = "Email ID must be unique";  // Check for uniqueness
        }

        // Designation validation
        if (!currentEmployee.department) {
            errors.department = "Department is required";  // Check if Department is not selected
        }

        // Technology validation
        if (!currentEmployee.technology) {
            errors.technology = "Technology is required";  // Check if Department is not selected
        }

        // Reporting validation
        if (!currentEmployee.reportingTo) {
            errors.reportingTo = "Reporting is required";  // Check if Department is not selected
        }

        // Role validation
        if (!currentEmployee.role) {
            errors.role = "Role is required";  // Check if Department is not selected
        }

        // Password validation
        const password = currentEmployee.password || '';  // Ensure password is a string
        if (!password.trim()) {
            errors.password = "Password is required";  // Check if Password is empty
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters long";  // Minimum length requirement
        } else if (!/[a-zA-Z]/.test(password) || !/\d/.test(password) || !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
        ) {
            errors.password = "Password must contain both letters and numbers";  // Check for letters and numbers
        }

        // Phone number validation pattern (digits only)
        const phonePattern = /^\d+$/;  // Phone number must contain digits only

        const phoneNo = currentEmployee.phoneNo || '';
        if (!phoneNo.trim()) {
            errors.phoneNo = "Phone number is required";  // Check if Phone number is empty
        } else if (!phonePattern.test(phoneNo)) {
            errors.phoneNo = "Phone number must contain digits only";  // Validate phone number for numeric values
        }

        // Date Validations
        const { joiningDate, relievingDate } = setCurrentEmployee;

        // Check for empty dates
        if (!joiningDate) {
            errors.joiningDate = 'Joining Date cannot be left selected';
        }
        if (!relievingDate) {
            errors.relievingDate = 'Relieving Date cannot be left selected';
        }

        // Check if joining and relieving dates are the same
        if (joiningDate && relievingDate && dayjs(joiningDate).isSame(dayjs(relievingDate), 'day')) {
            errors.joiningDate = "Joining date and relieving date cannot be the same"; // Add validation error
        }

        // // Projection Validation Suggestion - 1 
        // const projectionValidationRegex = /^[a-zA-Z\s]+$/;

        // if (!currentEmployee.projection) {
        //     errors.projection = "Projection is required";
        // } else if (!projectionValidationRegex.test(currentEmployee.projection)) {
        //     errors.projection = "Projection should only contain letters and spaces";
        // }


        // Projection Validation Suggestion - 2
        const projectionPattern = /^[a-zA-Z\s]+$/;
        const projection = currentEmployee.projection || '';
        if (!projection.trim()) {
            errors.projection = "Projection is required";
        } else if (!projectionPattern.test(projection)) {
            errors.projection = "Projection must contain only letters and spaces";
        } else if (
            Employees.some(emp =>
                emp.projection === projection && emp.id !== currentEmployee.id
            )
        ) {
            errors.projection = "Projection must be unique";
        }

        setValidationErrors(errors);

        // Return true if no errors
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {

        // Validate the form before saving
        if (!validateForm()) {
            return; // If validation fails, stop execution
        }

        const employeeToSave = {
            ...currentEmployee,
            technology: currentEmployee.technology.map(tech => {
                const selectedTech = technologies.find(t => t.name === tech);
                return selectedTech ? selectedTech.id : null;
            }).filter(id => id !== null) // Convert technology names to IDs
        };

        if (currentEmployee.id) {
            // axios.put(`http://localhost:5733/api/Employee/${currentEmployee.id}`, employeeToSave)
            axios.put(`http://172.17.31.61:5733/api/employee/${currentEmployee.id}`, employeeToSave)
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
            // axios.post('http://localhost:5733/api/Employee', employeeToSave)
            axios.post('http://172.17.31.61:5733/api/employee', employeeToSave)
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

    const handleJoiningDateChange = (newDate) => {
        setCurrentEmployee((prevEmployee) => ({
            ...prevEmployee,
            joiningDate: newDate ? newDate.toISOString() : "",
        }));
    };

    const handleRelievingDateChange = (newDate) => {
        setCurrentEmployee((prevEmployee) => ({
            ...prevEmployee,
            relievingDate: newDate ? newDate.toISOString() : "",
        }));
    };

    const handleTechnologyChange = (event) => {
        const { value } = event.target;
        setCurrentEmployee({
            ...currentEmployee,
            technology: typeof value === 'string' ? value.split(',') : value  // Handle multiple selection
        });
    };

    // const VisuallyHiddenInput = styled("input")({
    //     width: 1,
    // });

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
                                    active={orderBy === 'role'}
                                    direction={orderBy === 'role' ? order : 'asc'}
                                    onClick={() => handleSort('role')}
                                >
                                    Role
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
                                <TableCell>{Employee.role}</TableCell>
                                <TableCell>{Employee.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{Employee.createdBy}</TableCell>
                                <TableCell>{new Date(Employee.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{Employee.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{new Date(Employee.updatedDate).toLocaleString() || 'N/A'}</TableCell>
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
                        error={!!validationErrors.name}
                        fullWidth
                    />
                    <FormHelperText error={!!validationErrors.name}>
                        {validationErrors.name}
                    </FormHelperText>
                    <InputLabel>Designation</InputLabel>
                    <Select
                        margin="dense"
                        name="designation"
                        value={currentEmployee.designation}
                        onChange={handleChange}
                        error={!!validationErrors.designation}
                        fullWidth
                    >
                        {designations.map((designation) => (
                            <MenuItem key={designation.id} value={designation.name}>
                                {designation.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error={!!validationErrors.designation}>
                        {validationErrors.designation}
                    </FormHelperText>
                    <TextField
                        margin="dense"
                        label="EmployeeId"
                        name="employeeId"
                        value={currentEmployee.employeeID}
                        onChange={handleChange}
                        error={!!validationErrors.employeeID}
                        fullWidth
                    />
                    <FormHelperText error={!!validationErrors.employeeID}>
                        {validationErrors.employeeID}
                    </FormHelperText>
                    <TextField
                        margin="dense"
                        label="Email"
                        name="emailId"
                        value={currentEmployee.emailId}
                        onChange={handleChange}
                        error={!!validationErrors.emailId}
                        fullWidth
                    />
                    <FormHelperText error={!!validationErrors.emailId}>
                        {validationErrors.emailId}
                    </FormHelperText>
                    <InputLabel>Department</InputLabel>
                    <Select
                        margin="dense"
                        name="department"
                        value={currentEmployee.department}
                        onChange={handleChange}
                        error={!!validationErrors.department}
                        fullWidth
                    >
                        {departments.map((department) => (
                            <MenuItem key={department.id} value={department.name}>
                                {department.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error={!!validationErrors.department}>
                        {validationErrors.department}
                    </FormHelperText>
                    <InputLabel id="demo-simple-select-label">Technology</InputLabel>
                    <Select
                        label="Technologies"
                        //  placeholder="Technologies"
                        name="technologies"
                        multiple
                        value={currentEmployee.technology}
                        onChange={handleTechnologyChange}
                        renderValue={(selected) => selected.join(', ')}
                        fullWidth
                    >
                        {technologies.map((tech) => (
                            <MenuItem key={tech.id} value={tech.name}>
                                <Checkbox checked={currentEmployee.technology.indexOf(tech.name) > -1} />
                                <ListItemText primary={tech.name} />
                            </MenuItem>
                        ))}
                    </Select>

                    <InputLabel>ReportingTo</InputLabel>
                    <Select
                        margin="dense"
                        name="reportingTo"
                        value={currentEmployee.reportingTo}
                        onChange={handleChange}
                        error={!!validationErrors.reportingTo}
                        fullWidth
                    >
                        {reportingTo.map((report) => (
                            <MenuItem key={report.id} value={report.name}>
                                {report.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error={!!validationErrors.reportingTo}>
                        {validationErrors.reportingTo}
                    </FormHelperText>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Joining Date"
                            value={currentEmployee.joiningDate ? dayjs(currentEmployee.joiningDate) : null}
                            onChange={handleJoiningDateChange}
                            error={!!validationErrors.joiningDate}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth margin="dense" />
                            )}
                        />
                    </LocalizationProvider>
                    <FormHelperText error={!!validationErrors.joiningDate}>
                        {validationErrors.joiningDate}
                    </FormHelperText>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Relieving Date"
                            value={currentEmployee.relievingDate ? dayjs(currentEmployee.relievingDate) : null}
                            onChange={handleRelievingDateChange}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth margin="dense" />
                            )}
                        />
                    </LocalizationProvider>

                    <TextField
                        margin="dense"
                        label="Projection"
                        name="projection"
                        value={currentEmployee.projection}
                        onChange={handleChange}
                        error={!!validationErrors.projection}
                        fullWidth
                    />
                    <FormHelperText error={!!validationErrors.projection}>
                        {validationErrors.projection}
                    </FormHelperText>
                    <TextField
                        margin="dense"
                        label="Password"
                        name="password"
                        value={currentEmployee.password}
                        onChange={handleChange}
                        error={!!validationErrors.password}
                        fullWidth
                    />
                    <FormHelperText error={!!validationErrors.password}>
                        {validationErrors.password}
                    </FormHelperText>
                    <TextField
                        margin="dense"
                        label="PhoneNumber"
                        name="phoneNo"
                        value={currentEmployee.phoneNo}
                        onChange={handleChange}
                        error={!!validationErrors.phoneNo}
                        fullWidth
                    />
                    <FormHelperText error={!!validationErrors.phoneNo}>
                        {validationErrors.phoneNo}
                    </FormHelperText>
                    <TextField
                        margin="dense"
                        label="Profile"
                        name="profile"
                        value={currentEmployee.profile}
                        onChange={handleChange}
                        fullWidth
                    />
                    <InputLabel>Role</InputLabel>
                    <Select
                        margin="dense"
                        name="role"
                        value={currentEmployee.role}
                        onChange={handleChange}
                        error={!!validationErrors.role}
                        fullWidth
                    >
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.roleName}>
                                {role.roleName}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error={!!validationErrors.role}>
                        {validationErrors.role}
                    </FormHelperText>
                    {/* <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            multiple
                        />
                    </Button> */}
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