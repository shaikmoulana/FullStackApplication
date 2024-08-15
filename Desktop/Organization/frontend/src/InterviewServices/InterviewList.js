import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function InterviewList() {
    const [Interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentInterview, setCurrentInterview] = useState({
        id: '',
        sowRequirement: '',
        name: '',
        interviewDate: '',
        yearsOfExperience: '',
        status: '',
        on_Bording: '',
        recruiter: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5200/api/Interview')
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
        axios.delete(`http://localhost:5200/api/Interview/${id}`)
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
            axios.put(`http://localhost:5200/api/Interview/${currentInterview.id}`, currentInterview)
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
            axios.post('http://localhost:5200/api/Interview', currentInterview)
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
                <Button variant="contained" color="primary" onClick={handleAdd}>Add Interview</Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>SOWRequirement</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>InterviewDate</TableCell>
                            <TableCell>YearsOfExperience</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>On_Boarding</TableCell>
                            <TableCell>Recuriter</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Interviews.map(Interview => (
                            <TableRow key={Interview.id}>
                                <TableCell>{Interview.id}</TableCell>
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
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(Interview)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(Interview.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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

export default InterviewList;
