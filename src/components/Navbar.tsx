import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Badge,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InfoIcon from "@mui/icons-material/Info";
import { RootState } from "../store";

const pages = [
  { name: "Inicio", path: "/", icon: <HomeIcon /> },
  { name: "Productos", path: "/productos", icon: <ShoppingBagIcon /> },
  { name: "Nosotros", path: "/nosotros", icon: <InfoIcon /> },
];

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const favoritesCount = Object.keys(favorites).length;

  // Cerrar el menú móvil cuando cambia la ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Cerrar el menú móvil cuando cambia el tamaño de la pantalla a desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const isCurrentPage = (path: string) => {
    return location.pathname === path;
  };

  const navContent = (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        backgroundColor: "background.default",
        zIndex: 1300,
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo - Izquierda */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              minWidth: isMobile ? "80px" : "100px",
            }}
          >
            <Box
              sx={{
                width: isMobile ? "80px" : "100px",
                height: isMobile ? "40px" : "50px",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: { xs: "flex", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "white",
                  textDecoration: "none",
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  width: "100%",
                  justifyContent: "center",
                  padding: "0 8px"
                }}
              >
                Shop
              </Typography>
            </Box>
          </Box>

          {/* Enlaces de navegación - Centrados en desktop */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flex: 1,
                ml: 4,
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  sx={{
                    my: 2,
                    color: isCurrentPage(page.path)
                      ? "primary.main"
                      : "text.primary",
                    mx: 1,
                    fontWeight: isCurrentPage(page.path) ? 600 : 400,
                    fontSize: "1.1rem",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      width: isCurrentPage(page.path) ? "100%" : "0%",
                      height: "2px",
                      backgroundColor: "primary.main",
                      transition: "all 0.3s ease-in-out",
                      transform: "translateX(-50%)",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                    position: "relative",
                    padding: "6px 16px",
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Iconos de la derecha y Toggle Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Favoritos y Carrito - Visibles en ambas versiones */}
            <IconButton
              component={RouterLink}
              to="/favoritos"
              color="inherit"
              sx={{
                ml: 1,
                display: "flex",
                alignItems: "center",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                  color: "error.main",
                },
              }}
            >
              <Badge
                badgeContent={favoritesCount}
                color="error"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.75rem",
                    minWidth: "18px",
                    height: "18px",
                    transform: "translate(50%, -50%)",
                    animation:
                      favoritesCount > 0
                        ? "shake 1.5s ease-in-out infinite"
                        : "none",
                    "@keyframes shake": {
                      "0%, 100%": {
                        transform: "translate(50%, -50%) scale(1)",
                      },
                      "50%": { transform: "translate(50%, -50%) scale(1.2)" },
                    },
                  },
                }}
              >
                <FavoriteIcon
                  sx={{
                    fontSize: isMobile ? "1.2rem" : "1.5rem",
                    color: isCurrentPage("/favoritos")
                      ? "error.main"
                      : "text.secondary",
                  }}
                />
              </Badge>
            </IconButton>

            <IconButton
              component={RouterLink}
              to="/carrito"
              color="inherit"
              sx={{
                ml: 1,
                display: "flex",
                alignItems: "center",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                  color: "primary.main",
                },
              }}
            >
              <Badge
                badgeContent={cartItemCount}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.75rem",
                    minWidth: "18px",
                    height: "18px",
                    transform: "translate(50%, -50%)",
                    animation:
                      cartItemCount > 0
                        ? "shake 1.5s ease-in-out infinite"
                        : "none",
                    "@keyframes shake": {
                      "0%, 100%": {
                        transform: "translate(50%, -50%) scale(1)",
                      },
                      "50%": { transform: "translate(50%, -50%) scale(1.2)" },
                    },
                  },
                }}
              >
                <LocalMallIcon
                  sx={{
                    fontSize: isMobile ? "1.2rem" : "1.5rem",
                    color: isCurrentPage("/carrito")
                      ? "primary.main"
                      : "text.secondary",
                  }}
                />
              </Badge>
            </IconButton>

            {/* Perfil - Solo visible en desktop */}
            {!isMobile && (
              <IconButton
                component={RouterLink}
                to="/login"
                color="inherit"
                sx={{
                  ml: 1,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: "secondary.main",
                  },
                }}
              >
                <PersonIcon
                  sx={{
                    fontSize: isMobile ? "1.2rem" : "1.5rem",
                    color: isCurrentPage("/login")
                      ? "secondary.main"
                      : "text.secondary",
                  }}
                />
              </IconButton>
            )}

            {/* Toggle Menu - Solo visible en móvil */}
            {isMobile && (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuToggle}
                sx={{
                  ml: 1,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                    color: "primary.main",
                  },
                }}
              >
                <MenuIcon
                  sx={{
                    color: mobileMenuOpen ? "primary.main" : "text.secondary",
                  }}
                />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Menú móvil */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "background.default",
          },
        }}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en móviles
        }}
      >
        <Box
          sx={{
            width: "100%",
            py: 2,
          }}
          role="presentation"
        >
          <List>
            <ListItemButton
              component={RouterLink}
              to="/"
              onClick={handleMobileMenuClose}
              selected={isCurrentPage("/")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "transparent",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <ListItemText
                primary="Inicio"
                primaryTypographyProps={{
                  sx: {
                    fontWeight: isCurrentPage("/") ? 600 : 400,
                    color: isCurrentPage("/")
                      ? "primary.main"
                      : "inherit",
                    fontSize: "1.1rem",
                  },
                }}
              />
            </ListItemButton>
            {pages.map((page) => (
              <ListItemButton
                key={page.name}
                component={RouterLink}
                to={page.path}
                onClick={handleMobileMenuClose}
                selected={isCurrentPage(page.path)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ListItemText
                  primary={page.name}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: isCurrentPage(page.path) ? 600 : 400,
                      color: isCurrentPage(page.path)
                        ? "primary.main"
                        : "inherit",
                      fontSize: "1.1rem",
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <List>
            <ListItemButton
              component={RouterLink}
              to="/login"
              onClick={handleMobileMenuClose}
              selected={isCurrentPage("/login")}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "transparent",
                },
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <ListItemText
                primary="Iniciar Sesión"
                primaryTypographyProps={{
                  sx: {
                    fontWeight: isCurrentPage("/login") ? 600 : 400,
                    color: isCurrentPage("/login")
                      ? "primary.main"
                      : "inherit",
                    fontSize: "1.1rem",
                  },
                }}
              />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );

  return navContent;
};

export default Navbar;
