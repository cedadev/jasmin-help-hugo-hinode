---
description: Compiling and linking code which uses libraries provided on JASMIN
title: Compiling and linking
---

## Introduction

The [Jaspy]({{% ref "jaspy-envs" %}}) environment on JASMIN contains the GNU compilers and
{{<link "https://www.mpich.org/">}}MPICH{{</link>}}, plus a wide range of libraries
from conda-forge that will interoperate with these.

Separately, we also provide the
{{< link "https://www.intel.com/content/www/us/en/developer/tools/opeapi/overview.html">}}Intel OneAPI compilers{{</link>}} and
{{< link "https://www.intel.com/content/www/us/en/developer/tools/oneapi/mpi-library.html" >}}Intel MPI{{</link>}},
and a much more limited set of libraries built with these (currently just the netCDF
libraries and their dependencies).

In either case, to compile and link software that utilises these libraries,
you need to:

- ensure that you are using the correct compiler
- point to the location of the libraries

This page provides details on how to do this, first for Jaspy/GNU and then for Intel OneAPI.

## Using Jaspy and the GNU compilers

### Loading the compilers

- To ensure that you are using the correct compilers, simply use the command

   ```bash
   module load jaspy
   ```

   to load the Jaspy module or 
   
   ```bash
   module load jaspy/3.11/v20240508
   ```
   
   to load a specific Jaspy version.
   
   This will put the directory containing the GNU compilers (`gcc`, `g++`, `gfortran`) into your `PATH`.  That directory also contains the corresponding MPI compiler wrappers (`mpicc`, `mpicxx`, `mpif77`, `mpif90`) which you can use instead of using `gcc` etc directly if you want to compile parallel code.

 - Loading the module also sets the `CONDA_PREFIX` environment variable to point to the root of the relevant Jaspy installation, for example `/apps/jasmin/jaspy/miniforge_envs/jaspy3.11/mf3-23.11.0-0/envs/jaspy3.11-mf3-23.11.0-0-v20240815`.
 
   (The directory which gets added to `PATH` as described above is equivalent to `$CONDA_PREFIX/bin`.)

 - You can use the `which` command to verify that you are using the correct compiler versions, for example, type:

   ```
   which gfortran
   ```
  
   This should report a path that is under the directory mentioned above.

 - If instead you see a compiler path under `/usr/bin`, then this is a different compiler version (provided by the operating system), and is not compatible with the libraries in Jaspy or supported by the JASMIN helpdesk for running user code. In that case, check your `$PATH`.

### Pointing to the libraries

- To use the libraries under the Jaspy environment, you need to add the following additional flags to the compiler command line:

   - At the compilation stage, you need to point to the `include/` subdirectory containing header files.  If making use of the `CONDA_PREFIX` environment variable, this would mean using this compiler option:

   ```bash
   -I$CONDA_PREFIX/include
   ```

   - At the linking stage, you need to point to the `lib/` subdirectory containing the libraries themselves.  This will require the following linker option:

   ```bash
   -L$CONDA_PREFIX/lib
   ```
 
   and is in addition to the relevant `-l` options for the specific libraries that you want to link to (for example `-lfftw3` to use `libfftw3.so`).

   - If you are compiling and linking in a single step, put both of the above options on the same command line.

   - If you are running the compiler indirectly via an installer for another package, rather than running the compiler commands directly yourself, note that there are environment variables which are commonly used to specify these options, which you would set before invoking the installer.  For example:

   ```bash
   export CFLAGS="-I$CONDA_PREFIX/include"
   export LDFLAGS="-L$CONDA_PREFIX/lib"
   ```

   although the names of these might differ slightly (for example `COPTS` instead of `CFLAGS`, maybe `FFLAGS` or `F77FLAGS` or `F90FLAGS` as appropriate), so check the instructions for the package that you are trying to build.

### Using *-config scripts

  As an alternative to pointing explicitly to the relevant `include` and `lib` directories, some of the software packages provide `*-config` executables which report the relevant flags to be used during compilation.  This includes, for exmple, the netCDF C library and also its Fortran / C++ wrappers; these provide `nc-config`, `nf-config`, and `ncxx4-config`.  See `ls $CONDA_PREFIX/bin/*-config` for a list of other similar executables.  Provided that the directory containing these is in your `PATH` (as will be the case after loading the Jaspy module), the output of these commands can be captured by a script and used to provide the relevant compiler and linker options, without you needing to specify any paths explicitly.  For example, a program `myprog.c` that uses the netCDF C library could be compiled and linked using:

   ```bash
   # first set some variables using the nc-config script
   cc=$(nc-config --cc)
   cflags=$(nc-config --cflags)
   libs=$(nc-config --libs)
   # now use these variables to construct the relevant commands
   $cc -c $cflags myprog.c
   $cc $libs myprog.o -o myprog
   ```

   If you are building a third-party package that depends on netCDF and which utilises the `nc-config` script in this way, then after you have loaded the Jaspy module, you should not need to do anything else in order to tell it where the library is located.

   (The `nc-config` program can also provide other information about the build of the library that you are using; type `nc-config --help` for more info.)

