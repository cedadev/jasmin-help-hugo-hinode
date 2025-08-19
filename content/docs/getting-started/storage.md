---
aliases: /article/176-storage
description: This article provides an overview of JASMIN storage.
tags:
- quota
- backup
- scratch
title: Access to storage
weight: 150
---

**IMPORTANT:** Please see also
[Understanding new JASMIN storage]({{% ref"understanding-new-jasmin-storage" %}})
which explains more about the different types of storage as of Phase 4 of JASMIN's history.

## Home directory

Every JASMIN user is allocated a HOME directory located
at `/home/users/<username>`. This directory is available across most of the
interactive and batch computing resources, including the JASMIN login and
transfer servers.

{{< alert color="info" >}}
In the commands on this page, please replace `<username>` with your username, or use the environment variable `${USER}`. 
For example, `/home/users/<username>`  becomes `/home/users/joebloggs`.
{{</alert>}}

Each home directory has a default **quota of 100 GB**. Although you can't 
directly check usage against your quota, you can find out the current size
of your home directory as follows (the `pdu` command is a parallel variant
of the `du` command, designed to work with the particular storage used for home
directories on JASMIN).

{{<command>}}
pdu -sh /home/users/<username>
(out)#                   ^^^^^^^^^^ replace with your username
{{</command>}}

{{<alert alert-type="danger">}}You are only allowed to exceed the 100 GB quota for a very
brief period of time. If you continue to exceed the limit, you will be
unable to add any more files, which means that jobs may fail, and other things may
stop working for you. You will need to reduce your usage below the 100GB quota to resolve this.
{{</alert>}}

### Backups of your home directory

Your home directory is backed up using a daily snapshot which provides a quick, **self-service** method for you to restore files or directories that have been accidentally deleted. Snapshot backups are kept for 1-2 weeks before being deleted.

#### Recovering snapshots of your home directory data

Users can access snapshots to recover files/directories that have been
accidentally deleted. These are stored in
`/home/users/.snapshot/homeusers2.<snapshotid>/<username>`

The most recent backup is the one with the latest snapshot date.

Find the ones relevant to your username with a command line this:

{{<command>}}
ls -ld /home/users/.snapshot/homeusers2.*/<username>  ## replace <username> with your own, as before
{{</command>}}

There should be up to 14 directories like this: 

```bash
drwx------ 113 joeblogs users 0 Jan 26 15:00 /home/users/.snapshot/homeusers2.2024_01_28_02_01/joebloggs
drwx------ 113 joeblogs users 0 Jan 26 15:00 /home/users/.snapshot/homeusers2.2024_01_29_02_01/joebloggs
drwx------ 113 joeblogs users 0 Jan 29 09:51 /home/users/.snapshot/homeusers2.2024_01_30_02_01/joebloggs
drwx------ 113 joeblogs users 0 Jan 30 09:29 /home/users/.snapshot/homeusers2.2024_01_31_02_01/joebloggs
drwx------ 113 joeblogs users 0 Jan 30 09:29 /home/users/.snapshot/homeusers2.2024_02_01_02_01/joebloggs
```

Each of these snapshot directories effectively contains your home directory as it was on that date. You can copy files back from them (yourself) to their original location.

{{<command>}}
ls -l /home/users/.snapshot/homeusers2.2024_02_01_02_01/joebloggs/
(out)total 1170964
(out)-rw-r--r-- 1 joebloggs users              104857600 Jun 26  2017 100M.dat
(out)-rw-r--r-- 1 joebloggs users             1024000000 Feb  1  2017 1G.dat
(out)-rw-r--r-- 1 joebloggs users                      0 Dec 18 12:09 6181791.err
cp /home/users/.snapshot/homeusers2.2024_02_01_02_01/joebloggs/100M.dat ~/100M.dat
{{</command>}}

A snapshot backup is also provided for `/gws/smf` volumes (similar allocations of
SSD storage for GWS groups to share): snapshots in this case are made hourly
and kept for 10 hours, then daily snapshots are kept for 2 weeks. These can
be retrieved in a similar manner to that shown above. In this case the
relevant directories should be found at

{{<command>}}
    /gws/smf/jNN/<gwsname>/.snapshot
{{</command>}}

(where `NN` = `04` or `07` depending on where the volume is located)

{{<alert alert-type="danger">}}All other group workspace volumes are **not backed up**. The only exception to this is the snapshot backups for `smf` SSD volumes just described.
{{</alert>}}

Please also note the {{<link "#advice-on-inter-volume-symlinks-in-jasmin-storage">}}advice on inter-volume symlinks{{</link>}}, below: these are to be avoided.

## JASMIN disk mounts

There is a common file system layout that underpins most of the JASMIN
infrastructure. However, access to different parts of the file system will
depend on where you are logged in. Table 1 outlines the key disk mounts, where
they are accessible from and the type of access (read and/or write).

