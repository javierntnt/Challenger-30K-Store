# Challenger-30K-Store

## Arquitectura tecnica recomendada

Proyecto web de marketing para vender vapers online, pensado como una experiencia visual minimalista, rapida y orientada a conversion. La estrategia recomendada es una aplicacion estatica de una sola pagina con secciones claramente separadas, cargada en Vercel y construida solo con HTML, CSS y JavaScript.

### 1. Stack tecnologico recomendado

- HTML5 semantico para estructura y SEO.
- CSS3 moderno con variables globales, Grid, Flexbox y diseño responsive mobile-first.
- JavaScript vanilla para interaccion ligera, carga de productos y animaciones simples.
- Vercel como hosting para despliegue continuo y distribucion global por CDN.
- Google Fonts o una tipografia de sistema bien seleccionada para mantener una estetica premium y limpia.
- Imagenes optimizadas en `img/` para el catalogo de productos.

### 2. Estructura de carpetas inicial

```text
Challenger-30K-Store/
├── .gitignore
├── index.html
├── README.md
├── package-lock.json
├── package.json
├── vercel.json
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── sections/
│       ├── inicio.css
│       ├── saludo.css
│       ├── contenido.css
│       ├── catalogo.css
│       ├── confianza.css
│       └── footer.css
├── js/
│   ├── main.js
│   ├── data/
│   │   └── products.js
│   └── components/
│       └── product-card.js
├── sections/
│   ├── inicio/
│   ├── saludo/
│   ├── contenido/
│   ├── catalogo/
│   ├── confianza/
│   └── footer/
└── img/
	├── WhatsApp Image 2026-05-11 at 12.18.40 PM (1).jpeg
	├── WhatsApp Image 2026-05-11 at 12.18.40 PM (2).jpeg
	├── WhatsApp Image 2026-05-11 at 12.18.40 PM.jpeg
	├── WhatsApp Image 2026-05-11 at 12.18.41 PM (1).jpeg
	├── WhatsApp Image 2026-05-11 at 12.18.41 PM (2).jpeg
	├── WhatsApp Image 2026-05-11 at 12.18.41 PM (3).jpeg
	├── WhatsApp Image 2026-05-11 at 12.18.41 PM.jpeg
	├── WhatsApp Image 2026-05-11 at 12.18.42 PM (1).jpeg
	├── WhatsApp Image 2026-05-11 at 12.18.42 PM (2).jpeg
	├── WhatsApp Image 2026-05-11 at 12.18.42 PM (3).jpeg
	├── WhatsApp Image 2026-05-11 at 12.18.42 PM (4).jpeg
	└── WhatsApp Image 2026-05-11 at 12.18.42 PM.jpeg
```

### 3. Secciones del sitio

Se proponen 6 secciones para una narrativa comercial completa:

- Inicio: hero principal con propuesta de valor, CTA y acceso rapido al catalogo.
- Saludo: bloque breve de bienvenida que humaniza la marca.
- Contenido: beneficios, razones de compra y diferenciadores.
- Catalogo de productos: grilla visual con tarjetas y fotografias de `img/`.
- Confianza: pruebas sociales, garantia, entrega y soporte.
- Footer: datos legales, contacto y enlaces rapidos.

### 4. Modelo de datos

#### Entidad principal: Producto

- `id`: identificador unico.
- `nombre`: nombre comercial del vape.
- `sabor`: perfil de sabor o variante.
- `puffs`: numero estimado de inhalaciones.
- `precio`: valor de venta.
- `imagen`: ruta al archivo en `img/`.
- `descripcion`: texto corto para marketing.
- `disponibilidad`: stock o estado comercial.
- `destacado`: marca para priorizar productos clave.

#### Entidad secundaria: SeccionContenido

- `id`: identificador de la seccion.
- `titulo`: encabezado principal.
- `subtitulo`: texto de apoyo.
- `ctaTexto`: etiqueta del boton.
- `ctaUrl`: destino de la accion.

#### Relacionamiento

- Una seccion de catalogo contiene muchos productos.
- Cada producto pertenece visualmente al catalogo, pero puede reutilizarse en promociones o destacados.
- El footer centraliza enlaces y datos de contacto de la marca.

### 5. Decisiones de diseno

- Usar una estetica minimalista con mucho espacio en blanco, tipografia limpia y alto contraste.
- Mantener una sola pagina con anclas internas para reducir friccion y mejorar conversion.
- Reutilizar una grilla consistente de tarjetas para que el catalogo se vea ordenado y premium.
- Priorizar imagen grande del producto, nombre, sabor y precio por encima de texto largo.
- Incluir CTA visible en inicio y al final del catalogo para llevar al usuario al contacto o compra.

### 6. Riesgos tecnicos y mitigacion

- Riesgo: imagenes pesadas pueden ralentizar la carga. Mitigacion: comprimir JPEG, usar dimensiones correctas y carga diferida.
- Riesgo: demasiada informacion en una sola pagina puede afectar la conversion. Mitigacion: usar jerarquia visual, secciones cortas y CTA repetido.
- Riesgo: el catalogo puede quedar desactualizado si se edita manualmente. Mitigacion: centralizar datos en `js/data/products.js`.

### 7. Criterio de implementacion

- `index.html` debe ensamblar las 6 secciones con anclas semanticas.
- `css/` debe separar base, layout y estilos por seccion.
- `js/` debe manejar el render del catalogo y las interacciones ligeras.
- `img/` debe seguir siendo la fuente unica de activos visuales del catalogo.
- El proyecto debe desplegarse en Vercel como sitio estatico sin dependencias pesadas.

### 8. Puesta en marcha local

```bash
npm install
npm run dev
```

Para probar el formulario de suscripcion con envio real de correo, usa Vercel localmente con:

```bash
vercel dev
```

El archivo `.env.local` debe contener las credenciales SMTP del remitente y la contraseña de aplicacion.

Para generar la version de produccion:

```bash
npm run build
```

Vercel tomara `dist/` como salida de despliegue segun `vercel.json`.