## Using the Intel OneAPI compilers

Components of the {{<link "https://www.intel.com/content/www/us/en/developer/tools/oneapi/overview.html">}}Intel OneAPI{{</link>}} are provided for use with the Rocky 9 [sci servers]({{% ref "sci-servers" %}}) and Rocky 9 LOTUS nodes.

It is advisable to unload the Jaspy module when using the Intel compilers, to avoid any compatibility issues.

### Loading the compilers

If Jaspy is already loaded, start by typing

```bash
module unload jaspy
```

then:

```bash
module load oneapi/compilers
```

this will enable the following commands:

- the Fortran compiler `ifx`
- the C compiler `icx`
- the C++ compiler `icpx`

(Typing `ifort` will give a deprecation warning, so use `ifx` instead.)

In addition to these, the OneAPI suite also includes an MPI implementation.  You can load this by typing:

```bash
module load oneapi/mpi
```

This provides (amongst other things):

- compiler wrappers `mpif77`, `mpif90`, `mpicc`, `mpicxx`
- the run-time wrapper `mpirun` (which can also be invoked as `mpiexec`)

### NetCDF libraries for use with Intel OpenAPI

CEDA has provided an installation of the netCDF C library that uses the OneAPI compilers, together with its dependencies (HDF5, pnetcdf).  Fortran and C++ language wrappers are also provided.

This installation is built with support for parallel access, although the user code needs to request parallel mode when opening the file in order to utilise this.  Parallel netCDF makes use of the Intel MPI library.

To use Intel OneAPI, type one (or more) of these module commands:

- For the C library - also includes associated command-line utilities, `ncdump` etc:

```bash
module load netcdf/intel2024.2.0/4.9.2
```

- For the C library and C++ wrappers:

```bash
module load netcdf/intel2024.2.0/c++/4.3.1
```

- For the C library and Fortran wrappers:

```bash
module load netcdf/intel2024.2.0/fortran/4.6.1
```

Loading these netCDF modules will also load the relevant compiler and MPI modules, so you do not need to load those explicitly.

As in the case of GNU compilers described above, you will have two approaches available for compiling netCDF code: either to point to the libraries explicitly, or to use the `*-config` scripts.  These are described in more detail below.

### Pointing to the libraries

Once you have loaded these modules, the environment variable `NETCDF_ROOT` is set for you, and as appropriate, `NETCDFF_ROOT` (for Fortran) and/or `NETCDF_CXX4_ROOT` (for C++).  These variables are not generally used by the software, but may be useful to you when writing your own scripts in order to refer to the location of the libraries.  They can be used analogously to how `CONDA_PREFIX` is used in the Jaspy/GNU examples above, as follows (assuming again that your program is called `myprog`):

 - C
  
 ```bash
 ## compile:
 cx -c myprog.c -I$NETCDF_ROOT/include
 
 ## link:
 icx -o myprog myprog.o -L$NETCDF_ROOT/lib -lnetcdf
 ```

 - Fortran:
 
 ```bash
 ## compile:
 ifx -c myprog.f -I$NETCDFF_ROOT/include  ## (also works with F90)
 
 ## link:
 ifx -o myprog myprog.o -L$NETCDFF_ROOT/lib -lnetcdff -L$NETCDF_ROOT/lib -lnetcdf
 ```

 - C++:
 
 ```bash
 ## compile:
 icpx -c myprog.cpp -I$NETCDF_ROOT/include -I$NETCDF_CXX4_ROOT/include
 
 ## link:
 icpx -o myprog myprog.o -L$NETCDF_CXX4_ROOT/lib -lnetcdf_c++4 -L$NETCDF_ROOT/lib -lnetcdf
 ```

 - Parallel example (Fortran):

 ```bash
 ## compile and link:
 mpif90 -o myprog myprog.F90 -I $NETCDFF_ROOT/include -L $NETCDFF_ROOT/lib -lnetcdff
 
 ## run:
 mpirun -np 4 ./myprog
 ```

A runnable example script that demonstrates these with some test programs from Unidata can be found at:

```
   /apps/jasmin/supported/libs/netcdf/intel2024.2.0/intel_netcdf_examples.sh
```

If running the parallel test, ensure that you are using a [filesystem]({{% ref "understanding-new-jasmin-storage/#understanding-the-four-types-of-jasmin-disk" %}}) that supports parallel writes.

### Using the *-config scripts

Just as described above when using Jaspy, you will have the directories containing executables `nc-config`, `nf-config`, and `ncxx4-config` in your `$PATH`, provided that you have loaded the relevant modules.  (In fact, these will be in `$NETCDF_ROOT/bin`, `$NETCDFF_ROOT/bin`, `$NETCDF_CXX4_ROOT/bin`, but you shouldn't need to refer to these paths explicitly.)

Follow the same approach as described above, capturing the output of these commands when run with the relevant command-line options. (Search for `nc-config` above in this page.) The build script for your application should then look exactly the same as if you were using Jaspy, apart from loading a different module to start with, even though the actual compiler options will be different.
