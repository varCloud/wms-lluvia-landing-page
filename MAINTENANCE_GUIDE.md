# 📚 Guía de Mantenimiento - Lluvia Landing Page

## Actualizaciones Frecuentes

### 1. Cambiar Información de Contacto

**Email/Teléfono/Dirección**

Archivos a editar:
- `src/components/layout/Footer.astro` (Línea 30-35)
- `src/components/sections/Contacto.astro` (Línea 24-34)

```astro
<!-- Ejemplo de cambio -->
<li>Email: <strong>nuevo@email.com</strong></li>
<li>Teléfono: <strong>+1 (555) NEW-PHONE</strong></li>
<li>Dirección: <strong>Nueva Dirección 456</strong></li>
```

### 2. Agregar/Editar Productos

Archivo: `src/components/sections/Productos.astro`

**Duplica este bloque:**
```astro
<div data-aos="fade-up" data-aos-delay="000">
  <Card className="h-full text-center">
    <div class="w-24 h-24 bg-lluvia-primary bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-4">
      <svg class="w-12 h-12 text-lluvia-primary" fill="currentColor" viewBox="0 0 20 20">
        <!-- Ícono SVG -->
      </svg>
    </div>
    <h3 class="text-xl font-bold text-lluvia-secondary mb-2">Nombre Producto</h3>
    <p class="text-gray-600 text-sm mb-4">Descripción del producto</p>
    <span class="text-lluvia-primary font-bold">$XX.XX</span>
  </Card>
</div>
```

**Aumenta el delay:**
- Primera: `data-aos-delay="0"`
- Segunda: `data-aos-delay="100"`
- Tercera: `data-aos-delay="200"`
- Cuarta: `data-aos-delay="300"`

### 3. Cambiar Texto de Secciones

| Sección | Archivo |
|---------|---------|
| Home | `src/components/sections/Hero.astro` |
| Misión | `src/components/sections/Mision.astro` |
| Visión | `src/components/sections/Vision.astro` |
| Productos | `src/components/sections/Productos.astro` |
| Contacto | `src/components/sections/Contacto.astro` |

### 4. Actualizar Logo/Imágenes

```bash
# 1. Coloca tu archivo en public/
# Ej: public/logo_lluvia.png

# 2. Actualiza referencia en Hero.astro
<img src="/logo_lluvia.png" alt="Lluvia Logo" />

# 3. Actualiza en Header.astro si es necesario
```

---

## 🎨 Cambios de Diseño

### 1. Modificar Colores

Archivo: `tailwind.config.mjs`

```javascript
colors: {
  'lluvia-primary': '#bded3d',    // ← Cambiar a tu color
  'lluvia-secondary': '#040101',  // ← Cambiar a tu color
}
```

**Impacto:** Se actualiza en toda la página automáticamente

### 2. Cambiar Tipografía

Archivo: `tailwind.config.mjs`

```javascript
fontFamily: {
  sans: ['Tu-Font', ...defaultTheme.fontFamily.sans],
}
```

Agregue el import en `src/layouts/Layout.astro`:
```html
<link href="https://fonts.googleapis.com/css2?family=Tu-Font:wght@300;400;700&display=swap" rel="stylesheet" />
```

### 3. Ajustar Espaciado

Los márgenes y paddings están en Tailwind. Ejemplos:
- `py-20` = 5rem (80px padding vertical)
- `gap-8` = 2rem (32px gap)
- `mb-4` = 1rem (16px margin-bottom)

