import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Divider,
  TextField,
} from '@mui/material';
import { addItem } from '../store/slices/cartSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  // Mock product data - replace with actual API call
  const product = {
    id: id,
    name: 'Producto de Ejemplo',
    price: 299.99,
    description: 'Una descripción detallada del producto...',
    images: [
      'https://via.placeholder.com/500',
      'https://via.placeholder.com/500',
      'https://via.placeholder.com/500',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Blanco', 'Azul'],
    rating: 4.5,
    reviews: [
      {
        id: '1',
        userId: 'user1',
        userName: 'Juan Pérez',
        rating: 5,
        comment: '¡Excelente producto!',
        date: '2023-05-15',
      },
    ],
  };

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      dispatch(
        addItem({
          id: product.id!,
          name: product.name,
          price: product.price,
          quantity,
          size: selectedSize,
          color: selectedColor,
          imageUrl: product.images[0],
        })
      );
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Box>
          <Grid container spacing={1}>
            {product.images.map((image, index) => (
              <Grid item key={index} xs={4}>
                <img
                  src={image}
                  alt={`${product.name}-${index}`}
                  style={{
                    width: '100%',
                    cursor: 'pointer',
                    borderRadius: 4,
                    border:
                      selectedImage === index ? '2px solid primary.main' : 'none',
                  }}
                  onClick={() => setSelectedImage(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.reviews.length} reseñas)
            </Typography>
          </Box>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Talla</InputLabel>
            <Select
              value={selectedSize}
              label="Talla"
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Color</InputLabel>
            <Select
              value={selectedColor}
              label="Color"
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {product.colors.map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mb: 2 }}>
            <TextField
              type="number"
              label="Cantidad"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor}
          >
            Agregar al Carrito
          </Button>

          <Box sx={{ mt: 4 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Descripción" />
              <Tab label="Reseñas" />
            </Tabs>
            <Divider />
            
            <TabPanel value={tabValue} index={0}>
              <Typography>{product.description}</Typography>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              {product.reviews.map((review) => (
                <Box key={review.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {review.userName}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{review.comment}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
