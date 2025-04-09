---
description: Removal of packages from anaconda "defaults" channel in user environments on JASMIN
slug: conda-removal
title: Conda removal
---

## Background

Following a change in the licensing conditions by Anaconda, it is now the case
that all users of the Anaconda `defaults` Conda package channel (repository)
from organisations of 500 or more employees are potentially liable to pay for
usage, even if it is for the purpose of academic research.

This does not affect packages from the community channel `conda-forge`, which
remains free to use, as also does the conda installer program itself.

It has to be assumed that JASMIN users in general would potentially be subject
to contractual liability if Conda packages from the defaults channel are used,
so it has been decided that these are not to be used on JASMIN.

The JASMIN team have now taken steps to ensure that centrally-provided
environments including Jaspy make use only of conda-forge, but as regards
packages in users' own directories, the responsibility falls on individual
users to do the same.

These days, the `miniforge` installer is available to install conda
environments, and this will install packages from conda-forge by default, but
we have found there to be many user conda environments on JASMIN which contain
packages from `defaults` -- either because these environments pre-date the use
of miniforge, or because the channel was specified explicitly during
installation -- and these need to be addressed.

Because of the sometimes complex dependencies between packages in conda
channels, it is difficult to automate the removal of packages from the
defaults channel, if the desired end result is a usable conda environment
containing equivalent packages from conda-forge.  Some manual decision-making
may be needed, and this document is a guide to help you to do this.

Please note that this page is a best-efforts guide only.  Ultimately *you*
are responsible for the contents of the conda environments in your own
user directories (including group workspaces, etc).  We cannot warrant
that following these instructions will succeed in removing all the packages
for which you could incur charges, despite that being the intention.

## What conda environments do I have?

You can generally discover which conda environments you have created, by
typing `conda env list` (when you have an environment activated), or by
looking in your `~/.conda/environments.txt` file.  Occasionally, for some
reason some environments might not be listed, so here are some other likely
places where you might find conda environments that you have created:

- Under `~/miniconda3/envs` or `~/anaconda3/envs` or `~/miniconda3/envs` or
   `~/mambaforge3/envs`.
- Also variants of the above without the `3`, or with a `2` in place of the 3
   (for environments created using the Python 2 installer versions).
- Under `~/.conda/envs` (note the dot).
- (If you have used a custom directory), in other subdirectories of the same
  `envs` directories as used by the other conda environments that are
  displayed by `conda env list`.

Note that if you have created named conda environments, you will usually also
have the associated installer base environments.  For example, if you have
environment `~/miniconda3/envs/myenv` then the base environment is at
`~/miniconda3`.

## Which channels do my installed conda packages use?

There are various ways to list the contents of an environment: the names of
the packages and the channels they come from. Select one of the following:

- To get a list of packages with their channel names, activate the environment
  and then type `conda list`.  However, note that if the channel is not
  mentioned in the output, then the package is from the `defaults` channel
  (also known as `main`). The list will also include any pip-installed
  packages, and these will say `pypi` instead of a conda channel.
  
- Or to display the channel URL for each of the packages, inspect the JSON
  files in the `conda-meta` subdirectory of the environment. After activating
  the environment (which sets the `CONDA_PREFIX` variable), you could type:

