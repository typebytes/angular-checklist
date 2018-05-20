import matter = require('gray-matter');

import chalk from 'chalk';
import { join } from 'path';
import { buildChecklist, dumpDataToDisk, generateJSON } from './utils';

const CONTENT_FOLDER = join(__dirname, '../content');
const ASSET_FOLDER = join(__dirname, '../src/assets');

buildChecklist(CONTENT_FOLDER).then(checklist => {
  if (checklist) {
    dumpDataToDisk(checklist, ASSET_FOLDER);
    console.log(`\n${chalk.bold.green('[Success]')} Content compiled and created.`);
    process.exit(0);
  }
});
