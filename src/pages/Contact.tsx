import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    setSnackbar({
      open: true,
      message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
      severity: 'success',
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Contáctanos
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
        Estamos aquí para ayudarte. Envíanos tus preguntas o comentarios.
      </Typography>

      <Grid container spacing={6} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Box>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ mb: 4 }}>
                <PhoneIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Teléfono
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  +1 234 567 890
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <EmailIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  contacto@tutienda.com
                </Typography>
              </Box>

              <Box>
                <LocationIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Dirección
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Calle Principal #123
                  <br />
                  Ciudad, País
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Asunto"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    label="Mensaje"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Enviar Mensaje
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
