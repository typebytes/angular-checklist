# Translation Guide

## Add languages

The following tasks are required to add a new language.
[See available code here](https://github.com/angular/angular/tree/master/packages/common/locales).

- Add  word transration file ​​in `src/assets/i18n/[lang-code].json`.
- Add languages ​​to `langages`, an array of `tools/utils.ts` files.
- Register langage code of the language to be added to `translocoConfig()` in `src/app/app.module.ts`.
- Make a target language directory by copying `en-US` in the content directory. And then run `yarn build-content`.

Hooray! Now you can choose a new language.

## Do translation

There are two types of translation: translation of the application using [transloco](https://netbasal.gitbook.io/transloco/) and translation of the main content composed of markdown.

### Application translation

Please read the [transloco](https://netbasal.gitbook.io/transloco/) documentation once.

Translate the app by editing `src/assets/i18n/[lang-code].json`.

### Translation of content

Translation of content is editing files in the `content/[lang-code]` directory.

You don't have to make all the files at once. but when it's missing it will be displayed in original English.

**Note:** If you set char such as `*` or `@` at the beginning of metadata such as `title:`, the translation will be broken.
Use double-byte characters or devise a text.

## Reflect the translated content

See [CONTRIBUTING.md](https://github.com/angular-checklist/angular-checklist/blob/master/CONTRIBUTING.md).
