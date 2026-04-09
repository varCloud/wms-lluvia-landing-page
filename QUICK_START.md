# 🚀 Guía Rápida - Lluvia Landing Page

## Iniciar el Proyecto

```bash
# 1. Navega al directorio
cd e:\Documents\BlueCloud\Proyectos\BB\lluvia\wms-lluvia-landing-page

# 2. Inicia el servidor de desarrollo
npm run dev

# 3. Abre en tu navegador
http://localhost:3000
```

## Editar Contenido

### Cambiar Texto de Secciones
1. **Home** → `src/components/sections/Hero.astro`
2. **Misión** → `src/components/sections/Mision.astro`
3. **Visión** → `src/components/sections/Vision.astro`
4. **Productos** → `src/components/sections/Productos.astro`
5. **Contacto** → `src/components/sections/Contacto.astro`

### Cambiar Logo/Imagen
1. Coloca tu imagen en `public/` (ej: `public/logo_lluvia.png`)
2. Referencia en los componentes: `<img src="/logo_lluvia.png" />`

### Cambiar Colores
1. Abre `tailwind.config.mjs`
2. Modifica:
   ```javascript
   'lluvia-primary': '#bded3d',    // Verde actual
   'lluvia-secondary': '#040101',  // Negro actual
   ```

## Estructura de Componentes

### Base (Componentes Reutilizables)
- `Button.astro` - Botones con variantes (primary, secondary, outline)
- `Card.astro` - Tarjetas con sombra
- `Container.astro` - Contenedor max-width

### Layout
- `Header.astro` - Navegación + menú móvil
- `Footer.astro` - Pie de página con enlaces

### Sections
- `Hero.astro` - Sección principal
- `Mision.astro` - Propósitos
- `Vision.astro` - Objetivos
- `Productos.astro` - Catálogo
- `Contacto.astro` - Formulario

## Deployar

### Opción 1: Netlify
```bash
npm run build  # Genera carpeta dist/
# Sube la carpeta dist/ a Netlify
```

### Opción 2: Vercel
```bash
npm run build
# Conecta el repositorio en Vercel
```

### Opción 3: GitHub Pages
```bash
npm run build
# Sube la carpeta dist/ a GitHub Pages
```

## Agregar Productos

Edita `src/components/sections/Productos.astro`:

```astro
<!-- Añade este bloque dentro del grid -->
<div data-aos="fade-up" data-aos-delay="400">
  <Card className="h-full text-center">
    <div class="w-24 h-24 bg-lluvia-primary...">
      <!-- SVG del icono -->
    </div>
    <h3 class="text-xl font-bold text-lluvia-secondary mb-2">Nombre Producto</h3>
    <p class="text-gray-600 text-sm mb-4">Descripción...</p>
    <span class="text-lluvia-primary font-bold">$XX.XX</span>
  </Card>
</div>
```

## Troubleshooting

### Puerto 3000 ya está en uso
```bash
npm run dev -- --port 3001
```

### Problemas con Tailwind
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build falla
```bash
npm run build -- --verbose
```

## Recursos Útiles

- 📚 [Astro Docs](https://docs.astro.build)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🎭 [AOS Library](https://michalsnik.github.io/aos/)
- 🌐 [Formspree](https://formspree.io) (Para formularios)

---

**¿Necesitas ayuda? Revisa el README.md para más detalles**
