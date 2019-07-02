import { join } from 'path';
import { buildChecklist, dumpDataToDisk, printSuccess, langages, localeEnUS, transrateDeepMerge } from './utils';

const CONTENT_FOLDER = join(__dirname, '../content');
const ASSET_FOLDER = join(__dirname, '../src/assets');

Promise.all(
  langages.map(async lang => {
    const checklist = await buildChecklist(join(CONTENT_FOLDER, lang));
    const checklistEnUS = await buildChecklist(join(CONTENT_FOLDER, localeEnUS));

    if (checklist && checklistEnUS) {
      dumpDataToDisk(`content.${lang}`, transrateDeepMerge(checklistEnUS, checklist), ASSET_FOLDER);
    }
  })
).then(() => {
  printSuccess('Content was successfully compiled', 'Done');
  process.exit(0);
});
