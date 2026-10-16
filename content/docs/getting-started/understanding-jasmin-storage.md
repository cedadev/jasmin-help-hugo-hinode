---
aliases:
- /article/4700-understanding-new-jasmin-storage
- /docs/getting-started/understanding-new-jasmin-storage
description: Understanding JASMIN storage
slug: understanding-jasmin-storage
tags:
- automount
- ssd
- ssde
- pfs
- hpos
- s3
- scratch
title: Understanding JASMIN storage
weight: 160
---

## Introduction

JASMIN continues to grow as a unique collaborative analysis environment for an
expanding community of scientists. We continue to face big challenges with
the ever-growing demand for storage space and the increasing diversity of
scientific workflows.

## Storage types

We currently use a number of types of storage on JASMIN.
Some have attributes that make them particularly suitable for certain kind of
tasks.

The four current types are:

### Solid state disk (SSD)

Particularly suitable for small files. This is what is used for your `/home/users` directories, so it is good for things you really don’t want to lose, because this area is backed up. The same type of storage is also used for the scratch area `/work/scratch-nopw*`, although this is NOT for persistent storage and is NOT backed up. SSD is great for compiling and storing large numbers of small files, for example with python or conda environments, but is the most expensive storage, so we don’t have a lot of it. Low energy, cooling and machine room space requirement.

### Solid state economy disk (SSDE)

Suitable for general purpose storage: this is now used as the main storage for Group Workspaces and the CEDA Archive. It handles small files very well, but has the same limitations as SSD when it comes to parallel write - in most cases it's OK, including MPI, but writes with parallel netCDF routines sometimes have issues. It performs functionally the same as SSD, but is optimised for bulk storage and efficiency. Compared to our previous bulk-storage system, our current system has significant savings in energy consumption along with requirements for cooling and machine room space.

### Parallel File System disk (PFS)

This is great for jobs that read and write the same file from many different processes. It’s not so great for lots of small files. We have less of this than SSDE, so it's used for specific purposes where its attributes are needed, like scratch, XFC and particular group workspaces that have a need for doing parallel netCDF writes. Dominated by hard disks however, its energy consumption and machine room footprint are high.

### High Performance Object Storage (HPOS or S3)

This is similar in interface terms to S3 storage offered by cloud providers, but is operated with on-premise hardware. The lack of file POSIX system, using a bucket/object structure instead, makes it ideal for managing capacity at large scale and low cost. It is ideal for working with cloud-native applications, available from anywhere inside or outside of JASMIN, and particularly suitable for where put/get operations dominate, or where a large collection of content assets need to be accessible via HTTP. So it can require some adaptation to workflows in order to be able to make use of it effectively, though tooling and community interfaces/libraries are making its use much more widespread now.

#### What type of storage am I using?

Path  |  Type |
---|---| 
`/home/users/*`  |  SSD |
`/gws/pw/j*/*`  |  PFS  |
`/gws/smf/j*/*`  |  SSD  |
`/gws/ssde/j*/*` | SSDE |
`/work/scratch-pw*` |  PFS  |
`/work/scratch-nopw*`  |  SSD  |
`/work/xfc/*`  |  PFS  |
{.table .table-striped}
  
**Automounted storage:** SSD and SSDE storage volumes on JASMIN (so all except PFS) are automounted.
This means that a particular volume is not mounted by a
particular host until the moment it is first accessed. If the volume you
are expecting to see is not listed at the top level (e.g. /gws/ssde/j25b/) you
should use the full path of the volume to access it, and after a very short delay, the
volume should appear.

See also [here]({{% ref "storage" %}}) to see where these are mounted
throughout JASMIN.

## FAQs, issues and solutions

Please read our collection of FAQs and known issues (and solutions!) which
we've put together [HERE]({{% ref "faqs-storage" %}}).
