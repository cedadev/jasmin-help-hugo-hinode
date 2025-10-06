---
aliases: /article/4932-lotus-cluster-specification
description: Details of the current LOTUS cluster
slug: lotus-cluster-specification
tags:
- intel
- amd
title: LOTUS cluster specification
---

## Current cluster specification

LOTUS is a cluster of over 260 nodes/hosts and over 53,000 CPU cores. A node/host is
an individual computer in the cluster with more than 1 processor. Each
node/host belongs to a specific host group. The exact number of cores available varies
as occasionally nodes/hosts are taken
out of the cluster for special purposes. The number of processors (CPUs or
cores) per host is listed in Table 1 with the corresponding processor model
and the size of the physical memory RAM available per node/host.

**Table 1**. LOTUS cluster specification

**Current** host groups

Host group name |  Number of nodes/hosts  |  Processor model |  CPUs per host |  RAM 
---|---|---|---|---  
`AMD_EPYC_9654_1.5TB`  |  265  |  AMD EPYC 9654  |  192  |  1536 GB  
{.table .table-striped}
