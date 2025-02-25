import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { sampleProducts } from "../data/sampleProducts";
import ProductCard from "../components/ProductCard";
import FilterDrawer from "../components/FilterDrawer";

interface CategoryImages {
  [key: string]: string;
}

interface SortOption {
  value: string;
  label: string;
}

const categoryImages: CategoryImages = {
  hombre:
    "https://images.unsplash.com/photo-1516826957135-700dedea698c?ixlib=rb-4.0.3",
  mujer:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3",
  accesorios:
    "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-4.0.3",
};

const sortOptions: SortOption[] = [
  { value: "newest", label: "Más recientes" },
  { value: "price-low", label: "Precio más bajo" },
  { value: "price-high", label: "Precio más alto" },
  { value: "rating", label: "Mejor valorados" },
];

interface CategoryCardProps {
  category: string;
  image: string;
  title: string;
  onCategoryClick: (category: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  image,
  title,
  onCategoryClick,
}) => (
  <Card
    onClick={() => onCategoryClick(category)}
    sx={{
      cursor: "pointer",
      width: "100%",
      height: "100%",
      position: "relative",
      borderRadius: 2,
      overflow: "hidden",
      transition: "transform 0.3s ease-in-out",
      "&:hover": {
        transform: "scale(1.02)",
        "& .MuiCardMedia-root": {
          transform: "scale(1.1)",
        },
        "& .overlay": {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      },
    }}
  >
    <CardMedia
      component="img"
      image={image}
      alt={title}
      sx={{
        height: "100%",
        transition: "transform 0.3s ease-in-out",
      }}
    />
    <Box
      className="overlay"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        transition: "background-color 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          color: "white",
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "white",
          opacity: 0.9,
        }}
      >
        {category === "hombre" && "Explora nuestra colección para hombres"}
        {category === "mujer" && "Descubre las últimas tendencias"}
        {category === "accesorios" && "Complementa tu estilo"}
      </Typography>
    </Box>
  </Card>
);

