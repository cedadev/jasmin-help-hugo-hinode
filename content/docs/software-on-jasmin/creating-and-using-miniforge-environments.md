---
aliases: 
  - /article/5075-creating-and-using-miniconda-environments # preserve reachability of old HS article URL
  - /docs/software-on-jasmin/creating-and-using-miniconda-environments # preserve reachability of previously-named article
description: Creating and using miniforge environments
slug: creating-and-using-miniforge-environments
title: Creating and using miniforge environments
---

On JASMIN, we provide a wide range of packages via the {{<link "jaspy-envs">}}jaspy{{</link>}}
environment (which is itself a Conda environment). This page gives
detail on how to create and use your own personal Conda environments via the
`miniforge` installer, as an alternative to the use of Jaspy.

To decide which to use, please see this page: 
{{<link "conda-environments-and-python-virtual-environments">}}conda environments and python virtual environments{{</link>}}.

## Obtaining miniforge

In order to create your own conda environments, you will first need to
download the {{<link href="https://github.com/conda-forge/miniforge">}}miniforge{{</link>}}
installer.  This is a lightweight installer, and will also ensure that
packages are downloaded from the conda-forge channel (important for
licensing reasons).  For this reason, it should be used in preference to
either condaforge or Anaconda.

Miniforge can be downloaded using:

```bash
wget https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh
```

## Deactivating Jaspy

You cannot have your own conda environment activated at the same time as
Jaspy, so it is recommended that if you have loaded the jaspy module, then you
start by typing:

```bash
module unload jaspy
```

## Creating a base environment

You can run the installer by typing:

```bash
bash Miniforge3-Linux-x86_64.sh
```

You will be asked to confirm the licence agreement, to choose an installation
location, and to decide whether it should run "conda init". It is recommended
that you:

- Accept the default location (`~/miniforge3`). If you need to change this, see
the section "Varying the installation location" near the end of this page for more info.
- Say **no** to the question about `conda init`, because saying yes will cause it to add
lines to your `~/.bashrc` file causing your base environment to be activated every time
you log in, which may interfere with the use of Jaspy. If you say no, you can still
follow the instructions below when you wish to activate your base environment.  

(Add the `-b` option at the end of the above command to run the installer in
batch mode, which will also skip the "conda init". Or add `-h` to see help on
other available command-line options.)

## Activating the base environment

Assuming that you made the choices recommended above when running the
installer, you should type the following in order to activate the base
environment:

```bash
source ~/miniforge3/bin/activate
```

(You may encounter documentation elsewhere which suggests `conda activate`
instead, but the above command is a workaround for the fact that you have not
run `conda init`, the reasons for which are explained above.)

Your command prompt will then change to include `(base)` at the start, in
order to remind you that this environment is activated. You can deactivate the
environment by typing:

```bash
conda deactivate
```

## Creating and activating a sub-environment

Although once you have activated the base miniforge environment, you can in
principle start to install packages immediately, your use of miniforge will
generally be better organised if you do not install packages directly into the
base environment, but instead use a named sub-environment. You can have
multiple sub-environments under a single base environment, and activate the
one that is required at any one time. These sub-environments will work independently.

Miniforge provides two installer programs: `conda` and `mamba`. These use
different algorithms, and mamba is implemented in C++ while conda is
implemented in Python.  Both commands work with the same type of environments,
here referred to as "conda environments", but in our experience from preparing the
Jaspy environments, mamba is faster than conda and uses less memory. Therefore,
our recommendation is to use mamba for installing environments.  However, if
you are not running `mamba init`, then you will need to use the `conda`
command when activating or deactivating environments.  The commands shown on this
page reflect this, but if you prefer, you can use `conda` throughout.
Also, for some of the commands not involving package installation, e.g. when
listing environments, the two commands can be used interchangeably, although
the `mamba` command is shown on this help page.

To create a named environment (for example, called `myenv`), ensure that the
base environment is activated (the command prompt should start with `(base)`),
and type:

```bash
mamba create -n myenv
```
  
It will show the proposed installation location, and once you answer the
prompt to proceed, will do the installation. If you have followed these
instructions, this location should be
`/home/users/<your_username>/miniforge3/envs/myenv`. You can alternatively
give it a different location using the option `-p <path>` instead of `-n
<name>`.

Once you have created your sub-environment, you can activate it using
`conda activate <name>` for example:

```bash
conda activate myenv
```

although you can also activate it using its full path, useful if you used the
`-p` option to specify a non-standard path for the environment, for example:

```bash
conda activate /gws/smf/j04/mygws/myenv
```

