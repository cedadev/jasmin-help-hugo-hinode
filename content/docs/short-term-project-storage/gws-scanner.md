---
aliases: /article/4499-gws-scanner
description: GWS Scanner
slug: gws-scanner
title: GWS Scanner
---

## Introduction

This article explains about the process that runs in the background scanning all group workspaces to gather basic information about usage, which are fed into a database to be made available to users via the {{<link "gws-scanner-ui">}}GWS Scanner User Interface{{</link>}}.

It is intended for GWS Managers and provides details about how to customise the scan that is done on each GWS.

**It is run centrally, and is a very resource-intensive task, so please don't run similar tasks of your own, as you will be unnecessarily duplicating resource usage.**

There are two different scans of the Group Workspaces (GWSs).

- A daily scan which checks for how full the GWS is, and will email the GWS manager if it is over the default threshold of 83%, or a defined threshold in the GWS config file (see below).
- An approximately fortnightly check of the contents of all GWSs.

As a GWS Manager you will receive e-mails summarising the usage and contents
of the GWS. By default this is a simple volume level summary of the GWS.

## Customisation

If you wish for additional directories to be scanned and summarised please add
these to the `{GWS_PATH}/.gws_scan/config.ini`, where {GWS_PATH} is the path to
your group workspace (the directory and the file may need to be created).
Directories can also be excluded from the scan in the same way. This can be
useful for speeding up the run time of a scan. Here is an example of a
config.ini file.

{{<alert alert-type="info">}}
Please note that the required directory for this configuration data is `.gws_scan`, not `.gws_scanner` - the
latter is from the **previous** incarnation of the scanner, and will be be removed in due course)
{{</alert>}}

```ini
[general]
# GWS fullness threshold for which the daily scan will send a warning email (default 83) (in %)
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

## Report

When the fortnightly scan runs it sends the output to the GWS manager as an
email, which looks like this:


{{<alert color="light">}}

```txt
### Group Workspace Report for: {GWS_PATH}

#### Scan Details

Time most recent scan started: 16/04/2019 - 10:15:57  
Time most recent scan finished: 16/04/2019 - 12:25:27  
Duration of most recent scan (h:m:s): 2:09:29  
Scan Complete: True

#### Usage Details

Filesystem: fuse.quobyte  
Total Storage: 199.2 TiB  
Used Storage: 81.8 TiB  
Free Storage: 117.4 TiB  
Usage: 42%

#### Directory Details

To get information about specific directories within this volume, please add
the relative paths to the volume config file (.gws_scan/config.ini) - see
[https://help.jasmin.ac.uk/article/4499-gws-scanner]({{< ref "gws-scanner">}})

**Directory** |  **Total Files** |  **Total Size** |  **Sub-directory with most files** |  **Files in this Sub-directory**  
---|---|---|---|---  
all_dirs  |  238336  |  81.8 TiB  |  {GWS_PATH}/dir1/example/path  |  7929  
.gws_scanner  |  0  |  0.0 B  |  None  |  0  
dir1  |  0  |  0.0 B  |  {GWS_PATH}/dir1/example/path  |  0  

#### Filetype Details

To get information on the quantity and size of specific filetypes under the
directories above, please add the relevant file extensions to the volume
config file (.gws_scan/config.ini) - see
[https://help.jasmin.ac.uk/article/4499-gws-scanner]({{< ref "gws-scanner"
>}})

_No filetypes requested_

```

{{</alert>}}
