import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Box,
  // Radio,
  // RadioGroup,
  // FormControlLabel,
  // FormControl,
  // FormLabel,
  Divider,
  Paper,
} from '@mui/material';
import { RootState } from '../store';

const steps = ['Información de Envío', 'Método de Pago', 'Confirmar Pedido'];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { items, total, shipping, tax } = useSelector(
    (state: RootState) => state.cart
  );

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Procesar el pago
      console.log('Procesando pago...');
      navigate('/carrito');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const ShippingForm = () => (
    <Paper sx={{ p: { xs: 2, md: 3 }, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Información de Envío
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nombre"
            fullWidth
            size="small"
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellido"
            fullWidth
            size="small"
            autoComplete="family-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Dirección"
            fullWidth
            size="small"
            autoComplete="shipping address-line1"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Ciudad"
            fullWidth
            size="small"
            autoComplete="shipping address-level2"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="Departamento"
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Código Postal"
            fullWidth
            size="small"
            autoComplete="shipping postal-code"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Teléfono"
            fullWidth
            size="small"
            autoComplete="tel"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Paper>
  );

  const PaymentForm = () => (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h6" gutterBottom>
        Método de Pago
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            label="Nombre en la tarjeta"
            fullWidth
            size="small"
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Número de tarjeta"
            fullWidth
            size="small"
            autoComplete="cc-number"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Fecha de expiración"
            fullWidth
            size="small"
            autoComplete="cc-exp"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Últimos tres dígitos en la franja de firma"
            fullWidth
            size="small"
            autoComplete="cc-csc"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Paper>
  );

  const OrderSummary = () => (
    <div>
      {items.map((item) => (
        <Box
          key={`${item.id}-${item.size}-${item.color}`}
          sx={{ mb: 2 }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: '100%', borderRadius: 4 }}
              />
            </Grid>
            <Grid item xs={7}>
              <Typography variant="subtitle1">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Talla: {item.size}, Color: {item.color}
              </Typography>
              <Typography variant="body2">
                Cantidad: {item.quantity}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" align="right">
                ${(item.price * item.quantity * 4000).toLocaleString('es-CO')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </div>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ShippingForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <OrderSummary />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        marginTop: { xs: '56px', sm: '64px' }
      }}
    >
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Confirmar Pedido' : 'Siguiente'}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen del Pedido
              </Typography>
              <Box sx={{ my: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>${(total * 4000).toLocaleString('es-CO')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Envío</Typography>
                  <Typography>${(shipping * 4000).toLocaleString('es-CO')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Impuestos</Typography>
                  <Typography>${(tax * 4000).toLocaleString('es-CO')}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">
                    ${((total + shipping + tax) * 4000).toLocaleString('es-CO')}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
