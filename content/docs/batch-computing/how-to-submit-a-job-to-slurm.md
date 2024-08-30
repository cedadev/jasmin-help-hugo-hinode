---
aliases: /article/4890-how-to-submit-a-job-to-slurm
description: How to submit a job to Slurm
slug: how-to-submit-a-job
title: How to submit a job
---

This article explains how to submit a batch job to the new scheduler Slurm.

## What is a batch job?

A batch job is controlled by a script written by the user who submits the job
to the batch system Slurm. The batch system then selects the resources for the
job and decides when to run the job. Note: the term "job" is used throughout
this documentation to mean a "batch job".

There are two ways of submitting a job to Slurm:

  1. Submit via a Slurm job script - create a bash script that includes directives to the Slurm scheduler
  2. Submit via command-line options - provide directives to Slurm via command-line arguments

Both options are described below.

## Which servers can you submit jobs from?

Jobs can be submitted to Slurm from the following Sci machines:

```txt
sci1.jasmin.ac.uk 
sci2.jasmin.ac.uk 
sci3.jasmin.ac.uk 
sci4.jasmin.ac.uk 
sci5.jasmin.ac.uk 
sci6.jasmin.ac.uk 
sci8.jasmin.ac.uk
```

## Method 1: Submit via a Slurm job script

The Slurm job submission command is:

{{<command user="user" host="sci1">}}
sbatch myjobscript
{{</command>}}

The job script is a Bash script of user's application and includes a list of
Slurm directives, prefixed with `#SBATCH` as shown in this example:

```bash
#!/bin/bash 
#SBATCH --partition=short-serial 
#SBATCH -o %j.out 
#SBATCH -e %j.err
#SBATCH --time=05:00

# executable 
sleep 5m
```

For job specification of resources please refer to Table 2 of the help article
{{<link "slurm-quick-reference">}}Slurm quick reference{{</link>}}.

## Method 2: Submit via command-line options

If you have an existing script, written in any language, that you wish to
submit to LOTUS then you can do so by providing Slurm directives as command-
line arguments. For example, if you have a script "my-script.py" that takes a
single argument "-f <filepath>", you can submit it using "sbatch" as follows:

```bash
sbatch -p short-serial -t 03:00 -o job01.out -e job01.err my-script.py -f myfile.txt
```

This approach allows you to submit jobs without writing additional job scripts
to wrap your existing code.

## Method 3: Submit an interactive session via salloc

Testing a job on LOTUS can be carried out in an interactive manner by
obtaining a Slurm job allocation or resources (a set of nodes) via the Slurm
command `salloc` . The code/application is executed and the allocation are
released after a specific time -default 1 hour - when the testing is finished.
There are two ways:

## Interactive execution with pseudo-shell terminal on the compute LOTUS node

The job is executed on the LOTUS compute node by invoking the Slurm command
srun after allocating resources with `salloc`. See example below.

```bash
salloc -p par-single --ntasks-per-node=2
salloc: Pending job allocation 23506
salloc: job 23506 queued and waiting for resources
salloc: job 23506 has been allocated resources
salloc: Granted job allocation 23506
```

The job allocation ID 23506 has 2 CPUs on the compute node host580 as shown
below:

```bash
squeue -u train001-o"%.18i %.9P %.11j %.8u %.2t %.10M %.6D %.6C %R"
JOBID PARTITION        NAME        USER   ST       TIME  NODES   CPUS NODELIST(REASON)
23506 par-singl    interactive   usertest  R       1:32      1      2 host580
```

To launch an interactive shell session on the compute node host580, use the
following srun command (from a sci server).

```bash
srun --pty /bin/bash
@host580 ~]$
```

##  Interactive execution with no shell

A code/application can be executed on the LOTUS compute node without a shell
session on the node itself. For example the command 'hostname' is executed
twice as there are 2 CPUs and this outputs the name of the node

```bash
srun hostname
host580.jc.rl.ac.uk
host580.jc.rl.ac.uk
```

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
MaxArraySize = 10000. If a Job array of size is greater than 10000 is
submitted, Slurm will reject the job submission with the following error
message: "Job array index too large. Job not submitted."

Taking a simple R submission script as an example:

```bash
#!/bin/bash 
#SBATCH --partition=short-serial 
#SBATCH --job-name=myRtest
#SBATCH -o %j.out 
#SBATCH -e %j.err 
#SBATCH --time=30:00

module add jasr
Rscript TestRFile.R dataset1.csv
```

If you want to run the same script `TestRFile.R ` with input file `dataset2.csv` through  to `dataset10.csv`, you could create and submit a job script for each dataset. However, by setting up an array job, you could create and submit a single job script.

The corresponding job array script to process 10 input files in a single job
submission would look something like this:

```bash
#!/bin/bash 
#SBATCH --partition=short-serial 
#SBATCH --job-name=myRarray
#SBATCH -o %A_%a.out
#SBATCH -e %A_%a.err
#SBATCH --time=30:00
#SBATCH --array=1-10
module add jasr
Rscript TestRFile.R datset${SLURM_ARRAY_TASK_ID}.csv
```

Here the important differences are :

- The array is created by Slurm directive `--array=1-10` by including elements numbered `[1-10]`to represent our 10 variations
- The error and output file have the array  index `%a` included  in the name and `%A` is the job ID.
- The environment variable `$SLURM_ARRAY_TASK_ID` in the `Rscript` command is expanded to give the job index

When the job is submitted, Slurm will create 10 tasks under the single job
ID. The job array script is submitted in the usual way:

```bash
sbatch myRarray.sbatch
```

If you use  the `squeue -u <username>` command  to list your active jobs, you
will see 10 tasks with the same Job ID. The tasks can be distinguished by  the
`[index] ` e.g. jobID_index. Note that individual tasks may be allocated to a
range of different hosts on LOTUS.
