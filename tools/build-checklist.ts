import chalk from "chalk";
import { join } from "path";
import { buildChecklist, dumpDataToDisk, printSuccess } from "./utils";

const CONTENT_FOLDER = join(__dirname, "../content");
const ASSET_FOLDER = join(__dirname, "../src/assets");

buildChecklist(CONTENT_FOLDER).then(checklist => {
  if (checklist) {
    dumpDataToDisk("content", checklist, ASSET_FOLDER);
    printSuccess("Content was successfully compiled", "Done");
    process.exit(0);
  }
});
