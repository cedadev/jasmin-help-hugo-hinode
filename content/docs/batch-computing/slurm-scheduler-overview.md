---
aliases: /article/4880-batch-scheduler-slurm-overview
description: 'Overview of the LOTUS batch scheduler, Slurm'
title: Slurm scheduler overview
weight: 20
---

## What is a Job Scheduler?

A job or batch scheduler, is a tool that manages how user jobs
are queued and run on a set of compute resources. In the case of LOTUS the
compute resources are the set of compute nodes that make up the [LOTUS hardware]({{% ref "lotus-cluster-specification" %}}). Each user can submit
jobs to the scheduler which then decides which jobs to run and where to
execute them. The scheduler manages the jobs to ensure that the compute
resources are being used efficiently and that users get appropriate access to
those resources.

## The Slurm Scheduler

{{< link "https://slurm.schedmd.com" >}}Slurm{{</link>}} is the job
scheduler deployed on JASMIN. It allows users to submit, monitor, and control
jobs on the LOTUS cluster.

## General principles for working with Slurm

Before learning how to use Slurm, it is worthwhile becoming familiar with the
basic principles of scheduler operation in order to get the best use out of
the LOTUS cluster. Scheduler software exists simply because the amount of jobs
that users wish to run on a cluster at any given time is usually greatly in
excess of the amount of resources available. This means that the scheduler
must queue jobs and work out how to run them efficiently.

Several factors are taken into account during scheduling, such as job duration
and size, but the basic principles remain the same throughout - every user
gets a fair share of the cluster based on the jobs that they have submitted.
This leads to a small number of important principles:

- Do not try to second guess the scheduler! Submit all of your jobs when you want to run them and let the scheduler figure it out for you. You will get a fair share, and if you don't then we need to adjust the scheduler (so get in touch and let us know).
- Give the scheduler as much information as possible. There are a number of optional parameters (see [How to submit jobs]({{% ref "how-to-submit-a-job-to-slurm" %}})) such as job duration, and if you put these in then you have an even better chance of getting your jobs to run.
- It is very difficult for one user to monopolise the cluster, even if they submit thousands of jobs. The scheduler will still aim to give everyone else a fair share, so long as there are other jobs waiting to be run.

## Fair share for all users

{{<image src="img/docs/slurm-scheduler-overview/Screenshot-2023-02-20-at-21.32.28.png" caption="Example of scheduling">}}

In the example above, three users (left column) have jobs in the queue (middle column)
which are waiting to run on the cluster (right column). As the blue user's job
finishes (middle row), all three users could potentially use the two job slots
that become available. However, the orange and purple users already have jobs
running, whereas the blue user does not, and as such it is the blue user's
jobs that are run (bottom row).

## LOTUS queues

There are five standard Slurm queues (also known as "partitions" in Slurm terminology) for batch job submissions to the LOTUS
cluster: `short-serial`, `long-serial`, `par-single`, `par-multi` and `high-mem`.
The default queue is `short-serial`. For testing new workflows, the
additional queue `test`is recommended. The specification of each queue is
described in detail in this article: [Slurm queues on LOTUS]({{% ref "slurm-queues" %}})

Queues other than the five standard queues with the test queue should be
ignored unless you have been specifically instructed to use them.

## The typical workflow for LOTUS jobs

One of the great advantages of using JASMIN is the ability to create batch
jobs that run simultaneously on multiple LOTUS nodes. However, users familiar
with running interactively on a single machine often take time to adapt to
this new way of working. The change involves moving from a "watching your job
run" approach to "submitting your job and coming back later".

The typical workflow for setting up and running LOTUS jobs is as follows:

  1. Login to one of the [scientific analysis servers]({{% ref "sci-servers" %}}).
  2. Install/write/configure your processing code.
  3. Test your code interactively: run it locally in a single-process test case.
  4. Create a wrapper script for your code that allows multiple versions to run independently: e.g. running for different dates or processing different spatial regions/variables.
  5. [Submit your jobs]({{% ref "how-to-submit-a-job-to-slurm" %}}) via the batch script.
  6. [Monitor your jobs]({{% ref "how-to-monitor-slurm-jobs" %}}).
  7. Gather/analyse/review the outputs as required.

## Project-specific LOTUS queues

Occasionally a project has a specific requirement for a collection of compute
nodes that involve the provision of a project-specific queue. If you are
working on such a project your project lead will provide guidance on which
queue to use. Please contact the helpdesk if
you are interested in setting up a project-specific queue.
