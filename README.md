# 🌧️ Lluvia - Landing Page

Landing page moderna y profesional para artículos de limpieza "Lluvia", construida con Astro y Tailwind CSS.

## 🎨 Características

- ✨ **Diseño moderno con colores personalizados**
  - Color primario: `#bded3d` (Verde Lluvia)
  - Color secundario: `#040101` (Gris Oscuro)
  
- 📱 **Completamente responsivo** (Mobile-first)
- 🎯 **Secciones principales:**
  - Home - Héroe atractivo con CTA
  - Misión - Propósitos y valores de la empresa
  - Visión - Objetivos futuros y compromiso
  - Productos - Catálogo de 4 productos principales
  - Contacto - Formulario de contacto con información

- 🚀 **Performance optimizado**
  - Build estático con Astro
  - Animaciones suaves con AOS
  - CSS optimizado con Tailwind

- 💬 **Componentes reutilizables** (Button, Card, Container)
- 🎭 **Animaciones interactivas** al hacer scroll
- 📧 **Formulario de contacto** integrado

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── base/              # Componentes reutilizables
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   └── Container.astro
│   ├── layout/            # Componentes de diseño
│   │   ├── Header.astro
│   │   └── Footer.astro
│   └── sections/          # Secciones de la página
│       ├── Hero.astro
│       ├── Mision.astro
│       ├── Vision.astro
│       ├── Productos.astro
│       └── Contacto.astro
├── layouts/
│   └── Layout.astro       # Layout principal
├── pages/
│   └── index.astro        # Página principal
└── styles/
    └── global.css         # Estilos globales
```

## 🚀 Comandos

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
Accede a `http://localhost:3000` en tu navegador.

### Construcción
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🛠️ Personalización

### Modificar Colores

Los colores están configurados en `tailwind.config.mjs`:
```javascript
colors: {
  'lluvia-primary': '#bded3d',
  'lluvia-secondary': '#040101',
}
```

### Actualizar Información de Contacto

Edita [src/components/layout/Footer.astro](src/components/layout/Footer.astro) y [src/components/sections/Contacto.astro](src/components/sections/Contacto.astro) con:
- Email: `info@lluvia.com`
- Teléfono: `+1 (555) 123-4567`
- Dirección: `Calle Principal 123`

### Configurar Formulario de Contacto

Actualiza el atributo `action` en el formulario de [Contacto.astro](src/components/sections/Contacto.astro):
```html
<form action="https://formspree.io/f/YOUR_FORM_ID">
```

## 📦 Dependencias

- **Astro** ^5.16.3 - Framework estático
- **Tailwind CSS** ^4.1.17 - Utilidades de CSS
- **AOS** - Animaciones al scroll

## 🎯 Mejoras Futuras

- [ ] Integración con carrito de compras
- [ ] Sistema de búsqueda de productos
- [ ] Blog o sección de artículos
- [ ] Galería de imágenes interactiva
- [ ] Testimonios de clientes
- [ ] Integración con redes sociales
- [ ] Sistema de newsletter

## 📄 Licencia

Este proyecto es de uso privado para la empresa Lluvia.

---

**Desarrollado con ❤️ usando Astro + Tailwind CSS**
