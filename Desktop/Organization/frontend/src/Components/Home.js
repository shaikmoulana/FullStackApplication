// import * as React from 'react';
// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import DepartmentList from '../DepartmentServices/DepartmentList';
// import TechnologyList from '../TechnologyServices/TechnologyList';
// import EmployeeTechnologyList from '../EmployeeServices/EmployeeTechnologyList';

// const drawerWidth = 240;

// export default function Home() {
//   const [view, setView] = useState('home');

//   const handleListItemClick = (view) => {
//     setView(view);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
//       >
//         <Toolbar>
//           <Typography variant="h3" noWrap component="div">
//             Organization Application
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar>Dashboard</Toolbar>
//         <Divider />
//         <List>
//           {['Department', 'Designation', 'Employee', 'Technology', 'Client', 'Project', 'SOW', 'Interview', 'Webinar', 'Blog','EmployeeTechnology'].map((text) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton onClick={() => handleListItemClick(text.toLowerCase())}>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//       </Drawer>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
//       >
//         <Toolbar />
//         {view === 'home' && (
//           <Typography paragraph>
//             <h3>Welcome to the Organization Application.</h3>
//           </Typography>
//         )}
//         {view === 'department' && <DepartmentList />}
//         {view === 'technology' && <TechnologyList />}
//         {view === 'employeetechnology' && <EmployeeTechnologyList />}
//         {/* Add more conditional renders for other views as needed */}
//       </Box>
//     </Box>
//   );
// }
//---------------------------------------------------------------------------------------------------------
// import * as React from 'react';
// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import DepartmentList from '../DepartmentServices/DepartmentList';
// import DesignationList from '../DesignationService/DesignationList';
// import EmployeeList from '../EmployeeServices/EmployeeList';
// import TechnologyList from '../TechnologyServices/TechnologyList';
// import EmployeeTechnologyList from '../EmployeeServices/EmployeeTechnologyList';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';

// const drawerWidth = 240;

// export default function Home() {
//   const [view, setView] = useState('home');

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear the authentication token
//     localStorage.removeItem('oauth2');

//     // Redirect to the login page
//     navigate('/');
//   };


//   const handleListItemClick = (view) => {
//     setView(view);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Typography variant="h3" noWrap component="div">Organization Application</Typography>

//           <Button
//             type="submit"
//             // fullWidth
//             variant="Outlined"
//             sx={{ mt: 3, mb: 2 }}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar>Dashboard</Toolbar>
//         <Divider />
//         <List>
//           {['Home','Department', 'Designation', 'Employee', 'Technology', 'Client', 'Project', 'SOW', 'Interview', 'Webinar', 'Blog', 'EmployeeTechnology'].map((text) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton onClick={() => handleListItemClick(text.toLowerCase())}>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
//         <Toolbar />
//         {view === 'home' && (

//           <Typography variant="h5" paragraph>
//             Welcome to the Organization Application.
//           </Typography>
//         )}
//         {view === 'department' && <DepartmentList />}
//         {view === 'designation' && <DesignationList />}
//         {view === 'technology' && <TechnologyList />}
//         {view === 'employee' && <EmployeeList />}
//         {view === 'employeetechnology' && <EmployeeTechnologyList />}
//         {/* Add more conditional renders for other views as needed */}
//       </Box>
//     </Box>
//   );
// }

//=====================after adding client=====================================================
// import * as React from 'react';
// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
// import DepartmentList from '../DepartmentServices/DepartmentList';
// import DesignationList from '../DesignationService/DesignationList';
// import EmployeeList from '../EmployeeServices/EmployeeList';
// import TechnologyList from '../TechnologyServices/TechnologyList';
// import EmployeeTechnologyList from '../EmployeeServices/EmployeeTechnologyList';
// import BlogsList from '../BlogsServices/BlogsList';
// import ClientList from '../ClientServices/ClientList';
// import ClientContactList from '../ClientServices/ClientContactList';
// import ContactTypeList from '../ClientServices/ContactTypeList';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';

// const drawerWidth = 240;

// export default function Home() {
//   const [view, setView] = useState('home');
//   const [openEmployee, setOpenEmployee] = useState(false);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear the authentication token
//     localStorage.removeItem('oauth2');

//     // Redirect to the login page
//     navigate('/');
//   };

