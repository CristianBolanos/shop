import React from 'react';
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  Fab,
  useScrollTrigger,
  Zoom,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

interface FilterDrawerProps {
  children: React.ReactNode;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Botón de filtros */}
      <Zoom in={trigger}>
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: (theme) => theme.zIndex.drawer - 1,
          }}
          onClick={toggleDrawer}
        >
          <FilterListIcon />
        </Fab>
      </Zoom>

      {/* Flecha de cierre para desktop */}
      {!isMobile && open && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            right: 400,
            transform: 'translate(50%, -50%)',
            zIndex: theme.zIndex.drawer + 2,
            backgroundColor: 'background.paper',
            width: 40,
            height: 80,
            borderRadius: '40px 0 0 40px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '-3px 0 6px -1px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              width: 48,
              backgroundColor: 'action.hover',
              '& .arrow-icon': {
                transform: 'translateX(-2px)',
              }
            },
          }}
          onClick={toggleDrawer}
        >
          <ArrowBackIcon 
            className="arrow-icon"
            sx={{ 
              fontSize: 32,
              color: 'text.secondary',
              transition: 'transform 0.2s ease-in-out',
              ml: -0.5
            }} 
          />
        </Box>
      )}

      {/* Drawer principal */}
      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={open}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400 },
            height: { xs: 'auto', sm: '100%' },
            maxHeight: { xs: '80vh', sm: '100%' },
            p: 3,
            borderTopLeftRadius: { xs: 16, sm: 0 },
            borderTopRightRadius: { xs: 16, sm: 0 },
          },
        }}
      >
        {isMobile ? (
          // Versión móvil con X en la parte superior
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center', 
              mb: 3,
              position: 'sticky',
              top: 0,
              backgroundColor: 'background.paper',
              zIndex: 1100,
              pb: 2,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">Filtros y Búsqueda</Typography>
            <IconButton 
              onClick={toggleDrawer}
              edge="end"
              sx={{
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          // Versión desktop solo con título
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center', 
              mb: 3,
              position: 'sticky',
              top: 0,
              backgroundColor: 'background.paper',
              zIndex: 1100,
              pb: 2,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6">Filtros y Búsqueda</Typography>
          </Box>
        )}

        <Paper 
          elevation={0} 
          sx={{ 
            p: 2,
            backgroundColor: 'background.default',
            overflowY: 'auto',
            height: '100%'
          }}
        >
          {children}
        </Paper>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
