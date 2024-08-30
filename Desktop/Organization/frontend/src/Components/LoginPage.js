// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // Initialize useNavigate

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5107/api/Login', { username, password });

//             if (response.status === 200) {
//                 // Handle successful login (e.g., store token, redirect, etc.)
//                 console.log('Login successful:', response.data);

//                 // Redirect to home page
//                 navigate('/home');
//             }
//         } catch (err) {
//             setError('Invalid username or password.');
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
//                     Login
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
//                         id="username"
//                         label="Username"
//                         name="username"
//                         autoComplete="username"
//                         autoFocus
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
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
//                         <Typography color="error" variant="body2">
//                             {error}
//                         </Typography>
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

// export default LoginPage;

//===============================================================================================================
// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import axios from './AuthService';
// import { useNavigate } from 'react-router-dom';
// //import AuthService from './AuthService';

// const LoginPage = (props) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5107/api/Login', { username, password });

//             if (response.status === 200) {
//                 // Store the token in local storage
//                 localStorage.setItem('oauth2', response.data);
//                 console.log('Login successful:', response.data);
//                 // Redirect to the home page
//                 navigate('/home');
//             }
//         } catch (err) {
//             setError('Invalid username or password.');
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
//                     Login
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
//                         id="username"
//                         label="Username"
//                         name="username"
//                         autoComplete="username"
//                         autoFocus
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
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
//                         <Typography color="error" variant="body2">
//                             {error}
//                         </Typography>
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

// export default LoginPage;

//===========================================================================================================
// import React, { useState } from 'react';
// import { TextField, Button, Container, Typography, Box, Tabs, Tab } from '@mui/material';
// import axios from './AuthService';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = (props) => {
//     const [usernameOrEmail, setUsernameOrEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [value, setValue] = useState(0); // 0 for employees, 1 for admins
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const loginType = value === 0 ? 'employee' : 'admin';
//         try {
//             const response = await axios.post(`http://localhost:5107/api/${loginType}/Login`, { usernameOrEmail, password });

//             if (response.status === 200) {
//                 // Store the token in local storage
//                 localStorage.setItem('oauth2', response.data);
//                 console.log('Login successful:', response.data);
//                 // Redirect to the home page
//                 navigate('/home');
//             }
//         } catch (err) {
//             setError('Invalid email/username or password.');
//             console.error('Login error:', err);
//         }
//     };

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//         setUsernameOrEmail('');
//         setPassword('');
//         setError('');
//     };

//     return (
//         <Container component="main" maxWidth="xs" sx={{
//             bgcolor: 'linear-gradient(to right, #ff7e5f, #feb47b)',
//             p: 3,
//             borderRadius: 3,
//             boxShadow: 10,
//             height: '100vh',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             overflow: 'hidden',
//         }}>
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     p: 4,
//                     bgcolor: '#ffffff',
//                     borderRadius: 3,
//                     boxShadow: 8,
//                     width: '100%',
//                     maxWidth: '400px',
//                     textAlign: 'center',
//                     position: 'relative',
//                     overflow: 'hidden',
//                 }}
//             >
//                 <Box
//                     sx={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '300px',
//                         height: '300px',
//                         background: 'rgba(255, 255, 255, 0.1)',
//                         borderRadius: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         opacity: 0.5,
//                         zIndex: 0,
//                     }}
//                 />
//                 <Typography component="h1" variant="h4" sx={{ mb: 2, color: '#ff7e5f', fontWeight: 'bold', zIndex: 1 }}>
//                     Login
//                 </Typography>
//                 <Tabs
//                     value={value}
//                     onChange={handleChange}
//                     aria-label="login type"
//                     sx={{ mb: 4, zIndex: 1 }}
//                 >
//                     <Tab label="Employee Login" />
//                     <Tab label="Admin Login" />
//                 </Tabs>
//                 <Box
//                     component="form"
//                     onSubmit={handleSubmit}
//                     noValidate
//                     sx={{ width: '100%', zIndex: 1 }}
//                 >
//                     {value === 0 ? (
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             autoComplete="email"
//                             autoFocus
//                             value={usernameOrEmail}
//                             onChange={(e) => setUsernameOrEmail(e.target.value)}
//                             sx={{
//                                 mb: 2,
//                                 bgcolor: '#f0f8ff',
//                                 borderRadius: 1,
//                                 boxShadow: 1,
//                                 '& .MuiInputBase-root': {
//                                     borderRadius: 1,
//                                 },
//                             }}
//                         />
//                     ) : (
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="username"
//                             label="Username"
//                             name="username"
//                             autoComplete="username"
//                             autoFocus
//                             value={usernameOrEmail}
//                             onChange={(e) => setUsernameOrEmail(e.target.value)}
//                             sx={{
//                                 mb: 2,
//                                 bgcolor: '#f0f8ff',
//                                 borderRadius: 1,
//                                 boxShadow: 1,
//                                 '& .MuiInputBase-root': {
//                                     borderRadius: 1,
//                                 },
//                             }}
//                         />
//                     )}
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
//                         sx={{
//                             mb: 2,
//                             bgcolor: '#f0f8ff',
//                             borderRadius: 1,
//                             boxShadow: 1,
//                             '& .MuiInputBase-root': {
//                                 borderRadius: 1,
//                             },
//                         }}
//                     />
//                     {error && (
//                         <Typography color="error" variant="body2" sx={{ mb: 2 }}>
//                             {error}
//                         </Typography>
//                     )}
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                             mt: 2,
//                             mb: 2,
//                             bgcolor: 'linear-gradient(to right, #ff7e5f, #feb47b)',
//                             color: '#ffffff',
//                             boxShadow: 2,
//                             borderRadius: 5,
//                             '&:hover': {
//                                 bgcolor: 'linear-gradient(to right, #feb47b, #ff7e5f)',
//                                 boxShadow: 5,
//                             },
//                         }}
//                     >
//                         Login
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default LoginPage;
///////-----------------------------------------------------------------------------------------------------
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from './AuthService';
import { useNavigate } from 'react-router-dom';
//import AuthService from './AuthService';

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const response = await axios.post('http://localhost:5107/api/Login', { email, password });

    //         if (response.status === 200) {
    //             // Store the token in local storage
    //             localStorage.setItem('oauth2', response.data);
    //             console.log('Login successful:', response.data);
    //             // Redirect to the home page
    //             navigate('/home');
    //         }
    //     } catch (err) {
    //         setError('Invalid Email or password.');
    //         console.error('Login error:', err);
    //     }
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5107/api/Login?emailId=${email}&password=${password}`);

            if (response.status === 200) {
                localStorage.setItem('oauth2', response.data);
                navigate('/home');
            }
        } catch (err) {
            setError('Invalid Email or password.');
            console.error('Login error:', err);
        }
    };
    //----------------for URL safety--------------------------
    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const data = new URLSearchParams();
    //     data.append('emailId', email);
    //     data.append('password', password);

    //     try {
    //         const response = await axios.post('http://localhost:5107/api/Login', data, {
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //         });

    //         if (response.status === 200) {
    //             localStorage.setItem('oauth2', response.data);
    //             navigate('/home');
    //         }
    //     } catch (err) {
    //         setError('Invalid Email or password.');
    //         console.error('Login error:', err);
    //     }
    // };




    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8,
                    mb: 4,
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="username"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;