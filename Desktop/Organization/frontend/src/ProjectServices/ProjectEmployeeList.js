import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, MenuItem, Table, InputLabel, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, TableSortLabel, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PaginationComponent from '../Components/PaginationComponent'; // Import your PaginationComponent

function ProjectEmployeeList() {
    const [ProjectEmployees, setProjectEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTechId, setDeleteTechId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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

    const [order, setOrder] = useState('asc'); // Order of sorting: 'asc' or 'desc'
    const [orderBy, setOrderBy] = useState('createdDate'); // Column to sort by
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

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

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedProjectEmployees = [...ProjectEmployees].sort((a, b) => {
        const valueA = a[orderBy] || '';
        const valueB = b[orderBy] || '';

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            return order === 'asc' ? (valueA > valueB ? 1 : -1) : (valueB > valueA ? 1 : -1);
        }
    });

    const filteredProjectEmployees = sortedProjectEmployees.filter((ProjectEmployees) =>
        ProjectEmployees.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ProjectEmployees.employee.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <h3>ProjectEmployee Table List</h3>
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
                <Button variant="contained" color="primary" onClick={handleAdd}>Add ProjectEmployee</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'project'}
                                    direction={orderBy === 'project' ? order : 'asc'}
                                    onClick={() => handleSort('project')}
                                >
                                    Project
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'employee'}
                                    direction={orderBy === 'employee' ? order : 'asc'}
                                    onClick={() => handleSort('employee')}
                                >
                                    Employee
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'startDate'}
                                    direction={orderBy === 'startDate' ? order : 'asc'}
                                    onClick={() => handleSort('startDate')}
                                >
                                    StartDate
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'endDate'}
                                    direction={orderBy === 'endDate' ? order : 'asc'}
                                    onClick={() => handleSort('endDate')}
                                >
                                    EndDate
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProjectEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ProjectEmployee) => (
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
                                <TableCell >
                                    <IconButton onClick={() => handleUpdate(ProjectEmployee)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => confirmDelete(ProjectEmployee.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <PaginationComponent
                    count={filteredProjectEmployees.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handlePageChange={handlePageChange}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                />
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
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">
                        {currentProjectEmployee.id ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this employee project?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>No</Button>
                    <Button onClick={handleConfirmYes} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ProjectEmployeeList;
