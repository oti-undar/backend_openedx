const rutaDoc = '/doc'

export const docUi = {
  'Stoplight Elements': `
    <!doctype html>
    <html lang="en" data-theme="dark">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Elements in HTML</title>
      
        <script src="https://unpkg.com/@stoplight/elements@latest/web-components.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements@latest/styles.min.css">
      </head>
      <body style="background-color: #0e131b">
        <style>
          .sl-elements-api {
            min-height: 100dvh;
          }
          .sl-code-viewer .string {
            color: #66c7ff !important;
          }
          .sl-code-viewer .punctuation {
            color: #ffffff80 !important;
          }
          .sl-code-viewer .property {
            color: #fff !important;
          }
        </style>
        <elements-api
          apiDescriptionUrl="${rutaDoc}"
          router="hash"
        />
      </body>
    </html>`,
  rapidoc: `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
      </head>
      <body>
        <rapi-doc spec-url="${rutaDoc}"> </rapi-doc>
      </body>
    </html>`,
}

export const openapiInfo = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Undar API',
    description: 'API para el plugin Undar-examen de OpenEdx',
  },
}
