---
aliases: /article/4729-jaspy-envs
description: Jaspy Software Environments (Python 3, R and other tools)
slug: jaspy-envs
title: Jaspy Software Environments (Python 3, R and other tools)
---

This page provides details of the "Jaspy" software environments that provide
access to Python 3, R and a range of other tools on JASMIN.

## Overview

Jaspy is a toolkit for managing and deploying Conda environments that include
Python, R and other packages. Jaspy is used to provide software environments
of common packages on the scientific analysis servers and LOTUS cluster on
JASMIN.

One advantage of Jaspy is that multiple environments can co-exist on the same
platform. This allows us to retain previous environments and provide new ones
simultaneously. This may be particularly useful for scientists undertaking
long-running studies that require a consistent software environment to ensure
reproducibility and continuity.

## Working with Jaspy environments

### Quickstart for Python 3 environment

If you want to get on, you can select a Jaspy environment to "activate". This
means that once you have run these commands then the various tools and
libraries will be available in your current session.

{{<command user="user" host="sci1">}}
module load jaspy
{{</command>}}

### Activating the environment in scripts

If you want a particular script to activate a Jaspy environment then add the
"module" command to it, e.g.:

```bash
#!/bin/bash
module load jaspy
python do-something.py
```

### Setting your profile to always use a Jaspy environment

If you want all your JASMIN sessions to use a particular Jaspy environment
then you can add the `module load jaspy` command to your `$HOME/.bashrc` file.
In order to avoid issues with using "module load" on
unsupported servers, please wrap the call in an "if" clause, such as:

```bash
if [[ $(hostname) =~ (sci[0-9]|host[0-9]|cylc) ]] ; then
    module load jaspy
fi
```

## Discover which environments are available

You can list the currently available Jaspy environments using:

{{<command user="user" host="sci1">}}
module avail jaspy
(out)-------------------------  /apps/modulefiles  ----------------------------
(out)   jaspy/2.7/r20190715    jaspy/3.7/r20200606     jaspy/3.10/r20230718 (D)
(out)   jaspy/3.7/r20181219    jaspy/3.7/r20210320     jaspy/3.11/r20240302
(out)   jaspy/3.7/r20190612    jaspy/3.8/r20211105     jaspy/3.11/r20240508
(out)   jaspy/3.7/r20190627    jaspy/3.10/r20220721
{{</command>}}

This lists all jaspy modules (i.e. environments) that can be loaded.

### Jaspy Python 3.7+ (plus other tools) environments

The packages available in the Jaspy environments can be found by searching the
GitHub repository where the Conda environment files are defined. This table
lists all the Jaspy Python 3.7+ environments provided on JASMIN and specifies
the current (default) version.

