---
aliases: /article/4842-working-with-many-linux-groups
description: working with many Linux groups
slug: working-with-many-linux-groups
title: Working with many Linux groups
---


The number-of-groups limitation - and how to work around it

## Description

On JASMIN, users are added to Linux groups for access to the group workspaces
and CEDA datasets which they have registered to use, in addition to a couple
of standard groups granted for all users.

Type the `id` command to see which groups you are a member of. The first one
(shown with `gid=`) is your primary group, and the list starting `groups=`
contains your supplementary groups.

Although the Linux operating system allows the group list to contain a large
number of supplementary groups, certain types of filesystem are subject to a
maximum number that is supported. When such filesystems are accessed, a
truncated copy of the group list may be used while deciding whether to grant
read or write access to a given file or directory. This can mean that although
a user is a member of the group which is needed, a permissions error still
occurs, because the relevant group is being ignored. The groups which are
ignored are those with the higher numerical group IDs.

The most significant limitation affecting JASMIN users is for filesystems
which are mounted as type NFS, because this only supports 16 groups. In
particular, this applies to the group workspaces that are optimised for small
files (under path `/gws/smf`). It also applies to the home directories and
`/apps` software directories, and although with these directories it is not
normally necessary to restrict access via Linux groups, the restriction can
affect for example access to the NAG library licence file for NERC users. The
`panfs` filesystem type (Panasas group workspaces under `/group_workspaces`)
is also affected in principle, but it has a limit of 32 groups, which is less
likely to affect users.

## Workarounds

### newgrp

The `newgrp` program is available on all machines, and can be used to choose a
particular group. For example, typing:

```bash
newgrp ukmo_clim
```

will start a session (sub-shell) in which the primary group ID of the process
is `ukmo_clim` (provided that you are already a member of that group). This
will ensure that, in that session, you have access to any files which require
that group. Note that it will also mean that any files and directories you
create in that session will be owned by the group which you selected (although
they can subsequently be changed with the `chgrp` command). When you exit from
the sub-shell, you will be returned to the original session with your normal
group list.

The main limitations of `newgrp` are that:

- It only works interactively, so it is not possible to use it in LOTUS jobs.
- It only affects the primary group ID, so cannot be used to guarantee access to more than one group simultaneously, because some groups on the supplementary group list might still be ignored for filesystem accesses.

Note that if `newgrp` prompts for a password, it is because you are trying to
use it to access a group that you are not a member of (and then there is no
password that you can usefully type).

### withgroups

On the JASMIN scientific analysis machines running CentOS7, including the
LOTUS nodes in the `centos7` queue, a utility (written locally by CEDA) has
been added, which overcomes the above mentioned limitations of the `newgrp`
program. It is not available on the machines running RHEL6.

To use `withgroups`, you **first need the following command** (in your
interactive session or shell script):

```bash
module load jasmin-sci
``` 

Once you have done this, you can run any individual command with the syntax
`withgroups <group> <command>` followed by any commands arguments, for
example:

```bash
withgroups ukmo_clim ls /badc/ukmo-mslp/
```

You can also use a comma-separated list of groups if a command requires more
than one group, for example if you wanted to copy a file between group
workspaces:

```bash
withgroups gws_foo,gws_bar cp /gws/smf/foo/myfile /gws/smf/bar/
```

In these cases, the group list consists _only_ of the specified groups. So if
you specify a few additional groups, these should be safe from being ignored
during filesystem access, because they are no longer part of a long list.

Note that the group list in the calling session does not get modified. You
will see this if for example you type:

```bash
module load jasmin-sci    # a reminder of the setup command
id                        # "id" reports your whole list of groups
withgroups ukmo_clim id   # "id" only reports the "ukmo_clim" group
id                        # again, "id" will show you the whole group list
```

This means that you should use `withgroups` on every command for which it is
needed. If you prefer to use a subshell in which every command will have this
group(s) list (for similar behaviour to `newgrp`) you could start it by doing
something like:

```bash
withgroups ukmo_clim bash
```

(You might see from the help message that the `withgroups` command includes a
`-a` option to include all the original groups in the group list, just with
the specified ones at the front. However, this option is not recommended for
this purpose, because it turns out that filesystem access will ignore the
ordering and still truncate the list in numerical order.)

### Use of workarounds with python (and other) programs

Note that there is no python module equivalent of either `newgrp` or
`withgroups`. In most cases, it is sufficient to run your **whole** python
script either inside a newgrp session or via withgroups, for example:

```bash
withgroups ukmo_clim python my_script.py
```

In the unlikely event that your Python program needs access to a large number
of groups, you will have to lauch external commands (using `os.system` or the
`subprocess` package) that start with the relevant `withgroups` prefix.

Similar considerations apply to code written in other programming languages.
