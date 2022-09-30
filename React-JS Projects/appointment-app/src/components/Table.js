import React, { Component } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import moment from 'moment';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

// const baseURL = "http://localhost:3000";
const baseURL = "https://appointment-sofax.muazahmed.me";

export class AppointmentTable extends Component {
    
        state = 
        {
            page: 0,
            rowsPerPage: 10,
            appointment_data: [],
            rows: 10,
        }

         handleChangePage = async (event, newPage) => {
            
            await this.setState({ page: newPage })
          };

          handleChangeRowsPerPage = async (event) => {
           
              await this.setState({ page: 0, rowsPerPage: +event.target.value })
          }

          handleData = async () => {
           
            await axios.get(`${baseURL}/appointments`,  { crossDomain: true }).then((res) => {
                // console.log('axios response ---> ', res.data.data);
                if(res.data.data.length > 0)
                {
                    let result = res.data.data;
                     this.setState({ appointment_data: result });
                }
            }).catch((error) => { console.log('error is ---->', error) })
          }

          componentDidMount = async() => {
              this.handleData();
          }

    render() {
            const { page, rowsPerPage, appointment_data } = this.state;

        return (
            <div>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
               
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Contact No</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Appointment Date</TableCell>
                            <TableCell>Last Activity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { appointment_data.length > 0 ? 
                            appointment_data.map((row, i) => {
                                return <TableRow key={i}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.contact_no}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.status === 1 ?  <Chip label="Active" color="success"  /> : <Chip label="Not Active" color="default" />}</TableCell>
                                    <TableCell>{moment(row.appointment_date).format('DD-MM-YYYY hh:mm')}</TableCell>
                                    <TableCell>{moment(row.updatedAt).format('DD-MM-YYYY hh:mm')}</TableCell>
                                </TableRow>
                            }) :
                            <TableRow key={9}>
                                 <Typography variant="subtitle1" gutterBottom component="div"  style={{ display: 'block', textAlign: 'center' }}>No Appointment Data Available</Typography>
                            </TableRow>                
                    }
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={appointment_data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
                </Paper>
            </div>
        )
    }
}

export default AppointmentTable
