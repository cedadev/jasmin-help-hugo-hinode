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

## Queue names

The Slurm queues in the LOTUS cluster are:

- `standard`
- `debug`

Each queue is has attributes of run-length limits (e.g. short, long) and
resources. A full breakdown of each queue and its associated resources, such as run time
limits and memory limits, is shown below in Table 1.

## Queue details

Queues represent a set of pending jobs, lined up in a defined order, and
waiting for their opportunity to use resources. The queue is specified in the
job script file using Slurm scheduler directive like this:

```bash
#SBATCH -p <partition=queue_name>
```

where `<queue_name>` is the name of the queue/partition (Table 1, column 1).

**Table 1:** LOTUS/Slurm queues and their specifications

| Queue name | Max run time | Default run time | Default memory per CPU |
|------------|--------------|------------------|------------------------|
| `standard` | 24 hrs       | 1hr              | 1GB                    |
| `debug`    | 1 hr         | 30 mins          | 1GB                    |
{.table .table-striped}

**Note 1:** Resources requested by a job must be within the resource
allocation limits of the selected queue.

**Note 2:** If your job exceeds the default maximum run time limit then it will be
terminated by the Slurm scheduler.

## State of queues

The Slurm command `sinfo` reports the state of queues and nodes
managed by Slurm. It has a wide variety of filtering, sorting, and formatting
options.

{{<command shell="bash" user="user" host="sci-ph-01">}}
sinfo
(out)PARTITION AVAIL  TIMELIMIT  NODES STATE NODELIST
(out)...
(out)standard*    up 1-00:00:00    262  idle host[1004-1276]
(out)debug*       up    1:00:00      3  idle host[1001-1003]
(out)...
{{</command>}}

{{<alert alert-type="info">}}
Queues other than the standard queues, `standard` and `debug`, should be ignored
as they implement different job scheduling and control policies.
{{</alert>}}

### `sinfo` output field description:

By default, the Slurm command `sinfo` displays the following information:

- **PARTITION**: Partition name followed by `*` for the default queue/partition.
- **AVAIL**: State/availability of a queue/partition. Partition state: up or down.
- **TIMELIMIT**: The maximum run time limit per job in each queue/partition is shown in `days-hours:minutes:seconds`, e.g. `2-00:00:00` is two days maximum runtime limit.
- **NODES**: Count of nodes with this particular configuration e.g. 48 nodes.
- **STATE**: State of the nodes. Possible states include: allocated, down, drained, and idle. For example, the state `idle` means that the node is not allocated to any jobs and is available for use.
- **NODELIST**: List of node names associated with this queue/partition.

The `sinfo` example below, reports more complete information about the
partition/queue `debug`:

{{<command user="user" host="sci-ph-01">}}
sinfo --long --partition=debug
(out)PARTITION AVAIL TIMELIMIT   JOB_SIZE ROOT OVERSUBS GROUPS  NODES STATE RESERVATION NODELIST
(out)debug        up   1:00:00 1-infinite   no       NO    all      3  idle             host[1001-1003]
{{</command>}}

## Queues and QoS

Queues/partitions are further divided up into Quality of Services (QoS),
which determine further restrictions about your job, for example, how long it can
run or how many CPU cores it can use.

Different partitions on LOTUS have different allowed QoS as shown below:

| Partition | Allowed QoS |
| --- | --- |
| `standard` | `standard`, `short`, `long`, `high` |
| `debug` | `debug` |
{.table .table-striped .w-auto}

A summary of the different QoS are below:

| QoS | Priority | Max CPUs per job | Max wall time |
| --- | --- | --- | --- |
| `standard` | 500 | 1 | 24 hours |
| `short` | 550 | 1 | 4 hours |
| `long` | 350 | 1 | 5 days |
| `high` | 450 | 96 | 2 days |
| `debug` | 500 | 8 | 1 hour |
{.table .table-striped .w-auto}

Once you've chosen the partition and QoS you need, in your job script, provide the partition in the `--partition` directive and the QoS in the `--qos` directive.

## How to choose a QoS

### Debug QoS

The `debug` QoS can be used to test new workflows and also to help new
users to familiarise themselves with the Slurm batch system. This QoS should be used when unsure of the job resource
requirements and behavior at runtime because it has a confined set of LOTUS
nodes not shared with the other standard LOTUS queues.

| QoS     | Priority | Max CPUs per job | Max wall time | Max jobs per user |
|---------|----------|------------------|---------------|-------------------|
| `debug` | 500      | 8                | 1 hour        | 32                |
{.table .table-striped .w-auto}

### Standard QoS

The `standard` QoS is the most common QoS to use, with a maximum of a single CPU per job and a runtime under 24 hours.

| QoS        | Priority | Max CPUs per job | Max wall time | Max jobs per user |
|------------|----------|------------------|---------------|-------------------|
| `standard` | 500      | 1                | 24 hours      | 4000              |
{.table .table-striped .w-auto}

### Short QoS

The `short` QoS is for shorter jobs (under 4 hours) and has a maximum of a single CPU per job.

| QoS     | Priority | Max CPUs per job | Max wall time | Max jobs per user |
|---------|----------|------------------|---------------|-------------------|
| `short` | 550      | 1                | 4 hours       | 2000              |
{.table .table-striped .w-auto}

### Long QoS

The `long` QoS is for jobs that will take longer than 24 hours but will have a lower priority than `standard`. It also has a maximum of a single CPU per job.

| QoS     | Priority | Max CPUs per job | Max wall time | Max jobs per user |
|---------|----------|------------------|---------------|-------------------|
| `long`  | 350      | 1                | 5 days        | 1350              |
{.table .table-striped .w-auto}

### High QoS

The `high` QoS is for jobs with larger resource requirements, for example CPUs per job and memory.

| QoS     | Priority | Max CPUs per job | Max wall time |
|---------|----------|------------------|---------------|
| `high`  | 450      | 96               | 2 days        |
{.table .table-striped .w-auto}

## New Slurm job accounting hierarchy

Slurm accounting by project has been introduced as a means of monitoring compute usage by projects on JASMIN. These projects align with group workspaces (GWSs), and you will automatically be added to Slurm accounts corresponding to any GWS projects that you belong to.

To find what Slurm accounts and quality of services (QoS) that you have access to, use the `useraccounts` command on any `sci` machine.
Output should be similar to one or more of the lines below.

{{<command user="user" host="sci-ph-01">}}
useraccounts
(out)# sacctmgr show user fred withassoc format=user,account,qos%-50
(out)User       Account        QOS
(out)---------- -------------- -------------------------------------
(out)      fred  mygws         debug,high,long,short,standard
(out)      fred  orchid        debug,high,long,short,standard
{{</command>}}

You should use the relevant account for your project's task with the `--account` directive in your job script.

Users who do not belong to any group workspaces will be assigned the `no-project` account and should use that in their job submissions.
Please ignore and do not use the group `shobu`.
