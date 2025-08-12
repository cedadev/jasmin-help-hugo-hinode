---
aliases: 
    - /article/4891-lsf-to-slurm-quick-reference
    - /docs/batch-computing/lsf-to-slurm-quick-reference/
description: Slurm commands and environment variables
slug: slurm-quick-reference
tags:
- lotus
- orchid
- slurm
title: Slurm quick reference
---

## Slurm Scheduler

{{< link "https://slurm.schedmd.com/" >}}Slurm{{</link>}} is the job scheduler deployed on JASMIN. It
allows users to submit, monitor, and control jobs on the [LOTUS]({{% ref "lotus-overview" %}}) (CPU)
and [ORCHID]({{% ref "orchid-gpu-cluster" %}}) (GPU) clusters.

## Essential Slurm commands

| **Slurm command**                   | **Description**                         |
| ----------------------------------- | --------------------------------------- |
| `sbatch my_batch_script.sh`         | Submit a job script to the scheduler    |
| `sinfo`                             | Show available scheduling queues        |
| `squeue --me`                       | List my pending and running jobs        |
| `salloc -p debug -q debug -A mygws` | Request an interactive session on LOTUS |
{.table .table-striped}
  
## Job specification

Long and short argument names are separated by a comma.

##### `#SBATCH`

- Scheduler directive - goes in front of the arguments below in a job script file
- An example Slurm job script file is available [here]({{% ref "how-to-submit-a-job-to-slurm/#method-1-submit-via-a-slurm-job-script" %}})

##### `--account=GWS_NAME, -A GWS_NAME`

- Specify which project's account to log the compute with by replacing `GWS_NAME`
- To choose the right one, please read about the [new Slurm job accounting by project]({{% ref "slurm-queues/#new-slurm-job-accounting-hierarchy" %}})

##### `--partition=PARTITION_NAME, -p PARTITION_NAME`

- Specify the scheduling partition by replacing `PARTITION_NAME`
- See the [Slurm queues page]({{% ref "slurm-queues" %}}) for the list of partitions that you can use

##### `--qos=QOS_NAME, -q QOS_NAME`

- Specify what Quality of Service your task needs by replacing `QOS_NAME`
- See the [list of QoS]({{% ref "slurm-queues/#queues-and-qos" %}}) that you can use

##### `--time=hh:mm:ss, -t hh:mm:ss`

- Set the maximum runtime limit by replacing `hh:mm:ss`

##### `--time-min=hh:mm:ss`

- Set an estimated runtime by replacing `hh:mm:ss`

##### `--job-name=JOB_NAME`

- Specify a name for the job by replacing `JOB_NAME`

##### `--output=FILE_NAME, -o FILE_NAME`

- Standard job output - where your program prints to normally (`stdout`)
- Defaults: appends to the file and file name is `slurm-%j.out`, where `%j` is replaced by the job ID

##### `--error=FILE_NAME, -e FILE_NAME`

- Standard error output - where your program prints to if an error occurs (`stderr`)
- Defaults: appends to the file and file name is `slurm-%j.err`, where `%j` is replaced by the job ID

##### `--open-mode=append|truncate`

- Write mode for error/output files
- Pick either `append` or `truncate`

##### `--mem=XXX`

- Specify that `XXX` memory is required for the job. **Default** units are megabytes (e.g. `--mem=250` means 250MB) but you can 
specify the unit, e.g. `--mem=5G` for 5 GB.

##### `--array=INDEX`

- Specify a job array, e.g. `--array=1-10` - for an example submission script, see [this page]({{% ref "how-to-submit-a-job-to-slurm/#job-array-submission" %}})
- The default standard output file name is `slurm-%A_%a.out`, where `%A` is replaced by the job ID and `%a` with the array index
- To change this, use `--output` and `--error` as above with `%A` and `%a` instead of `%j`

##### `--array=INDEX%ArrayTaskThrottle`

- A maximum number of simultaneously running tasks from the job array may be specified using a `%` separator
- For example, `--array=1-15%4` will limit the number of simultaneously running tasks from this job array to 4

##### `--chdir=DIRECTORY, -D DIRECTORY`

- Set the working directory of the batch script to `DIRECTORY` before it is executed

##### `--exclusive`

- Exclusive execution mode

##### `--dependency=<dependency_list>`

- Defer the start of this job until the specified dependencies have been satisfied as completed
- See the {{< link "https://slurm.schedmd.com/sbatch.html#OPT_dependency" >}}Slurm documentation{{</link>}} for examples

##### `--ntasks=NUMBER_OF_CORES, -n NUMBER_OF_CORES`

- Number of CPU cores

##### `--constraint=HOST_GROUP_NAME`

- To select a node with a specific processor model
- A list of host groups that you can use are available [here]({{% ref "lotus-cluster-specification" %}})

## Job control commands

| **Slurm command**             | **Description**               |
| ----------------------------- | ----------------------------- |
| `scancel <jobid>`             | Kill a job                    |
| `scontrol show job <jobid>`   | Show details job information  |
| `scontrol update job <jobid>` | Modify a pending job          |
| `scancel --me`                | Kill all jobs owned by a user |
{.table .table-striped}
  
## Job environment variables

| **Slurm variable**      | **Description**                      |
| ----------------------- | ------------------------------------ |
| `$SLURM_JOBID`          | Job identifier number                |
| `$SLURM_ARRAY_JOB_ID`   | Job array                            |
| `$SLURM_ARRAY_TASK_ID`  | Job array index                      |
| `$SLURM_ARRAY_TASK_MAX` | Last index number within a job array |
| `$SLURM_NTASKS`         | Number of processors allocated       |
{.table .table-striped}
