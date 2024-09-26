import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, MenuItem, Table, InputLabel, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, TableSortLabel, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PaginationComponent from '../Components/PaginationComponent'; // Import your PaginationComponent
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import '../App.css';

function InterviewList() {
    const [Interviews, setInterviews] = useState([]);
    const [SOWRequirement, setSOWRequirement] = useState([]);
    const [InterviewStatus, setInterviewStatus] = useState([]);
    const [Employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTechId, setDeleteTechId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentInterview, setCurrentInterview] = useState({
        sowRequirement: '',
        name: '',
        interviewDate: '',
        yearsOfExperience: '',
        status: '',
        on_Boarding: '',
        recruiter: ''
    });

    const [order, setOrder] = useState('asc'); // Order of sorting: 'asc' or 'desc'
    const [orderBy, setOrderBy] = useState('createdDate'); // Column to sort by
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const interviewResponse = await axios.get('http://172.17.31.61:5200/api/interview');
                setInterviews(interviewResponse.data);
            } catch (error) {
                console.error('There was an error fetching the interviews!', error);
                setError(error);
            }
            setLoading(false);
        };

        const fetchSOWRequirements = async () => {
            try {
                const SowRequirementResponse = await axios.get('http://172.17.31.61:5041/api/sowRequirement');
                setSOWRequirement(SowRequirementResponse.data);
            } catch (error) {
                console.error('There was an error fetching the sowRequirement!', error);
                setError(error);
            }
        };

        const fetchInterviewStatus = async () => {
            try {
                const interviewStatutsResponse = await axios.get('http://172.17.31.61:5200/api/interviewStatus');
                setInterviewStatus(interviewStatutsResponse.data);
            } catch (error) {
                console.error('There was an error fetching the interviewStatus!', error);
                setError(error);
            }
        };

        const fetchRecruiter = async () => {
            try {
                const recruiterResponse = await axios.get('http://172.17.31.61:5733/api/employee');
                setEmployee(recruiterResponse.data);
            } catch (error) {
                console.error('There was an error fetching the recruiter!', error);
                setError(error);
            }
        };

        fetchInterviews();
        fetchSOWRequirements();
        fetchInterviewStatus();
        fetchRecruiter();
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
        (Interviews.name && typeof Interviews.name === 'string' &&
            Interviews.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (Interviews.sowRequirement && typeof Interviews.sowRequirement === 'string' &&
            Interviews.sowRequirement.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (Interviews.recruiter && typeof Interviews.recruiter === 'string' &&
            Interviews.recruiter.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (Interviews.status && typeof Interviews.status === 'string' &&
            Interviews.status.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    const handleAdd = () => {
        setCurrentInterview({
            sowRequirement: '',
            name: '',
            interviewDate: '',
            yearsOfExperience: '',
            status: '',
            on_Boarding: '',
            recruiter: ''
        });
        setOpen(true);
    };

    const handleUpdate = (Interview) => {
        setCurrentInterview(Interview);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5200/api/Interview/${id}`)
        // axios.delete(`http://172.17.31.61:5200/api/interview/${id}`)
        axios.patch(`http://172.17.31.61:5200/api/interview/${id}`)
            .then(response => {
                setInterviews(Interviews.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the Interview!', error);
                setError(error);
            });
        setConfirmOpen(false);
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

    const handleInterviewDateChange = (newDate) => {
        setCurrentInterview((prev) => ({
            ...prev,
            interviewDate: newDate ? newDate.toISOString() : "",
        }));
    };
    const handleOnBoardingDateChange = (newDate) => {
        setCurrentInterview((prev) => ({
            ...prev,
            on_Boarding: newDate ? newDate.toISOString() : "",
        }));
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
                            <TableRow key={Interview.id}
                                sx={{ backgroundColor: Interview.isActive ? 'inherit' : '#FFCCCB' }} >
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
                                <TableCell>{new Date(Interview.updatedDate).toLocaleString() || 'N/A'}</TableCell>
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
                    <InputLabel>SOWRequirement</InputLabel>
                    <Select
                        margin="dense"
                        name="sowRequirement"
                        value={currentInterview.sowRequirement}
                        onChange={handleChange}
                        fullWidth
                    >
                        {SOWRequirement.map((sowRequirement) => (
                            <MenuItem key={sowRequirement.id} value={sowRequirement.status}>
                                {sowRequirement.status}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={currentInterview.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="InterviewDate"
                            value={currentInterview.interviewDate ? dayjs(currentInterview.interviewDate) : null}
                            onChange={handleInterviewDateChange}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth margin="dense" />
                            )}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="YearsOfExperience"
                        name="yearsOfExperience"
                        value={currentInterview.yearsOfExperience}
                        onChange={handleChange}
                        fullWidth
                    />
                    <InputLabel>Status</InputLabel>
                    <Select
                        margin="dense"
                        name="status"
                        value={currentInterview.interviewStatus}
                        onChange={handleChange}
                        fullWidth
                    >
                        {InterviewStatus.map((interviewStatus) => (
                            <MenuItem key={interviewStatus.id} value={interviewStatus.status}>
                                {interviewStatus.status}
                            </MenuItem>
                        ))}
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="On_Boarding"
                            value={currentInterview.on_Boarding ? dayjs(currentInterview.on_Boarding) : null}
                            onChange={handleOnBoardingDateChange}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth margin="dense" />
                            )}
                        />
                    </LocalizationProvider>
                    <InputLabel>Recruiter</InputLabel>
                    <Select
                        margin="dense"
                        name="recruiter"
                        value={currentInterview.employee}
                        onChange={handleChange}
                        fullWidth
                    >
                        {Employee.map((employee) => (
                            <MenuItem key={employee.id} value={employee.name}>
                                {employee.name}
                            </MenuItem>
                        ))}
                    </Select>
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
