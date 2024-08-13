// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
// import axios from './AuthService';
// import { useNavigate } from 'react-router-dom';

// const EmployeeLoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5107/api/Login/employee', { username: email, password });

//             if (response.status === 200) {
//                 localStorage.setItem('oauth2', response.data.token);
//                 console.log('Login successful:', response.data);
//                 navigate('/home');
//             }
//         } catch (err) {
//             setError('Invalid email or password.');
//             console.error('Login error:', err);
//         }
//     };

//     return (
//         <Container component="main" maxWidth="xs">
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     mt: 8,
//                     mb: 4,
//                 }}
//             >
//                 <Typography component="h1" variant="h5">
//                     Employee Login
//                 </Typography>
//                 <Box
//                     component="form"
//                     onSubmit={handleSubmit}
//                     noValidate
//                     sx={{ mt: 1 }}
//                 >
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="email"
//                         label="Email Address"
//                         name="email"
//                         autoComplete="email"
//                         autoFocus
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         name="password"
//                         label="Password"
//                         type="password"
//                         id="password"
//                         autoComplete="current-password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     {error && (
//                         <Alert severity="error" sx={{ mt: 2 }}>
//                             {error}
//                         </Alert>
//                     )}
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                     >
//                         Login
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default EmployeeLoginPage;
