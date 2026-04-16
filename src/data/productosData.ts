import productosJson from './productos.json';

// Tipos para paginación
export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  idLineaProducto?: number;
  descripcion?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Producto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  name?: string;
  description?: string;
  idLineaProducto?: number;
  lineaProducto?: string;
  line?: string;
  icon?: string;
  color?: string;
}

// Datos centralizados de productos - Importados desde JSON
export const productLines: Record<string, any> = productosJson.productLines;

// Mapeo de colores y iconos por línea de producto (para mantener consistencia visual)
const lineMetadata: Record<string, any> = {
  "Linea BASTONES": { icon: "🪵", color: "bg-amber-500", description: "Bastones y accesorios de sujeción" },
  "Linea BISUTERIA": { icon: "💎", color: "bg-pink-400", description: "Bisutería y accesorios" },
  "Linea BOLSAS": { icon: "🛍️", color: "bg-blue-500", description: "Bolsas de diferentes tamaños y usos" },
  "Linea CORPORAL": { icon: "🧴", color: "bg-purple-400", description: "Productos de cuidado corporal" },
  "Linea ENVASADO": { icon: "📦", color: "bg-indigo-500", description: "Materiales de envasado" },
  "Linea ENVASES": { icon: "🏺", color: "bg-orange-400", description: "Envases y contenedores" },
  "Linea ESCOBAS": { icon: "🧹", color: "bg-green-500", description: "Escobas y herramientas de limpieza" },
  "Linea HOGAR": { icon: "🏠", color: "bg-red-400", description: "Artículos para el hogar" },
  "Linea INDUSTRIAL": { icon: "⚙️", color: "bg-gray-600", description: "Productos industriales" },
  "Línea JABONES DE MARCA": { icon: "🧼", color: "bg-cyan-400", description: "Jabones de marcas conocidas" },
  "Linea JARCIERIA": { icon: "🧵", color: "bg-yellow-500", description: "Materiales de jarciería" },
  "Linea JUGUETERIA": { icon: "🎮", color: "bg-pink-500", description: "Juguetes y entretenimiento" },
  "Linea LIQUIDOS": { icon: "💧", color: "bg-blue-600", description: "Líquidos diversos para limpieza y cuidado" },
  "Linea MASCOTAS": { icon: "🐾", color: "bg-orange-600", description: "Productos para mascotas" },
  "Linea MATRA": { icon: "🛏️", color: "bg-purple-600", description: "Productos Matra" },
  "Linea MPL": { icon: "📝", color: "bg-teal-500", description: "Línea MPL" },
  "Linea PLASTICOS": { icon: "♻️", color: "bg-green-600", description: "Productos plásticos" },
  "Linea QUIMICOS": { icon: "🧪", color: "bg-red-600", description: "Productos químicos" },
  "Linea REPOSTERIA": { icon: "🍰", color: "bg-pink-600", description: "Artículos de repostería" },
  "Linea TEMPORADA": { icon: "🎄", color: "bg-green-400", description: "Productos de temporada" },
  "Linea TRAPEADOR": { icon: "🧽", color: "bg-blue-400", description: "Trapeadores y accesorios" }
};

// Icono y color default para categorías no registradas
const DEFAULT_LINE_METADATA = { 
  icon: "🏷️", 
  color: "bg-slate-500", 
  description: "Categoría" 
};

// Función para obtener líneas de productos del API
async function getLineaProductoFromAPI(): Promise<Record<string, any>> {
  try {
    const response = await fetch('https://admin.comercializadoralluvia.com/api/WsLineaProducto/ObtenerlineaProducto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ idLineaProducto: 0 })
    });

    if (!response.ok) {
      console.warn(`API returned status ${response.status}, using local data`);
      return productLines;
    }

    const data = await response.json();
    
    // Transformar respuesta del API al formato esperado
    const result: Record<string, any> = {};
    
    // La respuesta viene en data.Modelo array
    if (data.Modelo && Array.isArray(data.Modelo)) {
      data.Modelo.forEach((linea: any) => {
        const lineaName = linea.descripcion || '';
        const metadata = lineMetadata[lineaName] || DEFAULT_LINE_METADATA;
        
        result[lineaName] = {
          icon: metadata.icon,
          color: metadata.color,
          description: metadata.description,
          items: linea.items || linea.productos || []
        };
      });
    }
    
    return Object.keys(result).length > 0 ? result : productLines;
  } catch (error) {
    console.warn('Error fetching from API, using local data:', error);
    return productLines;
  }
}

