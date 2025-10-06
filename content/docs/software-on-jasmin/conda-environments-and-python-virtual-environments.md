---
aliases: /article/5074-conda-environments-and-python-virtual-environments
description: Conda environments and Python virtual environments
slug: conda-environments-and-python-virtual-environments
title: Conda environments and Python virtual environments
---

{{<alert alert-type="danger">}}
Important changes took place in September 2024 affecting what software can be used on JASMIN.
Please read [this announcement](https://www.ceda.ac.uk/news/updates/2024/2024-08-29-important-software-changes-autumn/) carefully.

This supersedes the information below which has yet to be updated in line with this.
{{</alert>}}

## Introduction

This article describes two types of software environments that you can create
in order to install packages for your own use on JASMIN. Typical examples why
you may wish to do this is if you have asked us to add packages to
{{<link "jaspy-envs">}}Jaspy{{</link>}} but wish to make use of them before the next release, or
if they are not likely to be relevant to other users.

Separate pages explain the details of how to create and install {{<link "python-virtual-environments">}}Python
virtual environments{{</link>}} and {{<link "creating-and-using-miniforge-environments">}}Conda
environments{{</link>}}. This
page gives an overview of what they are, and how to choose which one is most
suitable for your needs.

## Description of Python virtual environments and Conda environments

- A Python virtual environment is a relatively lightweight environment, which is used for running Python packages, typically installed using the "pip" installer from the Python Package Index {{<link "https://pypi.org/">}}pypi{{</link>}} or locally from Python source containing a `setup.py` file. This enables you to install packages in your home directory without writing to the underlying Python installation itself (for example when you do not have write permission), and you can have any number of separate virtual environments and "activate" the relevant one when needed. When you run `pip` to install a Python package, additional Python packages may be installed automatically in order to satisfy dependencies. Depending on the package being installed, if it requires compiled libraries to accompany it, it may try to compile these locally, but depending what development libraries are available, occasionally this might not succeed.
- By contrast, a Conda environment is a much bulkier, more fully featured environment, using the `mamba` or `conda` package managers. This enables the installation of packages from conda channels, usually {{<link "https://conda-forge.org/">}}conda-forge{{</link>}}, which are not restricted to being Python packages. Where packages contain compiled libraries, these are generally available as pre-compiled binaries. As with python virtual environments, you can have any number of these environments and activate the required one. When you run the mamba or conda installer, similarly it will install whatever additional packages are required in order to satisfy dependencies. (It is also possible to use the pip installer when working with conda environments.) Various versions of the conda installer are available, but for use on JASMIN, we now ask users to use Miniforge, for licensing reasons.

### Environment size

To take an example of the size, a new Python virtual environment without
additional packages occupies about 10MB and contains under 1000 files (maybe
approximately twice this if using the `--system-site-packages` option
explained in more detail elsewhere), whereas as a new conda base environment
occupies about 400MB and contains over 20,000 files.

## Installation examples

To give an example of installing a Python package, the `numexpr` library is a
numerical expression evaluator for NumPy. It is available as a pip package
called `numexpr`, and also as a conda package called `numexpr`. (For some
packages, the two may have slightly different names.) It can be installed
successfully into either a Python virtual environment using
`pip install numexpr` or a conda environment using `mamba install numexpr`
(or `conda install numexpr`). In either case, the `numpy` package on which
it depends, amongst other things, will be installed automatically if required.

To give an example of installing a non-python package, `zsh` is a Unix shell
which combines various features of bash and csh. You cannot install this using
`pip install` because it is not a python package, but it is available on
conda-forge, and can be installed into a conda environment using `mamba
install zsh`.

## Combining environments

We already provide a wide range of packages via {{<link "jaspy-envs">}}Jaspy{{</link>}}.
This is in itself a conda environment, and it is important to note that
although you can use a Python virtual environment to install additional
packages when using a conda environment, you cannot have more than one conda
environment activated at the same time.

- When using Python virtual environments, you are advised to start by activating a Jaspy environment, as this will ensure that you are using a version of Python that we support, as well as significantly increasing the range of compiled libraries available during the `pip install` process. You can also use the `--system-site-packages` option to access the Python packages provided by Jaspy itself, as described in more detail on the {{<link "python-virtual-environments">}}virtual environments{{</link>}} help page.
- However, if you choose to use your own conda environment, then you will activate it **instead** of Jaspy, and you will need to install into it **everything** that you will need to accompany the package which you wish to use.

Note that because you can install `pip` packages into conda environment, it is
not generally useful to create a virtual environment in order to extend your
own private conda environment. The reason for creating one to extend Jaspy is
that users do not have write permission to add packages to Jaspy itself.

## Choosing between a Python virtual environment and a Conda environment

Because python virtual environments are much more lightweight that conda
environments, and also give you access to packages that we provide via Jaspy,
we would generally recommend that you start by trying a Python virtual
environment. However, this might prove not to be possible, for example
because:

- The package that you wish to install is not available via PyPI (perhaps it is not a Python package).
- The package that you wish to install depends on compiled libraries that do not build successfully during a `pip install`. Often pre-compiled versions will be available from conda-forge.

If you do decide to install a conda environment, then remember to install
additional packages that you might otherwise have used via Jaspy.
