import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { formatCurrency } from '../utils/formatCurrency';

const bannerImages = [
  "https://images.unsplash.com/photo-1445205170230-053b83016050",
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
];

const featuredCategories = [
  {
    title: 'Mujer',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    description: 'Descubre las últimas tendencias en moda femenina',
  },
  {
    title: 'Hombre',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59',
    description: 'Estilo y comodidad para el hombre moderno',
  },
  {
    title: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93',
    description: 'Complementa tu look con nuestra selección de accesorios',
  },
];

const newArrivals = [
  {
    name: 'Vestido Floral',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
  },
  {
    name: 'Camisa Elegante',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1',
  },
  {
    name: 'Bolso de Cuero',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7',
  },
  {
    name: 'Zapatos Casuales',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
  },
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'black',
          overflow: 'hidden',
          width: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          mt: { xs: '56px', sm: '64px' }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            transition: 'transform 0.5s ease-in-out',
            overflow: 'hidden'
          }}
        >
          {bannerImages.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`Banner ${index + 1}`}
              sx={{
                minWidth: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                transform: `translateX(-${currentImage * 100}%)`,
                transition: 'transform 0.5s ease-in-out',
              }}
            />
          ))}
        </Box>

        {/* Navigation Arrows */}
        <IconButton
          onClick={handlePrevImage}
          sx={{
            position: 'absolute',
            left: { xs: 8, md: 32 },
            color: 'white',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.5)' },
            zIndex: 2,
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={handleNextImage}
          sx={{
            position: 'absolute',
            right: { xs: 8, md: 32 },
            color: 'white',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.5)' },
            zIndex: 2,
          }}
        >
          <ArrowForwardIcon />
        </IconButton>

        {/* Slide Indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2,
            zIndex: 2,
          }}
        >
          {bannerImages.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentImage(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: index === currentImage ? 'primary.main' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              }}
            />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', color: 'white', zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Nueva Colección
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: 600,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            Descubre las últimas tendencias en moda y complementos para esta temporada
          </Typography>
          <Button
            component={RouterLink}
            to="/productos"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)',
                },
                '70%': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 0 15px rgba(255, 255, 255, 0)',
                },
                '100%': {
                  transform: 'scale(1)',
                  boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)',
                },
              },
              '&:hover': {
                backgroundColor: 'grey.100',
                animation: 'none',
                transform: 'scale(1.1)',
                transition: 'transform 0.3s ease',
              },
            }}
          >
            Ver Colección
          </Button>
        </Container>
      </Box>

      {/* Featured Categories */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Categorías Destacadas
        </Typography>
        <Grid container spacing={4}>
          {featuredCategories.map((category) => (
            <Grid item key={category.title} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={category.image}
                  alt={category.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {category.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* New Arrivals */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
            Nuevas Llegadas
          </Typography>
          <Grid container spacing={3}>
            {newArrivals.map((item) => (
              <Grid item key={item.name} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.3s ease-in-out',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="280"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h3">
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {formatCurrency(item.price)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={RouterLink}
              to="/productos"
              variant="outlined"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Ver Todos los Productos
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Únete a Nuestra Newsletter
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Suscríbete para recibir las últimas novedades y ofertas exclusivas
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            minWidth: 200,
            backgroundColor: 'black',
            '&:hover': {
              backgroundColor: 'grey.900',
            },
          }}
        >
          Suscribirse
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
