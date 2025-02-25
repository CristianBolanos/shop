import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductCard from '../components/ProductCard';
import { selectFavorites } from '../store/slices/favoritesSlice';
import { sampleProducts } from '../data/sampleProducts';

const FavoritesList: React.FC = () => {
  const favorites = useSelector(selectFavorites);
  const favoriteIds = Object.keys(favorites);
  const favoriteProducts = sampleProducts.filter(product => favoriteIds.includes(product.id));

  if (favoriteIds.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Alert severity="info" sx={{ display: 'inline-flex', mb: 2 }}>
            No tienes productos favoritos aún
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        py: 4,
        pt: { xs: '72px', sm: '80px' }, 
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <FavoriteIcon color="error" />
        <Typography variant="h4" component="h1">
          Mis Favoritos ({favoriteIds.length})
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {favoriteProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoritesList;
