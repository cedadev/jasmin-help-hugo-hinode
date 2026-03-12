---
aliases: /article/5131-checksit
description: 'Community Software: checksit'
slug: community-software-checksit
tags:
- community
- software
title: 'Community Software: checksit'
---

## Overview

`checksit` is a tool that checks the structure and content of a file against a range of available checks. Checks can be made using either "spec" files defining rules that objects within a file must meet, or comparison against a template file.

Whilst initial development focussed around the standards developed for NCAS data, checksit can be adapted to check files against any desired requirements.

## Features

Currently, checksit can:

- use spec files and define rules against which to check files
- check a file against a given template file
- check for compliance against `NCAS-GENERAL`, `NCAS-RADAR`, and `NCAS-IMAGE` standards
- check files from the European Space Agency Climate Change Initiative
- output in either "standard" mode or a one line "compact" mode
- summarise output from multiple "compact" mode file checks

Work in progress includes:

- check against future versions of NCAS standards
- allow user defined specs and rules
- Visit the GitHub repository linked at the bottom of this page for further information on what is being worked on.

## Use on JASMIN

`checksit` is available on all `sci` machines. To check a file in your current directory:

{{<command>}}
/apps/jasmin/community/checksit/checksit check name-of-file.ext
{{</command>}}

For a complete guide on how to use checksit, please visit the documentation site linked at the bottom of this page.

## Further information

Documentation: https://checksit.readthedocs.io/en/latest/

GitHub: https://github.com/cedadev/checksit
