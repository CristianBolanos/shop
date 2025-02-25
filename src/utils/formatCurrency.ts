export const formatCurrency = (amount: number): string => {
  // Convertir el precio a COP (asumiendo que los precios base están en USD)
  const copAmount = amount * 4000; // Tasa aproximada USD a COP

  // Formatear el número con separador de miles
  const formatted = copAmount.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  // Retornar con el formato deseado
  return `$${formatted}`;
};

export default formatCurrency;
