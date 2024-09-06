//------------------------------------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, MenuItem, Table, InputLabel, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TablePagination, Typography, TableSortLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TechnologyList() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTechId, setDeleteTechId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentTechnology, setCurrentTechnology] = useState({
        id: '',
        name: '',
        department: '',
        isActive: true,
        createdBy: 'SYSTEM',
        createdDate: new Date(),
        updatedBy: '',
        updatedDate: ''
    });
    const [order, setOrder] = useState('asc'); // Order of sorting: 'asc' or 'desc'
    const [orderBy, setOrderBy] = useState('name'); // Column to sort by

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const techResponse = await axios.get('http://localhost:5274/api/Technology');
                setTechnologies(techResponse.data);
            } catch (error) {
                console.error('There was an error fetching the technologies!', error);
                setError(error);
            }
            setLoading(false);
        };

        const fetchDepartments = async () => {
            try {
                const deptResponse = await axios.get('http://localhost:5160/api/Department');
                setDepartments(deptResponse.data);
            } catch (error) {
                console.error('There was an error fetching the departments!', error);
                setError(error);
            }
        };

        fetchTechnologies();
        fetchDepartments();
    }, []);

    // Handle sorting logic
    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedTechnologies = [...technologies].sort((a, b) => {
        const valueA = a[orderBy] || ''; // Use an empty string if the property is undefined
        const valueB = b[orderBy] || ''; // Use an empty string if the property is undefined

        console.log(`Comparing: ${valueA} with ${valueB}`);

        // Ensure that both values are strings before calling localeCompare
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            // Fallback for non-string values
            return order === 'asc' ? (valueA > valueB ? 1 : -1) : (valueB > valueA ? 1 : -1);
        }
    });


    const handleAdd = () => {
        setCurrentTechnology({
            id: '',
            name: '',
            department: '',
            isActive: true,
            createdBy: 'SYSTEM',
            createdDate: new Date(),
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (technology) => {
        setCurrentTechnology(technology);
        setOpen(true);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5274/api/Technology/${id}`)
            .then(response => {
                setTechnologies(technologies.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the technology!', error);
                setError(error);
            });
        setConfirmOpen(false);
    };

    const handleSave = () => {
        if (currentTechnology.id) {
            axios.put(`http://localhost:5274/api/Technology/${currentTechnology.id}`, currentTechnology)
                .then(response => {
                    setTechnologies(technologies.map(tech => tech.id === currentTechnology.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the technology!', error);
                    setError(error);
                });
        } else {
            axios.post('http://localhost:5274/api/Technology', currentTechnology)
                .then(response => {
                    setTechnologies([...technologies, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the technology!', error);
                    setError(error);
                });
        }
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentTechnology({ ...currentTechnology, [name]: value });
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
                <h3>Technology Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Technology</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
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
                                    active={orderBy === 'department'}
                                    direction={orderBy === 'department' ? order : 'asc'}
                                    onClick={() => handleSort('department')}
                                >
                                    Department
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
                        {sortedTechnologies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(technology => (
                            <TableRow key={technology.id}>
                                <TableCell>{technology.name}</TableCell>
                                <TableCell>{technology.department}</TableCell>
                                <TableCell>{technology.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{technology.createdBy}</TableCell>
                                <TableCell>{new Date(technology.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{technology.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{technology.updatedDate ? new Date(technology.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell >
                                    <IconButton onClick={() => handleUpdate(technology)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => confirmDelete(technology.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={technologies.length}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={[10]}
            />

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmOpen}
                onClose={handleConfirmClose}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this technology?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="primary">No</Button>
                    <Button onClick={handleConfirmYes} color="error">Yes</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentTechnology.id ? 'Edit Technology' : 'Add Technology'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Technology Name"
                        name="name"
                        value={currentTechnology.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <InputLabel>Department</InputLabel>
                    <Select
                        name="department"
                        value={currentTechnology.department}
                        onChange={handleChange}
                        fullWidth
                    >
                        {departments.map(dept => (
                            <MenuItem key={dept.id} value={dept.name}>{dept.name}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentTechnology.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentTechnology.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentTechnology.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentTechnology.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentTechnology.updatedDate}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TechnologyList;

