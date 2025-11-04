import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import bootstrap from './src/main.server';
import { config } from './src/app/app.config.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.use(express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // read the server index HTML once
  let indexHtmlContent = '';
  try {
    indexHtmlContent = readFileSync(indexHtml, 'utf8');
  } catch (e) {
    console.warn('Could not read index.server.html at', indexHtml, e);
  }

  // All regular routes use the Angular engine
  server.get('**', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    const url = `${protocol}://${headers.host}${originalUrl}`;

    try {
      const providers = [
        ...(Array.isArray((config as any)?.providers) ? (config as any).providers : []),
        { provide: APP_BASE_HREF, useValue: baseUrl }
      ];

      const html = await renderApplication(bootstrap as any, {
        document: indexHtmlContent || '<app-root></app-root>',
        url,
        platformProviders: providers
      });

      res.send(html);
    } catch (err: any) {
      next(err);
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
