import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PaginationComponent from '../Components/PaginationComponent'; // Import your PaginationComponent
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, TableSortLabel, InputAdornment } from '@mui/material';

function DepartmentList() {
    const [departments, setdepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTechId, setDeleteTechId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentDepartment, setCurrentDepartment] = useState({
        id: '',
        name: '',
        isActive: true,
        createdBy: 'SYSTEM',
        createdDate: new Date(),
        updatedBy: '',
        updatedDate: ''
    });

    const [order, setOrder] = useState('asc'); // Order of sorting: 'asc' or 'desc'
    const [orderBy, setOrderBy] = useState('createdDate'); // Column to sort by
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

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

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedDepartments = [...departments].sort((a, b) => {
        const valueA = a[orderBy] || '';
        const valueB = b[orderBy] || '';

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            return order === 'asc' ? (valueA > valueB ? 1 : -1) : (valueB > valueA ? 1 : -1);
        }
    });

    const filteredDepartments = sortedDepartments.filter((department) =>
        department.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


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
                <h3>Department Table List</h3>
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
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Department</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* Sorting logic */}
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={() => handleSort('name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            {/* <TableCell>Name</TableCell> */}
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
                        {filteredDepartments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((Department) => (
                            <TableRow key={Department.id}>
                                {/* <TableCell>{Department.id}</TableCell> */}
                                <TableCell>{Department.name}</TableCell>
                                <TableCell>{Department.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{Department.createdBy}</TableCell>
                                <TableCell>{new Date(Department.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{Department.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{Department.updatedDate ? new Date(Department.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell >
                                    <IconButton onClick={() => handleUpdate(Department)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => confirmDelete(Department.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <PaginationComponent
                    count={filteredDepartments.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handlePageChange={handlePageChange}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                />
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
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">
                        {currentDepartment.id ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this Department?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>No</Button>
                    <Button onClick={handleConfirmYes} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DepartmentList;