// Variable para cachear el mapeo de líneas a IDs
let cachedLineIdMap: Record<string, number> | null = null;

// Función para obtener el mapeo de nombres de línea a IDs
export async function getLineIdMap(): Promise<Record<string, number>> {
  if (cachedLineIdMap) {
    return cachedLineIdMap;
  }

  try {
    const response = await fetch('https://admin.comercializadoralluvia.com/api/WsLineaProducto/ObtenerlineaProducto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ idLineaProducto: 0 })
    });

    if (!response.ok) {
      console.warn(`Line API returned status ${response.status}`);
      return {};
    }

    const data = await response.json();
    const map: Record<string, number> = {};
    
    // La respuesta viene en data.Modelo array
    if (data.Modelo && Array.isArray(data.Modelo)) {
      data.Modelo.forEach((linea: any) => {
        const lineaName = linea.descripcion || '';
        const lineaId = linea.idLineaProducto || 0;
        if (lineaName && lineaId) {
          map[lineaName] = lineaId;
        }
      });
    }
    
    cachedLineIdMap = map;
    return map;
  } catch (error) {
    console.warn('Error fetching line ID map:', error);
    return {};
  }
}

// Variable para cachear los datos del API
let cachedProductLines: Record<string, any> | null = null;

// Función para obtener líneas de productos (API con fallback a JSON local)
export async function getProductLines(): Promise<Record<string, any>> {
  if (!cachedProductLines) {
    cachedProductLines = await getLineaProductoFromAPI();
  }
  return cachedProductLines;
}

// Función para obtener productos paginados del API
export async function getProductosPaginados(
  params: PaginationParams
): Promise<PaginatedResponse<Producto>> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('pageNumber', params.pageNumber.toString());
    queryParams.append('pageSize', params.pageSize.toString());
    
    if (params.idLineaProducto) {
      queryParams.append('idLineaProducto', params.idLineaProducto.toString());
    }
    
    if (params.descripcion) {
      queryParams.append('descripcion', params.descripcion);
    }

    const url = `https://admin.comercializadoralluvia.com/api/WsProductos/ObtenerProductosPaginados?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`API returned status ${response.status}`);
      return {
        data: [],
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        totalRecords: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
      };
    }

    const data = await response.json();
    
    // Obtener mapeo de IDs a nombres de línea
    const lineIdToName: Record<string, string> = {};
    const lineMap = await getLineIdMap();
    Object.entries(lineMap).forEach(([name, id]) => {
      lineIdToName[id.toString()] = name;
    });
    
    // Extraer datos del Modelo
    const modelo = data.Modelo || {};
    const productos = modelo.Productos || [];
    
    // Enriquecer productos con metadatos visuales
    const enrichedData = productos.map((producto: any) => {
      const lineaId = producto.idLineaProducto || '0';
      const lineaName = lineIdToName[lineaId.toString()] || 'Sin categoría';
      
      return {
        ...producto,
        searchText: `${producto.descripcion || ''} ${producto.articulo || ''}`.toLowerCase(),
        icon: producto.icon || lineMetadata[lineaName]?.icon || DEFAULT_LINE_METADATA.icon,
        color: producto.color || lineMetadata[lineaName]?.color || DEFAULT_LINE_METADATA.color,
        name: producto.descripcion,
        line: lineaName
      };
    });

    return {
      data: enrichedData,
      pageNumber: modelo.PaginaActual || params.pageNumber,
      pageSize: modelo.RegistrosPorPagina || params.pageSize,
      totalRecords: modelo.TotalRegistros || 0,
      totalPages: modelo.TotalPaginas || Math.ceil((modelo.TotalRegistros || 0) / params.pageSize),
      hasNextPage: (modelo.PaginaActual || 0) < (modelo.TotalPaginas || 0),
      hasPreviousPage: (modelo.PaginaActual || 0) > 1
    };
  } catch (error) {
    console.error('Error fetching paginated products from API:', error);
    return {
      data: [],
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      totalRecords: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }
}

export const getAllProducts = () => {
  const allProducts: any[] = [];
  const linesToUse = productLines; // Usar datos sincronos por defecto en página de carga

  for (const lineName in linesToUse) {
    const lineData = linesToUse[lineName];
    
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
