import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Divider,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Replace with actual API call
      // await registerUser(formData);
      navigate('/login');
    } catch (err) {
      setError('Error al crear la cuenta');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Crear Cuenta
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre Completo"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Contraseña"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="acceptTerms"
                  color="primary"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2">
                  Acepto los{' '}
                  <Link
                    to="/terminos-y-condiciones"
                    style={{ textDecoration: 'none', color: 'primary' }}
                  >
                    términos y condiciones
                  </Link>
                </Typography>
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    ¿Ya tienes una cuenta? Inicia sesión
                  </Typography>
                </Link>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                O regístrate con
              </Typography>
            </Divider>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={() => {
                    // Implement Google registration
                  }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Facebook />}
                  onClick={() => {
                    // Implement Facebook registration
                  }}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
