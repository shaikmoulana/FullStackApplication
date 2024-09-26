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

function SOWList() {
    const [SOWs, setSOWs] = useState([]);
    const [Clients, setClients] = useState([]);
    const [Projects, setProjects] = useState([]);
    const [SOWStatus, setSOWStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTechId, setDeleteTechId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentSOW, setCurrentSOW] = useState({
        client: '',
        project: '',
        preparedDate: '',
        submittedDate: '',
        status: '',
        comments: ''
    });
    const [order, setOrder] = useState('asc'); // Order of sorting: 'asc' or 'desc'
    const [orderBy, setOrderBy] = useState('createdDate'); // Column to sort by
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        const fetchSOWs = async () => {
            try {
                const sowResponse = await axios.get('http://172.17.31.61:5041/api/sow');
                setSOWs(sowResponse.data);
            } catch (error) {
                console.error('There was an error fetching the sows!', error);
                setError(error);
            }
            setLoading(false);
        };

        const fetchClients = async () => {
            try {
                const clientResponse = await axios.get('http://172.17.31.61:5142/api/client');
                setClients(clientResponse.data);
            } catch (error) {
                console.error('There was an error fetching the Clients!', error);
                setError(error);
            }
        };

        const fetchProjects = async () => {
            try {
                const projectResponse = await axios.get('http://172.17.31.61:5151/api/project');
                setProjects(projectResponse.data);
            } catch (error) {
                console.error('There was an error fetching the Projects!', error);
                setError(error);
            }
        };

        const fetchSowStatus = async () => {
            try {
                const sowStatusResponse = await axios.get('http://172.17.31.61:5041/api/sowstatus');
                setSOWStatus(sowStatusResponse.data);
            } catch (error) {
                console.error('There was an error fetching the sowStatus!', error);
                setError(error);
            }
        };

        fetchSOWs();
        fetchClients();
        fetchProjects();
        fetchSowStatus();
    }, []);

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedSOWs = [...SOWs].sort((a, b) => {
        const valueA = a[orderBy] || '';
        const valueB = b[orderBy] || '';

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            return order === 'asc' ? (valueA > valueB ? 1 : -1) : (valueB > valueA ? 1 : -1);
        }
    });

    const filteredSOWs = sortedSOWs.filter((SOW) =>
        (SOW.client && typeof SOW.client === 'string' &&
            SOW.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (SOW.project && typeof SOW.project === 'string' &&
            SOW.project.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (SOW.status && typeof SOW.status === 'string' &&
            SOW.status.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (SOW.comments && typeof SOW.comments === 'string' &&
            SOW.comments.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleAdd = () => {
        setCurrentSOW({
            client: '',
            project: '',
            preparedDate: '',
            submittedDate: '',
            status: '',
            comments: ''
        });
        setOpen(true);
    };

    const handleUpdate = (SOW) => {
        setCurrentSOW(SOW);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5041/api/SOW/${id}`)
        // axios.delete(`http://172.17.31.61:5041/api/sow/${id}`)
        axios.patch(`http://172.17.31.61:5041/api/sow/${id}`)
            .then(response => {
                setSOWs(SOWs.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the SOW!', error);
                setError(error);
            });
        setConfirmOpen(false);
    };

    const handleSave = () => {
        if (currentSOW.id) {
            // Update existing SOW
            //axios.put(`http://localhost:5041/api/SOW/${currentSOW.id}`, currentSOW)
            axios.put(`http://172.17.31.61:5041/api/sow/${currentSOW.id}`, currentSOW)
                .then(response => {
                    console.log(response)
                    //setSOWs([...SOWs, response.data]);
                    // setSOWs(response.data);
                    setSOWs(SOWs.map(tech => tech.id === currentSOW.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the SOW!', error);
                    setError(error);
                });

        } else {
            // Add new SOW
            //axios.post('http://localhost:5041/api/SOW', currentSOW)
            axios.post('http://172.17.31.61:5041/api/sow', currentSOW)
                .then(response => {
                    setSOWs([...SOWs, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the SOW!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentSOW({ ...currentSOW, [name]: value });
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

    const handlePreparedDateChange = (newDate) => {
        setCurrentSOW((prev) => ({
            ...prev,
            preparedDate: newDate ? newDate.toISOString() : "",
        }));
    };
    const handleSubmittedDateChange = (newDate) => {
        setCurrentSOW((prev) => ({
            ...prev,
            submittedDate: newDate ? newDate.toISOString() : "",
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
                <h3>SOW Table List</h3>
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
                <Button variant="contained" color="primary" onClick={handleAdd}>Add SOW</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'client'}
                                    direction={orderBy === 'client' ? order : 'asc'}
                                    onClick={() => handleSort('client')}
                                >
                                    Client
                                </TableSortLabel>
                            </TableCell>
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
                                    active={orderBy === 'preparedDate'}
                                    direction={orderBy === 'preparedDate' ? order : 'asc'}
                                    onClick={() => handleSort('preparedDate')}
                                >
                                    PreparedDate
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'submittedDate'}
                                    direction={orderBy === 'submittedDate' ? order : 'asc'}
                                    onClick={() => handleSort('submittedDate')}
                                >
                                    SubmittedDate
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
                                    active={orderBy === 'comments'}
                                    direction={orderBy === 'comments' ? order : 'asc'}
                                    onClick={() => handleSort('comments')}
                                >
                                    Comments
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
                        {filteredSOWs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((SOW) => (
                            <TableRow key={SOW.id}
                                sx={{ backgroundColor: SOW.isActive ? 'inherit' : '#FFCCCB' }} >
                                {/* <TableCell>{SOW.id}</TableCell> */}
                                <TableCell>{SOW.client}</TableCell>
                                <TableCell>{SOW.project}</TableCell>
                                <TableCell>{SOW.preparedDate}</TableCell>
                                <TableCell>{SOW.submittedDate}</TableCell>
                                <TableCell>{SOW.status}</TableCell>
                                <TableCell>{SOW.comments}</TableCell>
                                <TableCell>{SOW.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{SOW.createdBy}</TableCell>
                                <TableCell>{new Date(SOW.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{SOW.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{new Date(SOW.updatedDate).toLocaleString() || 'N/A'}</TableCell>
                                <TableCell >
                                    <IconButton onClick={() => handleUpdate(SOW)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => confirmDelete(SOW.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <PaginationComponent
                    count={filteredSOWs.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handlePageChange={handlePageChange}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                />
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentSOW.id ? 'Update SOW' : 'Add SOW'}</DialogTitle>
                <DialogContent>
                    <InputLabel>Client</InputLabel>
                    <Select
                        margin="dense"
                        name="client"
                        value={currentSOW.client}
                        onChange={handleChange}
                        fullWidth
                    >
                        {Clients.map((client) => (
                            <MenuItem key={client.id} value={client.name}>
                                {client.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel>Project</InputLabel>
                    <Select
                        margin="dense"
                        name="project"
                        value={currentSOW.project}
                        onChange={handleChange}
                        fullWidth
                    >
                        {Projects.map((project) => (
                            <MenuItem key={project.id} value={project.name}>
                                {project.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="PreparedDate"
                            value={currentSOW.preparedDate ? dayjs(currentSOW.preparedDate) : null}
                            onChange={handlePreparedDateChange}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth margin="dense" />
                            )}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="SubmittedDate"
                            value={currentSOW.submittedDate ? dayjs(currentSOW.submittedDate) : null}
                            onChange={handleSubmittedDateChange}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth margin="dense" />
                            )}
                        />
                    </LocalizationProvider>
                    <InputLabel>Status</InputLabel>
                    <Select
                        margin="dense"
                        name="status"
                        value={currentSOW.Sowstatus}
                        onChange={handleChange}
                        fullWidth
                    >
                        {SOWStatus.map((Sowstatus) => (
                            <MenuItem key={Sowstatus.id} value={Sowstatus.status}>
                                {Sowstatus.status}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        margin="dense"
                        label="Comments"
                        name="comments"
                        value={currentSOW.comments}
                        onChange={handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">
                        {currentSOW.id ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this SOW?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>No</Button>
                    <Button onClick={handleConfirmYes} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SOWList;
