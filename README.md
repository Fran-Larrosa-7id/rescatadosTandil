# Rescate Tandil

Aplicación estática Angular 22 + Tailwind CSS para publicar casos de rescate animal y facilitar colaboración por transferencia bancaria.

## Development server

Para iniciar el servidor local:

```bash
npm start
```

Abrí `http://localhost:4200/`.

## Cómo publicar un nuevo caso

1. Creá `src/app/data/cases/<slug-del-caso>.case.ts`.
2. Agregá las fotos reales AVIF en `public/images/cases/<slug-del-caso>/`.
3. Completá en ese archivo un objeto `RescueCase` con `slug`, `name`, `status`, `summary`, `coverImage`, `gallery`, `story`, `currentNeeds`, `updates` y `updatedAt`.
4. Usá un `status` válido: `needs-help`, `treatment`, `recovering`, `closed` o `memorial`.
5. Separá la historia en párrafos dentro de `story` y agregá `currentNeeds` o `updates` sólo si tenés información real.
6. Importá la constante nueva en `src/app/data/rescue-cases.data.ts`.
7. Agregala a `RESCUE_CASES`.
8. Ejecutá tests, build y deploy.

No hay backend, CMS ni base de datos: publicar un nuevo caso requiere un nuevo build/deploy.

## Cómo actualizar la deuda

Modificá únicamente `src/app/core/config/donation.config.ts`:

- `currentDebt`
- `debtUpdatedAt`

El alias bancario y titular también viven en ese archivo para evitar valores duplicados.

## Build

```bash
npm run build
```

## Tests

```bash
npm test
```

## Deploy estático

El build de Angular genera archivos estáticos en `dist/`. El proyecto incluye `public/_redirects` para que Netlify resuelva deep links del Router como SPA.

Para GitHub Pages, publicá el contenido generado por `npm run build` y configurá el fallback de rutas limpias según el hosting/subpath elegido.

## Restricciones de contenido

No inventar animales, historias, diagnósticos, fechas, montos, porcentajes ni datos veterinarios. Si falta información, usá placeholders explícitos o no renderices la sección.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
