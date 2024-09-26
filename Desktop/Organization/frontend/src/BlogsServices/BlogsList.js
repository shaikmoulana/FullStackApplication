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

function BlogsList() {
    const [blogs, setBlogs] = useState([]);
    const [Employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTechId, setDeleteTechId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentBlogs, setCurrentBlogs] = useState({
        title: '',
        author: '',
        status: '',
        targetDate: '',
        completedDate: '',
        publishedDate: ''
    });

    const [order, setOrder] = useState('asc'); // Order of sorting: 'asc' or 'desc'
    const [orderBy, setOrderBy] = useState('createdDate'); // Column to sort by
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // const blogResponse = await axios.get('http://localhost:5174/api/blogs');
                const blogResponse = await axios.get('http://172.17.31.61:5174/api/blogs');
                setBlogs(blogResponse.data);
            } catch (error) {
                console.error('There was an error fetching the Blogs!', error);
                setError(error);
            }
            setLoading(false);
        };

        const fetchAuthor = async () => {
            try {
                // const authorResponse = await axios.get('http://localhost:5733/api/employee');
                const authorResponse = await axios.get('http://172.17.31.61:5733/api/employee');
                setEmployees(authorResponse.data);
            } catch (error) {
                console.error('There was an error fetching the speakers!', error);
                setError(error);
            }
        };

        fetchBlogs();
        fetchAuthor();
    }, []);

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedBlogs = [...blogs].sort((a, b) => {
        const valueA = a[orderBy] || '';
        const valueB = b[orderBy] || '';

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
            return order === 'asc' ? (valueA > valueB ? 1 : -1) : (valueB > valueA ? 1 : -1);
        }
    });

    const filteredBlogs = sortedBlogs.filter((blog) =>
        (blog.title && typeof blog.title === 'string' &&
            blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||

        (blog.author && typeof blog.author === 'string' &&
            blog.author.toLowerCase().includes(searchQuery.toLowerCase())) ||

        (blog.status && typeof blog.status === 'string' &&
            blog.status.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleAdd = () => {
        setCurrentBlogs({
            title: '',
            author: '',
            status: '',
            targetDate: '',
            completedDate: '',
            publishedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (Blogs) => {
        setCurrentBlogs(Blogs);
        setOpen(true);

    };

    const handleDelete = (id) => {
        // axios.delete(`http://localhost:5147/api/Blogs/${id}`)
        //axios.delete(`http://172.17.31.61:5174/api/blogs/${id}`)
        axios.patch(`http://172.17.31.61:5174/api/blogs/${id}`)
            .then(response => {
                setBlogs(blogs.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the Blogs!', error);
                setError(error);
            });
        setConfirmOpen(false);
    };

    const handleSave = () => {
        if (currentBlogs.id) {
            // axios.put(`http://localhost:5147/api/Blogs/${currentBlogs.id}`, currentBlogs)
            axios.put(`http://172.17.31.61:5174/api/blogs/${currentBlogs.id}`, currentBlogs)
                .then(response => {
                    //setBlogs([...blogs, response.data]);
                    // setBlogs(response.data);
                    setBlogs(blogs.map(tech => tech.id === currentBlogs.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the Blogs!', error);
                    setError(error);
                });

        } else {
            // Add new Blogs
            // axios.post('http://localhost:5147/api/Blogs', currentBlogs)
            axios.post('http://172.17.31.61:5174/api/blogs', currentBlogs)
                .then(response => {
                    setBlogs([...blogs, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the Blogs!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentBlogs({ ...currentBlogs, [name]: value });
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

    const handleTargetDateChange = (newDate) => {
        setCurrentBlogs((prevBlogs) => ({
            ...prevBlogs,
            targetDate: newDate ? newDate.toISOString() : "",
        }));
    };

    const handleCompletedDateChange = (newDate) => {
        setCurrentBlogs((prevBlogs) => ({
            ...prevBlogs,
            completedDate: newDate ? newDate.toISOString() : "",
        }));
    };

    const handlePublishedDateChange = (newDate) => {
        setCurrentBlogs((prevBlogs) => ({
            ...prevBlogs,
            publishedDate: newDate ? newDate.toISOString() : "",
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
                <h3>Blogs Table List</h3>
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
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Blogs</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            {/* Sorting logic */}
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'title'}
                                    direction={orderBy === 'title' ? order : 'asc'}
                                    onClick={() => handleSort('title')}
                                >
                                    Title
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'author'}
                                    direction={orderBy === 'author' ? order : 'asc'}
                                    onClick={() => handleSort('author')}
                                >
                                    Author
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
                                    active={orderBy === 'targetDate'}
                                    direction={orderBy === 'targetDate' ? order : 'asc'}
                                    onClick={() => handleSort('targetDate')}
                                >
                                    TargetDate
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'completedDate'}
                                    direction={orderBy === 'completedDate' ? order : 'asc'}
                                    onClick={() => handleSort('completedDate')}
                                >
                                    CompletedDate
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'publishedDate'}
                                    direction={orderBy === 'publishedDate' ? order : 'asc'}
                                    onClick={() => handleSort('publishedDate')}
                                >
                                    PublishedDate
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
                        {filteredBlogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((Blogs) => (
                            <TableRow key={Blogs.id}
                                sx={{ backgroundColor: Blogs.isActive ? 'inherit' : '#FFCCCB' }} >
                                {/* <TableCell>{Blogs.id}</TableCell> */}
                                <TableCell>{Blogs.title}</TableCell>
                                <TableCell>{Blogs.author}</TableCell>
                                <TableCell>{Blogs.status}</TableCell>
                                <TableCell>{Blogs.targetDate}</TableCell>
                                <TableCell>{Blogs.completedDate}</TableCell>
                                <TableCell>{Blogs.publishedDate}</TableCell>
                                <TableCell>{Blogs.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{Blogs.createdBy}</TableCell>
                                <TableCell>{new Date(Blogs.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{Blogs.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{new Date(Blogs.updatedDate).toLocaleString() || 'N/A'}</TableCell>
                                <TableCell >
                                    <IconButton onClick={() => handleUpdate(Blogs)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => confirmDelete(Blogs.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* Pagination Component */}
                <PaginationComponent
                    count={filteredBlogs.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handlePageChange={handlePageChange}
                    handleRowsPerPageChange={handleRowsPerPageChange}
                />
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentBlogs.id ? 'Update Blogs' : 'Add Blogs'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Title"
                        name="title"
                        value={currentBlogs.title}
                        onChange={handleChange}
                        fullWidth
                    />
                    <InputLabel>Author</InputLabel>
                    <Select
                        margin="dense"
                        name="author"
                        label="Author"
                        value={currentBlogs.employee}
                        onChange={handleChange}
                        fullWidth
                    >
                        {Employees.map((employee) => (
                            <MenuItem key={employee.id} value={employee.name}>
                                {employee.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        margin="dense"
                        label="Status"
                        name="status"
                        value={currentBlogs.status}
                        onChange={handleChange}
                        fullWidth
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="TargetDate"
                            value={currentBlogs.targetDate ? dayjs(currentBlogs.targetDate) : null}
                            onChange={handleTargetDateChange}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth margin="dense" />
                            )}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="CompletedDate"
                            value={currentBlogs.completedDate ? dayjs(currentBlogs.completedDate) : null}
                            onChange={handleCompletedDateChange}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth margin="dense" />
                            )}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="PublishedDate"
                            value={currentBlogs.publishedDate ? dayjs(currentBlogs.publishedDate) : null}
                            onChange={handlePublishedDateChange}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth margin="dense" />
                            )}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">
                        {currentBlogs.id ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this blog?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>No</Button>
                    <Button onClick={handleConfirmYes} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BlogsList;
