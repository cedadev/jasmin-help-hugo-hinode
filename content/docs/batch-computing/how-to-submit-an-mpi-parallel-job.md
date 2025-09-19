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

# Load a module for the gcc OpenMPI library (needed for mpi_myname.exe)
module load eb/OpenMPI/gcc/4.0.0

# Start the job running using OpenMPI's "mpirun" job launcher
mpirun ./mpi_myname.exe
```

`-n` refers to the number of processors or cores you wish to run on. The rest
of the `#SBATCH` input  options, and many more besides, can be found in the
`sbatch` manual page or in the related articles.

To submit the job, do not run the script, but rather use it as the standard
input to `sbatch`, like so:

{{<command user="user" host="sci-vm-01">}}
sbatch --exclusive my_script_name.sbatch
{{</command>}}

The `--exclusive` flag is used to group the parallel jobs onto hosts which
are allocated only to run this job. This ensures the best MPI communication
consistency and bandwidth/latency for the job and ensures no interference from
other users' jobs that might otherwise be running on those hosts.

## MPI implementation and Slurm

{{<alert alert-type="danger">}}
The following about compilers has not yet been reviewed for compatibility with the new cluster, April 2025.
This alert will be removed once updated.
{{</alert>}}

The OpenMPI library is the only supported MPI library on the cluster. OpenMPI
v3.1.1 and v4.0.0 are provided which are fully MPI3 compliant. MPI I/O
features are fully supported *only* on the LOTUS `/work/scratch-pw*` volumes as
these use a Panasas fully parallel file system. The MPI implementation on
CentOS7 LOTUS/Slurm is available via the module environment for each compiler
as listed below:

```bash
eb/OpenMPI/gcc/3.1.1 
eb/OpenMPI/gcc/4.0.0       
eb/OpenMPI/intel/3.1.1
```

**Note:** OpenMPI Intel compiler is due shortly as is 4.0.3  

## Parallel MPI compiler with OpenMPI

Compile and link to OpenMPI libraries using the `mpif90`, `mpif77`, `mpicc`, `mpiCC`
wrapper scripts which are in the default unix path. The scripts will detect
which compiler you are using (GNU, Intel) by the compiler environment loaded
and add the relevant compiler library switches. For example:

```bash
module load intel/20.0.0
module load eb/OpenMPI/intel/3.1.1
mpif90
```

will use the Intel Fortran compiler `ifort` and OpenMPI/3.1.1.  Whereas

```bash
module load eb/OpenMPI/gcc/3.1.1
mpicc
```

will call the GNU C compiler `gcc` and  OpenMPI/3.1.1.

The OpenMPI User Guides can be found at <https://www.open-mpi.org/doc/>.
