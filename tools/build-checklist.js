"use strict";
exports.__esModule = true;
var chalk_1 = require("chalk");
var path_1 = require("path");
var utils_1 = require("./utils");
var CONTENT_FOLDER = path_1.join(__dirname, '../content');
var ASSET_FOLDER = path_1.join(__dirname, '../src/assets');
utils_1.buildChecklist(CONTENT_FOLDER).then(function (checklist) {
    if (checklist) {
        utils_1.dumpDataToDisk(checklist, ASSET_FOLDER);
        console.log("\n" + chalk_1["default"].bold.green('[Success]') + " Content compiled and created.");
        process.exit(0);
    }
});
