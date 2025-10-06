---
aliases: /article/4856-jasmin-users-guide
description: Tips for new users
slug: tips-for-new-users
title: tips-for-new-users
weight: 90
---

These tips for new users are based on users' queries encountered by our helpdesk. They are not exhaustive but may help solve some initial problems and set out best practice.

- Sci machines
- LOTUS
- Xfer servers
- How to report an issue

## "Sci" machines usage guidelines

1. Check the current load and number of users on the sci machines, as shown by the login servers, to select a less-used sci machine. [The available Sci machines and their specifications are listed in the table of this help page]({{% ref "sci-servers" %}})
2. The sci machines are not for running large, long-running tasks, or scripts that spawn multiple child processes. The batch processing cluster LOTUS is available for heavier processing. The sci machines are for development, testing, and light interactive use. Overloading these with processing seriously impairs performance for interactive use by others.
3. Do not write to the temporary partition `/tmp`on sci machines. [Use your home directory, a scratch volume or a Group Workspace ]({{% ref "understanding-new-jasmin-storage" %}}). Any temporary data files can reside in a subdirectory of your group workspace instead of `/tmp`. To do this, please add the following lines (or similar) to your `$HOME/.bashrc` file:

```bash
export TMPDIR=/group_workspaces/jasmin/<your_project>/<your_username>/tmp
## create the directory if needed
[ -d $TMPDIR ] || mkdir -p $TMPDIR
```

4. If a process hangs, do not simply close the terminal window. Please contact the helpdesk and alert the team so that the process can be shut down. Otherwise hung processes build up and contribute to machine overloading.
5. Do not “hog” IDL development licenses. A limited number of these are available for _development_ and compilation of IDL code which should then be run on LOTUS [using IDL runtime licenses]({{% ref "idl" %}}), of which there are many more.
6. Do not use sci machines for data transfer: [xfer hosts are provided for this purpose]({{% ref "transfer-servers" %}}).

## LOTUS usage guidelines

1. Do not use [IDL development licences]({{% ref "idl" %}}) on LOTUS. There are many **runtime** licenses available, but the **development** licenses are for interactive use on the sci machines, where IDL code can be compiled, then run on LOTUS using a **runtime** license.
2. Beware of inadvertently filling up `/tmp` on LOTUS nodes. This can take nodes out of action (perhaps for other users who still have jobs running on the same node) if `/tmp` fills up. Design your code to clean up as it goes along, and use environment variables to control where your applications write temporary data, ideally to storage which is not specific to a LOTUS node. If your job crashes, check which nodes were involved and clean up after yourself.
3. Do not store data in scratch areas for long periods of time. Move data away to group workspaces once your processing has finished.

## Xfer servers guidelines

1. Do not run a large number (>16) of rsync or scp transfer processes in parallel.
2. Do not run processing on xfer servers: they are provided for data transfer only
3. For heavy/high-performance data transfers, use Globus or one of the `hpxfer` servers.

## How to report an issue

When you do experience an issue, please;

1. Make it clear whether you are simply advising the helpdesk of a general issue (which will be noted, but not necessarily investigated for a specific response), or
2. Provide FULL and SPECIFIC details of your problem so that it can be investigated. JASMIN is a complex infrastructure with many hundreds of hosts and storage volumes, so reporting that “JASMIN” or “Storage” is slow, is not sufficient.
3. If you are experiencing difficulties accessing a particular storage volume from a particular sci machine, **please** state:
    - the **full path** to the data you are trying to access:
    - the **full hostname** of the machine (but please try the same access from at least one other machine to help establish whether it’s related to the machine or the storage)
    - the **date and time** of the issue (for matching up with system reports/log files. Using the date and time of the email is not sufficient: please be specific in your report)
4. Be patient: sometimes, queries will take longer to resolve if they are complex or if relevant staff are not available.
5. Some issues will only be resolved by strategic improvements which are planned as part of phased upgrades to JASMIN accompanied by capital procurements followed by integration work, all carried out by the same, small team.
