---
aliases: /article/4914-jasmin-sci-software
description: The "jasmin-sci" software environment
slug: jasmin-sci-software-environment
title: The "jasmin-sci" software environment
---

## Introduction

This article describes the `jasmin-sci` software environment on JASMIN. It
covers the following topics:

- Overview of the `jasmin-sci` software environment
- Activating and deactivating the `jasmin-sci` environment
- Using the `jasmin-sci` environment with Jaspy

## Overview of the "jasmin-sci" software environment

The `jasmin-sci` software environment is intended as a supplement to 
[Jaspy]({{% ref "jaspy-envs" %}}) and contains extra software packages for use with
scientific data analysis which, for various reasons, are not provided as part
of Jaspy itself. These packages are generally installed on the same
machines where Jaspy is available, for example, the `sci` machines
(e.g. `sci*.jasmin.ac.uk`) and LOTUS nodes, but not
the login machines. It is not intended for the `jasmin-sci` environment 
itself to provide a complete suite of analysis software.

The packages included in `jasmin-sci` are provided via RPMs. A list of
explicitly included packages can be seen using the command `rpm -qR jasmin-sci`,
although some additional packages may be installed to satisfy
dependencies.

The packages fall into two categories:

- Packages provided by standard RPM repositories (example "gnuplot") - these are installed into ordinary system paths (such as `/usr/bin/gnuplot` for the gnuplot program) and require no special setup in order to run. So if you are on a relevant machine, you should just be able to type `gnuplot`.
- Packages which we have built locally for use on JASMIN (although most are third-party software). To avoid any potential later conflicts with standard packages, they are installed under the path `/opt/rh/jasmin-sci/` rather than in system paths. 
Also, the RPM package names, as can be seen in the above `rpm -qR jasmin-sci` command,
are prefixed with `jasmin-sci-`. So for example, the local build of `nccmp` (a program to compare netCDF files) is a package called `jasmin-sci-nccmp`, and the executable is at `/opt/rh/jasmin-sci/root/usr/bin/nccmp`. Before these packages can be conveniently used, it is necessary to "activate" the environment as described below, so that when you type e.g. "nccmp" the relevant files can be found.

Unlike the Jaspy environments, `jasmin-sci` can only provide one version of each
package at a time, so the versions are subject to change when updates are
done. If we anticipate any important changes, then we will notify JASMIN users
by email.

In a few cases, software packages are provided in `jasmin-sci` which are also
provided in Jaspy. This is only done where other RPM packages depend on it.
For example, the netcdf package is provided in Jaspy, but is also installed as
an RPM because the nccmp package requires it. This means that copies of the
netCDF libraries exist both in Jaspy (for the full path, type `nc-config --libs` after
activating Jaspy) and also under `/usr/lib64` (from the RPM). When
linking code to the netCDF library, it is recommended to use the one in Jaspy
because this will be version controlled. Also, although the `jasmin-sci`
software might provide some software that happens to be implemented in Python,
any such Python modules are not intended to be imported into your own code.
For Python development, packages from Jaspy should be used.

The development for `jasmin-sci` takes place via the {{< link "https://github.com/cedadev/extra-sci-packages" >}}extra-sci-packages{{</link>}} GitHub repository,
and an associated {{< link "https://github.com/cedadev/extra-sci-packages/issues" >}}issues{{</link>}} page. The readme file on the repository has some
package-specific documentation (including how to build the python bindings for Misr toolkit).

## Activating and deactivating the "jasmin-sci" environment

To **activate** the jasmin-sci environment, use the command:

{{<command user="user" host="sci-vm-01">}}
module load jasmin-sci
{{</command>}}  

and to **deactivate** it, use the command:

{{<command user="user" host="sci-vm-01">}}
module unload jasmin-sci
{{</command>}}

("add" and "purge" can also be used).

The `module load` command must be done in each session, or added to your `$HOME/.bashrc` file.

As mentioned above, this is only required for a subset of packages in jasmin-
sci. The majority of packages do not require it, but for example, those which
do include ferret, and the leafpad (notepad-like) editor.

Ferret users should note that it is still necessary to do "source
ferret_paths.sh" after activating jasmin-sci, in order for ferret to find all
its additional resource files.

## Using the "jasmin-sci" environment with Jaspy

To activate both jasmin-sci and Jaspy, it is best to activate them in the
following order:

{{<command user="user" host="sci-vm-01">}}
module load jasmin-sci
module load jaspy
{{</command>}}

This will ensure that in the unlikely event of an executable in Jaspy also
existing under `/opt/rh/jasmin-sci/`, then one in Jaspy will take priority.

The corresponding `module unload` commands can be done in either order.