The command prompt will then change (e.g. to start with `(myenv) `) to reflect
this. Typing `conda deactivate` once will return you to the base environment;
typing it a second time will deactivate conda completely (as above).

```bash
mamba env list
```

will list your environments.

## Installing conda packages

Once you have activated a named environment, you can install packages with the
`mamba install` command, for example:

```bash
mamba install gcc
```

You can also force particular versions to be installed. For example:

```bash
mamba install gcc=13.2.0  # exact version
mamba install "gcc>=13.2.0"  # greater than or equal to
mamba install "gcc>=13.2.0,<14"  # AND
```

(Here, quotation marks are needed to protect the `<` and `>` symbols from the shell.)

You can also search for available versions, using for example:

```bash
mamba search gcc
```

To list the packages installed in the currently activated environment, you can
type `mamba list`.  This should normally indicate that all packages are from the
`conda-forge` channel.  You can install from a channel other than `conda-forge`
by using the `-c` option, for example:

```bash
mamba install -c ncas cf-python   # install cf-python from 'ncas' channel
```

but for licensing reasons, **do not use the Anaconda defaults channel**.

## Running packages from your conda environment

In order to run packages from a conda environment that you installed
previously, you will first need to activate the environment in the session
that you are using. This means repeating some of the commands typed above. Of
course, you will not need to repeat the steps to create the environment or
install the software, but the following may be needed again:

```bash
module unload jaspy
source ~/miniforge3/bin/activate
conda activate myenv
```

## Installing pip packages

Many python packages that are available via PyPI are also available as conda
packages in conda-forge, and it is generally best to use these via `mamba install`
as above.

Nonetheless, you can also install pip packages (as opposed to conda packages)
into your conda environment. However, first you should type:

```bash
mamba install pip
```

before typing the desired commands such as

```bash
pip install numpy
```

If you do not install pip into your sub-environment, then either:

- your shell will fail to find the `pip` executable, or
- your shell will find `pip` in some other location, which might lead to pip packages being installed in an unexpected location, possibly resulting in interference between your environments

Explicitly installing pip into your sub-environment will guard against this.

Before running `pip install`, you could check that `pip` is being run from the correct place, by typing:

```bash
which pip
```

and it should report something like:

```bash
~/miniforge3/envs/myenv/bin/pip
```

## Cloning a conda environment

There can be occasions when you wish to create a conda environment which is
based on the contents of an existing environment. An example when you might
wish to do this is in order to create an environment of your own which is
based on Jaspy but with certain changes such as the addition or removal of
certain packages. (Recall that your environment cannot be activated at the
same time as Jaspy.)

To do this, you can export a list of packages to a YAML file and use this file
to create the new environment -- as follows:

- first activate the conda environment that you wish to clone (for Jaspy, load the jaspy module)
- export a list of contents to a YAML file (for example `environment.yml`) by typing  

```bash
mamba env export > environment.yml
```

- deactivate this environment (or as the case may be, unload the jaspy module)
- ensure that the relevant base environment is activated
- create the new environment (for example `my_new_env`) by using:  

```bash
mamba env create -n my_new_env -f environment.yml
```  

Note the use of `mamba env create`, rather than `mamba create` as above.  

You might also edit the YAML file before using it to create the environment if
you do not want an exact clone -- for example, adding packages, removing
packages that are not of relevance, or removing version requirements in order
to give mamba more flexibility about what versions to install
(for example if you do not require particular legacy versions, or if the
versions in the original environment are no longer available).

## Varying the installation location

(This is the section that is referred to above, where running the Miniforge
installer is discussed.)

The default installation location offered by the installer for your base
environment will be `~/miniforge3` (that is, a `miniforge3` subdirectory of
your home directory). We recommend accepting this default, or using another
location under your home directory. It is possible to change this, but note
that a conda environment can have tens of thousands of files and that group
workspaces on JASMIN will generally perform poorly for this use case. If you
need to make a conda environment which is shared with collaborators, you may
need to request a {{<link "share-software-envs">}}small files GWS{{</link>}}{{< ref "" >}} as
these will give better performance.

If you are creating a conda environment for very short-term testing only, you
may find best performance using `/tmp` due to the large number of files.
However, you may need several gigabytes, which is too big for the `/tmp` areas
on most of the `sci` machines at time of writing, although the physical
sci machines (currently `sci-ph-01` and `sci-ph-02` for Rocky 9)
have larger `/tmp` areas.
Choose an appropriate machine, make use of the `df`
command to check available disk space, and ensure that you do not fill up `/tmp`
as this would impact negatively on other users.
