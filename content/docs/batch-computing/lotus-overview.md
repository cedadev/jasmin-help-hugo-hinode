---
aliases: /article/5004-lotus-overview
description: LOTUS overview
title: LOTUS overview
weight: 10
---

This article gives an overview of the LOTUS batch computing cluster which is
part of JASMIN. It covers:

- What LOTUS is and what it can be used for
- Where LOTUS can be accessed from

## What is LOTUS

LOTUS is not, in itself, a High-Performance Computing (HPC) facility, but
provides the batch and parallel processing component of the JASMIN data-
intensive scientific analysis environment. LOTUS is a cluster of physical
machines, running the [SLURM workload manager]({{< ref "slurm-scheduler-overview" >}}), enabling efficient scheduling of larger data analysis tasks
across nodes in the cluster as a single unit -see Figure 1. Each node in the
cluster is connected by 10Gbit/s Ethernet to JASMIN's high-performance
40Gbit/s core network. Although not its primary function, LOTUS also
facilitates MPI-based parallel processing.

JASMIN provides both interactive and batch computing environments,
recognising  that scientists often need to develop and test workflows
interactively before running those workflows efficiently at scale. Nodes
within LOTUS run the same stack of software and can access the same high-
performance storage as the JASMIN Scientific Analysis servers, ensuring a
consistent working environment for all phases of users' workflows.

See [LOTUS Hardware]({{< ref "lotus-cluster-specification" >}}) for details of
the current LOTUS environment summarised in this schematic presentation

**Figure 1** shows a schematic presentation of the LOTUS cluster and its
environment

{{< image src="img/docs/lotus-overview/file-QPxolXD1Tu.png" caption="LOTUS schematic" >}}

## When to use LOTUS

LOTUS is ideally suited to workflows which need to process or compare entire
datasets, stored either in Group Workspaces or in the CEDA archives. The
latter are directly accessible read-only so can be processed in-place without
the need to copy files. Intermediate working files (within batch jobs) should
be stored temporarily in `/work/scratch-pw* ` and ` /work/scratch-nopw*`
volumes which are shared across the cluster, while persistent outputs can be
written efficiently to Group Workspaces and shared with collaborators for the
duration of a project.

See [Access to Storage]({{< ref path="/docs/getting-started/storage" >}}) for details about which file
systems are appropriate to use and how to access them.

LOTUS currently has around 13000 cores, but is heavily used and implements a
fair-share scheduling system between users. It is not intended as a substitute
for dedicated HPC facilities, rather as a complementary environment in which
model outputs can be analyzed and compared with observational data. Users with
large-scale compute-heavy requirements (in particular those requiring large-
scale parallel processing) should look to access other parts of the national
HPC infrastructure such as [ARCHER](http://www.archer.ac.uk/) or
[MONSooN](http://collab.metoffice.gov.uk/twiki/bin/view/Support/MONSooN).

In order to maintain a safe and reliable working environment for all within
LOTUS and more widely within JASMIN, users are expected to follow [the best
practice outlined in this documentation]({{< ref "tips-for-new-users" >}}).

## How to gain access to LOTUS

LOTUS is accessible via the batch scheduler system SLURM that is running
across all JASMIN scientific analysis servers `sci[1-8].jasmin.ac.uk`.

From the above servers, it is possible to submit, monitor, and control batch
jobs using the SLURM commands.

Please note that if you have only recently requested access to [JASMIN login
services]({{< ref "get-login-account" >}}) and had this approved, there can
sometimes be a delay (typically up to a day, but in rare cases can be longer)
before the necessary configuration is created for you on LOTUS. You will not
be able to submit jobs to LOTUS queues until this has been completed.
Typically you would see an error message such as this, in this case after an
unsuccessful attempt to submit to the `short-serial` queue:

```bash
sbatch: error: Batch job submission failed: Invalid account or account/partition combination specified
```

If this occurs, please try again in 24 hours before contacting the JASMIN help
desk.
