"use strict";
exports.__esModule = true;
require("core-js/es6/reflect");
require("core-js/es7/reflect");
require("zone.js/dist/zone-node");
var core_1 = require("@angular/core");
var platform_server_1 = require("@angular/platform-server");
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
var fs_1 = require("fs");
var path_1 = require("path");
var _a = require("./dist/server/main"), AppServerModuleNgFactory = _a.AppServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
core_1.enableProdMode();
var ROUTES = ['/', '/checklist'];
var DIST_FOLDER = path_1.join(process.cwd(), 'dist');
var BROWSER_FOLDER = path_1.join(DIST_FOLDER, 'browser');
var PORT = 4200;
var index = fs_1.readFileSync(path_1.join(BROWSER_FOLDER, 'index.html'), 'utf8');
var previousRender = Promise.resolve();
ROUTES.forEach(function (route) {
    var fullPath = path_1.join(BROWSER_FOLDER, route);
    if (!fs_1.existsSync(fullPath)) {
        fs_1.mkdirSync(fullPath);
    }
    previousRender = previousRender
        .then(function (_) {
        return platform_server_1.renderModuleFactory(AppServerModuleNgFactory, {
            document: index,
            url: route,
            extraProviders: [module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)]
        });
    })
        .then(function (html) { return fs_1.writeFileSync(path_1.join(fullPath, 'index.html'), html); });
});
