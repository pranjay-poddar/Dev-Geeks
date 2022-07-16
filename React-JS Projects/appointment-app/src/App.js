import React, { Component } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Chip from '@mui/material/Chip';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppointmentTable } from './components/Table';
import Typography from '@mui/material/Typography';
import Form from './components/Form';
class App extends Component {
constructor(props)
{
  super(props)
  this.state = {
    value: "1"
  }
}
// control tab
 handleChange = (event, value) => {
  if(value)
  {
    this.setState({ value: value })
  }
}
  render() {
    const { value } = this.state;
    return (
      <div>
         <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={this.handleChange}  variant="scrollable" scrollButtons="auto">
                    <Tab label="Appointment Form" value="1" />
                    <Tab label="Appointments List" value="2" />
                    <Tab label="About Me" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                <Typography variant="h4" gutterBottom component="div" style={{ marginBottom: '50px' }}>
                    Make an Appointment
                </Typography>
                  <Form /> 
                </TabPanel>
                <TabPanel value="2">
                  <Typography variant="h4" gutterBottom component="div">
                    Appointment(s) List
                </Typography>
                    <AppointmentTable /> 
                  </TabPanel>
                <TabPanel value="3">
                  <Typography variant="subtitle1" gutterBottom component="div">
                      Developed by: Muaz Ahmed;
                  </Typography> 
                <br />
                <Typography variant="subtitle1" gutterBottom component="div">
                    Developed Using: &nbsp;<Chip label="React" variant="outlined" /> &nbsp; <Chip label="ExpressJS" variant="outlined" />
                  </Typography>

                </TabPanel>
              </TabContext>
            </Box>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
