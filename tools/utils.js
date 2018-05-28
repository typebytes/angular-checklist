"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var path_1 = require("path");
var markdown_1 = require("./markdown");
var matter = require("gray-matter");
var hash = require("shorthash");
exports.buildChecklist = function (contentFolder) { return __awaiter(_this, void 0, void 0, function () {
    var checklist, categories, _loop_1, _i, categories_1, category, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                checklist = {
                    categories: {},
                    items: {}
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, exports.readdirAsync(contentFolder)];
            case 2:
                categories = _a.sent();
                _loop_1 = function (category) {
                    var categoryPath, files, META_DATA_FILE, categoryInfo, items, frontMatter, compiledItems;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                categoryPath = path_1.join(contentFolder, category);
                                return [4 /*yield*/, exports.readdirAsync(categoryPath)];
                            case 1:
                                files = _a.sent();
                                META_DATA_FILE = '.category';
                                categoryInfo = files.find(function (file) { return file === META_DATA_FILE; });
                                items = files.filter(function (file) { return file !== META_DATA_FILE; });
                                if (!categoryInfo) {
                                    exports.throwError("No metadata found for category " + category + ". Please create a .category file.");
                                }
                                frontMatter = exports.extractFrontMatter(path_1.join(categoryPath, categoryInfo)).data;
                                if (!frontMatter.title || !frontMatter.summary) {
                                    exports.throwError("No title or summary defined for category " + category + ".");
                                }
                                compiledItems = exports.compileFilesForCategory(items, category, categoryPath);
                                checklist['categories'][category] = __assign({}, frontMatter, { slug: category, items: compiledItems.map(function (item) { return item.id; }) });
                                checklist['items'] = __assign({}, checklist['items'], compiledItems.reduce(function (acc, item) {
                                    acc[item.id] = item;
                                    return acc;
                                }, {}));
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, categories_1 = categories;
                _a.label = 3;
            case 3:
                if (!(_i < categories_1.length)) return [3 /*break*/, 6];
                category = categories_1[_i];
                return [5 /*yield**/, _loop_1(category)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, null];
            case 8: return [2 /*return*/, checklist];
        }
    });
}); };
exports.extractFrontMatter = function (filePath) {
    return matter(fs_1.readFileSync(filePath));
};
exports.compileFilesForCategory = function (files, category, categoryPath) {
    return files.map(function (file) {
        var _a = exports.extractFrontMatter(path_1.join(categoryPath, file)), frontMatter = _a.data, content = _a.content;
        if (!Object.keys(frontMatter).length || !frontMatter.title) {
            exports.throwError("No metadata defined for " + category + "/" + file + ". You must define at least a title.");
        }
        if (!frontMatter.short_description) {
            exports.logWarning("[Warning] Consider defining a short description for " + category + "/" + file + ".");
        }
        var id = hash.unique(file);
        var slug = exports.cleanFileName(file);
        return __assign({ id: id,
            slug: slug }, frontMatter, { content: markdown_1.markdown.render(content) });
    });
};
exports.dumpDataToDisk = function (data, dest) {
    var dir = path_1.dirname(dest);
    if (!fs_1.existsSync(dir)) {
        fs_1.mkdirSync(dir);
    }
    fs_1.writeFileSync(path_1.join(dest, 'content.json'), exports.generateJSON(data));
};
exports.cleanFileName = function (fileName) {
    return path_1.parse(fileName).name;
};
exports.generateJSON = function (data) {
    return JSON.stringify(data, null, 2);
};
exports.readdirAsync = function (path) {
    return new Promise(function (resolve, reject) {
        fs_1.readdir(path, function (error, files) {
            error ? reject(error) : resolve(files);
        });
    });
};
exports.throwError = function (message) {
    throw chalk_1["default"].bold.red("[Error] " + message);
};
exports.logWarning = function (message) {
    console.log("" + chalk_1["default"].yellow(message));
};