//   const handleListItemClick = (view) => {
//     if (view === 'employee') {
//       setOpenEmployee(!openEmployee);
//     } else {
//       setOpenEmployee(false);
//       setView(view);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Typography variant="h3" noWrap component="div">Organization Application</Typography>
//           <Button
//             type="submit"
//             variant="Outlined"
//             sx={{ mt: 3, mb: 2 }}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar>Dashboard</Toolbar>
//         <Divider />
//         <List>
//           {['Home', 'Department', 'Designation', 'Technology', 'Client','ClientContact','ContactType', 'Project', 'SOW', 'Interview', 'Webinar', 'Blogs'].map((text) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton onClick={() => handleListItemClick(text.toLowerCase())}>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//           <ListItem disablePadding>
//             <ListItemButton onClick={() => handleListItemClick('employee')}>
//               <ListItemText primary="Employee" />
//               {openEmployee ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>
//           </ListItem>
//           <Collapse in={openEmployee} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem button sx={{ pl: 4 }} onClick={() => setView('employee')}>
//                 <ListItemText primary="Employee List" />
//               </ListItem>
//               <ListItem button sx={{ pl: 4 }} onClick={() => setView('employeetechnology')}>
//                 <ListItemText primary="Employee Technology" />
//               </ListItem>
//             </List>
//           </Collapse>
//         </List>
//         <Divider />
//       </Drawer>
//       <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
//         <Toolbar />
//         {view === 'home' && (
//           <Typography variant="h5" paragraph>
//             Welcome to the Organization Application.
//           </Typography>
//         )}
//         {view === 'department' && <DepartmentList />}
//         {view === 'designation' && <DesignationList />}
//         {view === 'technology' && <TechnologyList />}
//         {view === 'employee' && <EmployeeList />}
//         {view === 'employeetechnology' && <EmployeeTechnologyList />}
//         {view === 'blogs' && <BlogsList />}
//         {view === 'client' && <ClientList />}
//         {view === 'clientcontact' && <ClientContactList />}
//         {view === 'contacttype' && <ContactTypeList />}

//         {/* Add more conditional renders for other views as needed */}
//       </Box>
//     </Box>
//   );
// }
//---------------------------------------------------------------------------------------------------------------
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DepartmentList from '../DepartmentServices/DepartmentList';
import DesignationList from '../DesignationService/DesignationList';
import EmployeeList from '../EmployeeServices/EmployeeList';
import TechnologyList from '../TechnologyServices/TechnologyList';
import EmployeeTechnologyList from '../EmployeeServices/EmployeeTechnologyList';
import BlogsList from '../BlogsServices/BlogsList';
import ClientList from '../ClientServices/ClientList';
import ClientContactList from '../ClientServices/ClientContactList';
import ContactTypeList from '../ClientServices/ContactTypeList';
import ProjectList from '../ProjectServices/ProjectList';
import ProjectEmployeeList from '../ProjectServices/ProjectEmployeeList';
import ProjectTechnologyList from '../ProjectServices/ProjectTechnologyList';
import InterviewList from '../InterviewServices/InterviewList';
import InterviewStatusList from '../InterviewServices/InterviewStatusList';
import WebinarList from '../WebinarServices/WebinarList';
import SOWList from '../SOWServices/SOWList';
import SOWProposedTeamList from '../SOWServices/SOWProposedTeamList';
import SOWRequirementList from '../SOWServices/SOWRequirementList';
import SOWStatusList from '../SOWServices/SOWStatusList';

const drawerWidth = 240;