{{<command>}}
grep '"channel"' $CONDA_PREFIX/conda-meta/*.json
{{</command>}}

- There is also a file called `$CONDA_PREFIX/conda-meta/history` containing:
  the commands that you used in order to install packages (see lines beginning
  with `# cmd`), which packages were installed (lines beginning `+`), and
  which were removed (lines beginning `-`).  In each case, the channel name is
  shown along with the package.

Whichever of these you do, any packages that are from the `main` / `defaults`
channel are part of the paid offering, and will need to be removed. If any
exist, these *should* show up in the list of channel URLs as being under
`https://repo.anaconda.com/pkgs/main/` (or
`https://repo.anaconda.com/pkgs/r/` for the R language packages).

However, especially because the `conda list` output does not list a channel
name where it is `defaults`, the safest approach may be to list everything
that is *not* from conda-forge, and then remove these packages unless they are
from known free channels. So after activating the environment, you could type:

{{<command>}}
conda list | egrep -vw `conda-forge|pypi`
{{</command>}}

(Note that if the environment is already clear of any such packages, you
will still see the header lines in the output of this command, so if you
see no output at all then something went wrong.)

## How do I replace packages that use the defaults channel?

Once you have identified which environments you have and which packages in
them are from the `main` / `defaults` channel, here is how to go about
replacing these packages with equivalents from `conda-forge`.

Before starting on this procedure, check whether you have a file called
`~/.condarc`. If you do, and if it contains a line that references the
`defaults` channel, then remove that line.

## Base environments

First, let's deal with the base environments.

Your approach to the base environments will depend on whether these were
installed using the miniforge/mambaforge installers, or miniconda/anaconda.

### miniforge / mambaforge base environments

You should hopefully have found that it is already true that any such base
environments only contain packages from the `conda-forge` channel, so that you
do not have to do anything with these.  (In the unlikely event that this is
not the case, then deal with them as per the advice for named environments
given below.)  Furthermore, the `conda` or `mamba` commands that they provide
in order to install other environments should default to only using
`conda-forge` (provided that you don't have a `~/.condarc` file that overrides
this).

### miniconda / anaconda base environments

(You can skip this subsection if you don't have any miniconda/anaconda base
environments.)

By contrast to the above, these base environments will contain packages from
the `defaults` channel, and also, the `conda` command in these environments
will by default try to install packages from that channel.  For this reason,
we recommend that these base environments should be deleted completely.

If the base environment does not contain (inside its `envs` subdirectory) any
named environments that you wish to keep, then you can simply delete it, for
example: `rm -fr ~/miniconda3`

However, if it does, then you can keep the `envs` subdirectory and delete the
subdirectories *other* than `envs`, for example by doing:

{{<command>}}
cd ~/miniconda3
mkdir to-delete
mv * to-delete/
mv to-delete/envs ./
ls to-delete  ## check what we are about to delete
rm -rf to-delete
{{</command>}}

You *won't* need the miniconda base environment just in order to use one of
the named sub-environments inside it, because you can instead use a miniforge
base environment to provide the `conda` and `mamba` executables.  If you do
not already have miniforge installed, you can get the installer
{{<link "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh" >}}here{{</link>}}.

Assuming that you have installed a miniforge base environment at `~/miniforge3`,
you can activate one of your old miniconda environments by specifying its full
path after activating the base environment.  For example, this might look like:

{{<command>}}
source ~/miniforge3/bin/activate
conda activate ~/miniconda3/envs/myenv
{{</command>}}

(Do not be tempted just to move the environment to a new path under
`~/miniforge3/envs` in order to avoid the need to type the full path, because
it will probably contain hard-coded paths which would not work if it is moved.
However, you could create a symbolic link.)

Remember that in the sub-environments you are keeping, you will need to purge
any packages that use the paid channels, as described below.

## Named environments

By this point, your only base environment(s) should be miniforge (or
mambaforge) environments, but you may have a number of named environments
that contain packages from the defaults channel, which need dealing with.

Mostly, any such named environments will be ones that were created using
miniconda (which you will now activate via the miniforge base environment as
described above).  However it could still arise that you have mambaforge
environments containing packages from `defaults`, if this was specified either
in your `.condarc` file or in a `.yml` file that you used to create the
environment.

How you deal with these environments will probably depend on the number of
packages from the defaults channel that they contain.  We would suggest that
if they only contain a small number, then you can attempt to patch the
existing environment, but if they contain a larger number then it will be
best to create a new environment with similar contents but from `conda-forge`.
Here are the details:

### Patching an existing environment

This is a suggested approach where you have an environment that only has a
small number of packages that are from the defaults channel.

- Activate the environment.
- Try typing `conda remove` followed on the command line by a list of the
  affected packages, and see which packages it proposes to remove, bearing in
  mind that if other packages depend on the ones in question, they will be
  included also.
- If the list is reasonably short, then confirm the changes, and after that,
  reinstall the packages, including any dependent packages, using

  {{<command>}}
  conda install -c conda-forge --override-channels package1 [package2...]
  {{</command>}}

  substituting here the names of the relevant packages.  (The installation
  options shown above should make sure that new the packages come from
  conda-forge, even if there is still some `.condarc` file that says
  otherwise.)
  
  You can also use `mamba` instead of `conda` here, to use the `mamba`
  installer.

  Once you have done this, remember to recheck the list of packages and
  channels. (For example, if you do `conda list`, do they now all show up as
  being from conda-forge?)

- If the list of dependencies is unacceptably long, then answer no.  You will
  probably have to recreate the environment instead, as shown below.  (You
  could perhaps instead *attempt* to reinstall the relevant packages by
  adding the `--force-reinstall` option on the `conda install` command
  instead of a separate `conda remove` step first, but when we tried an
  example, this did not succeed -- there may be dependencies on exact
  release versions, for example.)

### Recreating an environment

This suggestion is for where too many changes are needed to be able to
modify the existing environment easily.

It is important to note that although there is a possible procedure for
obtaining an exact copy of an environment (namely: export a list of packages
to a file including all the exact version and release numbers, and then use it
to create the new environment), the aim here is, rather, to produce an
*equivalent* environment based on packages from conda-forge.  Package releases
will differ slightly from what is available in the defaults channel.  So it
will be best to be avoid constraining the requirements too rigidly, in order
give the installer the flexibility it needs to choose mutually compatible
versions of all of the packages.

The aim, therefore, will be to repeat the *steps* that you used (for example,
install matplotlib), rather than try to replicate the exact versions that you
ended up with.

You can see what conda install commands you ran previously, by going to the
environment directory of the old environment (if you have activated the
environment, this will be at `$CONDA_PREFIX`), and typing:

{{<command>}}
grep "# cmd" conda-meta/history
{{</command>}}

In addition to any conda install commands, it is possible that you also
installed Python packages using `pip install`.  The specific commands will
probably not have been recorded (other than the limited record in your
`~/.bash_history` file), but if you activate the old environment and type `pip
freeze`, this shows which Python packages are installed.  To see just the ones
that were *not* installed via conda packages, type:

{{<command>}}
pip freeze | grep -v " @ "
{{</command>}}

Note that this list will contain any packages that were installed
automatically for dependencies, in addition to the ones that you installed 
explicitly.

Once you have obtained this information, you are in a position to repeat
the installation.  First ensure that you have deactivated any other 
conda environments in your session, and then activate your miniforge 
base environment.  Depending where this is located, a typical example 
would be:

{{<command>}}
source activate ~/miniforge3/bin/activate
{{</command>}}

Then you will repeat the conda install commands that you typed -- or
optionally, replace `conda create` with `mamba create` to use the (more
efficient) mamba installer (and likewise with `mamba env create` and 
`mamba create` where appropriate).  Note the following:

- If you created the old environment using `conda env create` and a `.yml`
  file, and you still have this file available, then before reusing it, 
  look at the `channels` section (usually near the top), and edit to to ensure
  that `conda-forge` is listed and `defaults` is not.

  If you used `conda env create` but no longer have the `.yml` file, then 
  see below for an alternative approach.

- After you have created the environment, remember to activate it before
  issuing any later `conda install` (or `mamba install`) commands.  Otherwise
  you will end up installing the packages into your base environment instead.

Then install the additional pip packages, using `pip install [package_name]`.
Again, this should be after activating the environment.  Note that:

- You only need to name the packages that your code is importing explicitly;
  any dependencies will be installed for you.

- Remove the version requirements (e.g. `pip install dask` instead of `pip
  install dask=2023.2.0`) if you wish to install a recent version instead of the
  originally used version.

- If you created the environment from a `.yml` file that contains a `pip` section,
  then some or all of these may already have been installed for you by this stage.

- You can also put multiple package requirements into a file (typically
  called `requirements.txt`) and install them using `pip install -r
  [filename]`.  For example, it might be more convenient to do this if you
  choose to reinstall everything that was reported when you ran the `pip
  freeze | grep -v " @ "` command in the old environment, rather than a
  selected few packages.

Once you have got your new environment installed and working, **remember to
delete the old one**.

#### What to do if a previously used YAML file is no longer available

If you do not have a record of packages based on the conda history (for example,
because they refer to a `.yml` file that no longer exists), then you will need to
start from the list of installed packages in the old conda environment.

To do this, start by activating the old environment, and then export the package
list to a file:

{{<command>}}
conda env export > environment.yml
{{</command>}}

You will use this file to create the new environment.  But first, you should 
edit the file:

- In the `channels` section, ensure that `conda-forge` is included and
  `defaults` is not.

- Then go through and simplify it as much as possible, so that it contains
  the list of necessary packages but does not constrain the environment too 
  tightly, for reasons discussed above:
  
  - Remove packages that you do not recognise; only include what you will 
    use explicitly.  Remember that any dependencies will get added for you
    automatically.  This applies both to the list of conda packages and also 
    any packages from PyPI if the file contains a `pip:` section.
  - Relax the version numbers: definitely remove the exact release (after the
    second `=` sign), and also consider removing the package version number
    -- or possibly changing it to `>=` to permit also more recent versions.
    For example, change `sqlite=3.41.2=h5eee18b_0` to just `sqlite` or
    `sqlite>=3.41.2`.

Once you have done this, activate your miniforge base environment, and then 
use it create your new environment, for example:

{{<command>}}
conda env create -n my_new_env -f environment.yml
{{</command>}}

or using the `mamba` installer:

{{<command>}}
mamba env create -n my_new_env -f environment.yml
{{</command>}}

As above, remember to delete your old environment afterwards.
