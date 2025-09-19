---
aliases:
- /article/5068-gpu-cluster-orchid
- /article/4951-gpu-testing
description: Details of JASMIN's GPU cluster, ORCHID
title: Orchid GPU cluster
type: docs
---

## GPU cluster spec

The JASMIN GPU cluster is composed of 16 GPU nodes:

- 14 x standard GPU nodes with 4 GPU Nvidia A100 GPU cards each
- 2 x large GPU nodes with 8 Nvidia A100 GPU cards

{{< image src="img/docs/gpu-cluster-orchid/file-NZmhCFPJx9.png" caption="ORCHID GPU cluster" >}}

Note: the actual number of nodes may vary slightly over time due to operational reasons. You can check which nodes are available by checking the `STATE` column in `sinfo --partition=orchid`.

## Request access to ORCHID

Before using ORCHID on JASMIN, you will need: 

1. An existing JASMIN account and valid `jasmin-login` access role: {{<button button-size="sm" href="https://accounts.jasmin.ac.uk/services/login_services/jasmin-login/">}}Apply here{{</button>}}
2. **Subsequently** (once `jasmin-login` has been approved and completed), the `orchid` access role: {{<button button-size="sm" href="https://accounts.jasmin.ac.uk/services/additional_services/orchid/">}}Apply here{{</button>}}

The `jasmin-login` access role ensures that your account is set up with access to the LOTUS batch processing cluster, while the `orchid` role grants access to the special LOTUS partition and QoS used by ORCHID.

Holding the `orchid` role also gives access to the GPU interactive node.

**Note:** In the supporting info on the `orchid` request form, please provide details
on the software and the workflow that you will use/run on ORCHID.

## Test a GPU job

Testing a job on the JASMIN ORCHID GPU cluster can be carried out in an
interactive mode by launching a pseudo-shell terminal Slurm job from a JASMIN
scientific server e.g. `sci-vm-01`:

{{<command user="user" host="sci-vm-01">}}
srun --gres=gpu:1 --partition=orchid --account=orchid --qos=orchid --pty /bin/bash
(out)srun: job 19505658 queued and waiting for resources
(out)srun: job 19505658 has been allocated resources
{{</command>}}

At this point, your shell prompt will change to the GPU node `gpuhost004`, but with access to one GPU as shown by the NVIDIA utility. You will have the one GPU allocated at this shell, as requested:

{{<command user="user" host="gpuhost004">}}
nvidia-smi
(out)+-----------------------------------------------------------------------------------------+
(out)| NVIDIA-SMI 570.133.20             Driver Version: 570.133.20     CUDA Version: 12.8     |
(out)|-----------------------------------------+------------------------+----------------------+
(out)| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
(out)| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
(out)|                                         |                        |               MIG M. |
(out)|=========================================+========================+======================|
(out)|   0  NVIDIA A100-SXM4-40GB          On  |   00000000:01:00.0 Off |                    0 |
(out)|                   ...                   |           ...          |         ...          |
{{</command>}}

Note that for batch mode, a GPU job is submitted using the Slurm command
`sbatch`:

{{<command user="user" host="sci-vm-01">}}
sbatch --gres=gpu:1 --partition=orchid --account=orchid --qos=orchid gpujobscript.sbatch
{{</command>}}

or by adding the following preamble in the job script file

```bash
#SBATCH --partition=orchid
#SBATCH --account=orchid
#SBATCH --qos=gpu:1
#SBATCH --gres=gpu:1

```

**Notes:**

1. `gpuhost015` and `gpuhost016` are the two largest nodes with 64 CPUs and 8 GPUs each.

2. IMPORTANT **CUDA Version: 12.8**  Please add the following to your path 
    ```bash
    export PATH=/usr/local/cuda-12.8/bin${PATH:+:${PATH}}
    ```

3. The following are the limits for the `orchid` QoS. If, for example, the CPU limit
is exceeded, then the job is expected to be in a pending state with the reason being
{{<mark>}}`QOSGrpCpuLimit`{{</mark>}}.

    | QoS      | Priority | Max CPUs per job | Max wall time | Max jobs per user |
    |----------|----------|------------------|---------------|-------------------|
    | `orchid` | 350      | 8                | 2 days        | 8                 |
    {.table .table-striped .w-auto}

## GPU interactive node outside Slurm

There is an interactive GPU node `gpuhost001.jc.rl.ac.uk`, not managed by Slurm, which has the same spec as
other ORCHID nodes. You can access it directly from the JASMIN login servers for prototyping and
testing code prior to running as a batch job on ORCHID:

Make sure that your initial SSH connection to the login server used the `-A` (agent forwarding) option, then:

{{<command user="user" host="login-01">}}
ssh gpuhost001.jc.rl.ac.uk
{{</command>}}

{{<command user="user" host="gpuhost001">}}
## now on gpu interactive node
{{</command>}}

## Software Installed on the GPU cluster
  
- CUDA version 12.8
- CUDA DNN (Deep Neural Network Library) version cudnn9-cuda-12
- cuda-toolkit - version 12.8
- Singularity-CE version 4.3.2-1 checked version - supports NVIDIA/GPU containers
- podman version 5.4.0
- SCL Python 3.6

Please note that the cluster may have newer software available. For example, you can check the current CUDA version by using `nvidia-smi`, or the Singularity version with `singularity --version`.
