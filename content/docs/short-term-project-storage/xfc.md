---
aliases: /article/4535-xfc
description: Transfer Cache (XFC)
slug: xfc
title: Transfer Cache (XFC)
---

## What is the XFC?

The Transfer Cache (XFC) provides large but very short-term temporary storage
for use during data transfer tasks in/out of JASMIN. This is useful when the
might involve assembling/manipluating data before moving it elsewhere.

Users are able to self-initiate the service for themselves, and will be granted
folder on one of a number of **shared** storage volumes.

{{<alert alert-type="danger">}}
**March 2026**: The quota and auto-deletion system used with XFC is currently
disabled and under review.

Meanwhile, users **MUST** currently ensure that they clean up after any large
transfer task and do not consume large amounts of space (multiple TB) beyond a
few days - weeks (not months!), to ensure the service remains available to all
users.

Documentation below has been modified to reflect the current functionality.
{{</alert>}}

Users interact with the XFC in two ways:

  1. to initialise their own XFC directory, a
  [command-line client]({{% ref "install-xfc-client" %}}) is used.
  2. the directory can then be accessed via any data transfer tool
  (`cp`, `mkdir`, `rm`, `mv`, `rsync`, or Globus).

## Using XFC

JASMIN provides access to XFC via a command-line client: `xfc`

Once [installed]({{% ref "install-xfc-client" %}}) into your `$HOME`
directory (using one of the `sci` servers), the `xfc` client can be run on
either the `sci` (`sci*.jasmin.ac.uk`) or `xfer` (`xfer*.jasmin.ac.uk`)
servers, but should NOT be run on the high-performance transfer servers
`hpxfer*.jasmin.ac.uk`.

The client is used only for interacting with the service, but is not needed
for accessing the storage it provides. The storage provided is mounted in most
places across JASMIN: the path to your XFC volume is returned by the client in
one of the steps shown below.

Users are expected to use the [xfer servers]({{% ref "transfer-servers" %}})
or a high-performance data transfer service, or ideally Globus, to do any data
transfers either within or in/out of JASMIN.
This preserves resources for on the `sci` servers which
are for general-purpose interactive computing.

The `xfc` client is used to initialise and then query the status of a user's
XFC storage directory:

To see all the available options: `xfc -h`

### Initialise your XFC directory

{{<command user="user" host="sci-vm-01">}}
xfc init
(out)** SUCCESS ** - user initiliazed with:
(out)username: username  
(out)email: user.name@stfc.ac.uk  
(out)quota: 10TB  # IGNORE: quotas not currently active
(out)path: /work/xfc/vol7/user_cache/username
{{</command>}}

{{<alert alert-type="danger">}}
**March 2026**: Please ignore any quota information for now while the system is 
under review. The notification and auto-delete systems are currently inactive.

Please clean up any data as soon as you have finished with the space.
{{</alert>}}

The `path` is the path on the JASMIN system to this user's XFC directory. Data
can be put here using standard UNIX command-line tools `cp`, `mv`, `rsync` or
Globus. Subdirectories can be created using `mkdir`. Change read/write permissions on
the directories and files using `chmod`, etc.

### Find out the path of your XFC directory:
  
{{<command user="user" host="sci-vm-01">}}
xfc path
(out)/work/xfc/vol7/user_cache/username
{{</command>}}

Once you know the path, you can `ls` it, for example to check the permissions:

{{<command user="user" host="sci-vm-01">}}
ls -ld /work/xfc/vol7/user_cache/username
(out)drwx------ 13 username    users        4096 Oct 15 14:52 username
{{</command>}}

It is possible to change the
[permissions and groups]({{% ref "permissions-groups" %}}) of an XFC folder,
for example, so that colleagues from the same group workspace can access it.
However, please don't regard this space as an extension of a GWS because data
should not reside in the XFC folder for more than a few days/weeks.

### Check usage

To check your current usage, use the command `pan_du -s`:

{{<command user="user" host="sci-vm-01">}}
pan_du -s /work/xfc/vol7/user_cache/username
dir /work/xfc/vol7/user_cache/username: 2 files, 1220860 KiB
{{</command>}}

Note on reported sizes:
- size is reported in binary kilobytes (KiB)
- to convert to binary terabytes (TiB), divide by 1024**3
- this needs to be divided by 1.3 for actual data size (for technical reasons to do with the storage system used)

A handy utility to check how long your data has been there, is the additional `-a` option:

{{<command user="user" host="sci-vm-01">}}
pan_du -sa /work/xfc/vol7/user_cache/username
(out)dir /work/xfc/vol7/user_cache/username: 2931 files, 424130252 KiB
(out)age 30D: 0 files, 0 KiB
(out)age 60D: 0 files, 0 KiB
(out)age 90D: 0 files, 0 KiB
(out)age 120D: 0 files, 0 KiB
(out)age MAX: 2931 files, 424130252 KiB
{{</command>}}

This user has been storing data for far too long (MAX, i.e. beyond 120 days)!
Please aim to keep your usage WELL below 30 days for this service.

Please DO NOT use `touch` or similar processes to alter the age of your files.
Any use of this risks sanction from the JASMIN team.

### Check free space on shared volume

To check the amount of space free on the shared volume where your XFC folder sits:
(using this command, sizes are reported in decimal terabytes)

{{<command user="user" host="sci-vm-01">}}
$ pan_df -H /work/xfc/vol7
(out)Filesystem             Size   Used  Avail Use% Mounted on
(out)panfs://panmanager04.jc.rl.ac.uk//work/xfc/vol7
(out)                       260T   162T    99T  63% /work/xfc/vol7
{{</command>}}

This shows that the volume size overall is 260 / 1.3 = 200 T (decimal terabytes), and
that there are 162 / 1.3 = 124 T used, 99 / 1.3 = 76T free, or 63% usage.

Consult the `man` pages for `pan_du` and `pan_df` for further information.