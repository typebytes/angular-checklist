import chalk from 'chalk';
import { existsSync, mkdirSync, readFileSync, readdir, writeFileSync } from 'fs';
import { dirname, join, parse } from 'path';
import { convertHeadingsPlugin, markdown } from './markdown';
import { FrontMatter } from './models';
import * as matter from 'gray-matter';
import { unique } from 'shorthash';

markdown.use(convertHeadingsPlugin);

export const buildChecklist = async contentFolder => {
  const checklist = {
    categories: {},
    items: {}
  };

  try {
    const categories = await readdirAsync(contentFolder);

    for (const category of categories) {
      const categoryPath = join(contentFolder, category);
      const files = await readdirAsync(categoryPath);

      const META_DATA_FILE = '.category';
      const categoryInfo = files.find(file => file === META_DATA_FILE);
      const items = files.filter(file => file !== META_DATA_FILE);

      if (!categoryInfo) {
        throwError(`No metadata found for category ${category}. Please create a .category file.`);
      }

      const { data: frontMatter } = extractFrontMatter(join(categoryPath, categoryInfo));

      if (!frontMatter.title || !frontMatter.summary) {
        throwError(`No title or summary defined for category ${category}.`);
      }

      const compiledItems = compileFilesForCategory(items, category, categoryPath);

      checklist.categories[category] = {
        ...frontMatter,
        slug: category,
        items: compiledItems.map(item => item.id)
      };

      checklist.items = {
        ...checklist.items,
        ...compiledItems.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {})
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  return checklist;
};

export const extractFrontMatter = (filePath: string): FrontMatter => {
  return matter(readFileSync(filePath)) as unknown as FrontMatter;
};

export const compileFilesForCategory = (files: Array<string>, category: string, categoryPath: string) => {
  return files.map(file => {
    const { data: frontMatter, content } = extractFrontMatter(join(categoryPath, file));

    if (!Object.keys(frontMatter).length || !frontMatter.title) {
      throwError(`No metadata defined for ${category}/${file}. You must define at least a title.`);
    }

    const id = unique(file);
    const slug = cleanFileName(file);

    return {
      id,
      slug,
      category,
      ...frontMatter,
      content: markdown.render(content)
    };
  });
};

export const dumpDataToDisk = (filename: string, data: any, dest: string) => {
  const dir = dirname(dest);

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  try {
    writeFileSync(join(dest, `${filename}.json`), generateJSON(data));
    printSuccess(`${filename}.json created`);
  } catch (error) {
    console.log(error);
  }
};

export const cleanFileName = (fileName: string) => {
  return parse(fileName).name;
};

export const generateJSON = (data: any) => {
  return JSON.stringify(data, null, 2);
};

export const readdirAsync = (path: string): Promise<Array<string>> => {
  return new Promise((resolve, reject) => {
    readdir(path, (error, files) => {
      error ? reject(error) : resolve(files);
    });
  });
};

export const printSuccess = (message: string, type = 'Sucess', addNewLine = false) => {
  console.log(`${addNewLine ? '\n' : ''}${chalk.green(`[${type}]`)} ${message}`);
};

export const throwError = (message: string) => {
  throw chalk.red(`[Error] ${message}`);
};

export const logWarning = (message: string) => {
  console.log(`${chalk.yellow(message)}`);
};
