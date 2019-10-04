## Contributing

[fork]: /fork
[pr]: /compare
[style]: https://prettier.io
[code-of-conduct]: CODE_OF_CONDUCT.md

Hi there 👋! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.

## Submitting a pull request to the content

The content is being written in markdown files. These are stored in the `/content` directory. Every direct child directory is a category which contains all the markdown files for a specific category.

How to submit a PR:

1.  [Fork][fork] and clone the repository
2.  Configure and install the dependencies: `yarn install`
3.  Create a new branch: `git checkout -b my-branch-name`
4.  Run the changes and the app with `yarn build-content:watch`
5.  Push to your fork and [submit a pull request][pr]
6.  Pat yourself on the back and wait for your pull request to be reviewed and merged.

### Creating new categories

You think that the checklist is missing a category? No biggy, just follow the following steps to add a new category:

1. Create a new directory inside `/content`. The name of the folder will not show up
   in the UI but nevertheless it should be reasonable and comply its content.
2. Create a `.category` file that is used as a configuration file and defines some basic information about the category, such as `title` and `summary`. These information are defined inside a YAML front matter block. Here's an example:

```
---
title: Architecture
summary: This category summarizes best practices regarding architecture.
---
```

That's it! Now you can start filling the category with life 🙌

### Creating todo items

Todo items are written in form of **markdown** files and are grouped by category. To create a new item, all you have to do is to create a new markdown file and follow the format described below.

### Format of content items

Every content item has a fixed format. Here's what it should look like:

```
---
title: ${title}
source: ${link to source}
author:
  name: ${author}
  url: ${link to profile}
---

# Problem

${problem description}

# Solution

${solution description}

# Additional Resources

- ${link to blog post here} by ${author}
- ${link to video here} by ${author}
- ${link to website}
- ...
```

It starts with a YAML front matter block. It must be the first thing in the file and must take the form of a **valid** YAML set between triple-dashed lines. The front matter is used to define basic information about the todo item.

Currently, we support the following variables that you can set:

| Variable | Type   | Required |
| -------- | ------ | -------- |
| title    | string | Required |
| source   | url    | Optional |
| author   | author | Optional |

An `author` has the following properties:

| Variable | Type   | Required |
| -------- | ------ | -------- |
| name     | string | Required |
| url      | url    | Required |

Once we defined the basic information we can start working on the content. The content is divided into two primary sections, `problem` and `solution`.

It's pretty straightforward. We start with a problem description and lay out the situation which is then followed by the solution and how we can fix the problem.

Each item can be concluded with additional resources, like videos, blog posts, libraries or other websites.

For inspiration, check out exisiting items!

**Note:** Keep the todo items as concise and small as possible. The INote is **not** meant to be a collection of blog posts nor an entire blog. It should be **easy** and **fast** to browser through the list and quickly get an overview of things that are needed to be done to be on the right track to success. If an item is based on a blog post, try to summarize it and only keep the core aspects of the resource.

If your item is based on somebody else's blog post or video, please give credits and name the original author. If the resource is your own, and you wish your name to be displayed, you can of course also add yourself as an author.

Bottom line is, keep it small and on the point!

## Submitting a pull request

1.  [Fork][fork] and clone the repository
2.  Configure and install the dependencies: `yarn install`
3.  Create a new branch: `git checkout -b my-branch-name`
4.  Make your change, create content, do magic.
5.  Push to your fork and [submit a pull request][pr]
6.  Pat yourself on the back and wait for your pull request to be reviewed and merged.

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Follow the [style guide][style] which is using Prettier. Any linting errors should be shown when running `yarn lint`. Linting or formatting errors can be automatically fixed by running `yarn format:fix`.
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
content: add use type inference
```

```
docs: update contribution guide

Add section on how to structure the content.
```

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **content**: Changes that affect the content
- **chore**:  House-keeping changes, meaning no production code was changed
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

- **app/\${feature}** - Used for everything related to the app itself. Optionally you can also specify a feature, such as `checklist` or `projects`.
- **\${content category}** - Content categories, for example `architecture` or `rxjs`. This scope is **optional** however.

### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document][commit-message-format].

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)

[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
