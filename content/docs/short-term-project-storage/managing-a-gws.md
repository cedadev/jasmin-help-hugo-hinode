---
aliases: /article/203-managing-a-gws
description: Managing a GWS
slug: managing-a-gws
title: Managing a GWS
---

This article explains the responsibilities of the Group Workspace (GWS)
manager.

## Role of the GWS Manager

When a GWS is created it is important that the designated GWS Manager
understands the responsibilities associated with the role. The GWS Manager has
a duty to:

- Ensure that GWS is being used appropriately: this may include enforcement of limits on particular users.
- Advertise the URL for requesting access to the GWS.
- Respond to e-mail authorisation requests from CEDA.
- Manage disk and tape effectively: specifically the use of the [Elastic Tape system]({{% ref "secondary-copy-using-elastic-tape" %}}) to back-up or migrate data.
- Communicate [GWS etiquette]({{% ref "gws-etiquette" %}}) to the project scientists.
- Manage additional services such as [sharing of GWS data via HTTP server]({{% ref "share-gws-data-via-http" %}}).
- Manage the closing down of the GWS effectively: all GWSs have a termination date and data may be lost if not managed effectively.
- Communicate any issues to the CEDA Helpdesk.

## Managing users

### Authorising access to the GWS

When your GWS has been set up, users can submit requests for access to the GWS
via the JASMIN accounts portal: the new GWS will appear in the list of
{{< link "https://accounts.jasmin.ac.uk/account/login/?next=/services/group_workspaces/" >}}JASMIN Services{{</link>}}.
An access request from a user will trigger an e-mail to you that asks you to
approve (or refuse) the request. The e-mail will include details of the user
and their intended use of the resource. As GWS manager, **you** are now
responsible for approving these requests (this is a change from the previous
situation where you confirmed your approval to the CEDA helpdesk who then
actioned the approval). Now the approval is instant.

IMPORTANT: in order for this approval process to work, the GWS manager's own
account needs to have been migrated to the JASMIN accounts portal *if it existed prior to the JASMIN Accounts Portal in 2017*. Very few accounts such now remain in that state, but you can check by going to this page:

{{<button href="https://accounts.jasmin.ac.uk/account/ceda_claim/confirm/">}}Migrate your account{{</button>}}

If it says "You are already logged in with a JASMIN account" then you need take no further action.

### File system permissions and groups

File system access to a GWS is managed using a Unix group that begins with
`gws_` and normally corresponds with the name of the service in the Accounts Portal. When users are granted the `USER` role for the workspace, they are also made members of the corresponding `gws_<gwsname>` group. As manager, you are normally granted `USER` and `MANAGER` access at the time that the GWS is set up by the JASMIN team, so it should be in place when you first access the storage. This means that:

- you have access yourself to the workspace (via the `USER` role giving you membership of the `gws_<gwsname>` group)
- you take over responsibility (via the `MANAGER` role) for approving other users' applications for the `USER` role.
- you can unilaterally grant `DEPUTY` access to other users if you know their username and want them to help you in the task of approving requests for `USER` access.

