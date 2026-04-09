import productosJson from './productos.json';

// Datos centralizados de productos - Importados desde JSON
export const productLines: Record<string, any> = productosJson.productLines;

export const getAllProducts = () => {
  const allProducts: any[] = [];

  for (const lineName in productLines) {
    const lineData = productLines[lineName];
    
    lineData.items.forEach((item: string) => {
      allProducts.push({
        name: item,
        line: lineName,
        icon: lineData.icon,
        color: lineData.color,
        description: lineData.description,
        searchText: `${item} ${lineName}`.toLowerCase()
      });
    });
  }
  
  return allProducts;
};