[Ver Tailwind Spacing](https://tailwindcss.com/docs/margin)

### 4. Cambiar Animaciones

Archivo: `src/layouts/Layout.astro`

```javascript
AOS.init({
  duration: 1000,  // ← Duración en ms (aumenta/disminuye)
  once: true,      // ← true = anima 1 vez, false = repite
  offset: 100,     // ← Pixels antes de animar
});
```

---

## 📱 Responsive Breakpoints

Tailwind usa estos breakpoints:

| Prefijo | Pto. Quiebre | Dispositivo |
|---------|-------------|------------|
| (ninguno) | 0px | Mobile |
| `sm:` | 640px | Tablet pequeña |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Desktop grande |

**Ejemplo:**
```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- 1 columna en móvil, 2 en tablet, 4 en desktop -->
</div>
```

---

## 🔧 Dependencias y Actualizaciones

### Ver Versiones Instaladas
```bash
npm list
```

### Actualizar Todas las Dependencias
```bash
npm update
```

### Actualizar Astro Específicamente
```bash
npm update astro
```

### Check de Vulnerabilidades
```bash
npm audit
npm audit fix  # Arregla automáticamente
```

---

## 🧪 Testing y QA

### Checklist Antes de Deploy

- [ ] `npm run build` sin errores
- [ ] `npm run dev` funciona correctamente
- [ ] Mobile (< 640px) se ve bien
- [ ] Tablet (640px - 1024px) se ve bien
- [ ] Desktop (> 1024px) se ve bien
- [ ] Todos los enlaces funcionan
- [ ] Formulario envía correctamente
- [ ] Imágenes cargan rápido
- [ ] No hay console errors
- [ ] Favicon aparece

### Verificar Performance

```bash
npm run build
npm run preview

# Luego abre http://localhost:3000 y revisa:
# - DevTools → Network
# - DevTools → Performance
# - DevTools → Lighthouse
```

---

## 📊 Monitoreo Post-Deploy

### Google Analytics

Agregue a `src/layouts/Layout.astro`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXXXXX');
</script>
```

### Monitorear Uptime

Servicios gratuitos:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

---

## 🐛 Debugging

### Dev Tools en Navegador

```bash
# En cualquier navegador moderno
F12  # Abre DevTools

# Pestañas útiles:
# - Elements: Inspecciona HTML/CSS
# - Console: Errores JavaScript
# - Network: Carga de recursos
# - Lighthouse: Auditoría de rendimiento
```

### Logs en Consola

Desde cualquier archivo `.astro`:

```astro
---
console.log('Debug info:', variable);
---
```

### Build Verbose
```bash
npm run build -- --verbose
```

---

## 📝 Workflow de Cambios

```
1. Crea rama de trabajo
   git checkout -b feature/cambios

2. Edita archivos localmente
   npm run dev

3. Verifica cambios
   Abre http://localhost:4321

4. Commit cambios
   git add .
   git commit -m "Descripción del cambio"

5. Push a repositorio
   git push origin feature/cambios

6. Crea Pull Request (opcional)
   GitHub web interface

7. Auto-deploy en Netlify/Vercel
   ✅ Automático cuando mergeas a main
```

---

## 🔐 Seguridad

### .env Variables

Para datos sensibles, usa `.env`:

```bash
# .env (NO subir a git)
API_KEY=tu-clave-secreta
FORM_ID=tu-form-id
```

En `.astro`:
```astro
---
const apiKey = import.meta.env.API_KEY;
---
```

### CORS en Formulario

Si llamas a un API externo:
```astro
<form action="https://tu-api.com/submit" method="POST">
  <!-- El servidor debe permitir CORS -->
</form>
```

---

## 🎓 Recursos Útiles

### Documentación
- [Astro Docs](https://docs.astro.build)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [AOS Library](https://michalsnik.github.io/aos/)

### Comunidad
- [Astro Discord](https://discord.gg/astro)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/astro+tailwindcss)

### Herramientas
- [Astro VS Code Extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Tailwind IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

## 🎯 Mejoras Comunes

### Agregar Sección Nueva

1. Crear archivo: `src/components/sections/MiSeccion.astro`
2. Implementar componente
3. Importar en `src/pages/index.astro`
4. Agregar al `<main>`

### Agregar Nueva Página

1. Crear: `src/pages/about.astro`
2. Astro genera automáticamente la ruta
3. Actualizar Navigation en Header

### Agregar Newsletter

```astro
<form action="https://api.mailchimp.com/..." method="POST">
  <input type="email" name="EMAIL" placeholder="Tu email"/>
  <button type="submit">Suscribirse</button>
</form>
```

---

## 📞 Soporte Rápido

| Problema | Solución |
|----------|----------|
| Página lenta | Optimiza imágenes, check Lighthouse |
| Error de build | `npm install && npm run build` |
| Cambios no aparecen | Limpia caché, rebuild |
| Mobile se ve mal | Check Tailwind breakpoints |
| Formulario no envía | Verifica Formspree ID |

---

**Última actualización:** Abril 8, 2026
**Próxima revisión sugerida:** Cada 6 meses
