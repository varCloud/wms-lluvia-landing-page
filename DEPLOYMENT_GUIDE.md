# 🚀 Guía de Despliegue - Lluvia Landing Page

## Opciones de Despliegue

Tu landing page Astro puede ser desplegada en múltiples plataformas sin costo.

---

## 1️⃣ Netlify (Recomendado - Gratis)

### Paso a Paso

#### A. Preparación Local
```bash
# Asegúrate de que el build funciona
npm run build

# Verifica que la carpeta dist/ se generó
ls dist/
```

#### B. GitHub (Requisito)
1. Ve a [github.com](https://github.com)
2. Crea nuevo repositorio: `lluvia-landing-page`
3. En tu máquina:
```bash
cd e:\Documents\BlueCloud\Proyectos\BB\lluvia\wms-lluvia-landing-page
git init
git add .
git commit -m "Initial commit: Lluvia landing page"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/lluvia-landing-page.git
git push -u origin main
```

#### C. Deploy en Netlify
1. Ve a [netlify.com](https://netlify.com)
2. Haz clic en "New site from Git"
3. Selecciona GitHub y autoriza
4. Busca tu repositorio `lluvia-landing-page`
5. Configuración automática (Netlify detecta Astro)
6. Click "Deploy"

**Resultado**: Tu sitio estará disponible en `https://[nombre-aleatorio].netlify.app`

#### D. Dominio Personalizado (Netlify)
1. En configuración de Netlify → "Domain settings"
2. Click "Add custom domain"
3. Ingresa tu dominio (ej: `lluvia.com`)
4. Sigue instrucciones de DNS

---

## 2️⃣ Vercel (Alternativa - Gratis)

### Paso a Paso

1. Ve a [vercel.com](https://vercel.com)
2. Click "New Project"
3. Importa tu repositorio de GitHub
4. Selecciona `Main` branch
5. Click "Deploy"

**Configuración automática**:
- Build Command: `npm run build`
- Output Directory: `dist`

**Resultado**: URL like `https://lluvia-landing-page.vercel.app`

---

## 3️⃣ GitHub Pages (Gratis - Alternativa)

### Configuración

#### A. Actualiza `astro.config.mjs`
```javascript
export default defineConfig({
  site: 'https://USUARIO.github.io',
  base: '/lluvia-landing-page/',
  vite: {
    plugins: [tailwindcss()]
  }
});
```

#### B. Crea archivo `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: built-site
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: built-site
          path: dist
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### C. Deploy
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push
```

**Resultado**: `https://USUARIO.github.io/lluvia-landing-page/`

---

## 4️⃣ Servidor Propio (VPS)

### Con Node.js

```bash
# En tu servidor
cd /var/www/lluvia
npm install
npm run build

# Usa PM2 para mantener el sitio activo
npm install -g pm2
pm2 start node -- --port 3000
```

### Con Nginx (Estático)

```bash
# Build local
npm run build

# Copia carpeta dist/ al servidor
scp -r dist/* user@tu-servidor:/var/www/lluvia

# Configura Nginx
# /etc/nginx/sites-available/lluvia
server {
    listen 80;
    server_name lluvia.com www.lluvia.com;

    root /var/www/lluvia;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 🔒 SSL/HTTPS

### Netlify/Vercel
- ✅ Automático con Let's Encrypt
- ✅ Renovación automática
- Gratis

### GitHub Pages
- ✅ HTTPS automático
- Gratis

### Servidor Propio
```bash
# Certbot + Letsencrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d lluvia.com
```

---

## 📊 Comparativa de Opciones

| Plataforma | Costo | Setup | Velocidad | Soporte |
|-----------|-------|-------|-----------|---------|
| **Netlify** | Gratis | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Vercel** | Gratis | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **GitHub Pages** | Gratis | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **VPS Propio** | $5-100/mes | ⭐⭐ | ⭐⭐⭐⭐⭐ | Depende |

---

## 🎯 Recomendación

**Para Lluvia:**

1️⃣ **Corto plazo**: Netlify (más simple, integración perfecta)
2️⃣ **Mediano plazo**: Agregar dominio personalizado
3️⃣ **Largo plazo**: Considerar integraciones API (backend propio)

---

## ✅ Checklist Pre-Despliegue

- [x] `npm run build` funciona sin errores
- [x] `dist/` contiene `index.html`
- [x] Repositorio GitHub creado
- [x] `.gitignore` incluye `node_modules/` y `dist/`
- [x] README.md está completo
- [x] .env.example documentado

---

## 🔄 Workflow Recomendado

```
Local Development
    ↓
Commit & Push a GitHub
    ↓
Netlify detecta cambios
    ↓
Build automático
    ↓
Deploy automático
    ↓
Sitio actualizado ✅
```

---

## 🆘 Troubleshooting

### Error: "Build failed"
```bash
# Limpia y reinstala
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Sitio se ve mal después de deploy
- Verifica `astro.config.mjs` → `site` URL
- Limpia caché del navegador (Ctrl+Shift+Del)
- Reconstruye: `npm run build`

### 404 en páginas
- Asegúrate que Astro genera `index.html`
- Configura redirects en Netlify (si es multi-página)

---

## 📝 Próximos Pasos

1. Elige plataforma de despliegue
2. Crea repositorio GitHub
3. Push del código
4. Conecta con plataforma
5. Configura dominio personalizado
6. ¡Listo! Tu sitio está en línea 🎉

---

**¿Necesitas ayuda con un proveedor específico?**
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- GitHub Pages: https://pages.github.com
