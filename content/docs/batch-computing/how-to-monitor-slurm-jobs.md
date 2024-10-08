---
aliases: /article/4892-how-to-monitor-slurm-jobs
date: 2020-05-20 13:13:23
description: How to monitor Slurm jobs
slug: how-to-monitor-slurm-jobs
title: How to monitor Slurm jobs
---

## Job information

Information on all running and pending batch jobs managed by Slurm can be
obtained from the Slurm command `squeue`. Note that information on completed
jobs is only retained for a limited period. Information on jobs that ran in
the past is via `sacct`. An example of the output `squeue` is shown below.

{{<command user="user" host="sci-vm-01">}}
squeue
(out)JOBID PARTITION     NAME   USER ST       TIME  NODES NODELIST(REASON)
(out)18957 short-ser     mean   user1  R       0:01      1 host147
(out)18956 short-ser     calc   user2  R      48:38      1 host146
(out)18967      test     wrap   user1  R      14:25      1 host146
{{</command>}}

where the field `ST` is the job state and the `TIME` is the time used by the
job.

A batch job evolves in several states in the course of its execution. The
typical job states are defined in Table 1

Table 1: Job states

Symbol | Job state  |  Description  
---|---|---
PD  |  Pending  |  The job is waiting in a queue for allocation of resources
R  |  Running  |  The job currently is allocated to a node and is running
CG  |  Completing  |  The job is finishing but some processes are still active
CD  |  Completed  |  The job has completed successfully
F  |  Failed  |  Failed with non-zero exit value
TO  |  Terminated  |  Job terminated by Slurm after reaching its runtime limit
S  |  Suspended  |  A running job has been stopped with its resources released to other jobs
ST  |  Stopped  |  A running job has been stopped with its resources retained
{.table .table-striped}
  
# Slurm commands for monitoring jobs

A list of the most commonly used commands and their options for monitoring
batch jobs are listed in Table 2, below:

Table 2. List of important Slurm commands and their options for monitoring
jobs

Slurm Command  |  Description  
---|---  
`squeue` |  To view information for all jobs running and pending on the cluster  
`squeue --user=username` |  Displays running and pending jobs per individual user  
`squeue --states=PD` |  Displays information for pending jobs (PD state) and their reasons  
`squeues --states=all` |  Shows a summary of the number of jobs in different states  
`scontrol show job JOBID` |  Shows detailed information about your job (JOBID = job number) by searching the current event log file  
`sacct -b` |  Shows a brief listing of past jobs
`sacct -l -j JOBID` |  Shows detailed historical job information of a past job with jobID  
{.table .table-striped}
  
## Inspection of job output files

An example of the job output file from a simple job submitted to Slurm:

{{<command shell="bash">}}
sbatch -p test  --wrap="sleep 2m"
(out)Submitted batch job 18973  
{{</command>}}

{{<command shell="bash">}}
scontrol show job 18973
(out)JobId=18973 JobName=wrap
(out)   UserId=fchami(26458) GroupId=users(26030) MCS_label=N/A
(out)   Priority=1 Nice=0 Account=jasmin QOS=normal
(out)   JobState=RUNNING Reason=None Dependency=(null)
(out)   Requeue=1 Restarts=0 BatchFlag=1 Reboot=0 ExitCode=0:0
(out)   RunTime=00:00:08 TimeLimit=01:00:00 TimeMin=N/A
(out)  SubmitTime=2020-05-20T14:10:28 EligibleTime=2020-05-20T14:10:28
(out)   AccrueTime=2020-05-20T14:10:28
(out)   StartTime=2020-05-20T14:10:32 EndTime=2020-05-20T15:10:32 Deadline=N/A
(out)   SuspendTime=None SecsPreSuspend=0 LastSchedEval=2020-05-20T14:10:32
(out)   Partition=test AllocNode:Sid=sci2-test:18286
(out)   ReqNodeList=(null) ExcNodeList=(null)
(out)   NodeList=host147
(out)   BatchHost=host147
(out)   NumNodes=1 NumCPUs=1 NumTasks=1 CPUs/Task=1 ReqB:S:C:T=0:0:*:*
(out)   TRES=cpu=1,mem=128890M,node=1,billing=1
(out)   Socks/Node=*NtasksPerN:B:S:C=0:0:*:* CoreSpec=*
(out)   MinCPUsNode=1 MinMemoryNode=128890M MinTmpDiskNode=0
(out)   Features=(null) DelayBoot=00:00:00
(out)   OverSubscribe=OK Contiguous=0 Licenses=(null) Network=(null)
(out)   Command=(null)
(out)   WorkDir=/home/users/fchami
(out)   StdErr=/home/users/fchami/slurm-18973.out
(out)   StdIn=/dev/null
(out)   StdOut=/home/users/fchami/slurm-18973.out
(out)   Power=
{{</command>}}

## History of jobs

{{<command shell="bash">}}
sacct
(out)        JobID    JobName  Partition    Account  AllocCPUS      State ExitCode
(out)------------ ---------- ---------- ---------- ---------- ---------- --------
(out)18963              wrap par-single     jasmin          1  COMPLETED      0:0
(out)18964              wrap short-ser+     jasmin          1  COMPLETED      0:0
(out)18965              wrap par-single     jasmin          1  COMPLETED      0:0
(out)18966              wrap short-ser+     jasmin          1  COMPLETED      0:0
{{</command>}}
