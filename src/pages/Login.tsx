import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
} from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    dispatch(loginStart());

    try {
      // Replace with actual API call
      // const response = await loginUser(email, password);
      const mockUser = {
        id: '1',
        email,
        name: 'Usuario de Prueba',
      };

      dispatch(loginSuccess(mockUser));
      navigate('/');
    } catch (err) {
      dispatch(loginFailure('Error al iniciar sesión'));
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
        mt: { xs: '56px', sm: '64px' }
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
            Iniciar Sesión
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
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>

            <Grid container>
              <Grid item xs>
                <Link to="/recuperar-password" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    ¿Olvidaste tu contraseña?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/registro" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    ¿No tienes cuenta? Regístrate
                  </Typography>
                </Link>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                O continúa con
              </Typography>
            </Divider>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={() => {
                    // Implement Google login
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
                    // Implement Facebook login
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

export default Login;
