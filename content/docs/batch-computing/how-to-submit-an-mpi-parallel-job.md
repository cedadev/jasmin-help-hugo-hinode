---
aliases: /article/4896-how-to-submit-an-mpi-parallel-job-to-slurm
description: Submitting MPI parallel Slurm jobs
slug: how-to-submit-an-mpi-parallel-job
title: How to submit an MPI parallel job
---

## What is an MPI parallel job?

An MPI parallel job runs on more than one core and more than one host using
the Message Passing Interface (MPI) library for communication between all
cores. A simple script, such as the one given below could be saved as `my_script_name.sbatch`:

```bash
#!/bin/bash
#SBATCH --job-name="My MPI job"
#SBATCH --time=00:30:00
#SBATCH --mem=100M
#SBATCH --account=mygws
#SBATCH --partition=standard
#SBATCH --qos=high
#SBATCH -n 36
#SBATCH -o %j.log
#SBATCH -e %j.err

# Load the modules for the Intel oneAPI library (needed for mpi_myname.exe)
module load oneapi/compilers/24.2.0
module load oneapi/mpi/24.2.0

# Start the job running using Intel oneAPI's "mpirun" job launcher
mpirun ./mpi_myname.exe
```

`-n` refers to the number of processors or cores you wish to run on. The rest
of the `#SBATCH` input  options, and many more besides, can be found in the
`sbatch` manual page or in the related articles.

To submit the job, do not run the script, but rather use it as the standard
input to `sbatch`, like so:

{{<command user="user" host="sci-vm-01">}}
sbatch my_script_name.sbatch
{{</command>}}

## MPI implementation and Slurm

The Intel oneAPI library is the only supported MPI library on the cluster. MPI I/O
features are fully supported throughout JASMIN. The MPI implementation is available via the module environment for each compiler
as listed below:

```bash
module load oneapi/compilers/24.2.0
module load oneapi/mpi/24.2.0
```

## Parallel MPI compiler with oneAPI

Compile and link to Intel oneAPI libraries using the `mpif90`, `mpif77`, `mpicc`, `mpiCC`
wrapper scripts which are in the default unix path. The scripts will detect
which compiler you are using (GNU, Intel oneAPI) by the compiler environment loaded
and add the relevant compiler library switches. For example:

```bash
module load oneapi/compilers/24.2.0
module load oneapi/mpi/24.2.0
mpif90
```

will use the Intel Fortran compiler `ifort`.

The GNU compilers `gcc`, `gfortran` and the `mpich` library is available via [the Jaspy environment]({{% ref "jaspy-envs" %}}). Please only run workflows on one compute node over several cores, not cross-node.

For more information, please see the {{<link "https://www.intel.com/content/www/us/en/developer/tools/oneapi/base-toolkit-documentation.html">}}Intel openAPI documentation{{</link>}}. More examples will be coming soon.
