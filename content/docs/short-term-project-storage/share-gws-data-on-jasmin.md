---
aliases: /article/4469-share-gws-on-jasmin
description: Sharing GWS data with other users elsewhere on JASMIN
slug: share-gws-data-on-jasmin
title: Sharing GWS data on JASMIN
---

## Introduction

This article explains how a GWS Manager can organise for some directories within a GWS to be shared with other users on JASMIN.

**Note:** this only applies to sharing data within the managed environment of the JASMIN platform.
If you need to share data with users outside JASMIN, or to users of external cloud tenancies, please consider
the [HTTP option]({{% ref "share-gws-data-via-http" %}}).

## How to share specific directories

Sometimes it is useful to share the contents of specific directories within
your GWS with other users on JASMIN (that do not have access to your GWS).
This can be achieved with the following approach:

Suppose you manage the GWS `/group_workspaces/jasmin/superproj` and you want
to share the directory `/group_workspaces/jasmin/superproj/mydata` with other
JASMIN users.

1\. Add read and execute permission for all to the top-level GWS directory.
This requires root access so you might need to request that CEDA make this
change for you:

{{<command>}}
chmod 775 /group_workspaces/jasmin/superproj
{{</command>}}

2\. Alter the permissions of all sub-directories to remove the execute
permission for all users that don't have access to the GWS:

{{<command>}}
find /group_workspaces/jasmin/superproj -type d -exec chmod o-x {} \;
{{</command>}}

3\. Add execute permission on the sub-directory you want to share:

{{<command>}}
chmod o+x /group_workspaces/jasmin/superproj/mydata
{{</command>}}

NOTE: You may need to change permissions on directories and files within the
sub-directory as well. Please consult the `chmod` man pages (by typing `man
chmod`) for details.

NOTE: if you have a `public` directory then it needs `755` access if you want it
to be visible via the webserver via the `gws-access.jasmin.ac.uk` service. So
you may wish to re-add execute permission on that directory, e.g.:

{{<command>}}
chmod o+x /group_workspaces/jasmin/superproj/public
{{</command>}}

{{< alert alert-type="danger" >}}
Do not set open permissions on files or directories.
By this we mean permissions where data are "world-writable" by anyone, for example

`-rw-rw-rw-` for a file, or **<< DON'T USE THESE!!**

`drwxrwxrwx` for a directory. **<< DON'T USE THESE!!**

We provide a UNIX a group corresponding to each group workspace, usually named `gws_<name>` which all members of that GWS belong to: this enables sharing within the group if you set permissions appropriately using that group. If you are unsure about setting permissions, please ask the helpdesk.
{{</alert>}}