export default function Home() {
  const [view, setView] = useState('home');
  const [openEmployee, setOpenEmployee] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openInterview, setOpenInterview] = useState(false);
  const [openSOW, setOpenSOW] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('oauth2');
    navigate('/');
  };

  const handleListItemClick = (view) => {
    if (view === 'employee') {
      setOpenEmployee(!openEmployee);
      setOpenClient(false); // Close client menu when employee menu is toggled
    } else if (view === 'client') {
      setOpenClient(!openClient);
      setOpenEmployee(false); // Close employee menu when client menu is toggled
    } else if (view === 'project') {
      setOpenProject(!openProject);
      setOpenClient(false); // Close client menu when project menu is toggled
    } else if (view === 'interview') {
      setOpenInterview(!openInterview);
      //setOpenProject(false); 
    } else if (view === 'sow') {
      setOpenSOW(!openSOW);
      //setOpenClient(false); // Close client menu when project menu is toggled
    } 
    else {
      setOpenEmployee(false);
      setOpenClient(false);
      setOpenProject(false);
      setOpenInterview(false);
      setOpenSOW(false);
      setView(view);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'black', color: 'white', boxShadow: 1 }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" noWrap component="div">
            Organization Application
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ mt: 1, mb: 1 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            // bgcolor: 'black', // Black background
            // color: 'white',

            borderRight: '1px solid white', // White border
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ bgcolor: 'black', color: 'white' }}>Dashboard</Toolbar>
        <Divider />
        <List>
          {['Home', 'Department', 'Designation', 'Technology', 'Webinar', 'Blogs'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => handleListItemClick(text.toLowerCase())}
                sx={{
                  '&:hover': { bgcolor: '#d3d3d3' }, // Dark gray on hover
                  borderRadius: 1
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleListItemClick('employee')}
              sx={{
                '&:hover': { bgcolor: '#d3d3d3' }, // Dark gray on hover
                borderRadius: 1
              }}
            >
              <ListItemText primary="Employee" />
              {openEmployee ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openEmployee} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('employee')}>
                <ListItemText primary="Employee List" />
              </ListItem>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('employeetechnology')}>
                <ListItemText primary="Employee Technology" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleListItemClick('client')}
              sx={{
                '&:hover': { bgcolor: '#d3d3d3' }, // Dark gray on hover
                borderRadius: 1
              }}
            >
              <ListItemText primary="Client" />
              {openClient ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openClient} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('client')}>
                <ListItemText primary="Client List" />
              </ListItem>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('clientcontact')}>
                <ListItemText primary="Client Contact" />
              </ListItem>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('contacttype')}>
                <ListItemText primary="Contact Type" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleListItemClick('project')}
              sx={{
                '&:hover': { bgcolor: '#d3d3d3' }, // Dark gray on hover
                borderRadius: 1
              }}
            >
              <ListItemText primary="Project" />
              {openProject ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openProject} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('project')}>
                <ListItemText primary="Project List" />
              </ListItem>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('projectemployee')}>
                <ListItemText primary="Project Employee" />
              </ListItem>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('projecttechnology')}>
                <ListItemText primary="Project Technology" />
              </ListItem>
            </List>
          </Collapse>

          
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleListItemClick('interview')}
              sx={{
                '&:hover': { bgcolor: '#d3d3d3' }, // Dark gray on hover
                borderRadius: 1
              }}
            >
              <ListItemText primary="Interview" />
              {openInterview ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openInterview} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('interview')}>
                <ListItemText primary="Interview List" />
              </ListItem>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('interviewstatus')}>
                <ListItemText primary="Interview Status" />
              </ListItem>
            </List>
          </Collapse>
          
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleListItemClick('sow')}
              sx={{
                '&:hover': { bgcolor: '#d3d3d3' }, // Dark gray on hover
                borderRadius: 1
              }}
            >
              <ListItemText primary="SOW" />
              {openSOW ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openSOW} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('sow')}>
                <ListItemText primary="SOW List" />
              </ListItem>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('sowproposedteam')}>
                <ListItemText primary="SOW ProposedTeam" />
              </ListItem>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('sowrequirement')}>
                <ListItemText primary="SOW Requirement" />
              </ListItem>
              <ListItem button sx={{ pl: 4, bgcolor: '#d3d3d3', '&:hover': { bgcolor: '#b0b0b0' } }} onClick={() => setView('sowstatus')}>
                <ListItemText primary="SOW Status" />
              </ListItem>
            </List>
          </Collapse>      

        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 3 }}>
        <Toolbar />
        {view === 'home' && (
          <Typography variant="h5" paragraph>
            Welcome to the Organization Application.
          </Typography>
        )}
        {view === 'department' && <DepartmentList />}
        {view === 'designation' && <DesignationList />}
        {view === 'technology' && <TechnologyList />}
        {view === 'employee' && <EmployeeList />}
        {view === 'employeetechnology' && <EmployeeTechnologyList />}
        {view === 'blogs' && <BlogsList />}
        {view === 'client' && <ClientList />}
        {view === 'clientcontact' && <ClientContactList />}
        {view === 'contacttype' && <ContactTypeList />}
        {view === 'project' && <ProjectList />}
        {view === 'projectemployee' && <ProjectEmployeeList />}
        {view === 'projecttechnology' && <ProjectTechnologyList />}
        {view === 'interview' && <InterviewList />}
        {view === 'interviewstatus' && <InterviewStatusList />}
        {view === 'webinar' && <WebinarList />}
        {view === 'sow' && <SOWList />}
        {view === 'sowproposedteam' && <SOWProposedTeamList />}
        {view === 'sowrequirement' && <SOWRequirementList />}
        {view === 'sowstatus' && <SOWStatusList />}
      </Box>
    </Box>
  );
}
