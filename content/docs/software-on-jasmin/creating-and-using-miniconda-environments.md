---
aliases: /article/5075-creating-and-using-miniconda-environments
description: Creating and using miniconda environments
slug: creating-and-using-miniconda-environments
title: Creating and using miniconda environments
---

On JASMIN, we provide a wide range of packages via the {{<link "jaspy-envs">}}Jaspy{{</link>}}
environment (which is itself a Conda environment). This page gives
detail on how to create and use your own personal Conda environments via the
miniconda installer, as an alternative to the use of Jaspy.

To decide whether you should use a **Python virtual environment** or a
**Conda environment**_** , first see the page: {{<link "conda-environments-and-python-virtual-environments">}}overview of software environments{{</link>}}.

## Obtaining miniconda

In order to create your own conda environments, you will first need to
download the {{<link "https://docs.conda.io/en/latest/miniconda.html">}}miniconda{{</link>}}
installer. It is possible as an alternative to use the full
{{<link "https://www.anaconda.com/products/distribution">}}Anaconda{{</link>}}, but your initial
base environment will be much bigger if you do that (at time of writing this
installs 5GB, compared to 400MB with miniconda) so we suggest the use of
miniconda.

This can be downloaded using:

```
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

## Deactivating Jaspy

You cannot have your own conda environment activated at the same time as
Jaspy, so it is recommended that if you have loaded the jaspy module, then you
start by typing:

```
module unload jaspy
```

## Creating a base environment

You can run the installer by typing:

```
bash Miniconda3-latest-Linux-x86_64.sh
```

You will be asked to confirm the licence agreement, to choose an installation
location, and to decide whether it should run "conda init". It is recommended
that you:

  * Accept the default location (~/miniconda3). If you need to change this, see the section "Varying the installation location" near the end of this page for more info.
  * Say _no_ to the question about "conda init", because saying yes will cause it to add lines to your ~/.bashrc file causing your base environment to be activated every time you log in, which may interfere with the use of Jaspy. If you say no, you can still follow the instructions below when you wish to activate your base environment.  

(Add the `-b` option at the end of the above command to run the installer in
batch mode, which will also skip the "conda init". Or add `-h` to see help on
other available command-line options.)

## Activating the base environment

Assuming that you made the choices recommended above when running the
installer, you should type the following in order to activate the base
environment:

```
source ~/miniconda3/bin/activate
```

(You may encounter documentation elsewhere which suggests "conda activate"
instead, but the above command is a workaround for the fact that you have not
run "conda init", the reasons for which are explained above.)

Your command prompt will then change to include "(base) " at the start, in
order to remind you that this environment is activated. You can deactivate the
environment by typing:

```
conda deactivate
```

## Creating and activating a sub-environment

Although once you have activated the base conda environment, you can in
principle start to install packages immediately, your use of conda will
generally be better organised if you do not install packages directly into the
base environment, but instead use a named sub-environment. You can have
multiple sub-environments under a single base environment, and activate the
one that is required at any one time. Unless you install packages directly
into the base environment, your sub-environments will work independently.

To create a named environment (for example, called "myenv"), ensure that the
base environment is activated (the command prompt should start with "(base)
"), and type:

```
conda create -n myenv
```
  
It will show the proposed installation location, and once you answer the
prompt to proceed, will do the installation. If you have followed these
instruction, this location should be
`/home/users/<your_username>/miniconda3/envs/myenv`. You can alternatively
give it a different location using the option `-p <path>` instead of `-n
<name>`.

Once you have created your sub-environment, you can activate it using `conda
activate <name>` for example:

```
conda activate myenv
```

The command prompt will then change (e.g. to start with "(myenv) ") to reflect
this. Typing `conda deactivate` once will return you to the base environment;
typing it a second time will deactivate conda completely (as above).

```
conda env list
```
 will list your environments.

## Installing conda packages

Once you have activated a named environment, you can install packages with the
`conda install` command, for example:

```
conda install gcc
```

You can also force particular versions to be installed. See the {{<link "https://docs.conda.io/projects/conda/en/4.6.0/_downloads/52a95608c49671267e40c689e0bc00ca/conda-cheatsheet.pdf">}}conda cheat
sheet{{</link>}} for details.

To list the packages installed in the currently activated environment, you can
type `conda list`.

## Running packages from your conda environment

In order to run packages from a conda environment that you installed
previously, you will first need to activate the environment in the session
that you are using. This means repeating some of the commands typed above. Of
course, you will not need to repeat the steps to create the environment or
install the software, but the following may be needed again:

```
module unload jaspy
source ~/miniconda3/bin/activate`
conda activate myenv`
```

## Installing pip packages

Many python packages that are available via PyPI are also available as conda
packages in conda-forge, and it is generally best to use these via "conda
install" as above.

Nonetheless, you can also install pip packages (as opposed to conda packages)
into your conda environment. However, first you should type:

```
conda install pip
```

before typing the desired commands such as

```
pip install numpy
```

If you do not install pip into your sub-environment, then either:

  * your shell will fail to find the `pip` executable, or
  * your shell will find `pip` in your base environment, which will lead to pip packages being installed into the base environment, resulting in potential interference between your conda environments

Explicitly installing pip into your sub-environment will guard against this.

## The mamba installer

When you install packages into a conda environment, the installer first has to
_resolve_ the environment. This means using available package dependency
metadata in order to decide which versions of packages to install, so as to
end up with a self-consistent environment. If you are working with a large
environment and/or working with legacy versions of packages, sometimes (in our
experience with preparing Jaspy environments) the conda installer can be very
slow and use a lot of memory, and may fail to resolve the environment. In this
situation, we have tended to find better performance with the
{{<link "https://github.com/mamba-org/mamba">}}mamba{{</link>}} installer, which uses a different
algorithm and is implemented in C++ rather than Python, for speed.

To use mamba, you would first type `conda install mamba`, and then you can use
`mamba install <package_name>` instead of `conda install <package_name>` in
order to install the other package(s) of interest. You would still use the
`conda` command for other operations such as `conda activate`.

If you will be using mamba in multiple sub-environments, then it might make
sense to install mamba into the base environment rather than each sub-
environment separately, despite our general suggestion of installing packages
into named sub-environments. To do this, you might need to use `conda
deactivate` to return to the base environment before installing mamba, then
re-activate your sub-environment to install other packages.

## Cloning a conda environment

There can be occasions when you wish to create a conda environment which is
based on the contents of an existing environment. An example when you might
wish to do this is in order to create an environment of your own which is
based on Jaspy but with certain changes such as the addition or removal of
certain packages. (Recall that your environment cannot be activated at the
same time as Jaspy.)

To do this, you can export a list of packages to a YAML file and use this file
to create the new environment -- as follows:

  * first activate the conda environment that you wish to clone (for Jaspy, load the jaspy module)
  * export a list of contents to a YAML file (for example "environment.yml") by typing  

```
conda env export > environment.yml
```

  * deactivate this environment (or as the case may be, unload the jaspy module)
  * ensure that the relevant base environment is activated
  * create the new environment (for example "my_new_env") by using:  


```
conda env create -n my_new_env -f environment.yml
```  

Note the use of "conda env create", rather than "conda create" as above.  
(As above, if you have installed mamba, you can also use "mamba" in place of
"conda" at this stage.)

You might also edit the YAML file before using it to create the environment if
you do not want an exact clone -- for example, adding packages, removing
packages that are not of relevance, or removing version requirements in order
to give the environment solver more flexibility about what versions to install
(for example if you do not require particular legacy versions, or if the
versions in the original environment are no longer available).

## Varying the installation location

(This is the section that is referred to above, where running the Miniconda
installer is discussed.)

The default installation location offered by the installer for your base
environment will be `~/miniconda3` (that is, a "miniconda3" subdirectory of
your home directory). We recommend accepting this default, or using another
location under your home directory. It is possible to change this, but note
that a conda environment can have tens of thousands of files and that group
workspaces on JASMIN will generally perform poorly for this use case. If you
need to make a conda environment which is shared with collaborators, you may
need to request a {{<link "share-software-envs">}}small files GWS{{</link>}} as
these will give better performance.

If you are creating a conda environment for very short-term testing only, you
may find best performance using `/tmp` due to the large number of files.
However, you may need several gigabytes, which is too big for the /tmp areas
on most of the "sci" machines at time of writing, although sci3, sci6 and sci8
have larger /tmp areas. Choose an appropriate machine, make use of the `df`
command to check available disk space, and ensure that you do not fill up /tmp
as this would impact negatively on other users.
