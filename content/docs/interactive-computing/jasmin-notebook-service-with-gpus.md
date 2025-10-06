---
aliases:
description: JASMIN Notebooks Service with GPUs enabled
slug: jasmin-notebooks-service-with-gpus
tags:
- Jupyter
- GPU
- AI
- Machine Learning
- ML
title: The JASMIN Notebooks Service with GPUs enabled
---

The [JASMIN Notebook Service]({{% ref "jasmin-notebooks-service" %}}) has recently been
updated to include a GPU-enabled node. This means that JASMIN users can now run Machine
Learning (ML) workflows in Notebooks. This page outlines:

## Who can access the GPU-enabled Notebooks Service?

The service is available to all JASMIN users that have been granted access to the
ORCHID (GPU) cluster. Existing JASMIN users can {{<link "https://accounts.jasmin.ac.uk/services/additional_services/orchid/">}}apply here{{</link>}}.

## Starting a Notebook Server with GPUs

In order to start a Notebook Server with GPUs enabled, go to the initial start page
and click on the "Launch Server" button:

{{< image src="img/docs/jasmin-notebook-service-with-gpus/notebook-server-start-page.png" caption="Notebook server start page" wrapper="col-9 mx-auto text-center">}}

Then select the "GPU" option and click "Start":

{{< image src="img/docs/jasmin-notebook-service-with-gpus/notebook-server-select-gpu.png" caption="Selecting the GPU notebook server" wrapper="col-9 mx-auto text-center">}}

## Which packages are available by default?

Check the top-right corner of a Notebook session to see which _kernel_ that is being used.
If you don't need any specialist Machine Learning (ML) libraries, you would typically
choose `Python 3 + Jaspy` as this has many of the common open-source packages used within
environmental science:

{{< image src="img/docs/jasmin-notebook-service-with-gpus/notebook-kernel.png" caption="Notebook kernel"  wrapper="col-6 mx-auto text-center">}}

You can click on the name of the kernel to select a different one.

If you want to work with GPUs, you are likely to want to install other packages that
are common in ML, such as `PyTorch` and `TensorFlow`. This topic is discussed below.

## GPU availability

In order to check that your notebook is running on a server with GPUs, you can
use the built-in NVIDIA commands, such as:

```bash
!nvidia-smi
```

If GPUs are enabled, the output should look like this:

{{< image src="img/docs/jasmin-notebook-service-with-gpus/nvidia-smi-output.png" caption="Output from the nvidia-smi command"  wrapper="col-9 mx-auto text-center">}}

## Understanding the `nvidia-smi` command output

### 1. The Header section

The first section includes:
- **CUDA Version: 12.7**: The version of the CUDA toolkit that the NVIDIA driver supports.
- **GPU 0 / GPU 1**: There are two physical NVIDIA A100 GPUs in the system.
- **Name**: The model is `NVIDIA A100-SXM4-40GB`. Each GPU has 40GB of on-board memory.
- **Memory-Usage**: Shows `N/A` because these GPUs are in MIG mode (Multi-Instance GPU), so memory usage is not reported here in the usual way. Memory usage for MIG slices is shown in the dedicated MIG section (below).
- **GPU-Util**: Also `N/A` for the same reason (MIG is active, so usage must be looked at per MIG instance).

### 2. The MIG section

