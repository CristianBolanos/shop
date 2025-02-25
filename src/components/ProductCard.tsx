import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  Rating,
  useTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Stack,
  useMediaQuery,
  Modal,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/slices/cartSlice';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import type { Product } from '../data/sampleProducts';
import { RootState } from '../store';

interface ProductCardProps extends Product {
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({
  id,
  name,
  price,
  images,
  description,
  // isNew,
  discount,
  rating,
  sizes,
  colors,
  viewMode = 'grid',
}: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isFavorite = Boolean(favorites[id]);
  const isInCart = cartItems.some(item => item.id === id);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setQuickViewOpen(true);
      return;
    }
    
    dispatch(addItem({
      id,
      name,
      price,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      imageUrl: images[0],
    }));
  };

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite({ id, name, price, imageUrl: images[0] }));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleOpenZoomModal = () => setZoomModalOpen(true);
  const handleCloseZoomModal = () => setZoomModalOpen(false);

  const handleAddButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price * 4000);

  const discountedPrice = discount ? price * (1 - discount / 100) : price;
  const formattedDiscountedPrice = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(discountedPrice * 4000);

  const renderProductImage = () => (
    <Box
      sx={{
        position: 'relative',
        width: viewMode === 'list' ? '300px' : '100%',
        height: viewMode === 'list' ? '300px' : '260px',
      }}
    >
      <CardMedia
        component="img"
        image={images[currentImageIndex]}
        alt={name}
        sx={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        }}
        onClick={handleOpenZoomModal}
        style={{ cursor: 'pointer' }}
      />
      {images.length > 1 && (
        <>
          <IconButton
            size="small"
            onClick={handlePrevImage}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        </>
      )}
    </Box>
  );

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: viewMode === 'list' ? 'row' : 'column',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: theme.shadows[4],
          },
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {renderProductImage()}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
          {viewMode === 'list' ? (
            // Vista horizontal (lista)
            <>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    height: '40px'
                  }}
                >
                  {description}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Rating value={rating} precision={0.5} size="small" readOnly />
                </Box>
              </Box>

              <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {discount > 0 ? (
                    <>
                      <Typography variant="h6" component="span" color="error">
                        ${formattedDiscountedPrice}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ textDecoration: 'line-through', ml: 1 }}
                        color="text.secondary"
                      >
                        ${formattedPrice}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h6" component="span">
                      ${formattedPrice}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, ml: 'auto', alignItems: 'center' }}>
                  <IconButton
                    onClick={handleFavoriteClick}
                    color={isFavorite ? 'error' : 'default'}
                    size="small"
                  >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <IconButton onClick={handleShare} size="small">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={handleOpenZoomModal}
                    sx={{
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    <ZoomInIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    onClick={handleAddButtonClick}
                    startIcon={<ShoppingCartIcon />}
                    size="small"
                    sx={{
                      minWidth: '120px',
                      px: 2,
                    }}
                  >
                    Agregar
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            // Vista cuadrícula (original)
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                {name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  height: '40px'
                }}
              >
                {description}
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Rating value={rating} precision={0.5} size="small" readOnly />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {discount > 0 ? (
                  <>
                    <Typography
                      variant="h6"
                      component="span"
                      color="error"
                      sx={{ mr: 1 }}
                    >
                      ${formattedDiscountedPrice}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ textDecoration: 'line-through' }}
                      color="text.secondary"
                    >
                      ${formattedPrice}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="h6" component="span">
                    ${formattedPrice}
                  </Typography>
                )}
              </Box>
              <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAddButtonClick}
                  startIcon={<ShoppingCartIcon />}
                >
                  Agregar
                </Button>
                <IconButton onClick={handleFavoriteClick} color={isFavorite ? 'error' : 'default'}>
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton onClick={handleShare}>
                  <ShareIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleOpenZoomModal}
                  sx={{
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  <ZoomInIcon />
                </IconButton>
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {name}
            <IconButton onClick={() => setQuickViewOpen(false)} size="small">
              ✕
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: theme.spacing(3), p: theme.spacing(2) }}>
            <Box sx={{ width: isMobile ? '100%' : '50%', position: 'relative' }}>
              {renderProductImage()}
            </Box>
            <Stack spacing={2} sx={{ width: isMobile ? '100%' : '50%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" color={discount > 0 ? 'error' : 'primary'}>
                  ${formattedDiscountedPrice}
                </Typography>
                {discount > 0 && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    ${formattedPrice}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={rating} readOnly precision={0.5} />
                <Typography variant="body2" color="text.secondary">
                  ({rating})
                </Typography>
              </Box>

              <Typography variant="body1">{description}</Typography>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Tallas disponibles:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {sizes.map(size => (
                    <Chip
                      key={size}
                      label={size}
                      onClick={() => setSelectedSize(size)}
                      color={selectedSize === size ? "primary" : "default"}
                      variant={selectedSize === size ? "filled" : "outlined"}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Colores disponibles:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {colors.map(color => (
                    <Chip
                      key={color}
                      label={color}
                      onClick={() => setSelectedColor(color)}
                      color={selectedColor === color ? "primary" : "default"}
                      variant={selectedColor === color ? "filled" : "outlined"}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                >
                  {isInCart ? 'En el carrito' : 'Agregar al carrito'}
                </Button>
                <IconButton 
                  onClick={handleFavoriteClick}
                  color={isFavorite ? 'error' : 'default'}
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton onClick={handleShare}>
                  <ShareIcon />
                </IconButton>
              </Box>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>

      <Modal
        open={zoomModalOpen}
        onClose={handleCloseZoomModal}
        aria-labelledby="product-modal"
        aria-describedby="product-image-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[8],
            outline: 'none',
            borderRadius: 2,
            overflow: 'hidden',
            maxWidth: {
              xs: '95vw',
              sm: '80vw',
              md: '600px'
            },
            maxHeight: {
              xs: '95vh',
              sm: '80vh',
              md: '600px'
            },
            width: '100%',
            height: '100%',
          }}
        >
          <IconButton
            onClick={handleCloseZoomModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey.500',
              bgcolor: 'white',
              zIndex: 1,
              width: 32,
              height: 32,
              '&:hover': {
                bgcolor: 'grey.100',
                color: 'grey.900',
              },
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <Typography sx={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold',
              lineHeight: 1,
            }}>
              ×
            </Typography>
          </IconButton>

          <Box sx={{ 
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}>
            <CardMedia
              component="img"
              image={images[currentImageIndex]}
              alt={name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: 1,
              }}
            />
            {images.length > 1 && (
              <>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage(e);
                  }}
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': { bgcolor: 'white' },
                    boxShadow: theme.shadows[2],
                    width: 36,
                    height: 36,
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage(e);
                  }}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover': { bgcolor: 'white' },
                    boxShadow: theme.shadows[2],
                    width: 36,
                    height: 36,
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProductCard;