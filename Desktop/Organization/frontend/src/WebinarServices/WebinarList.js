import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function WebinarList() {
    const [Webinars, setWebinars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentWebinar, setCurrentWebinar] = useState({
        id: '',
        title: '',
        speaker: '',
        status: '',
        webinarDate: '',
        numberOfAudience: '',
        isActive: true,
        createdBy: 'SYSTEM',
        createdDate: new Date(),
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        //axios.get('http://localhost:5017/api/Webinars')
        axios.get('http://172.17.31.61:5017/api/webinars')
            .then(response => {
                setWebinars(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the Webinars!', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAdd = () => {
        setCurrentWebinar({
            id: '',
            title: '',
            speaker: '',
            status: '',
            webinarDate: '',
            numberOfAudience: '',
            isActive: true,
            createdBy: 'SYSTEM',
            createdDate: new Date(),
            updatedBy: '',
            updatedDate: ''
        });
        setOpen(true);
    };

    const handleUpdate = (Webinar) => {
        setCurrentWebinar(Webinar);
        setOpen(true);

    };

    const handleDelete = (id) => {
        //axios.delete(`http://localhost:5017/api/Webinars/${id}`)
        axios.delete(`http://172.17.31.61:5017/api/webinars/${id}`)
            .then(response => {
                setWebinars(Webinars.filter(tech => tech.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the Webinar!', error);
                setError(error);
            });
    };

    const handleSave = () => {
        if (currentWebinar.id) {
            // Update existing Webinar
            //axios.put(`http://localhost:5017/api/Webinars/${currentWebinar.id}`, currentWebinar)
            axios.put(`http://172.17.31.61:5017/api/webinars/${currentWebinar.id}`, currentWebinar)
                .then(response => {
                    console.log(response)
                    //setWebinars([...Webinars, response.data]);
                    // setWebinars(response.data);
                    setWebinars(Webinars.map(tech => tech.id === currentWebinar.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the Webinar!', error);
                    setError(error);
                });

        } else {
            // Add new Webinar
            //axios.post('http://localhost:5017/api/Webinars', currentWebinar)
            axios.post('http://172.17.31.61:5017/api/webinars', currentWebinar)
                .then(response => {
                    setWebinars([...Webinars, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the Webinar!', error);
                    setError(error);
                });
        }
        setOpen(false);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentWebinar({ ...currentWebinar, [name]: value });
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
                <h3>Webinar Table List</h3>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Webinar</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>Id</TableCell> */}
                            <TableCell>Title</TableCell>
                            <TableCell>Speaker</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>WebinarDate</TableCell>
                            <TableCell>NumberOfAudience</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Webinars.map(Webinar => (
                            <TableRow key={Webinar.id}>
                                {/* <TableCell>{Webinar.id}</TableCell> */}
                                <TableCell>{Webinar.title}</TableCell>
                                <TableCell>{Webinar.speaker}</TableCell>
                                <TableCell>{Webinar.status}</TableCell>
                                <TableCell>{Webinar.webinarDate}</TableCell>
                                <TableCell>{Webinar.numberOfAudience}</TableCell>
                                <TableCell>{Webinar.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{Webinar.createdBy}</TableCell>
                                <TableCell>{new Date(Webinar.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{Webinar.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{Webinar.updatedDate ? new Date(Webinar.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(Webinar)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(Webinar.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentWebinar.id ? 'Update Webinar' : 'Add Webinar'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Title"
                        name="title"
                        value={currentWebinar.title}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Speaker"
                        name="speaker"
                        value={currentWebinar.speaker}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Status"
                        name="status"
                        value={currentWebinar.status}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="WebinarDate"
                        name="webinarDate"
                        value={currentWebinar.webinarDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="NumberOfAudience"
                        name="numberOfAudience"
                        value={currentWebinar.numberOfAudience}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Is Active"
                        name="isActive"
                        value={currentWebinar.isActive}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created By"
                        name="createdBy"
                        value={currentWebinar.createdBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Created Date"
                        name="createdDate"
                        value={currentWebinar.createdDate}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated By"
                        name="updatedBy"
                        value={currentWebinar.updatedBy}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Updated Date"
                        name="updatedDate"
                        value={currentWebinar.updatedDate}
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

export default WebinarList;
