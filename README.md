# BigoteMarket · Mundial Kits

Tienda de camisetas oficiales del Mundial 2026, construida con **Next.js 16 (App Router) + TypeScript**.

- 🌐 Producción: https://bigotemarket.vercel.app
- 📸 Instagram: [@_simonbarraza_](https://www.instagram.com/_simonbarraza_)

## Arquitectura

Separación por capas y dominios para escalar como ecommerce:

```
src/
├── app/                        # rutas (App Router)
│   ├── layout.tsx              # shell persistente (ticker, header, footer)
│   ├── page.tsx               # home (compone secciones)
│   └── products/[slug]/page.tsx  # ficha de producto (estática + metadata SEO)
├── components/                 # UI por dominio
│   ├── ui/                     # piezas genéricas reutilizables
│   ├── layout/                 # ticker, header, footer
│   ├── home/                   # hero, section header, CTA
│   └── product/                # galería y panel de producto
├── data/products.ts            # catálogo (única fuente de datos)
├── lib/                        # lógica de aplicación
│   ├── products.ts             # capa de acceso a datos (async, lista para DB/API)
│   ├── format.ts              # formateo de precio y estrellas
│   └── site.ts                # configuración del sitio (marca, Instagram)
├── types/product.ts            # modelo de dominio
└── styles/globals.css
```

### Principios

- **Datos aislados de la UI:** los componentes nunca importan `data/` directo;
  pasan por `lib/products.ts`. Cambiar a una base de datos solo toca esa capa.
- **Componentes pequeños y por dominio:** cada sección es un componente.
- **Tipado del dominio** en `types/`, con precio numérico + moneda (no strings).
- **Rutas de producto estáticas** con `generateStaticParams` y metadata por producto.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

Deploy automático en Vercel con cada push a `main`.
