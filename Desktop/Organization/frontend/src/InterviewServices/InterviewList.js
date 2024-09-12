import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, MenuItem, Table, InputLabel, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, TableSortLabel, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PaginationComponent from '../Components/PaginationComponent'; // Import your PaginationComponent

function InterviewList() {
    const [Interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTechId, setDeleteTechId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentInterview, setCurrentInterview] = useState({
        id: '',
        sowRequirement: '',
        name: '',
        interviewDate: '',
        yearsOfExperience: '',
        status: '',
        on_Boarding: '',
        recruiter: '',
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
        //axios.get('http://localhost:5200/api/Interview')
        axios.get('http://172.17.31.61:5200/api/interview')
            .then(response => {
                setInterviews(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the Interviews!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedInterviews = [...Interviews].sort((a, b) => {
        const valueA = a[orderBy] || '';
        const valueB = b[orderBy] || '';

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            return order === 'asc' ? (valueA > valueB ? 1 : -1) : (valueB > valueA ? 1 : -1);
        }
    });

    const filteredInterviews = sortedInterviews.filter((Interviews) =>
        Interviews.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Interviews.sowRequirement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Interviews.recruiter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Interviews.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleAdd = () => {
        setCurrentInterview({
            id: '',
            sowRequirement: '',
            name: '',
            interviewDate: '',
            yearsOfExperience: '',
            status: '',
            on_Boarding: '',
            recruiter: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (Interview) => {
        setCurrentInterview(Interview);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5200/api/Interview/${id}`)
        axios.delete(`http://172.17.31.61:5200/api/interview/${id}`)
            .then(response => {
                setInterviews(Interviews.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the Interview!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentInterview.id) {
            // Update existing Interview
            //axios.put(`http://localhost:5200/api/Interview/${currentInterview.id}`, currentInterview)
            axios.put(`http://172.17.31.61:5200/api/interview/${currentInterview.id}`, currentInterview)
                .then(response => {
                    console.log(response)
                    //setInterviews([...Interviews, response.data]);
                    // setInterviews(response.data);
                    setInterviews(Interviews.map(tech => tech.id === currentInterview.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the Interview!', error);
                    setError(error);
                });

        } else {
            // Add new Interview
            //axios.post('http://localhost:5200/api/Interview', currentInterview)
            axios.post('http://172.17.31.61:5200/api/interview', currentInterview)
                .then(response => {
                    setInterviews([...Interviews, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the Interview!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentInterview({ ...currentInterview, [name]: value });
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
                <h3>Interview Table List</h3>
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
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Interview</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'sowRequirement'}
                                    direction={orderBy === 'sowRequirement' ? order : 'asc'}
                                    onClick={() => handleSort('sowRequirement')}
                                >
                                    SOWRequirement
                                </TableSortLabel>
                            </TableCell>
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
                                    active={orderBy === 'interviewDate'}
                                    direction={orderBy === 'interviewDate' ? order : 'asc'}
                                    onClick={() => handleSort('interviewDate')}
                                >
                                    InterviewDate
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'yearsOfExperience'}
                                    direction={orderBy === 'yearsOfExperience' ? order : 'asc'}
                                    onClick={() => handleSort('yearsOfExperience')}
                                >
                                    YearsOfExperience
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'status'}
                                    direction={orderBy === 'status' ? order : 'asc'}
                                    onClick={() => handleSort('status')}
                                >
                                    Status
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'on_Boarding'}
                                    direction={orderBy === 'on_Boarding' ? order : 'asc'}
                                    onClick={() => handleSort('on_Boarding')}
                                >
                                    On_Boarding
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'recuriter'}
                                    direction={orderBy === 'recuriter' ? order : 'asc'}
                                    onClick={() => handleSort('recuriter')}
                                >
                                    Recuriter
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
                        {filteredInterviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((Interview) => (
                            <TableRow key={Interview.id}>
                                {/* <TableCell>{Interview.id}</TableCell> */}
                                <TableCell>{Interview.sowRequirement}</TableCell>
                                <TableCell>{Interview.name}</TableCell>
                                <TableCell>{Interview.interviewDate}</TableCell>
                                <TableCell>{Interview.yearsOfExperience}</TableCell>
                                <TableCell>{Interview.status}</TableCell>
                                <TableCell>{Interview.on_Boarding}</TableCell>
                                <TableCell>{Interview.recruiter}</TableCell>
                                <TableCell>{Interview.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{Interview.createdBy}</TableCell>
                                <TableCell>{new Date(Interview.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{Interview.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{Interview.updatedDate ? new Date(Interview.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell >
                                    <IconButton onClick={() => handleUpdate(Interview)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => confirmDelete(Interview.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <PaginationComponent
                    count={filteredInterviews.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handlePageChange={handlePageChange}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                />
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentInterview.id ? 'Update Interview' : 'Add Interview'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="SOWRequirement"
                        name="sowRequirement"
                        value={currentInterview.sowRequirement}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={currentInterview.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="InterviewDate"
                        name="interviewDate"
                        value={currentInterview.interviewDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="YearsOfExperience"
                        name="yearsOfExperience"
                        value={currentInterview.yearsOfExperience}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Status"
                        name="status"
                        value={currentInterview.status}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="On_Bording"
                        name="on_Bording"
                        value={currentInterview.on_Bording}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        label="Recruiter"
                        name="recruiter"
                        value={currentInterview.recruiter}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentInterview.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentInterview.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentInterview.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentInterview.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentInterview.updatedDate}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">
                        {currentInterview.id ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this Interview?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>No</Button>
                    <Button onClick={handleConfirmYes} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default InterviewList;
