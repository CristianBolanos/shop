import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Email,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        pt: 6,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Sobre Nosotros
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Somos una tienda de moda comprometida con la calidad y el estilo.
              Ofrecemos las últimas tendencias en ropa y accesorios para todos los gustos.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Enlaces Útiles
            </Typography>
            <Typography
              component={Link}
              to="/productos"
              variant="body2"
              color="text.secondary"
              display="block"
              sx={{ textDecoration: 'none', mb: 1 }}
            >
              Productos
            </Typography>
            <Typography
              component={Link}
              to="/nosotros"
              variant="body2"
              color="text.secondary"
              display="block"
              sx={{ textDecoration: 'none', mb: 1 }}
            >
              Sobre Nosotros
            </Typography>
            <Typography
              component={Link}
              to="/contacto"
              variant="body2"
              color="text.secondary"
              display="block"
              sx={{ textDecoration: 'none', mb: 1 }}
            >
              Contacto
            </Typography>
            <Typography
              component={Link}
              to="/favoritos"
              variant="body2"
              color="text.secondary"
              display="block"
              sx={{ textDecoration: 'none', mb: 1 }}
            >
              Favoritos
            </Typography>
            <Typography
              component={Link}
              to="/privacy-policy"
              variant="body2"
              color="text.secondary"
              display="block"
              sx={{ textDecoration: 'none' }}
            >
              Política de Privacidad
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Suscríbete a nuestro Newsletter
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                size="small"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1 }}
              >
                Suscribirse
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="facebook">
                <Facebook />
              </IconButton>
              <IconButton color="primary" aria-label="instagram">
                <Instagram />
              </IconButton>
              <IconButton color="primary" aria-label="twitter">
                <Twitter />
              </IconButton>
              <IconButton color="primary" aria-label="youtube">
                <YouTube />
              </IconButton>
              <IconButton color="primary" aria-label="email">
                <Email />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ 
          mt: 8,
          pb: 3,
          borderTop: 1,
          borderColor: 'divider',
          pt: 3
        }}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            {currentYear} ShopModa. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
