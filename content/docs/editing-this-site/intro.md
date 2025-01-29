---
title: Intro
description: Introduction to editing this site
weight: 10
draft: false
---

## Access

We have 2 access groups to control access to the `cedadev/jasmin-help-hugo-hinode` repository:

Check settings there for up-to-date details, but in summary:

- `jasmin-docs-authors`
  - for those who would like to contribute to the content
- `jasmin-docs-editors`
  - for those involved in reviewing and managing the site

Ask Matt P for access if you think you need it.

## Summary process

- clone the repo
- open that folder in VSCode
- start in `main` branch and refresh (`git pull`) to make sure your local copy is up to date
- create a branch for your edits
- preview your edits locally with `hugo server -N`
- proofread and make corrections
- `add`/stage the changes you want to commit
- `commit` changes to your branch
- `push` your branch to the repo
- create a *pull request (PR)* to merge your branch into `main`
- drop a note in `jasmin-docs` requesting one of the editors review your PR.
- they may either:
  - review your PR and return it with suggestions
  - make their own changes
  - approve and merge your PR

Completing a merge into `main` kicks off a GitHub Actions process which:

- builds the site's `public` content by combining the markdown content and Hugo/Hinode templates
- pushes the built content to the `gh_pages` branch, which forms the public view of the site

Before you dive in, however, please read:

- [site structure](site-structure)
- [style guide](style-guide)
- [creating a page](creating-a-page)

