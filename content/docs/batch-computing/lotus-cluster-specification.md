---
aliases: /article/4932-lotus-cluster-specification
description: LOTUS cluster specification
slug: lotus-cluster-specification
tags:
- intel
- amd
title: LOTUS cluster specification
---

{{<alert type="danger">}}
Not yet reviewed for compatibility with the new cluster, April 2025.
Please adapt using [new submission instructions](how-to-submit-a-job-to-slurm). This alert will be removed once updated.
{{</alert>}}

## Current cluster specification

LOTUS is a cluster of over 300 nodes/hosts and 19000 CPU cores. A node/host is
an individual computer in the cluster with more than 1 processor. Each
node/host belongs to a specific host group. The number of processors (CPUs or
cores) per host is listed in Table 1 with the corresponding processor model
and the size of the physical memory RAM available per node/host.

**Table 1**. LOTUS cluster specification

**Current** host groups

Host group name |  Number of nodes/hosts  |  Processor model |  CPUs per host |  RAM 
---|---|---|---|---  
broadwell256G  |  37  |  Intel Xeon E5-2640-v4 "Broadwell"  |  20  |  256 GB  
skylake348G  |  151  |  Intel Xeon Gold-5118 "Skylake"  |  24  |  348 GB  
epyctwo1024G  | 200  |  AMD  |  48  |  1024 GB | 
{.table .table-striped}

## Selection of specific processor model

To select a node/host with a specific processor model and memory, add the
following Slurm directive to your job script 

```bash
#SBATCH --constraint="<host-group-name>"
```

For example 

```bash
#SBATCH --constraint="skylake348G"
```

{{< alert type="info" >}}
Further notes

`intel` and `amd` node types are defined in the Slurm configuration as a feature:
- For any Intel node type use `#SBATCH --constraint="intel"`
- For a specific Intel CPU model use the host group name (see Table 1)
  - e.g. `#SBATCH --constraint="skylake348G"`
- For AMD use ` #SBATCH --constraint="amd"`
- There are 10 nodes of node type `skylake348G` with SSD disk mounted on /tmp 
- LOTUS nodes of node type `epyctwo1024` are not available yet on the `par-multi` queue
{{< /alert >}}

{{< alert type="danger" >}}
If you choose to compile code for specific architectures, do not expect it to run elsewhere in the system.
{{< /alert >}}

## Retired host groups no longer in use

(For reference only)

Host group name |  Number of nodes/hosts |  Processor model |  CPUs per host |  RAM  
---|---|---|---|---  
~~haswell256G~~ |  ~~7~~ retired |  ~~Intel Xeon E5-2650-v3 "Haswell"~~  |  ~~20~~  | ~~256 GB~~
~~ivybridge2000G~~  |  ~~3~~  -retired |  ~~Intel Xeon E7-4860-v2 "Ivy Bridge"~~  |  ~~48~~  | ~~2048 GB~~
{.table .table-striped}

