# Documentación de Endpoints - WMS Lluvia Landing Page

## Base URL
```
https://admin.comercializadoralluvia.com/api
```

## Endpoints Implementados

### 1. Obtener Líneas de Producto
**Endpoint:** `/WsLineaProducto/ObtenerlineaProducto`  
**Método:** POST  
**Header:** 
```
Content-Type: application/json
Accept: application/json
```

**Body:**
```json
{
  "idLineaProducto": 0
}
```

**Respuesta (200 OK):**
```json
{
  "Estatus": 200,
  "Mensaje": "OK",
  "Errorline": null,
  "id": 0,
  "Modelo": [
    {
      "idLineaProducto": 26,
      "descripcion": "Linea BASTONES",
      "activo": true,
      "contador": 4
    },
    {
      "idLineaProducto": 9,
      "descripcion": "Linea BISUTERIA",
      "activo": true,
      "contador": 15
    }
    // ... más líneas
  ]
}
```

**TypeScript:**
```typescript
import { getLineIdMap } from '../data/productosData';

const lineMap = await getLineIdMap();
// Devuelve: { "Linea BASTONES": 26, "Linea BISUTERIA": 9, ... }
```

---

### 2. Obtener Productos Paginados
**Endpoint:** `/WsProductos/ObtenerProductosPaginados`  
**Método:** GET  
**Headers:**
```
Accept: application/json
```

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|----------|-------------|
| pageNumber | integer | Sí | Número de página (1-indexed) |
| pageSize | integer | Sí | Cantidad de resultados por página |
| idLineaProducto | integer | No | ID de la línea para filtrar |
| descripcion | string | No | Texto para búsqueda en nombre/descripción |

**Ejemplo:**
```
GET https://admin.comercializadoralluvia.com/api/WsProductos/ObtenerProductosPaginados?pageNumber=1&pageSize=25&idLineaProducto=26&descripcion=BASTON
```

**Estructura Esperada de Respuesta:**
```json
{
  "Estatus": 200,
  "Mensaje": "OK",
  "pageNumber": 1,
  "pageSize": 25,
  "totalRecords": 100,
  "totalPages": 4,
  "data": [
    {
      "idProducto": 123,
      "nombre": "BASTON 40 CM PARA BOMBA WC",
      "descripcion": "Bastón especial para bomba de WC",
      "idLineaProducto": 26,
      "lineaProducto": "Linea BASTONES",
      "activo": true,
      "precio": 5000,
      "stock": 50
    }
    // ... más productos
  ]
}
```

**TypeScript:**
```typescript
import { getProductosPaginados } from '../data/productosData';

const result = await getProductosPaginados({
  pageNumber: 1,
  pageSize: 25,
  idLineaProducto: 26,
  descripcion: 'BASTON'
});

// Devuelve: PaginatedResponse<Producto>
// - result.data: Producto[]
// - result.pageNumber: number
// - result.totalPages: number
// - result.totalRecords: number
// - result.hasNextPage: boolean
// - result.hasPreviousPage: boolean
```

---

## Líneas de Producto Disponibles

| ID | Descripción | Contador |
|----|-------------|----------|
| 26 | Linea BASTONES | 4 |
| 9 | Linea BISUTERIA | 15 |
| 10 | Linea BOLSAS | 14 |
| 22 | Linea CORPORAL | 7 |
| 27 | Linea ENVASADO | 3 |
| 19 | Linea ENVASES | 10 |
| 5 | Linea ESCOBAS | 18 |
| 7 | Linea HOGAR | 16 |
| 6 | Linea INDUSTRIAL | 17 |
| 29 | Línea JABONES DE MARCA | 2 |
| 2 | Linea JARCIERIA | 20 |
| 11 | Linea JUGUETERIA | 13 |
| 20 | Linea LIQUIDOS | 9 |
| 25 | Linea MASCOTAS | 5 |
| 21 | Linea MATRA | 8 |
| 12 | Linea MPL | 12 |
| 23 | Linea PLASTICOS | 6 |
| 1 | Linea QUIMICOS | 21 |
| 30 | Linea REPOSTERIA | 1 |
| 13 | Linea TEMPORADA | 11 |
| 4 | Linea TRAPEADOR | (sin reportar) |

---

## Caché

Ambos endpoints están cacheados para evitar múltiples llamadas:
- `cachedLineIdMap` - Mapeo de líneas (se carga una vez)
- `cachedProductLines` - Datos de líneas completos (se carga una vez)

---

## Notas Importantes

1. **CORS**: Los endpoints deben tener CORS habilitado para llamadas desde el navegador
2. **Errores**: Revisar el campo `Estatus` en la respuesta para validar éxito (200 = OK)
3. **Estructura variable**: El campo `Modelo` en líneas puede venir como array o null
4. **Búsqueda**: El parámetro `descripcion` busca en nombre/descripción del producto
5. **Paginación**: Si `pageNumber > totalPages`, revisar validación del backend
