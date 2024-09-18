import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000, // Timeout global para las pruebas
 // retries: 1, // Reintentar en caso de fallar una prueba
  testDir: './src/tests', // Directorio donde están los tests
  use: {
    headless: false, // Puedes cambiar a false si quieres ver el navegador
    screenshot: 'on', // Tomar capturas de pantalla en cada prueba
    video: 'on', // Grabar video de las pruebas
    trace: 'on-first-retry', // Generar trazas si fallan en el primer intento
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }, // Ejecutar en navegador Chromium
    },
  ],
});
