import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Support = () => {
  return (
    <>
    <Navbar/>
    <Container maxWidth="lg" style={{ backgroundColor: '#f7f7f7', padding: '20px' }}>
      <Grid container justifyContent="center" spacing={4} style={{marginTop: 65}}>
        <Grid item xs={12} sm={6} md={4} style={{ textAlign: 'center' }}>
          <Typography variant="h5">Contact Us</Typography>
          <Typography variant="subtitle1">(855) 701-3678</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} style={{ textAlign: 'center' }}>
          <Typography variant="h5">Email</Typography>
          <Typography variant="subtitle1">support@setczone.com</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} style={{ textAlign: 'center' }}>
          <Typography variant="h5">Appointment</Typography>
          <Typography variant="subtitle1">Book an appointment with an SETC Expert</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} style={{ textAlign: 'center' }}>
          <Typography variant="h5">Application Status</Typography>
          <Typography variant="subtitle1">
            Check the current application status of Setczone
          </Typography>
        </Grid>
      </Grid>
    </Container>
    <Footer/>
    </>
  );
};

export default Support;

