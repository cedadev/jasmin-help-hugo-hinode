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
**October 2026**: The quota system for XFC has been reinstated.  However, there is no
longer any auto-deletion.  Users will receive an email notifying them when they are over
the quota.  The onus is on users to clean up their XFC disk space, and to remain honest 
and good colleagues of the others also using the XFC disks.

Users **MUST** heed the notifications of when they are over quota, and clean up when they
receive the notification.  It is a good idea to clean up after any large transfer task 
and yo not consume large amounts of space (multiple TB) beyond a few days to weeks 
(not months!), to ensure the service remains available to all users.  This is a shared
system, relying on users to self-regulate, with reminders from the notification system.
Please use it accordingly.

Documentation below has been modified to reflect the new functionality.
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

To see all the available options: `xfc --help`

{{<command user="user" host="sci-vm-01">}}
xfc --help
(out)usage: XFC [-h] [--version] [--email EMAIL] command
(out)
(out)JASMIN transfer cache (XFC) command line tool

(out)positional arguments:
(out)  command        Available commands are : 
(out)                 init     : Initialize the transfer cache for your JASMIN login
(out)                 email    : view, set or update email address
(out)                 info     : Get the user info
(out)                 notify   : Switch on / off email notifications of exceeding the quota (default is off)
(out)                 path     : Get the path to your storage area in the transfer cache
(out)                 quota    : Get the remaining free space in your quota
(out)                 predict  : Predict when the quota will be exceeded based on the current files
(out)
(out)options:
(out)  -h, --help     show this help message and exit
(out)  --version      show program's version number and exit
(out)  --email EMAIL  Email address for user in the init and email commands.
{{</command>}}

### Initialise your XFC directory

{{<command user="user" host="sci-vm-01">}}
xfc init
(out)** SUCCESS ** - user initialised with:
(out)    Username            : username  
(out)    Email               : user.name@stfc.ac.uk  
(out)    Temporal Quota (TQ) : 300.0 TB days
(out)    Hard Quota (HQ)     :  40.0 TB
(out)    Path                : /work/xfc/vol7/user_cache/username
{{</command>}}

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

To check your current usage, use the command `xfc quota`:

{{<command user="user" host="sci-vm-01">}}
xfc quota
(out)-----------------------------
(out)Quota for user: username
(out)-----------------------------
(out)  Temporal Quota (TQ)
(out)    Used      : 195.3 GB days
(out)    Allocated : 180.0 TB days
(out)    Remaining : 178.8 TB days
(out)-----------------------------
(out)  Hard Quota (HQ)
(out)    Used      :  65.0 GB
(out)    Allocated :  40.0 TB
(out)    Remaining :  39.9 TB
{{</command>}}

This user has been storing data for far too long (MAX, i.e. beyond 120 days)!
Please aim to keep your usage WELL below 30 days for this service.

Please DO NOT use `touch` or similar processes to alter the age of your files.
Any use of this risks sanction from the JASMIN team.

### Predict when the quota will be exceeded

XFC allows you to predict when the quota will be exceeded if the current volume of data
remains on the disk.  This is via using the `xfc predict` command.

{{<command user="user" host="sci-vm-01">}}
xfc predict
(out)--------------------------------------------
(out)Quota exceeded prediction for user: username
(out)--------------------------------------------
(out)    Over quota by :  80.3 GB days
(out)    On date       : 2026-10-23
{{</command>}}

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