Once you yourself have access, a good first task is to set up the [recommended directory structure](introduction-to-group-workspaces/#recommended-directory-structure-for-a-gws).

A list of the user IDs that have access to a given GWS can be found by using
the "getent group" command and piping it through "grep" to select only your
GWS. For example:

{{<command user="user" host="sci-vm-01">}}
getent group | grep gws_cedaproc
(out)gws_cedaproc:*:26015:fbloggs,jdoe
{{</command>}}

You can lookup a specific user ID with the following:

{{<command user="user" host="sci-vm-01">}}
getent passwd | grep fbloggs
(out)fbloggs:*:29775:26030:Fred Bloggs:/home/users/fbloggs:/bin/bash
{{</command>}}

### Maintaining group permissions throughout the GWS

In order to maintain the group permissions throughout the GWS the highest
level directory has the "sticky bit" set. This means that the default group
for all files and directories created within the GWS will be the relevant
`gws_*` access group. This is particularly useful to enable data within the
GWS to be shared amongst collaborators. If users have a specific need to
modify the group permissions they can do so using "chgrp" command.

###  Making directory contents writable by other members of the GWS

If a user wishes to make their files/directories writable by others in the GWS
they can follow the procedure here using the "umask" command:

Make a directory (and set it the permission so that the group can read/write
to it):

{{<command user="user" host="sci-vm-01">}}
mkdir --mode=u+rwx,g+rws,o-rwx testdir
ls -l testdir
(out)drwxrws--- 2 jdoe gws_cedaproc 4096 Jan 26 14:36 testdir
{{</command>}}

Or (as separate steps):

{{<command user="user" host="sci-vm-01">}}
mkdir testdir
chgrp g+rws testdir
chgrp o-rwx testdir
ls -l testdir
(out)drwxrws--- 2 jdoe gws_cedaproc 4096 Jan 26 14:36 testdir
{{</command>}}

However, please also see {{<link "#security" />}}, below (and make sure your users are aware of this).

Check your umask:

{{<command user="user" host="sci-vm-01">}}
umask
(out)0022
{{</command>}}

Modify your "umask" so that any new file or directory that you create will be
writable anyone with the group permission:

{{<command user="user" host="sci-vm-01">}}
umask 002
touch testdir/newfile
ls -l testdir
(out)-rw-rw-r-- 1 jdoe gws_cedaproc 0 Jan 26 14:39 newfile
{{</command>}}

If you want the `umask` setting to persist, you should set it for yourself in your `~/.bashrc` file, and advise your users to do the same.

## Quota, resource allocation and GWS lifetime

The overall usage of a GWS can be determined with the `df` (SOF) or `pan_df`
(PFS) command:

{{<command user="user" host="sci-vm-01">}}
pan_df -H /gws/pw/j07/workshop/
(out)Filesystem             				Size   Used  Avail Use% Mounted on
(out)panfs://panmanager03.jc.rl.ac.uk/gws/pw/j07     2.6T    16G   2.6T   1% /gws/pw/j07/workshop/

df -H  /gws/nopw/j04/ncas_generic
(out)Filesystem                                      Size   Used  Avail Use% Mounted on
(out)quobyte@sds.jc.rl.ac.uk/gws_ncas_generic        83T    80T   3.4T  96% /gws/nopw/j04/ncas_generic
{{</command>}}

For PFS (paths beginning `/gws/pw/j07/*`), the raw capacity of the GWS is 2.6TB (measured in TB,
defined using powers of 10), but to obtain space available to users this
should be **divided by roughly 1.3**, resulting in around 2TB of free space. Of
this, 16GB is currently in use. The factor of 1.3 can depend on the number of
small files stored in the GWS because lots of small files take up more space
than expected.

For SOF (paths beginning `/gws/nopw/j04/*`), the value reported by `df -H` is the usable size.

A summary of specific sections of a GWS can be determined using `pan_du -sh \<di\r>` (PFS), and `du -sh --si --apparent-size \<dir\>` (SOF). Set the
`--apparent-size` flag to get an accurate size.

Similarly, you can use the `find` command together with `-atime` or `-mtime` to locate
files accessed or modified more than a certain length of time ago. For
example, to find files which were accessed more than 1 year ago:

```command
find /gws/nopw/j04/upscale/cache -type f -atime +365
```

**However**, this can
- consume significant system resources in running the `du` command, for a long time, and
- fail due to permission issues (as a regular user, you can't always "see" down all the directory branches)

...So we provide some tools to help with this:

1. The {{<link "gws-scanner">}}GWS Scanner{{</link>}} runs this for you, centrally, on a roughly 2-week cycle, and stores all the output in a database from which results can be visualised in the {{<link "gws-scanner-ui">}}GWS Scanner User Interface{{</link>}}.

1. There is also a live view of GWSs and the available space left on the {{< link "https://mon.jasmin.ac.uk" >}}JASMIN Dashboard{{</link>}}. The “JASMIN Storage” tab shows many
JASMIN storage volumes with information about current usage.

**So please don't run large `du` or `find` jobs yourself, as this will be duplicating something already running in the background.**

As a GWS Manager
you will receive e-mails summarising the usage and contents of the GWS. If you
wish for additional directories to be scanned and summarised please add these
to the [GWS scanner configuration]({{% ref "gws-scanner" %}}).

The typical lifetime of a GWS is 3 years. All GWS managers are expected to
actively manage the space during its lifetime and plan for the eventual
reclamation of the space by deleting and migrating data to other locations.
Typically, less-frequently-used data might be written to Elastic Tape (see below) and some final
outputs would be curated in the CEDA Archive. In the latter case please note
that you should discuss the requirements with the CEDA Archive team via the
CEDA Helpdesk, ideally before the project starts.

### Migrating data to tape

Proactive data management is an important part of providing an effective GWS.
We recommend that the GWS Manager discusses use of the space with the project
team to ensure that the use of disk and tape are being optimised. This may
involve use of the [Elastic Tape system]({{% ref "secondary-copy-using-elastic-tape" %}})
for backup or data migration (from disk to tape).

### Requesting a change to the GWS size

Although it is helpful to provide the best estimate of required allocation at
the time of initially requesting the GWS, a GWS Manager may request a change
in size (increase or decrease) of the GWS during its lifetime. We would
positively encourage you to be honest about your requirements so that others
can make use of this expensive resource if you are not using it until later in
your project, or if you no longer require all the space you originally
requested.

Requests for an increase in GWS size will be considered by the Consortium
Manager with responsibility for managing an overall allocation to that
particular scientific community. See
[Requesting Resources]({{% ref "requesting-resources" %}}). Depending on available resources and competing
demand, it may not always be possible to increase the allocation, and you may
be asked to move data to Elastic Tape to free up disk space.

## Security

User account security is very important in a multi-user environment such as
JASMIN. As a GWS Manager you have a responsibility to users of your GWS but
also to all other GWS users in helping to maintain a safe and secure system in
which productive scientific work can be done. There is a strict policy of one-
user-one-key, and on no account must any user make use of the SSH key of
another user to gain access to any part of the JASMIN infrastructure. Private
keys MUST be protected by a strong passphrase. Please encourage adherence to
these rules by users of your GWS. Any infringements may be dealt with swiftly
by removal of user access. No offensive, obscene or otherwise unauthorised
data may be stored in the GWS or anywhere else within JASMIN. Users should not
store any data of a personal or sensitive nature in the GWS.

{{< alert alert-type="danger" >}}
Do not set, or allow your users to set, open permissions on files or directories.
By this we mean permissions where data are "world-writable" by anyone, for example

`-rw-rw-rw-` for a file, or **<< DON'T USE THESE!!**<br>
`drwxrwxrwx` for a directory. **<< OR THESE!!**

We provide a UNIX a group corresponding to each group workspace, which all members of that GWS belong to: this enables sharing within the group if you set permissions appropriately using that group. If you are unsure about setting permissions, please ask the helpdesk.
{{< /alert >}}

## Changing ownership of files in your GWS

Sometimes, it is necessary for GWS managers or deputies to take ownership of files in their GWS which are owned by other users, for example to delete them, or move them to other storage. Often this is necessary when a previous member of a GWS no longer uses JASMIN.

JASMIN now has a command-line tool, `gwschown`, which allows managers or deputies to do this without assistance of the helpdesk. This tool is installed on the [sci servers]({{% ref "sci-servers" %}}), and allows GWS managers and deputies to change the ownership of files and directories in their group workspace.

The command provides usage information via the `-h` or `--help` option, as shown:

{{<command user="user" host="sci-vm-01">}}
gwschown --help
(out)usage: gwschown [-h] [-R] [-v] [-n] [--no-warn] user path [path ...]
(out)
(out)Changes ownership of files and directories in a group workspace.
(out)
(out)positional arguments:
(out)  user             the user who will become the owner of the files
(out)  path             path to the file(s) to change the ownership of
(out)
(out)optional arguments:
(out)  -h, --help       show this help message and exit
(out)  -R, --recursive  operate on files and directories recursively
(out)  -v, --verbose    output a diagnostic for every file processed
(out)  -n, --dry-run    check permissions but do not actually run chown (implies -v)
(out)  --no-warn        run without prompting for confirmation
{{</command>}}

For example, replace `exampleuser` with the username of the user who will take ownership of the files, and substituting in your own path. A good idea is to run it with `--dry-run` first just to check everything is working.

{{<command user="user" host="sci-vm-01">}}
gwschown exampleuser /gws/nopw/j04/workshop/myfile --dry-run
{{</command>}}

As with `chown`, you can also operate recursively on directories with the `-R` flag.
This tool will only work in group workspaces where **you** have the `MANAGER` or `DEPUTY` role.

If you wish to change the **group** of files or directories, you should first use the tool to change the ownership to your user- you will then be able to change the group in the usual way using `chgrp`.

## Keeping informed

Please maintain contact throughout the life of the GWS via the following
channels:

- {{<link "ceda_status">}}CEDA Status Board{{</link>}} with live updates on incidents affecting CEDA and JASMIN services.
- {{< link "https://mon.jasmin.ac.uk" >}}JASMIN Dashboard{{</link>}} to check on the status of your GWS (used versus available space).
- Email alerts from the system when the GWS reaches >83% full
- Email from the CEDA/JASMIN team
- News articles on the {{< link "ceda_site" >}}CEDA{{</link>}} or {{< link "jasmin_site" >}}JASMIN{{</link>}} websites.

If you are aware that a user who has access to your GWS leaves your project
or, for whatever reason, no longer needs to be a member of the GWS, please let
the [JASMIN Helpdesk](mailto:support@jasmin.ac.uk) know either by email or via
the beacon, lower right on this page. Arrangements may need to be made to
transfer the ownership of files and/or directories to another member of the
GWS to ensure continued access to the data.
