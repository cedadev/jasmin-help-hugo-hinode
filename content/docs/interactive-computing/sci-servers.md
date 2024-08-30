---
aliases: /article/121-sci-servers
description: Scientific analysis servers
tags:
- sci
- arbiter
title: Scientific analysis servers
slug: sci-servers
weight: 60
---

## Intro

Once you have logged on to one of the [login servers]({{< ref "login-servers" >}}) you can then `ssh` to a scientific analysis (sci) server to do your work.
The sci servers are not directly accessible outside the firewall of RAL (JASMIN's host instution) so most users will need to access them via a login server.

## Available sci servers

The following sci servers are available:

Server name  |  Virtual/Physical (OperatingSystem)  |  Processor model  |  CPU Cores  |  RAM (GB)  |  /tmp (GB)  
---|---|---|---|---|---  
sci1.jasmin.ac.uk  |  V (CentOS7)  |  Xeon(R) Silver 4114 CPU @ 2.20GHz  |  8  |  32  |  N/A [[Note 2.]](#2-tmp-on-vms)
sci2.jasmin.ac.uk  |  V (CentOS7)  |  Xeon(R) E5-2630 @ 2.20GHz  |  8  |  32 |  [[Note 2.]](#2-tmp-on-vms)  
sci3.jasmin.ac.uk  |  P (CentOS7) [[Note 1.]](#1-physical-servers) |  AMD EPYC 7402  |  48  |  1000|  25  
sci4.jasmin.ac.uk  |  V (CentOS7)  |  Xeon E5-2660 @ 2.20GHz  |  8  |  32  | N/A  [[Note 2.]](#2-tmp-on-vms)
sci5.jasmin.ac.uk  |  V (CentOS7)  |  Intel(R) Xeon(R) CPU E5-2630 v4 @2.20GHz  |  8  |  32  |  N/A  [[Note 2.]](#2-tmp-on-vms)
sci6.jasmin.ac.uk  |  P (CentOS7), [[Note 1.]](#1-physical-servers) |  AMD EPYC 7402  |  48  |  1000|  25  
sci8.jasmin.ac.uk  |  P (CentOS7), [[Note 1.]](#1-physical-servers) |  Intel(R) Xeon(R) Gold 5118CPU @ 2.30GHz  |  24  |  383  |  25  
|  |  |  |  |
{.table .table-striped}

### Notes
  
#### 1. Physical servers

Hosts `sci[3,6,8].jasmin.ac.uk ` are physical servers on a private internal network, so outbound internet access (via NAT) is only
for HTTP(S), so outbound SSH **will not work (to hosts outside of
JASMIN) on these machines**. If you try to `git pull/clone` from external repositories e.g. Github, the operation will timeout with error `fatal: Could not read from remote repository`. The solution in this case is to access `git pull/clone` over **HTTPS** instead (check the repo for alternative access details).

#### 2. /tmp on VMs

The local `/tmp` of the virtual sci servers is not available (N/A) for users
as this is used by the VM itself. It also provides no performance advantage as it is not local to the server.

#### 3. Arbiter

A monitoring utility "**Arbiter**" is implemented across
all sci machines to control CPU and memory usage. This utility
records the activity on the node, automatically sets limits on the resources
available to each user. Users' processes are thus capped from
using excessive resources, and can be slowed or have memory reduced in response to repeated violations.

#### 4. Privileges

Users are **not permitted to execute commands which require
administrative privileges.** This applies to all hosts in the managed part of
JASMIN where users have SSH login access (for example `login`, `nx-login`,
`sci`, `xfer` and `hpxfer` machines). In other words, the **use of `su` or
`sudo` is not permitted**. Please be careful when typing commands,
particularly if you have multiple terminal windows open on your own computer,
that you do not accidentally attempt `sudo` on a JASMIN machine: expect some
follow-up from the JASMIN team if you do!

See also {{< link "#software-installed">}}Software installed{{</link>}}, below.

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

- CentOS7 operating system with development tools. [NB: Rocky9 from summer 2024]
- Software packages that make up the [JASMIN Analysis Platform]({{< ref "software-overview#common-software" >}}) are all installed - providing commonly-used open-source analysis tools. These packages include NCO, CDO, Python (with netCDF4, matplotlib, numpy etc.,) and R.
- Access to proprietary tools, e.g. IDL and Intel Fortran, through the `module` system.
- Ability to run graphical applications: use the [NX graphical desktop service]({{< ref "graphical-linux-desktop-access-using-nx" >}}) for best performance.

Further information on using the software provided on JASMIN [can be found here]({{< ref "software-overview" >}}).

See [[Note 4]](#4-privileges) above about privileges: you can only install software for yourself if it can be done with user-level privileges.

## Access to storage

Each sci server has:

- Access to the LOTUS `/work/scratch-pw*` and `/work/scratch-nopw2` volumes.
- Read access to the [CEDA Archive]({{< ref "ceda-archive" >}}) according to permissions on your CEDA account.
- Read/Write access to Group Workspaces according to membership.