The second section introduces **[MIG (Multi-Instance GPU)](https://www.nvidia.com/en-gb/technologies/multi-instance-gpu/)**. When a GPU is running in **MIG Mode**, it allows each GPU to be partitioned into multiple _instances_, each acting as a smaller independent, or _virtual_, GPU. Because MIG is turned on, you see "N/A" in the normal memory usage fields. Instead, you have a dedicated table for each MIG device:
- **GPU**: This repeats the GPU ID (0 or 1).
- **GI ID** (GPU Instance) and **CI ID** (Compute Instance): Each MIG slice is defined by a GPU instance and a compute instance.
- **MIG Dev**: The MIG device index.
- **Memory-Usage (13MiB / 9984MiB)**: Each MIG slice here is allocated around 10GB (`9984MiB`) of GPU memory. Currently, only 13 MiB is being used, likely overhead.
- **BAR1-Usage**: This is the amount of memory mapped via the BAR1 aperture (used for buffer transfers).
- **CE / ENC / DEC / OFA / JPG**: These columns refer to hardware encoder/decoder and other specialized engines available to each MIG slice.

### 3. The Processes section

The third section, _processes_, indicates what is running on the GPU/MIG instances:
- **No running processes found**: There were no active workloads on the GPUs or MIG instances at the time this command was run.

**In short**: There are two physical A100 GPUs. Each is in MIG mode and is presenting
one _virtual_ GPU instance with 10GB of memory. Currently, neither GPU has any running
processes, so they're essentially idle. The top-level memory usage fields are "N/A"
because MIG splits the GPU resources, and the usage is shown in the MIG devices table below.

### Getting the GPU and MIG device IDs

The following command will give you the exact IDs of the available GPUs and MIG instances:

```bash
!nvidia-smi -L
```

The output will be something like:

```bash
GPU 0: NVIDIA A100-SXM4-40GB (UUID: GPU-2927d07e-3fe9-7904-9e08-b08b82d9a37d)
  MIG 1g.10gb     Device  0: (UUID: MIG-6e95ef19-5145-571b-b040-7e731f1c1af3)
GPU 1: NVIDIA A100-SXM4-40GB (UUID: GPU-e109d8d9-923e-7235-0429-96b7fdbcbd30)
  MIG 1g.10gb     Device  0: (UUID: MIG-b4bcd4f3-6f69-516d-9404-b5ada80d760b)
```

## Resource allocation

The current allocation of GPUs to the JASMIN Notebook Service is as follows:
- 1 GPU Node serves 4 physical GPUs (`NVIDIA A100-SXM4-40GB`).
- Each GPU is partitioned, using MIG, into 4 _virtual_ GPU instances.
- Each user is allocated 2 _virtual_ GPU instances for their own notebook instance.
- Each _virtual_ GPU instance has 10GiB of memory.

## Software environments and Machine Learning packages

In the current release of the Notebook Service, users are required to install their own ML packages for use with GPUs. We recommend this approach:
1. Create a virtual environment ("_venv_"), for example `ml-venv`. [Use our guide]({{% ref "creating-a-virtual-environment-in-the-notebooks-service" %}}) to help you.
2. Install the packages you require into that _venv_. For example, if you needed `pytorch` and `torchvision`, you would run `pip install torch torchvision` (including specific versions if needed). **NOTE: Many ML packages are very big - this can take several minutes.**
3. Be sure to follow the instructions for installing `ipykernel` into your _venv_ and running the relevant command to install the kernel so that JupyterHub can locate it and list it as one of the available kernels. Use the name of your _venv_ as the name of the _kernel_.
4. Once you have installed your kernel, it should appear as an option in the Launcher as outlined in green in the diagram below. The Launcher is accessible from the File menu.

### Specific advice on installing TensorFlow for use with GPU Notebooks

The general-purpose `Python 3 + Jaspy` kernel already includes a version of TensorFlow, 
but it was compiled against CPU-only hardware.

In order **to use TensorFlow with GPUs in a Notebook**, there are two approaches you can 
take:
  1. Create your own virtual environment (as mentioned above) and install TensorFlow.
  2. Simply install TensorFlow within your Notebook using `pip`.

Option 1 is more complicated but it allows you to manage multiple separate software 
environments which you can switch between.

For Option 2, you will be installing the package into your `$HOME` directory in a location 
such as: `${HOME}/.local/lib/python3.11/site-packages/`. Note that the exact Python version 
may vary. You can install TensorFlow from a Notebook by typing the following into a cell a 
executing it:

```bash
!pip install tensorflow[and-cuda] keras
```

NOTE: Make sure you previously selected the GPU option when you launched your Notebook server 
(as instructed above).

You will need to restart your Notebook kernel before the newly installed version of TensorFlow 
can be imported. See below for instructions on importing and checking that the GPUs 
are visible to your Notebook session.

### Specific advice on installing PyTorch for use with GPU Notebooks

Unlike TensorFlow, PyTorch is not installed within the `Python 3 + Jaspy` kernel so 
you will need to install it yourself.

In order **to use PyTorch with GPUs in a Notebook**, there are two approaches you can 
take:
  1. Create your own virtual environment (as mentioned above) and install PyTorch.
  2. Simply install PyTorch within your Notebook using `pip`.

Option 1 is more complicated but it allows you to manage multiple separate software 
environments which you can switch between.

For Option 2, you will be installing the package into your `$HOME` directory in a location 
such as: `${HOME}/.local/lib/python3.11/site-packages/`. Note that the exact Python version 
may vary. You can install PyTorch from a Notebook by typing the following into a cell a 
executing it:

```bash
!pip install torch
```

NOTE: Make sure you previously selected the GPU option when you launched your Notebook server 
(as instructed above).

You will need to restart your Notebook kernel before the newly installed version of PyTorch 
can be imported. See below for instructions on importing and checking that the GPUs 
are visible to your Notebook session.

### Handling multiple/conflicting versions of software packages

It is common to find that different workflows will require different versions
of software packages. In the fast-moving world of ML, the libraries and their
dependencies often change and this can cause problems when trying to work
within a single software environment.

If you encounter this kind of problem, we recommend that you create multiple
virtual environments and their associated _kernels_. You can then select the
appropriate _kernel_ for each notebook. It may also be worth investing the time
in capturing exact versions of the relevant packages so that you can reproduce
your environment if necessary. Python packages often use a requirements file
(typically named `requirements.txt`) to capture the dependencies. For example:

```
scikit-learn==1.5.1
torch==2.5.1+cu124
torchvision==0.20.1+cu124
```

All packages listed in a requirements file can be installed with a single command:

```bash
$ pip install -r requirements.txt
```

## Importing PyTorch or TensorFlow and testing that they work with CUDA

CUDA is system that connects the Python libraries to the GPU system (on NVIDIA hardware).
When we install PyTorch, or many other ML packages, it should automatically detect CUDA
if it is available. Assuming that you have followed the instructions to create a _venv_
and install `PyTorch`, then you can check for CUDA with:

```python
>>> import torch
>>> print("Is CUDA available? ", torch.cuda.is_available())
Is CUDA available?  True
```

The same thing is possible with `TensorFlow`:

```python
>>> import tensorflow as tf
>>> print(tf.config.list_physical_devices('GPU'))
[PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU'), PhysicalDevice(name='/physical_device:GPU:1', device_type='GPU')]
```

### Warning about large ML packages and HOME directory disk quota

Please be aware that installing these packages into your `$HOME` directory will
require multiple gigabytes of free space. If you are near your quota (100GB),
then the installation may fail. It is important to note that an
**installation failure may not report a violation of disk quota** even if
that is the underlying problem.

See the [`HOME` directory documentation]({{% ref "storage" %}}#home-directory)
for details on checking your current disk usage.

## Guidelines and Best Practices

### Efficient GPU usage

Please make use of GPUs efficiently in your code. If you only need CPUs, then
please use the standard Notebook service. One way to ensure that the resource
is being efficiently used is to stop your notebook server, via the Hub Control
Panel (see the File menu) when not actively needed. Be sure to save your notebook
before stopping the server.

### Memory and Resource Limits

The per-user memory limit for a given notebook is given in the bar below
(typically 16GB). On the GPU architecture there is 10GiB per virtual GPU.

### Scaling up your workflows

Experienced JASMIN users will be familiar with the resource limitations of the
Notebook Service. Whilst it is great for prototyping, scientific notebooks and
code-sharing, it does not suit large multi-process and long-running workflows.
The [LOTUS cluster]({{% ref "batch-computing" %}}) is provided
for larger workflows, and it includes the
[ORCHID partition]({{% ref "orchid-gpu-cluster" %}}) for GPU usage.

We recommend that you use the GPU-enabled Notebook Service to develop and
prototype your ML workflows, and migrate them to ORCHID if they require significantly
more compute power. Please contact the [JASMIN Helpdesk](mailto:support@jasmin.ac.uk)
if you would like advice on how to migrate your workflows.

## Getting Advice on Machine Learning

For advice on machine learning packages and suitability for different applications, you
could make use of the NERC Earth Observation Data Analysis and AI service (NEODAAS).
See the {{<link "https://neodaas.ac.uk/services/artificial_intelligence_service/">}}NEODAAS
website{{</link>}} for details.

## A Notebook to get started

An introductory notebook, which includes most of the information provided on this page,
is available on {{<link "https://github.com/cedadev/ceda-notebooks/blob/master/notebooks/training/jasmin-gpu-notebook-intro.ipynb">}}GitHub{{</link>}}. It may provide a useful starting point for your journey.
