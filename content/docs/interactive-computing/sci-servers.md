---
aliases: /article/121-sci-servers
description: Scientific analysis servers
tags:
- sci
- arbiter
title: Scientific analysis servers
weight: 60
---

## Intro

The scientific analysis (sci) servers are provided for general purpose use by all users with the `jasmin-login` access role.
The sci servers are not directly accessible outside the firewall of the STFC network (JASMIN's host organisation) so most* users will need to access them via a [login server]({{% ref "login-servers" %}}).

Users inside the STFC network (e.g. STFC staff on site, or remotely using the STFC VPN) should be able to access them directly.

## Available sci servers

The following sci servers are available:

Server name  |  Virtual/Physical |  Processor model  |  CPU Cores  |  RAM (GB)  | /tmp max per user | /tmp size | slurm cluster
---|---|---|---|---|---|---|---
`sci-vm-01` | virtual | Intel(R) Xeon(R) Gold 6348 CPU @ 2.60GHz | 8 | 32 GB | 512 MB | 80 GB virtual disk | new
`sci-vm-02` | virtual | Intel(R) Xeon(R) Gold 6348 CPU @ 2.60GHz | 8 | 32 GB | 512 MB | 80 GB virtual disk | new
`sci-vm-03` | virtual | Intel(R) Xeon(R) Gold 6348 CPU @ 2.60GHz | 8 | 32 GB | 512 MB | 80 GB virtual disk | new
`sci-vm-04` | virtual | Intel(R) Xeon(R) Gold 6348 CPU @ 2.60GHz | 8 | 32 GB | 512 MB | 80 GB virtual disk | new
`sci-vm-05` | virtual | Intel(R) Xeon(R) Gold 6348 CPU @ 2.60GHz | 8 | 32 GB | 512 MB | 80 GB virtual disk | new
`sci-ph-01` | physical | AMD EPYC 74F3 | 48 | 2 TB | 20 GB | 2 x 446 GB SATA SSD | new
`sci-ph-02` | physical | AMD EPYC 74F3 | 48 | 2 TB | 20 GB | 2 x 446 GB SATA SSD | new
`sci-ph-03` | physical | AMD EPYC 9654 | 48 | 1.5 TB | 20 GB | 480 GB SATA SSD + 800 GB NvMe SSD | new
{.table .table-striped}

### Notes

#### 1\. Access

Sci servers are not exposed outside the STFC network, so from external locations you need to access
them via a login server.

For users within the STFC network, there is no longer any reverse DNS restriction, so all
should be accessible directly within that network without need to go via a login node.

See [connecting to a sci server via a login server]({{% ref "login-servers#connecting-to-a-sci-server-via-a-login-server" %}})
for some alternative methods of connecting.

#### 2\. Physical servers

Physical servers are actually re-configured nodes within the LOTUS cluster and as such have different a network
configuration from the virtual `sci` servers, with limited outward connectivity.

Outbound internet access (via NAT) is only
for HTTP(S), so **outbound SSH will not work (to hosts outside of
JASMIN) on these machines**. This also applies to SSH-based transfer methods (scp, ftp, rsync) which anyway should be done instead on a [transfer server]({{%ref "transfer-servers"%}}). If you try to `git pull/clone` from external repositories e.g. Github using ssh, the operation will timeout with error `fatal: Could not read from remote repository`. The solution in this case is to access `git pull/clone` over **HTTPS** instead (check the repo for alternative access details).

#### 3. /tmp on VMs

The local `/tmp` of the virtual sci servers is not available (N/A) for users
as this is used by the VM itself. It also provides no performance advantage as it is not local to the server.

#### 4. Arbiter

A monitoring utility **Arbiter** is used across
all sci machines to control CPU and memory usage. This utility
records the activity on the node, automatically sets limits on the resources
available to each user. Users' processes are thus capped from
using excessive resources, and can be slowed or have memory reduced in response to repeated violations.

#### 5. Privileges

Users are **not permitted to execute commands which require
administrative privileges.** This applies to all hosts in the managed part of
JASMIN where users have SSH login access (for example `login`, `nx-login`,
`sci`, `xfer` and `hpxfer` machines). In other words, the **use of `su` or
`sudo` is not permitted**. Please be careful when typing commands,
particularly if you have multiple terminal windows open on your own computer,
that you do not accidentally attempt `sudo` on a JASMIN machine: expect some
follow-up from the JASMIN team if you do!

See also [software installed]({{% ref "#software-installed" %}}), below.

## Purpose

Scientific analysis servers are designed for interactive and ad-hoc analysis
of data in group workspaces, the CEDA archive, and users' home directories.
**For long-running and resource-intensive jobs, users are required to use
the LOTUS cluster** which offers better I/O performance, parallelism, and
fair-share scheduling.

The following guidelines should be considered when using the scientific analysis
servers:

- Check available resources before your process starts and choose a sci server that is suitable (check average load in the list displayed at the login screen on the login servers, or by using the Linux monitoring commands: `top`, or `free -h` )
- Execution/processing time should be less than 1 hour
- Serial jobs only
- High memory jobs should be executed on the physical servers which have more memory (labelled P in [above table](#available-sci-servers)).
- Monitor your process on a sci server using `top` or `ps` Linux commands
- Report if there is a user's process affecting the performance of a scientific server

## Software installed

Each sci server has the following features:

- Rocky 9 operating system with development tools.
- Software packages that make up the [JASMIN Analysis Platform]({{% ref "software-overview" %}}) are all installed - providing commonly-used open-source analysis tools. These packages include NCO, CDO, Python (with netCDF4, matplotlib, numpy etc.,) and R.
- Access to proprietary tools, e.g. IDL and Intel Fortran, through the `module` system.
- Editors: `emacs`, `vim`, `nedit`, `geany` and `nano` are installed.
- For a more richly-featured editor or Integrated Development Environment (IDE), consider using
a remote editor locally, for example {{<link href="https://code.visualstudio.com/docs/remote/ssh">}}VSCode{{</link>}} or
{{<link "https://www.jetbrains.com/pycharm/">}}PyCharm{{</link>}}: these can be installed and customised on your own machine
rather than needing central installation and management on JASMIN. Watch this space for
further advice about how to configure and use VSCode in this way.
- Ability to run graphical applications: use the
[NX graphical desktop service]({{% ref "graphical-linux-desktop-access-using-nx" %}}) for best performance.

See [[Note 4]](#5-privileges) above about privileges: you can only install software for yourself if it can be done with user-level privileges.

## Access to storage

Each sci server has:

- Access to the LOTUS `/work/scratch-pw*` and `/work/scratch-nopw2` volumes.
- Read access to the [CEDA Archive]({{% ref "ceda-archive" %}}) according to permissions on your CEDA account.
- Read/Write access to Group Workspaces according to membership.