const ProductList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDiscount, setShowDiscount] = useState<boolean>(false);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory: string | null) => {
    setSelectedSubcategory(subcategory);
  };

  const filteredProducts = selectedCategory
    ? sampleProducts.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === "todo" ||
          (selectedCategory === "hombre" &&
            ((product.category === "ropa" &&
              product.subcategory === "hombre") ||
              (product.category === "accesorios" &&
                product.gender === "hombre"))) ||
          (selectedCategory === "mujer" &&
            ((product.category === "ropa" && product.subcategory === "mujer") ||
              (product.category === "accesorios" &&
                product.gender === "mujer"))) ||
          (selectedCategory === "accesorios" &&
            product.category === "accesorios" &&
            (!selectedSubcategory || product.gender === selectedSubcategory));

        const matchesDiscount = !showDiscount || product.discount > 0;

        return matchesSearch && matchesCategory && matchesDiscount;
      })
    : sampleProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 4,
        marginTop: { xs: "56px", sm: "64px" },
      }}
    >
      <FilterDrawer>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={(_: any, value: string | null) => handleCategoryClick(value)}
            orientation="vertical"
            fullWidth
          >
            <ToggleButton
              value="todo"
              sx={{ justifyContent: "flex-start", py: 1.5 }}
            >
              Todo
            </ToggleButton>
            <ToggleButton
              value="hombre"
              sx={{ justifyContent: "flex-start", py: 1.5 }}
            >
              Hombre
            </ToggleButton>
            <ToggleButton
              value="mujer"
              sx={{ justifyContent: "flex-start", py: 1.5 }}
            >
              Mujer
            </ToggleButton>
            <ToggleButton
              value="accesorios"
              sx={{ justifyContent: "flex-start", py: 1.5 }}
            >
              Accesorios
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            variant={showDiscount ? "contained" : "outlined"}
            color="primary"
            fullWidth
            onClick={() => setShowDiscount(!showDiscount)}
            sx={{
              py: 1.5,
              justifyContent: "flex-start",
              textTransform: "none",
            }}
            startIcon={<LocalOfferIcon />}
          >
            Ver Ofertas
          </Button>

          {selectedCategory === "accesorios" && (
            <ToggleButtonGroup
              value={selectedSubcategory}
              exclusive
              onChange={(_: any, value: string | null) => handleSubcategoryClick(value)}
              orientation="vertical"
              fullWidth
            >
              <ToggleButton
                value="hombre"
                sx={{ justifyContent: "flex-start", py: 1.5 }}
              >
                Accesorios Hombre
              </ToggleButton>
              <ToggleButton
                value="mujer"
                sx={{ justifyContent: "flex-start", py: 1.5 }}
              >
                Accesorios Mujer
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        </Box>
      </FilterDrawer>

      {!selectedCategory ? (
        <>
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Categorías
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Explora nuestra colección
            </Typography>
          </Box>
          <Box>
            <Grid
              container
              spacing={3}
              sx={{
                height: "auto",
                "& .MuiGrid-item": {
                  height: {
                    xs: "calc((100vh - 230px) / 3)",
                    md: "calc(100vh - 230px)",
                  },
                },
              }}
            >
              <Grid item xs={12} md={4}>
                <CategoryCard
                  category="hombre"
                  image={categoryImages.hombre}
                  title="Hombre"
                  onCategoryClick={handleCategoryClick}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CategoryCard
                  category="mujer"
                  image={categoryImages.mujer}
                  title="Mujer"
                  onCategoryClick={handleCategoryClick}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CategoryCard
                  category="accesorios"
                  image={categoryImages.accesorios}
                  title="Accesorios"
                  onCategoryClick={handleCategoryClick}
                />
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Box>
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
                "& > *": { fontSize: "0.9rem" },
              }}
            >
              <Typography
                component="span"
                sx={{
                  cursor: "pointer",
                  "&:hover": { color: "primary.main" },
                }}
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
              >
                Inicio
              </Typography>
              {selectedCategory && (
                <>
                  <Typography component="span">/</Typography>
                  <Typography
                    component="span"
                    sx={{ color: "text.primary", fontWeight: 500 }}
                  >
                    {selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1)}
                  </Typography>
                </>
              )}
              {selectedSubcategory && (
                <>
                  <Typography component="span">/</Typography>
                  <Typography
                    component="span"
                    sx={{ color: "text.primary", fontWeight: 500 }}
                  >
                    {selectedSubcategory === "hombre"
                      ? "Para Hombre"
                      : "Para Mujer"}
                  </Typography>
                </>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mb: 3,
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100%",
                maxWidth: "800px",
              }}
            >
              {["todo", "hombre", "mujer", "accesorios"].map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "contained" : "outlined"
                  }
                  onClick={() => handleCategoryClick(category)}
                  sx={{
                    textTransform: "capitalize",
                    minWidth: { xs: "45%", sm: "auto" },
                  }}
                >
                  {category === "todo" ? "Todos" : category}
                </Button>
              ))}
              <Button
                variant={showDiscount ? "contained" : "outlined"}
                onClick={() => setShowDiscount(!showDiscount)}
                sx={{
                  textTransform: "none",
                  minWidth: { xs: "45%", sm: "auto" },
                }}
                startIcon={<LocalOfferIcon />}
              >
                Ofertas
              </Button>
            </Box>

            {selectedCategory === "accesorios" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  width: "100%",
                  maxWidth: "600px",
                }}
              >
                <Button
                  onClick={() => handleSubcategoryClick(null)}
                  variant={
                    selectedSubcategory === null ? "contained" : "outlined"
                  }
                  fullWidth
                >
                  Todos
                </Button>
                <Button
                  onClick={() => handleSubcategoryClick("hombre")}
                  variant={
                    selectedSubcategory === "hombre" ? "contained" : "outlined"
                  }
                  fullWidth
                >
                  Hombre
                </Button>
                <Button
                  onClick={() => handleSubcategoryClick("mujer")}
                  variant={
                    selectedSubcategory === "mujer" ? "contained" : "outlined"
                  }
                  fullWidth
                >
                  Mujer
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
                gap: { xs: 2, md: 0 }
              }}
            >
              <Typography variant="h4" sx={{ mb: { xs: 2, md: 0 } }}>
                {selectedCategory === "todo"
                  ? "Todos los Productos"
                  : selectedCategory === "hombre"
                  ? "Moda Hombre"
                  : selectedCategory === "mujer"
                  ? "Moda Mujer"
                  : "Accesorios"}
              </Typography>
              <Box 
                sx={{ 
                  display: "flex", 
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2, 
                  alignItems: { xs: "stretch", md: "center" },
                  width: { xs: "100%", md: "auto" }
                }}
              >
                <TextField
                  size="small"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box 
                  sx={{ 
                    display: "flex", 
                    gap: 2,
                    width: { xs: "100%", md: "auto" },
                    justifyContent: { xs: "space-between", md: "flex-start" }
                  }}
                >
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <ToggleButtonGroup
                    size="small"
                    value={viewMode}
                    exclusive
                    onChange={(_: any, value: "grid" | "list" | null) => value && setViewMode(value)}
                  >
                    <ToggleButton value="grid">
                      <GridViewIcon />
                    </ToggleButton>
                    <ToggleButton value="list">
                      <ViewListIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <Grid
                  item
                  key={product.id}
                  xs={12}
                  sm={viewMode === "list" ? 12 : 6}
                  md={viewMode === "list" ? 12 : 4}
                  lg={viewMode === "list" ? 12 : 3}
                >
                  <ProductCard {...product} viewMode={viewMode} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    No se encontraron productos
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Intenta con otros filtros o términos de búsqueda
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProductList;
