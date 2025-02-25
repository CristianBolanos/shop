import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  Chip,
  Stack,
  Paper,
  Collapse,
  ListItemIcon,
  Divider,
  Button,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface CategoryFilterProps {
  onSelectCategory: (category: string, subcategory: string) => void;
  selectedSubcategory: string;
}

const categories = {
  'Mujer': [
    'Vestidos',
    'Blusas',
    'Pantalones',
    'Faldas',
    'Abrigos',
  ],
  'Hombre': [
    'Camisas',
    'Pantalones',
    'Chaquetas',
    'Trajes',
    'Polos',
  ],
  'Accesorios': [
    'Bolsos',
    'Carteras',
    'Cinturones',
    'Bufandas',
    'Joyas',
  ],
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onSelectCategory, selectedSubcategory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [tempSelectedCategory, setTempSelectedCategory] = useState('');
  const [tempSelectedSubcategory, setTempSelectedSubcategory] = useState('');

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    setTempSelectedSubcategory(selectedSubcategory);
    const currentCategory = Object.entries(categories).find(([_, subcategories]) =>
      subcategories.some(sub => sub.toLowerCase() === selectedSubcategory.toLowerCase())
    )?.[0] || '';
    setTempSelectedCategory(currentCategory);
    setExpandedCategory(currentCategory);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setExpandedCategory(null);
  };

  const handleCategoryClick = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleSubcategorySelect = (category: string, subcategory: string) => {
    if (!isMobile) {
      onSelectCategory(category, subcategory.toLowerCase());
    } else {
      setTempSelectedCategory(category);
      setTempSelectedSubcategory(subcategory.toLowerCase());
    }
  };

  const handleApplyFilters = () => {
    onSelectCategory(tempSelectedCategory, tempSelectedSubcategory);
    setDrawerOpen(false);
  };

  const handleClearFilters = () => {
    if (isMobile) {
      setTempSelectedCategory('');
      setTempSelectedSubcategory('');
      onSelectCategory('', '');
    } else {
      onSelectCategory('', '');
    }
  };

  const renderMobileDrawer = () => (
    <Drawer
      anchor="bottom"
      open={drawerOpen}
      onClose={handleDrawerClose}
      PaperProps={{
        sx: {
          maxHeight: '85vh',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          pb: 2,
        },
      }}
    >
      <Box sx={{ p: 2, position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Filtrar por categoría</Typography>
          <IconButton onClick={handleDrawerClose} size="small">
            <ClearIcon />
          </IconButton>
        </Box>
        {tempSelectedSubcategory && (
          <Chip
            label={`${tempSelectedSubcategory.charAt(0).toUpperCase()}${tempSelectedSubcategory.slice(1)}`}
            onDelete={handleClearFilters}
            color="primary"
            sx={{ mr: 1 }}
          />
        )}
      </Box>
      <Divider />
      <List sx={{ flex: 1, overflowY: 'auto' }}>
        <ListItemButton
          onClick={() => handleSubcategorySelect('', '')}
          selected={tempSelectedSubcategory === ''}
        >
          <ListItemText primary="Todas las categorías" />
          {tempSelectedSubcategory === '' && (
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <CheckIcon color="primary" />
            </ListItemIcon>
          )}
        </ListItemButton>
        {Object.entries(categories).map(([category, subcategories]) => (
          <React.Fragment key={category}>
            <ListItemButton onClick={() => handleCategoryClick(category)}>
              <ListItemText primary={category} />
              {expandedCategory === category ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={expandedCategory === category} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subcategories.map((subcategory) => (
                  <ListItemButton
                    key={subcategory}
                    sx={{ pl: 4 }}
                    selected={tempSelectedSubcategory === subcategory.toLowerCase()}
                    onClick={() => handleSubcategorySelect(category, subcategory)}
                  >
                    <ListItemText primary={subcategory} />
                    {tempSelectedSubcategory === subcategory.toLowerCase() && (
                      <ListItemIcon sx={{ minWidth: 'auto' }}>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                    )}
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ p: 2, position: 'sticky', bottom: 0, bgcolor: 'background.paper' }}>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClearFilters}
            startIcon={<ClearIcon />}
          >
            Limpiar
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleApplyFilters}
            startIcon={<CheckIcon />}
          >
            Aplicar
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );

  const renderMobileView = () => (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 1, 
        mb: 2,
        backgroundColor: 'transparent'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleDrawerOpen}
          startIcon={<FilterListIcon />}
          sx={{ 
            whiteSpace: 'nowrap',
            minWidth: 'auto',
            px: 2,
          }}
        >
          Filtros {selectedSubcategory && '(1)'}
        </Button>
        {selectedSubcategory && (
          <Chip
            label={`${selectedSubcategory.charAt(0).toUpperCase()}${selectedSubcategory.slice(1)}`}
            onDelete={() => onSelectCategory('', '')}
            color="primary"
          />
        )}
      </Box>
      {renderMobileDrawer()}
    </Paper>
  );

  const renderDesktopView = () => (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
      <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        Categorías
      </Typography>
      <List component="nav" sx={{ p: 1 }}>
        <ListItemButton
          selected={selectedSubcategory === ''}
          onClick={() => onSelectCategory('', '')}
        >
          <ListItemText primary="Todas" />
        </ListItemButton>
        {Object.entries(categories).map(([category, subcategories]) => (
          <Box key={category}>
            <Typography
              variant="subtitle1"
              sx={{ px: 2, py: 1, fontWeight: 'bold', color: 'text.secondary' }}
            >
              {category}
            </Typography>
            {subcategories.map((subcategory) => (
              <ListItemButton
                key={subcategory}
                selected={selectedSubcategory === subcategory.toLowerCase()}
                onClick={() => onSelectCategory(category, subcategory.toLowerCase())}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={subcategory} />
              </ListItemButton>
            ))}
          </Box>
        ))}
      </List>
    </Box>
  );

  return isMobile ? renderMobileView() : renderDesktopView();
};

export default CategoryFilter;
