---
aliases: /article/4890-how-to-submit-a-job-to-slurm
description: How to submit a batch job to Slurm
slug: how-to-submit-a-job
title: How to submit a job
---

## What is a batch job?

A batch job is a task that, once submitted to the scheduler, can run without further interaction
from the user. A user writes a script containing both the
command(s) to be run and directives for the scheduler as to how the job should be run.
The batch system then selects the resources required by the job and decides when and where to run the job. Note: the term "job" is used throughout
this documentation to mean a "batch job".

There are two ways of submitting a job to Slurm:

  1. Submit via a Slurm job script - create a bash script that includes directives to the Slurm scheduler
  2. Submit via command-line options - provide directives to Slurm via command-line arguments

Both options are described below.

## Which servers can you submit jobs from?

Jobs can be submitted to Slurm from any of the [sci servers]({{% ref "sci-servers" %}}).
Check the current list of servers on that page.

## Method 1: Submit via a Slurm job script

The Slurm job submission command is:

{{<command user="user" host="sci-vm-01">}}
sbatch myjobscript
{{</command>}}

The job script is a Bash script of user's application and includes a list of
Slurm directives, prefixed with `#SBATCH` as shown in this example:

{{<alert alert-type="danger">}}
- Remove any trailing whitespace
- Choose values for `account`, `partition` and `qos` that are valid for you.
{{</alert>}}

```bash
#!/bin/bash
#SBATCH --job-name="My test job"
#SBATCH --time=00:01:00
#SBATCH --mem=1M
#SBATCH --account=mygws
#SBATCH --partition=debug
#SBATCH --qos=debug
#SBATCH -o %j.out
#SBATCH -e %j.err

# executable
sleep 5s
```

**Explanation**:

Submitting the above script (if you had access to the `mygws` account) creates a job named `My test job` with an estimated run time of
`00:01:00` (1 minute), memory requirement of `1M` (1 Megabyte), run against the account
`mygws` on the partition `debug` using QoS `debug`, and writing its STDOUT (standard output) to file 
`%j.out` and its STDERR to file `%j.err` (where `%j` represents the job ID that the scheduler assigns to the job).

The task itself is the command `sleep 5s` which just pauses for 5 seconds before exiting. This is what you would replace 
with your actual processing command(s), so you need to have an idea of how long it will take to run (**TIP**: run it manually first with `time <cmd>` to find out!)

- For details about how to pick the right partition, QoS, and account, please read about the [Slurm queues on LOTUS]({{% ref "docs/batch-computing/slurm-queues" %}}).
- For further submission parameters, see the quick reference about
[job specification]({{% ref "slurm-quick-reference#job-specification" %}}).

## Method 2: Submit via command-line options

If you have an existing script, written in any language, that you wish to
submit to LOTUS then you can do so by providing Slurm directives as command-line
arguments. For example, if you have a script `my-script.py` that takes a
single argument `-f <filepath>`, you can submit it using `sbatch` as follows:

```bash
sbatch -A mygws -p debug -q debug -t 03:00 -o job01.out -e job01.err my-script.py -f myfile.txt
```

This approach allows you to submit jobs without writing additional job scripts
to wrap your existing code.

Check the official documentation for `sbatch`, its arguments and their syntax
{{<link "https://slurm.schedmd.com/sbatch.html">}}here{{</link>}}.

## Method 3: Submit an interactive session via salloc

Testing a job on LOTUS can be carried out in an interactive manner by
obtaining a Slurm job allocation or resources (a set of nodes) via the Slurm
command `salloc`. The code/application is executed and the allocation is
released after a specific time - default 30 mins - when the testing is finished.
<!-- There are two ways: -->

### Interactive execution with pseudo-shell terminal on the compute LOTUS node

The job is executed on the LOTUS compute node by allocating resources with `salloc`.
See the example below:

{{<command user="fred" host="sci-ph-01">}}
salloc -p standard -q high -A mygws --ntasks-per-node=2
(out)salloc: Pending job allocation 23506
(out)salloc: job 23506 queued and waiting for resources
(out)salloc: job 23506 has been allocated resources
(out)salloc: Granted job allocation 23506
(out)salloc: Nodes host580 are ready for job
{{</command>}}

Official documentation for the `salloc` command is available
{{<link "https://slurm.schedmd.com/salloc.html">}}here{{</link>}}.

At this point, your shell prompt will change to the LOTUS compute node.
You will have the allocated compute that you requested at this shell.
For example the command `hostname` is executed twice as there are 2 CPUs
and each outputs the name of the node:

{{<command user="fred" host="host580">}}
srun hostname
(out)host580.jc.rl.ac.uk
(out)host580.jc.rl.ac.uk
{{</command>}}

Official documentation for the `srun` command is available
{{<link "https://slurm.schedmd.com/srun.html">}}here{{</link>}}.

