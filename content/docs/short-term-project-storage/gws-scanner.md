---
aliases: /article/4499-gws-scanner
description: GWS Scanner
slug: gws-scanner
title: GWS Scanner
---

## Introduction

This article explains about the process that runs in the background scanning all group workspaces (GWS) to gather basic information about usage, which are fed into a database to be made available to users via the {{<link "gws-scanner-ui">}}GWS Scanner User Interface{{</link>}}.

It is intended for GWS Managers and provides details about how to customise the scan that is done on each GWS.

**It is run centrally, and is a very resource-intensive task, so please don't run similar tasks of your own, as you will be unnecessarily duplicating resource usage.**

The scans occurs approximately fortnightly to check the contents of all GWSs. 

## Customisation

If you wish for additional directories to be scanned and summarised please add
these to the `{GWS_PATH}/.gws_scan/config.ini`, where `{GWS_PATH}` is the path to
your group workspace (the directory and the file may need to be created).
Directories can also be excluded from the scan in the same way. This can be
useful for speeding up the run time of a scan. Here is an example of a
config.ini file.

{{<alert alert-type="info">}}
Please note that the required directory for this configuration data is `.gws_scan`, not `.gws_scanner` - the
latter is from the **previous** incarnation of the scanner)
{{</alert>}}

```ini
[general]
# GWS fullness threshold for which the GWS Alerts will send a warning email (default 90, in %)
volume_warning_threshold = 83
# Directories to check for largest sub-dir and filetypes below (comma separated list), these paths must be relative to the group workspace path i.e. path/to/dir, not /group/workspace/path/to/dir
  # Defaults to all top level directories inside volume
dirs = dir1,path/to/dir2
# Directories to exclude from the scan. This can be useful to speed up the scan if there are know directories with a large number of files, for which the scan information is not very useful
excl_dirs = path/to/excl, large_dir
# Filetype extensions to count inside directories above (comma separated list)
  # Defaults to none
exts = html,py,js
```

`dirs` and `excl_dirs` can have the `*` wildcard anywhere in the directory path.
From the config above for example: `path/to/*`, and `p*h/to/dir2` would pick up
the directory `/path/to/dir2`, and any other directories which matched the
pattern.  
  
Please don't comment out the arguments. If you don't want to use one just leave
it blank, this will then just use the internal defaults. E.g.

```ini
[general]
volume_warning_threshold =
dirs = 
excl_dirs =
exts =
```
