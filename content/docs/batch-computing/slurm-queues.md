---
aliases: /article/4881-lotus-queues
description: Slurm queues/partitions for batch job submissions to the LOTUS & ORCHID clusters
tags:
- slurm
- queue
- partition
- sinfo
- lotus
- orchid
title: Slurm queues
---

{{<alert type="danger">}}
Not yet reviewed for compatibility with the new cluster, April 2025.
Please adapt using [new submission instructions](how-to-submit-a-job-to-slurm). This alert will be removed once updated.
{{</alert>}}

## Queue names

The Slurm queues in the LOTUS cluster are:

- `debug`
- `standard`


Each queue is has attributes of run-length limits (e.g. short, long) and
resources. A full breakdown of each queue and its associated resources is
shown below in Table 1.

## Queue details

Queues represent a set of pending jobs, lined up in a defined order, and
waiting for their opportunity to use resources. The queue is specified in the
job script file using Slurm scheduler directive like this:

```bash
#SBATCH -p <partition=queue_name>`
```

where `<queue_name>` is the name of the queue/partition (Table 1. column 1)

Table 1 summarises important specifications for each queue such as run time
limits and the number of CPU core limits. If the queue is not specified, Slurm
will schedule the job to the queue `short-serial` by default.

Table 1. LOTUS/Slurm queues and their specifications

Queue name  |  Max run time  |  Default run time  |  Max CPU cores per job  |  MaxCpuPerUserLimit  |  Priority  
---|---|---|---|---|---  
`test` |  4 hrs  |  1hr  |  8  |  8  |  30  
`short-serial` |  24 hrs  |  1hr  |  1  |  2000  |  30  
`par-single` |  48 hrs  |  1hr  |  16  |  300  |  25  
`par-multi` |  48 hrs  |  1hr  |  256  |  300  |  20  
`long-serial` |  168 hrs  |  1hr  |  1  |  300  |  10  
`high-mem` |  48 hrs  |  1hr  |  1  |  75  |  30  
`short-serial-4hr`<br>(**Note 3**)  |  4 hrs  |  1hr  |  1  |  1000  |  30
{.table .table-striped}
  
**Note 1** : Resources requested by a job must be within the resource
allocation limits of the selected queue.

**Note 2:** The default value for `--time=[hh:mm:ss]` (predicted maximum wall
time) is 1 hour for the all queues. If you do not specify this option
and/or your job exceeds the default maximum run time limit then it will be
terminated by the Slurm scheduler.

**Note 3** : A user must specify the Slurm job account `--account=short4hr`
when submitting a batch job to the `short-serial-4hr` queue.

## State of queues

The Slurm command `sinfo` reports the state of queues and nodes
managed by Slurm. It has a wide variety of filtering, sorting, and formatting
options.

{{<command shell="bash">}}
sinfo   
(out)PARTITION     AVAIL  TIMELIMIT  NODES  STATE NODELIST
(out)test             up    4:00:00     48   idle host[146-193]
(out)short-serial*    up 1-00:00:00     48   idle host[146-193]
(out)long-serial      up 7-00:00:00     48   idle host[146-193]
(out)par-single       up 2-00:00:00     48   idle host[146-193]
(out)par-multi        up 2-00:00:00     48   idle host[146-193]
(out)high-mem         up 2-00:00:00     48   idle host[146-193]
(out)lotus_gpu        up 7-00:00:00     48   idle host[146-193]
(out)copy             up 7-00:00:00     48   idle host[146-193]
(out)cpom-comet       up 7-00:00:00     48   idle host[146-193]
(out)...
{{</command>}}

{{< alert type="info" >}}
Queues other than the standard queues `test` , `short-serial` ,
`long-serial`, `par-single`, `par-multi` and `high-mem` should be ignored
as they implement different job scheduling and control policies.
{{< /alert >}}

## 'sinfo' Output field description:

By default, the Slurm command 'sinfo' displays the following information:

- **PARTITION** : Partition name followed by **\*** for the default queue/partition
- **AVAIL** : State/availability of a queue/partition. Partition state: up or down.
- **TIMELIMIT** : The maximum run time limit per job in each queue/partition is shown in TIMELIMIT in days- hours:minutes  :seconds . e.g. 2-00:00:00 is two days maximum runtime limit 
- **NODES** : Count of nodes with this particular configuration e.g. 48 nodes
- **STATE** : State of the nodes. Possible states include: allocated, down, drained, and idle. For example, the state "idle" means that the node is not allocated to any jobs and is available for use.
- **NODELIST** List of node names associated with this queue/partition

The `sinfo` example below, reports more complete information about the
partition/queue short-serial

{{<command>}}
sinfo --long --partition=short-serial
(out)Tue May 12 18:04:54 2020
(out)PARTITION    AVAIL TIMELIMIT JOB_SIZE  ROOT  OVERSUBS  GROUPS NODES    STATE NODELIST
(out)short-serial* up  1-00:00:00  1-infinite  no  NO    all     48  idle host[146-193]
{{</command>}}

## How to choose a Slurm queue/partition

### Test queue

The `test` queue can be used to test new workflows and also to help new
users to familiarise themselves with the Slurm batch system. Both serial and
parallel code can be tested on the `test`queue. The maximum runtime is 4 hrs
and the maximum number of jobs per user is 8 job slots. The maximum number of
cores for a parallel job e.g. MPI, OpenMP, or multi-threads is limited to 8
cores. The `test`queue should be used when unsure of the job resource
requirements and behavior at runtime because it has a confined set of LOTUS
nodes (Intel node type) not shared with the other standard LOTUS queues.

### Serial queues

Serial and array jobs with a single CPU core should be submitted to one of the
following serial queues depending on the job duration and the memory
requirement. The default queue is `short-serial`

#### short-serial

Serial and/or array jobs with a single CPU core each and run time less than 24
hrs should be submitted to the `short-serial` queue . This queue has the
highest priority of 30. The maximum number of jobs that can be scheduled to
start running from  the `short-serial` is 2000 jobs whilst  both job's
resources are available and user' priority is high

#### long-serial

Serial or array jobs with a single CPU core and run time greater than 24 hrs
and less than 168 hrs (7 days) should be submitted to the queue `long-serial`
.  This queue has the lowest priority of 10 and hence jobs might take longer
to be scheduled to run relatively to other jobs in higher priority queues.

#### high-mem

Serial or array jobs with a single CPU core and high memory requirement (> 64
GB) should be submitted to the `high-mem` queue and the required memory must
be specified `--mem=XXX` (XXX is in MB units). The job should not exceed the
maximum run time limit of 48hrs. This queue is not configured to accept
exclusive jobs.

### Parallel queues

Jobs requiring more than one CPU core should be submitted to one of the
following parallel queues depending on the type of parallelisms such as shared
memory or distributed memory jobs.

#### par-single

Shared memory multi-threaded jobs with  a maximum  of 16 threads should be
submitted to  the `par-single` queue . Each thread should be allocated one CPU
core. Oversubscribing the number of threads to the CPU cores will cause the
job to run very slow. The number of CPU cores should be specified via the
submission command line `sbatch -n <number of CPU cores>` or  by adding the
Slurm directive `#SBATCH -n <number of CPU cores>`in the job script file. An
example is shown below:

{{<command>}}
sbatch --ntasks=4 --partition=par-single < myjobscript
{{</command>}}

Note: Jobs submitted with a number of CPU cores greater than 16 will be
terminated (killed) by the Slurm scheduler with the following statement in the
job output file:

#### par-multi

Distributed memory jobs with inter-node communication using the MPI library
should be submitted to  the `par-multi` queue . A single MPI process (rank)
should be allocated  a  single CPU core. The number of CPU cores should be
specified via the Slurm submission command  flag `sbatch -n <number of CPU
cores>` or  by adding the Slurm directive `#SBATCH -n <number of CPU cores>`
to  the job script file. An example is shown below:

{{<command>}}
sbatch --ntasks=4 --partition=par-multi < myjobscript
{{</command>}}

Note 1: The number of CPU cores gets passed from Slurm submission  flag `-n` .
Do not add  the `-np` flag  to `mpirun` command  .

Note 2: Slurm will reject a job that requires a number of CPU cores greater
than the limit of 256.
