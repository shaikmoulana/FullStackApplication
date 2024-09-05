import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function BlogsList() {
    const [blogs, setblogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentBlogs, setCurrentBlogs] = useState({
        id: '',
        title: '',
        author: '',
        status: '',
        targetDate: '',
        completedDate: '',
        publishedDate:'',
        isActive: true,
        createdBy: 'SYSTEM',
        createdDate: new Date(),
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5147/api/Blogs')
            .then(response => {
                setblogs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the blogs!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentBlogs({
            id: '',
            title: '',
            author: '',
            status: '',
            targetDate: '',
            completedDate: '',
            publishedDate: '',
            isActive: true,
            createdBy: 'SYSTEM',
            createdDate: new Date(),
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (Blogs) => {
        setCurrentBlogs(Blogs);
        setOpen(true);

    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5147/api/Blogs/${id}`)
            .then(response => {
                setblogs(blogs.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the Blogs!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentBlogs.id) {
            // Update existing Blogs
            axios.put(`http://localhost:5147/api/Blogs/${currentBlogs.id}`, currentBlogs)
                .then(response => {
                    console.log(response)
                    //setblogs([...blogs, response.data]);
                    // setblogs(response.data);
                    setblogs(blogs.map(tech => tech.id === currentBlogs.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the Blogs!', error);
                    setError(error);
                });

        } else {
            // Add new Blogs
            axios.post('http://localhost:5147/api/Blogs', currentBlogs)
                .then(response => {
                    setblogs([...blogs, response.data]);
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
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Blogs</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>TargetDate</TableCell>
                            <TableCell>CompletedDate</TableCell>
                            <TableCell>PublishedDate</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogs.map(Blogs => (
                            <TableRow key={Blogs.id}>
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
                                <TableCell>{Blogs.updatedDate ? new Date(Blogs.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(Blogs)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(Blogs.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
                    <TextField
                        margin="dense"
                        label="Author"
                        name="author"
                        value={currentBlogs.author}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Status"
                        name="status"
                        value={currentBlogs.status}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="TargetDate"
                        name="targetDate"
                        value={currentBlogs.targetDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="CompletedDate"
                        name="completedDate"
                        value={currentBlogs.completedDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="PublishedDate"
                        name="publishedDate"
                        value={currentBlogs.publishedDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentBlogs.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentBlogs.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentBlogs.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentBlogs.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentBlogs.updatedDate}
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

export default BlogsList;