**Table 1.** List of common disk mounts, types of storage and their
availability on JASMIN

Disk mount  
location |  login  |  sci  |  transfer  |  LOTUS  |  Type  |  Parallel-write  
---|---|---|---|---|---|---  
/home/users  |  R/W  |  R/W  |  R/W  |  R/W  |  SSD  |  no
/gws/pw/j07<br>/gws/nopw/j04 (see note 1 below)<br>/gws/smf/j0[4,7] |  no<br>no<br>no | R/W<br>R/W<br>R/W | R/W<br>R/W<br>R/W | R/W<br>R/W<br>R/W | PFS<br>SOF<br>SSD | yes (hence "pw")<br>no (hence "nopw")<br>no
/work/xfc/volX (see note 2 below) |  no<br>no  |  R/W  |  R/W |  R/W  | PFS  | yes
/work/scratch-pw[2,3]<br>/work/scratch-nopw  |  no<br>no  |  R/W<br>R/W  |  no<br>no |  R/W<br>R/W  | PFS<br>SSD  | yes<br>no
/apps/contrib  |  No  |  RO  |  No  |  RO  |  n/a  |  n/a  
/badc, /neodc (archives)  |  No  |  RO  |  RO  |  RO  |  n/a  |  n/a  
{.table .table-striped}
  
login = {{<link "../interactive-computing/login-servers">}}login servers{{</link>}}: login[1-4].jasmin.ac.uk  
sci = {{<link "../interactive-computing/sci-servers">}}scientific analysis servers{{</link>}}:
sci[1-6,8].jasmin.ac.uk  
transfer = {{<link "../interactive-computing/transfer-servers">}}data transfer servers{{</link>}}:
xfer[1-2].jasmin.ac.uk  
LOTUS = {{<link "../batch-computing/lotus-overview">}}LOTUS batch processing cluster{{</link>}}(all cluster
nodes)  
Disks are mounted read/write (" **R/W** ") or read-only (" **RO** ").

**Note 1:** Please refer to issues related to writing small files and NetCDF3
to SOF storage [here]({{% ref "faqs-storage" %}})

**Note 2:** For details of how to use the Transfer Cache (XFC) service please see [here]({{% ref "xfc" %}})

## Where to write data

As indicated in table 1 there are three main disk mounts where data can be
written. Please follow these general principles when deciding where to write
your data:

- HOME directories (`/home/users`) are relatively small (100GB) and should NOT be used for storing large data volumes or for sharing data with other users.
0 Group Workspaces (mostly `/gws/nopw/*/<project>` but some `/gws/pw/*/<project`) are **usually the correct place to write your data**, although they are **not backed up**. Please refer to the [Group Workspace]({{% ref "short-term-project-storage" %}}) documentation for details.
  - `/gws/pw/j07` volumes are parallel-write-capable storage from Phase 7 (onwards) of JASMIN
  - `/gws/nopw/j04` volumes are "Scale out Filesystem" (SOF) from Phase 4 (onwaards) of JASMIN: this storage is not parallel-write-capable
- The "scratch" areas (`/work/scratch-pw2`, `/work/scratch-pw3` and `/work/scratch-nopw`) are available as a temporary file space for jobs running on [LOTUS]({{% ref "lotus-overview" %}}) (see next section below).
- The `/tmp` directory is **not usually an appropriate location to write your data (see next section below).**

## How to use the temporary disk space

### Scratch

The scratch areas `/work/scratch-pw2`, `/work/scratch-pw3` and
`/work/scratch-nopw` are a temporary file space shared across the entire LOTUS
cluster and the scientific analysis servers.

These scratch areas are ideal for processes that generate _intermediate_ data
files that are consumed by other parts of the processing before being deleted.
Please remember that these volumes are resources shared between all users, so
consider other users and remember to clean up after your jobs. **** Any data
that you wish to keep should be written to a Group Workspace (but remember to
change the group-ownership of the data if you do).

There are 2 types of scratch storage available:

- **PFS scratch** (lots of it, fast, less good for small files) as 2 x 1 PB volumes `/work/scratch-pw[2,3]` and particularly suitable for users with a need for storage capabale of shared-file writes with MPI-IO, but good for most purposes.
- **SSD scratch** (less of it, very fast, good for small files) `/work/scratch-nopw2` as 1 x 220 TB volume. Do not use for operations that attempt to write to multiple parts of a file simultaneously. Please be aware of this if your code (perhaps inadvertently?) writes to a shared log file.

When using the "scratch" areas, please create a sub-directory (e.g.
`/work/scratch-????/<username>`) labelled with your username and write your data there.

### /tmp

In contrast to the "scratch" space, `/tmp` directories on LOTUS nodes 
and physical sci machines are all local to the machine. These can be used
to store _small_ volumes of temporary data for a job that only needs to be
read by the local process. But `/tmp` on virtual sci machines, are not local and
therefore should not usually be used by users.

