import axios from 'axios';
import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from "moment";
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// const baseURL = "http://localhost:3000";
const baseURL = "https://appointment-sofax.muazahmed.me"
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export class Form extends Component {
    state = {
        form: {
            // appointment_date: moment().format('DD-MM-YYYY hh:mm A')
        },
        loading: false,
        openModal: false,
        modalTitle: "",
        modalMessage: "",
        validateName: false,
        validateEmail: false,
        validatePhoneNo: false,
        validateAppointmentDate: false,
        validateEmailText: "Field Email is Required"

    }

    handleChange = async(e) => {
        const { form } = this.state;
        const { name ,value } = e.target;
        // const text = e.nativeEvent.target.innerText;
        await this.setState((p) => ({
            form: {
                ...p.form,
                [name]: value
            }
        }), () => {
            if(form.name)
            {
                  this.setState({ validateName: false })
            }
            if(form.email)
            {
                let email_validation = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) ? "" : "Email is not valid."
                  this.setState({ validateEmail: false, validateEmailText: email_validation })
            }
            if(form.contact_no)
            {
                 this.setState({ validatePhoneNo: false });
            }
        });
      
    }

    handleCloseModal = async () => {
        this.setState({ openModal: false })
    }

    handleOpen = async (title, message) => {
        const { openModal, loading } = this.state
      await  this.setState({ openModal: !openModal, modalTitle: title, modalMessage: message, loading: !loading, form: {} });
    }

    handeSubmit = async () => {
        const { form, loading } = this.state;
        this.setState({ loading: !loading });
        if(Object.keys(form) < 4)
        {
            if(!Object.values(form).includes("name") || form.name === undefined || form.name === "")
            {
                await  this.setState({ validateName: true })
            }
            else
            {
                await  this.setState({ validateName: false })
            }

            if(!Object.values(form).includes("email") || form.email === undefined || form.email === "")
            {
                await this.setState({ validateEmail: true, validateEmailText: "Field Email is Required" })
            }
            else
            {
                await  this.setState({ validateEmail: false, validateEmailText: "" })
            }

            if(!Object.values(form).includes("contact_no") || form.contact_no === undefined || form.contact_no === "")
            {
                await  this.setState({ validatePhoneNo: true });
            }
            else
            {
                await this.setState({ validatePhoneNo: false });
            }

            if(!Object.values(form).includes("appointment_date") || form.appointment_date === undefined || form.appointment_date === "")
            {
                await this.setState({ validateAppointmentDate: true });
            }
            else
            {
                this.setState({ validateAppointmentDate: false });
            }

            return;
        }

        const payload = {
            name: form.name,
            email: form.email,
            phone_no: form.contact_no,
            status: 1,
            booking_time: form.appointment_date,
        }

        await axios.post(`${baseURL}/appointment/create`, payload).then((res) => {
            let result = res.data;
            if(result.success)
            {
                this.handleOpen("Success", result.message);
            }
            else
            {
                this.handleOpen("Unsuccessful", result.message);
            }

        }).catch((err) => { 
            let result = err && err.response && err.response.data ?  err.response.data.message : 'Unexpected error occured.'
            console.log(`the error is ----> ${JSON.stringify(err.response)}`)
            this.handleOpen("Unsuccessful", result);
        
        })
       
    }

    handleDateChange = async (field, date) => {
        const { form } = this.state;
        await this.setState((p) => ({
          form: { ...p.form, [field]: moment(date).format("YYYY-MM-DD hh:mm A") },
        }), () => { 
            if(form.appointment_date)
            {
                this.setState({ validateAppointmentDate: false });
            }
        })
      };
    render() {
        const { form, openModal, modalMessage, modalTitle, validateName, validateEmail, validatePhoneNo, validateAppointmentDate, validateEmailText } = this.state;
        
        return (
            <div>
                  <Modal
                    open={openModal}
                    onClose={this.handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalTitle}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {modalMessage}
                    </Typography>
                    <Grid  container justifyContent="flex-end" xs={12} style={{ marginTop: 20, textAlign: 'right' }}>
                <Stack direction="row" spacing={2}>
                    <Button 
                    variant="outlined"
                    onClick={this.handleCloseModal}>
                        Close
                    </Button>
                </Stack> 
                </Grid>

                    </Box>
                </Modal>

             <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}  >
                <FormControl error={validateName ? true : false}  style={{ width: '100%'}}>
                        <TextField
                            required
                            onChange={this.handleChange}
                            id="name"
                            name="name"
                            label="Name"
                            value={form.name ? form.name : ''}
                            InputLabelProps={{ shrink: true }}
                            error={validateName ? true : false}
                            />
                    {validateName && (<FormHelperText id="name">Field Name is Required</FormHelperText>)}
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}  md={6}>
                <FormControl error={validateEmail ? true : false} style={{ width: '100%'}}>
                    <TextField
                            required
                            onChange={this.handleChange}
                            id="email"
                            name="email"
                            label="Email"
                            value={form.email ? form.email : ''}
                            InputLabelProps={{ shrink: true }}
                            error={validateEmail ? true : false}
                            />
                    {validateEmail && (<FormHelperText id="email">{validateEmailText}</FormHelperText>)}
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                <FormControl error={validatePhoneNo ? true : false} style={{ width: '100%'}}>
                    <TextField
                            required
                            onChange={this.handleChange}
                            id="phone_no"
                            name="contact_no"
                            label="Phone Number"
                            type="number"
                            value={form.contact_no ? form.contact_no : ''}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 12 }}
                            InputLabelProps={{ shrink: true }}
                            error={validatePhoneNo ? true : false}
                            />
                    {validatePhoneNo && (<FormHelperText id="phone_no">Field Phone No is Required</FormHelperText>)}

                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>       
                <FormControl error={validateAppointmentDate ? true : false}  style={{ width: '100%'}}>
                    <LocalizationProvider  dateAdapter={DateAdapter}>
                        <DateTimePicker
                            required
                            name="appointment_date"
                            renderInput={(props) => <TextField error={validateAppointmentDate ? true : false} {...props} />}
                            label="Appointment Date"
                            InputLabelProps={{ shrink: true }}
                            type="datetime-local"
                            
                            value={form.appointment_date ? form.appointment_date : null}
                            onChange={(e) => this.handleDateChange("appointment_date", e)}
                        />
                        </LocalizationProvider>
                    {validateAppointmentDate && (<FormHelperText id="phone_no">Field Appointment Date is Required</FormHelperText>)}
                </FormControl>
                </Grid>
                
                <Grid  container justifyContent="flex-end" xs={12} style={{ marginTop: 20, textAlign: 'right' }}>
                <Stack direction="row" spacing={2}>
                    <Button 
                    variant="outlined"
                    onClick={this.handeSubmit}>Book
                    </Button>
                </Stack> 
                </Grid>
            </Grid>   
            </div>
        )
    }
}

export default Form
