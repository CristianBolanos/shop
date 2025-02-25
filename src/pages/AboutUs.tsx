import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const AboutUs: React.FC = () => {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        marginTop: { xs: '56px', sm: '64px' }
      }}
    >
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Quiénes Somos
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Tu destino de moda favorito con las últimas tendencias
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Nuestra Historia
            </Typography>
            <Typography paragraph>
              Fundada en 2023, ShopModa nació con la visión de ofrecer moda de calidad
              a precios accesibles. Nos especializamos en crear experiencias de
              compra únicas, combinando las últimas tendencias con un servicio
              excepcional.
            </Typography>
            <Typography paragraph>
              Nuestro compromiso con la calidad y la satisfacción del cliente nos
              ha convertido en un referente en el mundo de la moda online.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
              alt="Tienda de ropa"
            />
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Nuestros Valores
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {[
            {
              title: 'Calidad',
              description: 'Seleccionamos cuidadosamente cada prenda para garantizar los más altos estándares.',
              image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2',
            },
            {
              title: 'Sostenibilidad',
              description: 'Comprometidos con prácticas responsables y materiales sostenibles.',
              image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
            },
            {
              title: 'Innovación',
              description: 'Constantemente buscando nuevas formas de mejorar tu experiencia de compra.',
              image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf',
            },
          ].map((value) => (
            <Grid item xs={12} md={4} key={value.title}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={value.image}
                  alt={value.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {value.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;
