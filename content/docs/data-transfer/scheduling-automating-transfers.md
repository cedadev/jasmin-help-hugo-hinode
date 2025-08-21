---
aliases: /article/3822-scheduling-automating-transfers
description: Scheduling/Automating Transfers
slug: scheduling-automating-transfers
title: Scheduling/Automating Transfers
---

This article explains how to schedule or automate data transfers. It covers:

- Using Globus for transfer automation
- Scheduling download tasks using cron and LOTUS

## Overview

In many cases it can be useful to fetch data from an external source for
processing/analysis on JASMIN on a regular basis, for example "every Monday at
11:00 fetch all last week's data". It can also be helpful to distribute the
task downloading of some large datasets, or simply to be able rely on data
being pulled in from some external source to an accumulating dataset used for
periodic analysis.

## Using Globus for transfer automation

It is easy to automate transfers using [Globus]({{% ref "globus-transfers-with-jasmin" %}}). This method has the advantage that you
do not need to remain connected or logged in to any JASMIN server for the automated transfers
to take place on your behalf, and the transfer itself can be more efficient than other methods described below.

Some introductory information about how to do this is available in this article
[Using the Globus command-line interface]({{% ref "globus-command-line-interface/#automation" %}})
(with more to follow)
but please also refer to the comprehensive Globus documentation and their
{{< link "https://github.com/globus/automation-examples" >}}automation examples{{</link>}}. You can choose whether
to schedule/automate tasks via the {{<link "https://www.globus.org/blog/scheduled-and-recurring-transfers-now-available-globus-web-app">}}Globus web interface{{</link>}}, {{<link "https://docs.globus.org/cli/reference/">}}command-line interface{{</link>}}, or use their {{<link "https://globus-sdk-python.readthedocs.io/en/stable/examples/index.html" >}}Globus Python SDK{{</link>}} to build Python code that uses this functionality.

## Scheduling download tasks using cron and LOTUS

While the [cron server]({{% ref "using-cron" %}}) `cron-01.jasmin.ac.uk` is provided for scheduling
general tasks, **it should not be used for the work of executing those tasks itself, and not for transfer tasks.**

### xfer-vm-03 - transfer machine with cron

The transfer server `xfer-vm-03.jasmin.ac.uk` is also provided with `cron`, and should be used where
a task is primarily a transfer rather than a processing task and needs the functionality
of a transfer server.
Please refer to the above `cron` guidance for best practice advice.

In particular, you **must** use [crontamer]({{% ref "using-cron/#crontamer" %}}) to manage your cron jobs.

### Invoking LOTUS from cron to carry out multiple download tasks

Sometimes we need a task to be invoked from `cron` but executed where there
are lots of nodes to parallelise the tasks (i.e. the LOTUS cluster). In this case, we DO need to use the `cron`
server rather than the cron-equipped transfer server `xfer-vm-03`, since we need to be able to submit jobs to LOTUS 
(the transfer server can't do that).

This will only work where the download can happen over HTTP(S), so depends on how the remote data is made available.

We need it to:

- invoke a job submission script at regular intervals
- have that script initiate downloads using LOTUS nodes

In the examples below, we use the `test` queue (or partition, as queues are
known in Slurm). You can use this for testing, but once you know roughly how
long your download(s) should take, you should
[choose an appropriate queue]({{% ref "docs/batch-computing/slurm-queues" %}}) so that the jobs can be scheduled in a fair
way alongside other users' jobs.

### 1\. Single download script

The simple script below is used to download a single file from an external
source via HTTP using `wget`. It initially uses the `test` partition (queue), but
once you have tested it, you should use a more appropriate queue.

```bash
#!/bin/bash 
#SBATCH --partition=test
#SBATCH -o %j.out 
#SBATCH -e %j.err
#SBATCH --time=00:30

# executable 
wget -q -O 1MB_${SLURM_JOBID}.zip http://speedtest.tele2.net/1MB.zip
```  

In this example, the file is labelled with the id of the job which downloaded
it, e.g. `1MB_61117380.zip`

The same could be also achieved using `curl`, or using a Python script making
use of (for example) the `requests` library.

**A note about transfer tools:** since we are delegating the actual download
task to a LOTUS node, we are restricted to transfer tools already installed on
those nodes or available in the user's path at a location cross-mounted with
nodes in the LOTUS cluster (see Table 1 in [Access to Storage]({{% ref "storage" %}})), such as $HOME or a group workspace. It is not possible for
the JASMIN team to install specialist data transfer tools across the whole
cluster, so you may be limited to downloading via HTTP(S), FTP, or via tools
available via libraries in the Python environment such (which you do have
access to and can easily customise to install additional libraries using
virtual environments).

Due to networking limitations, LOTUS nodes cannot perform downloads using SSH-based methods, i.e. scp/rsync/sftp.

Download tools installed on LOTUS nodes include:

- `wget`
- `curl`
- `ftp` (but not `lftp`)

In our simple example above, we can subit this script to LOTUS from the
command line with

{{<command>}}
sbatch test_download.sh
{{</command>}}

This could be invoked on a regular basis by adding a crontab entry like this

```bash
30 * * * * sbatch /home/users/username/test_download.sh
```

However it would be safer to wrap this in a `crontamer` command like this to
ensure one instance of the task had finished before the next started: (see
[Using cron]({{% ref "using-cron" %}}) for details)

```bash
30 * * * * crontamer -t 2h 'sbatch /home/users/username/test_download.sh'
```

### 2\. Multi-node downloads

We could expand this example to download multiple items, perhaps 1 directory
of data for each day of a month, and have 1 element of a job array handle the
downloading of each day's data.

**A few words of warning:** Distributing download tasks as shown below can
cause unintended side-effects. Here, we're submitting an array of 10 download
jobs, each initiating a request for a 1MB file which may well happen
simultaneously. So we need to be confident that the systems and networks at
either end can cope with that. It would be all too easy to submit a task to
download several thousand large data files and cause problems for other users
of JASMIN (and other users on its host institution's network), or indeed at
the other end. Taken to the extreme, this could appear over the network as a
Distributed Denial-of-Service (DDoS) attack. As with all LOTUS tasks: start
small, test, and increase to sensible scales when you are confident it will
not cause a problem. **A limit of 10 jobs would be a sensible maximum, for one
user.**

We'll simulate this here by downloading the same external file to 10 different
output files, but you could adapt this concept for your own purposes depending
on the layout of the source and destination data.

```bash
#!/bin/bash 
#SBATCH --partition=test
#SBATCH -o %A_%a.out
#SBATCH -e %A_%a.err
#SBATCH --time=00:30
#SBATCH --array=1-10
#SBATCH --time=00:30

# executable 
wget -q -O 1MB_${SLURM_ARRAY_TASK_ID}.zip http://speedtest.tele2.net/1MB.zip

echo "script completed"
```

In this (perhaps contrived) example, we're setting up an array of 10 elements
and using the `SLURM_ARRAY_TASK_ID` environment variable to name the output
files (otherwise they'd all be the same). In a real-world example you could
apply your own logic to divide up files or directories matching certain
patterns to become elements of a job array.

The script could then be scheduled to be invoked at regular intervals as shown
in (1).

Some tools provide functionality for mirroring or synchronising directories,
i.e. only downloading those files in a directory which are new have been added
since the last time a task was run. These can be useful to avoid repeated
downloads of the same data.
