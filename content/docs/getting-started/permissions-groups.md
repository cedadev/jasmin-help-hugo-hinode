---
description: How permissions and groups are used to manage access to data stored on JASMIN.
title: Permissions and groups
slug: permissions-and-groups
weight: 155
---

## Introduction

Within a multi-user system such as JASMIN, permissions and groups are used to
ensure that:

- the right people have the appropriate **access** to the right data
- the system is kept **secure**

This guide will help you understand how access is organised on JASMIN, and what
you need to do as a user to ensure that your data, and that of any groups you
belong to, are kept safe.

### TLDR

- While data in home or scratch areas belongs to group `users`, each 
[group workspace]({{%ref "introduction-to-group-workspaces" %}}) has its own
Linux group.
- If you're moving data from your home directory or scratch to a group
workspace, make sure you `chgrp` the data to belong to the `gws_<name>`
group of the GWS.
- You **must not** set [unsafe permissions](#unsafe-permissions) on JASMIN.

## UNIX/Linux permissions

JASMIN uses the Linux operating system, so we use standard Linux mechanisms to
control access to files and directories within storage volumes on JASMIN.

{{<alert alert-type="info">}}This guide applies to 
[POSIX](https://en.wikipedia.org/wiki/POSIX) file system volumes (like your home
directory, group workspaces, scratch, XFC and the CEDA Archive, also the
terminal environment from which you may connect to JASMIN, i.e. your local
machine). For other types of storage such as high-performance object storage,
or block storage, other access control mechanisms apply.{{</alert>}}

For a great introduction to permissions, see
{{<link "https://labex.io/lesson/file-permissions">}}this online lesson
{{</link>}}, one of many provided by 
{{<link "https://labex.io/linuxjourney">}}LinuxJourney.com{{</link>}}.

### Understanding `ls -l` output

One of the basic tools for looking at permissions is the `ls` command, using the
`-l` (long listing) option.

In this example, user `fred` has some files in his home directory:

{{<command user="user" host="host">}}
pwd
(out)/home/users/fred
ls -l
(out)total 8
(out)-rw-r--r--  1 fred  users  18  4 Nov 09:36 readme.txt
(out)drwxr-xr-x  2 fred  users  64  4 Nov 09:36 src
{{</command>}}

{{<alert alert-type="info">}}**TIP**: if you see very different output, check
that your `ls` command isn't "aliassed" to apply extra options. There may be
`alias` entries in your `~/.bashrc` file which control this. or you can force
use of the un-aliassed `ls` command by using a backslash before the command,
e.g. `\ls -l`{{</alert>}}

The long-listing option shows the permissions and groups for each item (file or
directory).

Looking at the permissions for the `src` directory, we can split the information
into 4 main sections as follows:

`d | rwx | r-x | r-x`

In the first section, `d` indicates that `src` is a **directory**, whereas the
equivalent section for `readme.txt` does not have this, because it's a
**file** not a directory.

In the next 3 sections, the symbols `r` `w` `x` `-` have the following meanings:

{{<table class="table-striped w-auto">}}
| permission  | meaning for file | meaning for directory |
|----|---------|---------|
| `r` | can read contents of file | can read contents of directory |
| `w` | can modify contents | can modify contents (e.g. create new file) |
| `x` | can execute contents | can access or traverse directory |
| `-` | no permission | no permission |
{{</table>}}

The remaining 3 sections are:

1. **user permissions** relating to the **user** who owns the file
2. **group permissions** relating to members of the **group** that owns the file
(in this case group `users`)
3. **other permissions** relating to **all other users** on the system

When you try to access a file or directory, the system will check:

1. If you are the user that owns the file. If so you are granted the set of user
permissions
2. If you are not the user that owns the file, it checks whether you belong to
the group which owns the file. If so you are granted those permissions.
3. If neither of the above apply, then the set of permissions applied is
the "other" permissions.

### Octal or numeric permissions

In addition to the `rwx-` notation, permissions can also be represented by a
sequence of digits, e.g. `644`, where the three digits correspond to user, group
and other, respectively.

Each of these is the sum of the following values which represent a permission:


- `r` read 4
- `w` write 2
- `x` execute (access or traverse, for directory) 1
- `-` (no permission) 0

This comes from octal notation where each digit represents 3 binary digits
(bits). For example the binary number `110` can be represented as `6` in octal.

For the 3 sets of permissions we then have:

```
Permission Set:    rwx   rw-   r--
                   User  Group Others

Binary Bits:        1      1      1     ← Read (r) = 4
                    1      1      0     ← Write (w) = 2
                    1      0      0     ← Execute (x) = 1
                   ────────────────
                   111    110    100

Octal Value:         7      6      4
```

If we look back at the permissions on the file `readme.txt`, these were
`-rw-r--r--`, meaning:

- 1st section: `-`: it's a file, not a directory
- 2nd section: `rw-`: the user owner has read and write permission
- 3rd section: `r--`: members of the group users have only read permission
- 4th section: `r--`: all other users have only read permission

We can represent that numerically as `644`, made up of:

- the user permission 4+2+0 (`r` + `w` + `-`) = 6
- the group permision is 4+0+0 = (`r` + `-` + `-`) = 4
- the other permission is 4+0+0 = (`r` + `-` + `-`) = 4

We can set the permissions on a file with the `chmod` command, using either
letters or numbers.

For example, to set the permissions on the file `readme.txt` so that "other"
users no longer have read permission:


{{<command user="user" host="host">}}
chmod o-r readme.txt
{{</command>}}

The `-` here means "remove", so the opposite (to restore that permission) would
be `+`

The equivalent using octal/numerical permissions would be:

{{<command user="user" host="host">}}
chmod 640 readme.txt
{{</command>}}

Whether using characters or digits, the commands have the same effect,
which can be checked with `ls -l`:

{{<command user="user" host="host">}}
ls -l readme.txt
(out)-rw-r-----  1 fred  users  18  4 Nov 09:36 readme.txt
{{</command>}}

Similarly, to add the execute permission for a script that needs to be run:

{{<command user="user" host="host">}}
chmod u+x myscript.sh
{{</command>}}

or
{{<command user="user" host="host">}}
chmod 755 myscript.sh` 
{{</command>}}

Note this would allow **any** user to run the script: use `700` for just the
user themselves, or `770` for the user and any member of the specified group.

## Sharing

By default on JASMIN, we set user home directories to be only visible to the
user themselves. The permissions on the home directory (`$HOME` or
`/home/users/<username>`) can be inspected like this, with the `-d`
option showing properties of the directory itself, rather than listing its
contents:

{{<command user="user" host="host">}}
ls -ld /home/users/fred
(out)drwx------ 10 fred users 0 Oct 27 09:35 /home/users/fred
{{</command>}}

When sharing, consider the following:

- **who** you want to share with (members of which groups?)
- **what permissions** you want to give them (read-only, or read-write)

Note that you cannot share data with another single, specific user, and you
**must not** set [unsafe permissions as defined below](#unsafe-permissions).


So far we've only really considered user `fred`, looking at data in his home
directory. User `fred` belongs to group `users` (as do all users of JASMIN).

User `fred` sensibly prefers to keep his home directory only visible to himself
(as per our default), but he is a also member of the **"Tinysat"** group
workspace (GWS): this has shared storage at `/gws/ssde/j25b/tinysat` and has its
own linux group, `gws_tinysat`.

He now creates a new file `/home/users/fred/plans.txt` but wants to share the
file with colleagues.

- he can't easily share it from his home directory, because that's set to be
only visible to him.
- the group workspace is designed for this, so is ideal for sharing something
with colleagues, but not with others.

Let's take a look at the group workspace itself first:

{{<command user="user" host="host">}}
ls -ld /gws/ssde/j25b/tinysat
(out)drwxrws--- 10 root gws_tinysat 0 Oct 27 09:35 /gws/ssde/j25b/tinysat
{{</command>}}

Notice that a few things are different:

- the top-level directory itself belongs to user `root` (the system "superuser")
- the directory has group ownership (is owned by) group `gws_tinysat`
- the group permissions are set to `rws`, which means:
  - allow read and write by members of group `gws_tinysat`
  - make sure any new child directory is also owned by group `gws_tinysat` (the
  `s` in `rws` has special meaning here)

Fred has a directory within the GWS which he owns, as do other users:

{{<command user="user" host="host">}}
ls -l /gws/ssde/j25b/tinysat
(out)drwxrws--- 10 barney gws_tinysat 0 Oct 26 10:35 barney
(out)drwxrws--- 10 fred gws_tinysat 0 Oct 27 08:10 fred
(out)drwxrws--- 10 wilma gws_tinysat 0 Oct 28 09:47 wilma
{{</command>}}

Fred has a new file `ideas.txt` which he created
in his home directory, but now wants to share it with
`wilma`, `barney`, and others in the GWS, so that they can all add ideas to the
file.

Currently the file is only editable by `fred`, but **because it came from his
home directory** it, by default it is owned by group `users`:

{{<command user="user" host="host">}}
ls -l ~/ideas.txt
(out)-rw-------  1 fred  users  18  4 Nov 10:36 ideas.txt
{{</command>}}

He moves it to his own folder in the GWS, and lists the contents:

{{<command user="user" host="host">}}
mv ~/ideas.txt /gws/ssde/j25b/tinysat/fred/
ls -l /gws/ssde/j25b/tinysat/fred
(out)-rw-------  1 fred  users  18  4 Nov 10:36 ideas.txt
(out)-rw-rw---- 10 fred gws_tinysat 0 Nov 4 10:35 timescale.txt
{{</command>}}

Users `wilma` can't yet access the file `ideas.txt` because it only has user
permissions set AND belongs to the wrong group.

The other file, `timescale.txt` has the correct ownership and permissions for
what we want, because:

- it belongs to group `gws_tinysat` rather than `users`
- it has group permissions `rw-` rathen than `---`

First, Fred needs to change the **group ownership** of file `ideas.txt` to
`gws_tinysat`. This ensures that any group permissions apply to the correct
group. He can use the `chgrp` command:

{{<command user="user" host="host">}}
chgrp gws_tinysat ideas.txt
{{</command>}}

Next, he needs to set the group **permissions** so that it's writable, using the
`chmod` command:

{{<command user="user" host="host">}}
chmod g+rw ideas.txt
{{</command>}}

**Leaving the group ownership as it was, but setting the same group permissions,
would have meant that anyone in group `users` could edit (or delete) the file,
which isn't what Fred wanted.**

From before, we know that the `fred` directory is already group-readable and
-writeable by members of group `gws_tinysat`, so now he has the permissions and
ownership that he wants, and `wilma` can edit the file:

{{<command user="user" host="host">}}
mv ~/ideas.txt /gws/ssde/j25b/tinysat/fred/
ls -l /gws/ssde/j25b/tinysat/fred
(out)-rw-rw----  1 fred  users  18  4 Nov 10:36 ideas.txt
(out)-rw-rw---- 10 fred gws_tinysat 0 Nov 4 10:35 timescale.txt
{{</command>}}

The same would apply if Fred were to move data from a scratch area (where,
just like in his home directory, files are created with group `users`):
he would need to remember to **change the group ownership of any files moved
into the GWS to belong to the correct group** (`gws_tinysat`),
otherwise any group-level permissions would apply to the wrong group.

## Unsafe permissions

{{<alert alert-type="danger">}}Do not set open permissions on files or
directories. By "open" we mean where data are writable by the "other"
group, for example:

`-rw-rw-rw-` **<< DON'T DO THIS!!**<br>
`drwxrwxrwx` **<< OR THIS!!**

This would mean that any user with access to the same file system could
modify or delete your data: this is a security risk.

We provide a UNIX a group corresponding to each group workspace, which all
members of that GWS belong to: this enables sharing within the group if you set
permissions appropriately using the advice in this guide. If you are unsure
about setting permissions, please ask the helpdesk.

**Where we (JASMIN administrators) encounter unsafe permissions on JASMIN,
we may take action to revert permissions to a safe state.**
{{</alert>}}
