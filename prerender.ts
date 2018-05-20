import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import execa = require('execa');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/server/main`);

enableProdMode();

const ROUTES = ['/', '/checklist'];
const DIST_FOLDER = join(process.cwd(), 'dist');
const BROWSER_FOLDER = join(DIST_FOLDER, 'browser');
const PORT = 4200;

const index = readFileSync(join(BROWSER_FOLDER, 'index.html'), 'utf8');

let previousRender = Promise.resolve();

ROUTES.forEach(route => {
  const fullPath = join(BROWSER_FOLDER, route);

  if (!existsSync(fullPath)) {
    mkdirSync(fullPath);
  }

  previousRender = previousRender
    .then(_ =>
      renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
      })
    )
    .then(html => writeFileSync(join(fullPath, 'index.html'), html));
});