## Cleaning up the scratch and tmp directories

**Please** make sure that your jobs delete any files under the `/tmp`and scratch
directories when they are complete ( _especially_ if jobs have not been
completed normally!).

Please do this yourself so that you are not taken by surprise when automated 
deletion processes clear up any residual data:

{{<alert alert-type="danger">}}
Automated cleanup processes run daily and
delete files that are older than 28 days from the last time of being
accessed. This applies to `/work/scratch-pw2`, `/work/scratch-pw3` and
`/work/scratch-nopw2`

Please remember that shared temporary storage is for the use of all 2,000 users
of JASMIN, not just you. If you persistently store large amounts (100s of TB) of data in scratch 
for long periods of tine, you deny use of that storage to other users (so expect action from the JASMIN team).

Please be a good JASMIN citizen!
{{</alert>}}

Any important data for keeping should be written to
a [Group Workspace]({{% ref "introduction-to-group-workspaces" %}})
or to your home directory if appropriate.**

The `/work/scratch-pw[2,3]` and `/work/scratch-nopw` areas are not available on
the xfer, login or nx-login servers.

### Avoid inadvertently writing to /tmp

Sometimes software is configured by default to write to `/tmp`. Where possible, you 
should over-ride this and use your group workspace or a username-labelled directory 
within the scratch space instead.

To do this, please add the following lines (or
similar) to your $HOME/.bashrc file:

```bash
export TMPDIR=/<path-to-your-GWS-or-scratch>/<your_username>/tmp
# create the directory if needed
[ -d $TMPDIR ] || mkdir -p $TMPDIR
```

...but please check that location regularly to clear it out!

## Access to the CEDA archive

The CEDA Archive is mounted read-only under paths refleting the NERC data centres
which merged to form CEDA, i.e.
- `/badc` (British Atmospheric Data Centre)
- `/neodc` (NERC Earth Observation Data Centre).

(other data centre paths now also exist at that level: see {{<link "ceda_helpdocs">}}CEDA Help docs{{</link>}} for more info)

The Archive includes a range of data sets that are provided under varying licences. Access
to these groups is managed through standard Unix groups. Information about the
data and their access restrictions is available from the {{<link "ceda_catalogue">}}CEDA Catalogue{{</link>}}. 

{{<alert alert-type="info">}}
As a JASMIN user, it is your
responsibility to ensure that you have the correct permissions to access data
any data in CEDA Archive from within JASMIN, even if file system permissions permit access.
{{</alert>}}

## Tape access

Group workspace managers also have access to near-line storage on tape, see [Elastic Tape
service]({{% ref "secondary-copy-using-elastic-tape" %}}) for making
secondary copies and managing storage between online and near-line storage.

## Number of files in a single directory

It is highly recommended that you do not exceed more than 100,000 files in a
single directory on any type of storage on JASMIN. Large numbers of files
place unnecessary load on components of the file system and can be the source
of slow performance for you and other storage volumes in the system. To count
the number of files, please note the advice in {{<link "#slow-ls-response">}}slow `ls` response{{</link>}} below, or
use an alternative command e.g. `find`.

## Slow 'ls' response

This can be due to a number of reasons (see above advice regarding number of
files in a single directory, and below regarding inter-volume symlinks). To
speed up the response (useful if you want to count the number of files) it
often helps to un-alias ls, e.g. by placing a backslash in front of the
command: `\ls`.

## Advice on inter-volume symlinks in JASMIN storage

We highly recommend users _not_ to use symbolic links in their home
directories to other parts of the JASMIN file systems, such as GWSs or scratch
areas. There are a number of conditions when the petabyte-scale JASMIN storage
can become unusable for all users due to these links. There is a more
technical explanation below. We would advise **path substitutions using
environment variables** instead.

Symlinks in users' home directories that point to other volumes (for example
group workspaces) make matters worse _when_ there are problems on the
`sci*.jasmin.ac.uk` servers and other shared machines, and/or when the
metadata servers responsible for particular storage volumes themselves become
overloaded. The simplest advice we can currently give is to **avoid** using
symlinks.

**In more detail:**

This issue is particularly apparent when `ls` is aliassed to `ls --color` (as
is the default on 99% of JASMIN systems) AND one of the colorisation options
specified is for an orphaned link. The `ls` on symlinks causes the metadata
servers at the end of the symlink to be called (to provided the `stat`
filesystem metadata), in addition to the metadata server for the home
directory. If those metadata servers at the far end are under load, or have
some other problem, the `ls` to the home directory can hang, but this also
hangs other users who may be trying to ls their own home directory (even if
theirs contains no symlinks). The situation can then escalate out of control
as more and more users try and fail.

This is happens especially where one or more of the volumes involved
contains large numbers of small files.
