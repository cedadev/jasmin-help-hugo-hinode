---
aliases:
- /article/5068-gpu-cluster-orchid
- /article/4951-gpu-testing
date: 2023-05-26 14:25:07
description: Orchid GPU cluster
title: Orchid GPU cluster
type: docs
---

This article provides details on JASMIN's GPU
cluster, named **ORCHID**.

## GPU cluster spec

The JASMIN GPU cluster is composed of 16 GPU nodes:

- 14 x standard GPU nodes with 4 GPU Nvidia A100 GPU cards each
- 2 x large GPU nodes with 8 Nvidia A100 GPU cards

{{< image src="img/docs/gpu-cluster-orchid/file-NZmhCFPJx9.png" caption="ORCHID GPU cluster" >}}

## Request access to ORCHID

Before using ORCHID on JASMIN, you will need: 

1. An existing JASMIN account and valid `jasmin-login` access role: {{<button size="sm" href="https://accounts.jasmin.ac.uk/services/login_services/jasmin-login/">}}Apply here{{</button>}}
2. **Subsequently** (once `jasmin-login` has been approved and completed), the `orchid` access role: {{<button size="sm" href="https://accounts.jasmin.ac.uk/services/additional_services/orchid/">}}Apply here{{</button>}}

The `jasmin-login` access role ensures that your account is set up with access to the LOTUS batch processing cluster, while the `orchid` role grants access to the special LOTUS partition used by ORCHID.

Holding the `orchid` role also gives access to the GPU interactive node.

**Note:** In the supporting info on the `orchid` request form, please provide details
on the software and the workflow that you will use/run on ORCHID.

## Test a GPU job

Testing a job on the JASMIN ORCHID GPU cluster can be carried out in an
interactive mode by launching a pseudo-shell terminal Slurm job from a JASMIN
scientific server e.g. `sci2`:

{{<command user="user" host="sci2">}}
srun --gres=gpu:1 --partition=orchid --account=orchid --pty /bin/bash
(out)srun: job 24096593 queued and waiting for resources
(out)srun: job 24096593 has been allocated resources
{{</command>}}
{{<command user="user" host="gpuhost16">}}
## you are now on gpuhost16
{{</command>}}

The GPU node gpuhost016 is allocated for this interactive session on LOTUS

Note that for batch mode, a GPU job is submitted using the Slurm command
'sbatch':

{{<command user="user" host="sci2">}}
sbatch --gres=gpu:1 --partition=orchid --account=orchid gpujobscript.sbatch
{{</command>}}

or by adding the following preamble in the job script file
```bash
#SBATCH --partition=orchid
#SBATCH --account=orchid
#SBATCH --gres=gpu:1
```

Note 1: `gpuhost015` and `gpuhost016` are the two largest nodes with 64 CPUs and
8 GPUs.

Note 2: **CUDA Version: 11.6**

Note 3: The Slurm batch partition/queue `orchid` has a maximum runtime of 24 hours and
the default runtime is 1 hour. The maximum number of CPU cores per user is
limited to 8 cores. If the limit is exceeded then the job is expected to be in
a pending state with the reason being {{<mark>}}QOSGrpCpuLimit{{</mark>}}

## GPU interactive node

There is an interactive GPU node `gpuhost001.jc.rl.ac.uk`, with the same spec as
other Orchid nodes, that you can access via a login server to prototype and
test your GPU code prior to running as a batch job.

{{<command user="user" host="login-01">}}
ssh -A gpuhost001.jc.rl.ac.uk
{{</command>}}
{{<command user="user" host="gpuhost001">}}
## you are now on gpuhost001
{{</command>}}

## Software Installed on the GPU cluster (to be updated)
  
- CUDA drivers 10.1, and CUDA libraries 10.0, 10.1 and 11.4  
- CUDA DNN (Deep Neural Network Library)  
- NVIDIA container runtime (see notes below)  
- NGC client (GPU software hub for NVIDIA)  
- Singularity 3.7.0 - which supports NVIDIA/GPU containers
- SCL Python 3.6

