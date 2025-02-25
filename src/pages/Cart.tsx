import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import { 
  Add, 
  Remove, 
  Delete,
  Close,
  SentimentVeryDissatisfied,
  EmojiEmotions,
  Mood,
  ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';
import { RootState } from '../store';
import { removeItem, updateQuantity, CartItem } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemToRemove, setItemToRemove] = React.useState<CartItem | null>(null);

  const { items, total, shipping, tax } = useSelector(
    (state: RootState) => state.cart
  );

  const getCartMood = () => {
    if (items.length === 0) {
      return {
        icon: <SentimentVeryDissatisfied sx={{ fontSize: 80, color: 'text.secondary' }} />,
        message: 'Tu carrito está vacío'
      };
    } else if (items.length <= 2) {
      return {
        icon: <Mood sx={{ fontSize: 80, color: 'primary.main' }} />,
        message: '¡Buen comienzo! ¿Quieres ver más productos increíbles?'
      };
    } else {
      return {
        icon: <EmojiEmotions sx={{ 
          fontSize: 80, 
          color: 'warning.main',
          animation: 'bounce 0.5s infinite alternate'
        }} />,
        message: '¡Wow! ¡Excelente elección! 🎉'
      };
    }
  };

  const handleQuantityChange = (
    id: string,
    size: string,
    color: string,
    delta: number,
    currentQuantity: number
  ) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, size, color, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string, size: string, color: string) => {
    dispatch(removeItem({ id, size, color }));
    setItemToRemove(null);
  };

  const handleRemoveConfirmation = (item: CartItem) => {
    setItemToRemove(item);
  };

  const { icon, message } = getCartMood();

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, marginTop: { xs: '56px', sm: '64px' } }}>
        <Box sx={{ 
          textAlign: 'center',
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}>
          {icon}
          <Alert severity="info" sx={{ display: 'inline-flex' }}>
            {message}
          </Alert>
          <Button
            component={Link}
            to="/productos"
            variant="contained"
            startIcon={<ShoppingBagIcon />}
            sx={{ textDecoration: 'none' }}
          >
            Ir a Productos
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, marginTop: { xs: '56px', sm: '64px' } }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mi Carrito ({items.length} {items.length === 1 ? 'producto' : 'productos'})
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={`${item.id}-${item.size}-${item.color}`} sx={{ mb: 1.5 }}>
              <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Grid container spacing={1.5} alignItems="center">
                  <Grid item xs={3}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: '100%', height: 100, objectFit: 'contain', borderRadius: 4 }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                      }}
                    >
                      <div>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Talla: {item.size}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Color: {item.color}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                          ${(item.price * 4000).toLocaleString('es-CO')}
                        </Typography>
                      </div>
                      <IconButton
                        onClick={() => handleRemoveConfirmation(item)}
                        color="error"
                        size="small"
                        sx={{
                          '&:hover': {
                            transform: 'scale(1.1)',
                            transition: 'transform 0.2s'
                          }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.size,
                            item.color,
                            -1,
                            item.quantity
                          )
                        }
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ mx: 1.5 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.size,
                            item.color,
                            1,
                            item.quantity
                          )
                        }
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen del Pedido
              </Typography>
              <Box sx={{ my: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal</Typography>
                  <Typography>${(total * 4000).toLocaleString('es-CO')}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Envío</Typography>
                  <Typography>${(shipping * 4000).toLocaleString('es-CO')}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Impuestos</Typography>
                  <Typography>${(tax * 4000).toLocaleString('es-CO')}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">
                    ${((total + shipping + tax) * 4000).toLocaleString('es-CO')}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={() => {
                  console.log('Navegando al checkout...');
                  navigate('/checkout', { replace: true });
                }}
              >
                Proceder al Pago
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Diálogo de confirmación para eliminar item */}
      <Dialog
        open={Boolean(itemToRemove)}
        onClose={() => setItemToRemove(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
          Confirmar eliminación
          <IconButton
            aria-label="close"
            onClick={() => setItemToRemove(null)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar {itemToRemove?.name} de tu carrito?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setItemToRemove(null)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => itemToRemove && handleRemoveItem(itemToRemove.id, itemToRemove.size, itemToRemove.color)}
            color="error"
            variant="contained"
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