The job allocation ID `23506` has 2 CPUs on the compute node `host580` and can be
checked from another terminal as shown below:

{{<command user="fred" host="sci-ph-01">}}
squeue -u fred -o"%.18i %.9P %.11j %.8u %.2t %.10M %.6D %.6C %R"
(out)JOBID PARTITION           NAME       USER  ST       TIME  NODES   CPUS NODELIST(REASON)
(out)23506 standard      interactive   fred   R       1:32      1      2 host580
{{</command>}}

{{<alert alert-type="info">}}
`squeue --me` is equivalent to `squeue -u fred`
{{</alert>}}
{{<alert alert-type="danger">}}
Please **DO NOT** use `watch` or equivalent polling utilities with Slurm
as they are wasteful of resources and cause communication issues for the scheduler.

Your process may be killed if this is detected.
{{</alert>}}

Official documentation for the `squeue` command is available
{{<link "https://slurm.schedmd.com/squeue.html">}}here{{</link>}}.

Once you're finished, type `exit` to relinquish the allocation. This will happen
automatically once the time limit on the job runs out.

<!-- Below not possible as salloc opens a shell on the host immediately -->

<!-- 

To launch an interactive shell session on the compute node `host580`, use the
following `srun` command (from a sci server).

```bash
srun --pty /bin/bash
@host580 ~]$
```

### Interactive execution with no shell

A code/application can be executed on the LOTUS compute node without a shell
session on the node itself. For example the command `hostname` is executed
twice as there are 2 CPUs and this outputs the name of the node:

{{<command user="fred" host="sci-ph-01">}}
srun hostname
(out)host580.jc.rl.ac.uk
(out)host580.jc.rl.ac.uk
{{</command>}}

-->

## Job array submission

Job arrays are groups of jobs with the same executable and resource
requirements, but different input files. Job arrays can be submitted,
controlled, and monitored as a single unit or as individual jobs or groups of
jobs. Each job submitted from a job array shares the same job ID as the job
array and is uniquely referenced using an array index. This approach is useful
for ‘high throughput' tasks, for example where you want to run your simulation
with different driving data or run the same processing task on multiple data
files.

Important note: The maximum job array size that Slurm is configured for is
`MaxArraySize = 10000`. If a Job array of size is greater than 10000 is
submitted, Slurm will reject the job submission with the following error
message: "Job array index too large. Job not submitted."

Taking a simple R submission script as an example:

```bash
#!/bin/bash 
#SBATCH --job-name=myRtest
#SBATCH --time=30:00
#SBATCH --account=mygws  
#SBATCH --partition=debug
#SBATCH --qos=debug      
#SBATCH -o %j.out 
#SBATCH -e %j.err 

module add jasr
Rscript TestRFile.R dataset1.csv
```

If you want to run the same script `TestRFile.R ` with input file `dataset2.csv` through  to `dataset10.csv`, you could create and submit a job script for each dataset. However, by setting up an array job, you could create and submit a single job script.

The corresponding job array script to process 10 input files in a single job
submission would look something like this:

```bash
#!/bin/bash 
#SBATCH --job-name=myRarray
#SBATCH --time=30:00
#SBATCH --account=mygws  
#SBATCH --partition=debug
#SBATCH --qos=debug
#SBATCH -o %A_%a.out
#SBATCH -e %A_%a.err
#SBATCH --array=1-10

module add jasr
Rscript TestRFile.R datset${SLURM_ARRAY_TASK_ID}.csv
```

Here the important differences are :

- The array is created by Slurm directive `--array=1-10` by including elements numbered `[1-10]` to represent our 10 variations
- The error and output file have the array index `%a` included in the name and `%A` is the job ID.
- The environment variable `$SLURM_ARRAY_TASK_ID` in the `Rscript` command is expanded to give the job index

When the job is submitted, Slurm will create 10 tasks under the single job
ID. The job array script is submitted in the usual way:

{{<command user="fred" host="sci-ph-01">}}
sbatch myRarray.sbatch
{{</command>}}

If you use  the `squeue -u <username>` command  to list your active jobs, you
will see 10 tasks with the same Job ID. The tasks can be distinguished by  the
`[index]` e.g. jobID_index. Note that individual tasks may be allocated to a
range of different hosts on LOTUS.

## Troubleshooting

If you have only recently requested access to [JASMIN login
services]({{% ref "get-login-account" %}}) and had this approved, there can
sometimes be a delay (typically up to a day, but in rare cases can be longer)
before the necessary configuration is created for you on LOTUS. You will not
be able to submit jobs to LOTUS until this has been completed.
Typically, you would see an error message such as this, after an
unsuccessful attempt to submit a job:

```bash
sbatch: error: Batch job submission failed: Invalid account or account/partition combination specified
```

If this occurs, please try again in 24 hours before contacting the JASMIN helpdesk.
