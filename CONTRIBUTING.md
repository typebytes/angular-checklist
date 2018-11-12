## Contributing

[fork]: /fork
[pr]: /compare
[style]: https://prettier.io
[code-of-conduct]: CODE_OF_CONDUCT.md

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.

## Submitting a pull request to the content

The content is being written in markdown files. These are stored in the content directory. Every child directory is a category which holds all the markdown files for this specific category. 

How to submit a PR:

1.  [Fork][fork] and clone the repository
2.  Configure and install the dependencies: `yarn install`
3.  Create a new branch: `git checkout -b my-branch-name`
4.  Run the changes and the app with `yarn build-content:watch`
4.  Push to your fork and [submit a pull request][pr]
5.  Pat yourself on the back and wait for your pull request to be reviewed and merged.


### Format of content items

Every content item has a fixed format. 

```
---
title: ${title}
---
# Problem

${problem description}

# Solution

${solution description}
```

## Submitting a pull request to the code

1.  [Fork][fork] and clone the repository
2.  Configure and install the dependencies: `yarn install`
3.  Make sure the tests pass on your machine: `yarn test`
4.  Create a new branch: `git checkout -b my-branch-name`
5.  Make your change, add tests, and make sure the tests still pass
6.  A pre-commit hook will make sure that your code is properly formatted, but you can also manually check for linting or formatting errors by running `yarn style`
7.  Push to your fork and [submit a pull request][pr]
8.  Pat yourself on the back and wait for your pull request to be reviewed and merged.

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Follow the [style guide][style] which is using Prettier. Any linting errors should be shown when running `npm lint:check`. Linting or formatting errors can be automatically fixed by running `yarn style:fix`.
- Write and update tests.
- Keep your change as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

Work in Progress pull request are also welcome to get feedback early on, or if there is something blocked you.

## Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples:

```
feat(lib): add new shortcut
```

```
docs: update examples

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

For changes to the content use 'content' as scope.

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **content**: Changes that affect the content
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Scope

The following is the list of supported scopes:

- **app** - Demo app
- **lib** - Library

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