Jaspy Python 3.7 Environment |  Versioned list of software packages |  Default? |  Comments / Issues
---|---|---|---
jaspy/3.11/r20240508  |  [List of packages including versions](https://github.com/cedadev/ceda-jaspy-envs/blob/main/environments/py3.11/mf3-23.11.0-0/jaspy3.11-mf3-23.11.0-0-r20240508/final-spec.yml) | No (will become the default on 22/05/2024) | [Release notes](https://github.com/cedadev/ceda-jaspy-envs/releases/tag/jaspy3.11_r20240508)
jaspy/3.11/r20240302  |  [List of packages including versions](https://github.com/cedadev/ceda-jaspy-envs/blob/main/environments/py3.11/mf3-23.11.0-0/jaspy3.11-mf3-23.11.0-0-r20240302/final-spec.yml) | No | [Release notes](https://github.com/cedadev/ceda-jaspy-envs/releases/tag/jaspy3.11_r20240302)
jaspy/3.10/r20220721  |  [List of packages including versions](https://github.com/cedadev/ceda-jaspy-envs/blob/main/environments/py3.10/m3-4.9.2/jaspy3.10-m3-4.9.2-r20220721/final-spec.yml) |  Yes (from: 18/10/2022)  |  NCO and NCL have now been moved to the {{<link "jasmin-sci-software">}}jasmin-sci{{</link>}} installation.
jaspy/3.8/r20211105  |  [List of packages including versions](https://github.com/cedadev/ceda-jaspy-envs/blob/master/environments/py3.8/m3-4.9.2/jaspy3.8-m3-4.9.2-r20211105/final-spec.yml) |  No (was default: 16/11/2021 - 17/102022)  |  Known problem with NCL rendering Shapefiles (see [issue](https://github.com/cedadev/ceda-jaspy-envs/issues/56)). Some packages were removed in this release due to dependency problems: theano, pymc3, pystan, pyngl,pyferret (see[issue](https://github.com/cedadev/ceda-jaspy-envs/issues/81)).
jaspy/3.7/r20210320  |  [List of packages including versions](https://github.com/cedadev/ceda-jaspy-envs/blob/master/environments/py3.7/m3-4.9.2/jaspy3.7-m3-4.9.2-r20210320/final-spec.yml)  |  No (was default:  20/05/2021 - 16/11/2021)  |  Known problem with NCL rendering Shapefiles (see [issue](https://github.com/cedadev/ceda-jaspy-envs/issues/56))
jaspy/3.7/r20200606  |  [List of packages including versions](https://github.com/cedadev/ceda-jaspy-envs/blob/master/environments/py3.7/m3-4.6.14/jaspy3.7-m3-4.6.14-r20200606/packages.txt)|  No  |  |
jaspy/3.7/r20181219  |  [List of packages including versions](https://github.com/cedadev/ceda-jaspy-envs/blob/master/environments/py3.7/m3-4.5.11/jaspy3.7-m3-4.5.11-r20181219/packages.txt)|  No  |  |
{.table .table-striped}

### Jaspy Python 2.7 (plus other tools) environments

This table lists all the Jaspy Python 2.7 environments provided on JASMIN and
specifies the current (default) version.

Jaspy Python 2.7 Environment |  Versioned list of software packages |  Default?
---|---|---
jaspy/2.7/r20190715 |  [List of packages including versions](https://github.com/cedadev/ceda-jaspy-envs/blob/master/environments/py2.7/m2-4.6.14/jaspy2.7-m2-4.6.14-r20190715/packages.txt)  |  Yes
{.table .table-striped}

### Jasr R environments
Environments for the "R" programming language are packaged into separate
software environments, known as "Jasr". This table lists all the Jaspy R
environments provided on JASMIN and specifies the current (default) version.

{{<alert type="danger" >}}
We are aware of a newly discovered vulnerability in the R Language (CVE-2024-27322) which allows arbitrary code execution from maliciously built RDS (R Data Serialisation) files.

We will be updating to the latest version of R as soon as possible to remove this vulnerability, but we do not plan to remove access to R beforehand.
Our advice, as always, is to not open data from untrusted sources and not to install untrusted packages from CRAN.

Please note that this position may change at short notice as more information becomes available- this notice was last updated on Friday 10th May 2024.
{{< /alert >}}

Jaspy R Environment ("Jasr") |  Versioned list of software packages|  Default?
---|---|---
jasr/4.3/r20240320  |  [List of packages including versions](https://github.com/cedadev/ceda-jaspy-envs/blob/main/environments/r4.3/mf3-23.11.0-0/jasr4.3-mf3-23.11.0-0-r20240320/final-spec.yml) | No (will become the default on 16/04/2024)  |
jasr/4.0/r20220729  |  [List of packages including versions](https://github.com/cedadev/ceda-jaspy-envs/blob/main/environments/r4.0/m3-4.9.2/jasr4.0-m3-4.9.2-r20220729/final-spec.yml)  |  Yes (from: 18/10/2022)
jasr/4.0/r20211110  |  [List of packages including versions](https://github.com/cedadev/ceda-jaspy-envs/blob/master/environments/r4.0/m3-4.9.2/jasr4.0-m3-4.9.2-r20211110/packages.txt)|  No  (was default: 16/11/2021 - 17/10/2022)
{.table .table-striped}

The available R environments can be listed with:

{{<command user="user" host="sci1">}}
module avail jasr
{{</command>}}

##  Understanding versioning with Jaspy/Jasr

Jaspy environments are labelled as "jaspy/<python_version>/<release>". The
environment is selected and activated using the "module load" command:

{{<command user="user" host="sci1">}}
module load jaspy/3.7/r20210320
{{</command>}}

However, if you wish to get the latest environment for a given Python version
you can omit the "<release>", as follows:

{{<command user="user" host="sci1">}}
module load jaspy/3.7
{{</command>}}

And if you just want the most up-to-date Python you can even omit the
`<python_version>`, as follows:

{{<command user="user" host="sci1">}}
module load jaspy
{{</command>}}

{{<alert type="info" >}}
If you choose to omit the `<release>` and `<python_version>`
components then it is important to be aware that the resulting environment may
differ over time. For continuity, you ay wish to use the full
environment specification.
{{< /alert >}}

## How Jaspy works: managing Python and non-Python packages using conda

[Jaspy](https://github.com/cedadev/jaspy-manager) is a framework for managing
multiple Python (and other) environments simultaneously on a single platform.
It was created in order to meet the requirements tabulated below.

**Requirement** |  **Details** |  **Jaspy solution** |  **Further info**
---|---|---|---
Reproducibility  | 1. Generate a specific set of packages and versions from a generic set of requirements. | 1. Conda has a powerful package-management workflow:<br>a. Begin with a minimal set of package/version requirements.<br>b. Generate a consistent environment.<br>c. Provide a detailed description of all exact packages/versions in the environment.|  Conda: [https://docs.conda.io](https://docs.conda.io/)  jaspy-manager: <https://github.com/cedadev/jaspy-manager/blob/master/README.md>  CEDA jaspy environments: <https://github.com/cedadev/ceda-jaspy-envs>
Documentation  |  Provide an appropriate level of documentation detailing which software packages exist in each release.  |  We use Conda "environment files" to build the environments. These list the packages and versions and are stored in public GitHub repositories, so each environment is documented as a collection of packages/versions.  |  See: <https://github.com/cedadev/jaspy-manager/blob/master/README.md>  Example package list: <https://github.com/cedadev/ceda-jaspy-envs/blob/master/environments/py3.7/m3-4.5.11/jaspy3.7-m3-4.5.11-r20181219/packages.txt>
Multiple simultaneous environments  |  Allow multiple, but separate, software environments to co-exist on a single operating system.  |  Conda is designed to allow multiple environments to co-exist. Within jaspy it is possible to document each environment. Therefore, multiple environments can be deployed on one system. Key advantages are:<br>- Supporting multiple versions of Python and side-by-side.<br>- Releasing an update to an environment as a "pre-release" so that users can adapt their code and test it whilst still having access to the "current" (production) environment.|
Manageability  |  Provide tools to easily construct, test, deploy, document and reproduce software environments.  |  Jaspy builds upon a set of excellent Conda command-line tools that simplify the package management process. Jaspy wraps the Conda functionality so that command-line tools can be used to build, test, deploy and distribute Conda environments for use by our community.  |
{.table .table-striped}

## Updates and tracking of Jaspy/Jasr environments

### History of environments on JASMIN

Please see the [Jaspy Python 3.7+ (and other tools) environments](#jaspy-python-27-plus-other-tools-environments) section
above for information about releases on JASMIN.

### Which environment is "current"?

Please refer to the [Jaspy Python 3.7+ (and other tools) environments](#jaspy-python-27-plus-other-tools-environments) section
above for information about the current release on JASMIN.

## Citing Jaspy environments

### Can I cite a jaspy (conda) environment?

We do not yet have an agreed approach for citing a Jaspy environment. However,
you can refer to the environment description URLs given in the table above.
These provide a definitive list of the software packages, their versions and
other information.

## Requesting updates to a Jaspy environment

If you would like us to add a new package, or an updated version, to the Jaspy
environments on JASMIN then please use one of the following approaches:

  1. Contact the JASMIN helpdesk with the subject: "Request for Jaspy update: <package name>"
  2. Get a GitHub account and add an issue to the `ceda-jaspy-envs` repository at:
    1. <https://github.com/cedadev/ceda-jaspy-envs/issues/new>

## Conda method of "activating" Jaspy environments

Jaspy environments can also be activated in a more traditional way using
standard the standard conda approach, for example:

{{<command user="user" host="sci1">}}
export PATH=/apps/jasmin/jaspy/miniconda_envs/jaspy3.7/m3-4.6.14//bin/conda:$PATH
source activate
conda activate jaspy3.7-m3-4.6.14-r20210320
{{</command>}}

This has the same result as the `module load` approach. The naming of the
environment identifiers includes the "Miniconda" version used to generate the
environment. The `module load` approach is recommended as the standard method
for activating Jaspy environments.

## Using Jaspy beyond JASMIN

Jaspy is a versatile and generic tool for managing multiple conda
environments. The code is open source, and more information is available at:

<https://github.com/cedadev/jaspy-manager>
