import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <MuiLink component={Link} to="/" color="inherit">
          Inicio
        </MuiLink>
        <Typography color="text.primary">Política de Privacidad</Typography>
      </Breadcrumbs>

      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Política de Privacidad
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Última actualización: {new Date().toLocaleDateString()}
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom color="primary">
            1. Información que Recopilamos
          </Typography>
          <Typography paragraph>
            En nuestra tienda en línea, nos comprometemos a proteger su privacidad. Recopilamos información que usted nos proporciona directamente cuando utiliza nuestros servicios, incluyendo:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" paragraph>
              Información personal básica (nombre, apellidos)
            </Typography>
            <Typography component="li" paragraph>
              Información de contacto (correo electrónico, número de teléfono)
            </Typography>
            <Typography component="li" paragraph>
              Dirección de envío y facturación
            </Typography>
            <Typography component="li" paragraph>
              Información de pago (procesada de forma segura a través de nuestros proveedores de pago)
            </Typography>
            <Typography component="li" paragraph>
              Historial de compras y preferencias de productos
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom color="primary">
            2. Cómo Utilizamos su Información
          </Typography>
          <Typography paragraph>
            La información que recopilamos se utiliza para:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" paragraph>
              Procesar y gestionar sus pedidos
            </Typography>
            <Typography component="li" paragraph>
              Enviarle actualizaciones sobre el estado de sus pedidos
            </Typography>
            <Typography component="li" paragraph>
              Mejorar nuestros productos y servicios
            </Typography>
            <Typography component="li" paragraph>
              Personalizar su experiencia de compra
            </Typography>
            <Typography component="li" paragraph>
              Enviarle comunicaciones de marketing (solo con su consentimiento)
            </Typography>
            <Typography component="li" paragraph>
              Prevenir fraudes y mantener la seguridad de nuestra plataforma
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom color="primary">
            3. Protección de sus Datos
          </Typography>
          <Typography paragraph>
            Tomamos la seguridad de sus datos muy en serio. Implementamos medidas de seguridad técnicas y organizativas que incluyen:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" paragraph>
              Encriptación SSL/TLS para todas las transmisiones de datos
            </Typography>
            <Typography component="li" paragraph>
              Almacenamiento seguro de datos en servidores protegidos
            </Typography>
            <Typography component="li" paragraph>
              Acceso restringido a datos personales solo a empleados autorizados
            </Typography>
            <Typography component="li" paragraph>
              Monitorización regular de nuestros sistemas para detectar posibles vulnerabilidades
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom color="primary">
            4. Sus Derechos
          </Typography>
          <Typography paragraph>
            De acuerdo con la legislación de protección de datos, usted tiene los siguientes derechos:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" paragraph>
              Derecho de acceso a sus datos personales
            </Typography>
            <Typography component="li" paragraph>
              Derecho a rectificar datos inexactos
            </Typography>
            <Typography component="li" paragraph>
              Derecho a solicitar la eliminación de sus datos
            </Typography>
            <Typography component="li" paragraph>
              Derecho a limitar el procesamiento de sus datos
            </Typography>
            <Typography component="li" paragraph>
              Derecho a la portabilidad de sus datos
            </Typography>
            <Typography component="li" paragraph>
              Derecho a oponerse al procesamiento de sus datos
            </Typography>
            <Typography component="li" paragraph>
              Derecho a retirar su consentimiento en cualquier momento
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom color="primary">
            5. Cookies y Tecnologías Similares
          </Typography>
          <Typography paragraph>
            Utilizamos cookies y tecnologías similares para mejorar su experiencia de navegación, analizar el uso del sitio y personalizar el contenido. Puede gestionar sus preferencias de cookies a través de la configuración de su navegador.
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom color="primary">
            6. Contacto
          </Typography>
          <Typography paragraph>
            Si tiene preguntas sobre nuestra política de privacidad o sobre cómo manejamos sus datos, puede contactarnos a través de:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" paragraph>
              Email: privacidad@tutienda.com
            </Typography>
            <Typography component="li" paragraph>
              Teléfono: +34 900 000 000
            </Typography>
            <Typography component="li" paragraph>
              Dirección: Calle Principal 123, 28001 Madrid, España
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Esta política de privacidad fue actualizada por última vez el {new Date().toLocaleDateString()}. Nos reservamos el derecho de realizar cambios en esta política, los cuales serán publicados en esta página.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
