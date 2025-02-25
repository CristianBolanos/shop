import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Box,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { RootState } from '../store';

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
      id={`profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [tabValue, setTabValue] = useState(0);

  // Mock orders data
  const orders = [
    {
      id: '1',
      date: '2023-05-15',
      total: 299.99,
      status: 'Entregado',
      items: 3,
    },
    {
      id: '2',
      date: '2023-05-10',
      total: 159.99,
      status: 'En camino',
      items: 2,
    },
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Por favor inicia sesión para ver tu perfil
        </Typography>
        <Button variant="contained" href="/login">
          Iniciar Sesión
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={user.avatar}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Cambiar Foto
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Información Personal" />
                <Tab label="Pedidos" />
                <Tab label="Direcciones" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      defaultValue={user.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      defaultValue={user.email}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      defaultValue="+1234567890"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained">
                      Guardar Cambios
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Pedido #</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Artículos</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>
                            {new Date(order.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>${order.total}</TableCell>
                          <TableCell>{order.status}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>
                            <Button size="small">Ver Detalles</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Button
                  variant="contained"
                  sx={{ mb: 3 }}
                >
                  Agregar Nueva Dirección
                </Button>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Dirección Principal
                        </Typography>
                        <Typography color="text.secondary">
                          123 Calle Principal
                          <br />
                          Ciudad, Estado 12345
                          <br />
                          País
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Button size="small" sx={{ mr: 1 }}>
                            Editar
                          </Button>
                          <Button size="small" color="error">
                            Eliminar
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
