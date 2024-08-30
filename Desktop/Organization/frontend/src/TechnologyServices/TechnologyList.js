// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// function TechnologyList() {
//     const [technologies, setTechnologies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [open, setOpen] = useState(false);
//     const [currentTechnology, setCurrentTechnology] = useState({
//         id: '',
//         name: '',
//         department: '',
//         isActive: true,
//         createdBy: '',
//         createdDate: '',
//         updatedBy: '',
//         updatedDate: ''
//     });

//     useEffect(() => {
//         axios.get('http://localhost:5274/api/Technology')
//             .then(response => {
//                 setTechnologies(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the technologies!', error);
//                 setError(error);
//                 setLoading(false);
//             });
//     }, []);

//     const handleAdd = () => {
//         setCurrentTechnology({
//             id: '',
//             name: '',
//             department: '',
//             isActive: true,
//             createdBy: '',
//             createdDate: '',
//             updatedBy: '',
//             updatedDate: ''
//         });
//         setOpen(true);
//     };

//     const handleUpdate = (technology) => {
//         setCurrentTechnology(technology);
//         setOpen(true);

//     };

//     const handleDelete = (id) => {
//         axios.delete(`http://localhost:5274/api/Technology/${id}`)
//             .then(response => {
//                 setTechnologies(technologies.filter(tech => tech.id !== id));
//             })
//             .catch(error => {
//                 console.error('There was an error deleting the technology!', error);
//                 setError(error);
//             });
//     };

//     const handleSave = () => {
//         if (currentTechnology.id) {
//             // Update existing technology
//             axios.put(`http://localhost:5274/api/Technology/${currentTechnology.id}`, currentTechnology)
//                 .then(response => {
//                     console.log(response)
//                     //setTechnologies([...technologies, response.data]);
//                     // setTechnologies(response.data);
//                     setTechnologies(technologies.map(tech => tech.id === currentTechnology.id ? response.data : tech));
//                 })
//                 .catch(error => {
//                     console.error('There was an error updating the technology!', error);
//                     setError(error);
//                 });

//         } else {
//             // Add new technology
//             axios.post('http://localhost:5274/api/Technology', currentTechnology)
//                 .then(response => {
//                     setTechnologies([...technologies, response.data]);
//                 })
//                 .catch(error => {
//                     console.error('There was an error adding the technology!', error);
//                     setError(error);
//                 });
//         }
//         setOpen(false);

//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentTechnology({ ...currentTechnology, [name]: value });
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>There was an error loading the data: {error.message}</p>;
//     }

//     return (
//         <div>
//             <div style={{ display: 'flex' }}>
//                 <h3>Technology Table List</h3>
//             </div>
//             <div style={{ display: 'flex', marginBottom: '20px' }}>
//                 <Button variant="contained" color="primary" onClick={handleAdd}>Add Technology</Button>
//             </div>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Department</TableCell>
//                             <TableCell>Is Active</TableCell>
//                             <TableCell>Created By</TableCell>
//                             <TableCell>Created Date</TableCell>
//                             <TableCell>Updated By</TableCell>
//                             <TableCell>Updated Date</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {technologies.map(technology => (
//                             <TableRow key={technology.id}>
//                                 <TableCell>{technology.id}</TableCell>
//                                 <TableCell>{technology.name}</TableCell>
//                                 <TableCell>{technology.department}</TableCell>
//                                 <TableCell>{technology.isActive ? 'Active' : 'Inactive'}</TableCell>
//                                 <TableCell>{technology.createdBy}</TableCell>
//                                 <TableCell>{new Date(technology.createdDate).toLocaleString()}</TableCell>
//                                 <TableCell>{technology.updatedBy || 'N/A'}</TableCell>
//                                 <TableCell>{technology.updatedDate ? new Date(technology.updatedDate).toLocaleString() : 'N/A'}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="secondary" onClick={() => handleUpdate(technology)}>Update</Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(technology.id)}>Delete</Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogTitle>{currentTechnology.id ? 'Update Technology' : 'Add Technology'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         margin="dense"
//                         label="Name"
//                         name="name"
//                         value={currentTechnology.name}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Department"
//                         name="department"
//                         value={currentTechnology.department}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Is Active"
//                         name="isActive"
//                         value={currentTechnology.isActive}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Created By"
//                         name="createdBy"
//                         value={currentTechnology.createdBy}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Created Date"
//                         name="createdDate"
//                         value={currentTechnology.createdDate}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Updated By"
//                         name="updatedBy"
//                         value={currentTechnology.updatedBy}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Updated Date"
//                         name="updatedDate"
//                         value={currentTechnology.updatedDate}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSave} color="primary">
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }

// export default TechnologyList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select,MenuItem,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function TechnologyList() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [currentTechnology, setCurrentTechnology] = useState({
        id: '',
        name: '',
        department: '',
        isActive: true,
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: ''
    });

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
        fetchDepartments();  // Fetch departments as well
    }, []);

    const handleAdd = () => {
        setCurrentTechnology({
            id: '',
            name: '',
            department: '',
            isActive: true,
            createdBy: '',
            createdDate: '',
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
    };

    const handleSave = () => {
        if (currentTechnology.id) {
            // Update existing technology
            axios.put(`http://localhost:5274/api/Technology/${currentTechnology.id}`, currentTechnology)
                .then(response => {
                    console.log(response)
                    //setTechnologies([...technologies, response.data]);
                    // setTechnologies(response.data);
                    setTechnologies(technologies.map(tech => tech.id === currentTechnology.id ? response.data : tech));
                })
                .catch(error => {
                    console.error('There was an error updating the technology!', error);
                    setError(error);
                });

        } else {
            // Add new technology
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
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Updated By</TableCell>
                            <TableCell>Updated Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {technologies.map(technology => (
                            <TableRow key={technology.id}>
                                <TableCell>{technology.id}</TableCell>
                                <TableCell>{technology.name}</TableCell>
                                <TableCell>{technology.department}</TableCell>
                                <TableCell>{technology.isActive ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>{technology.createdBy}</TableCell>
                                <TableCell>{new Date(technology.createdDate).toLocaleString()}</TableCell>
                                <TableCell>{technology.updatedBy || 'N/A'}</TableCell>
                                <TableCell>{technology.updatedDate ? new Date(technology.updatedDate).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleUpdate(technology)}>Update</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(technology.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{currentTechnology.id ? 'Update Technology' : 'Add Technology'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={currentTechnology.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Select
                        margin="dense"
                        name="department"
                        label="Department"
                        fullWidth
                        value={currentTechnology.department}
                        onChange={handleChange}
                    >
                        {departments.map(department => (
                            <MenuItem key={department.id} value={department.name}>
                                {department.name}
                            </MenuItem>
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

export default TechnologyList;
