---
aliases: /article/273-software-on-jasmin
description: Overview of software on JASMIN
slug: software-overview
title: Software Overview
---

JASMIN is a large platform where a range of software tools, packages and
environments are available. Many users employ software already installed on
JASMIN whilst some need to install their own tools for a particular purpose.

This page provides an overview of the software on JASMIN. It links to further
information about a range of tools and environments.

To help get you started, these have been split into categories:

- Software available to all on JASMIN analysis/batch servers
- Additional tools for compiling and building software
- Restricted software
- Server-specific software
- Data movement software

## Which software should I use?

There are a lot of different options when you are trying to work out which
tools and/or environments to use on JASMIN. Here are some quick questions to
help you get started:

1\. Do you want to use NAME, JULES, or MOOSE?

- If yes, see: Restricted software

2\. Do you want a workflow management tool or a graphical Linux desktop?

- If yes, see: Server-specific software

3\. Do you want tools for transferring data or migrating it to/from tape?

- If yes, see: Data movement software

4\. If you need anything else:

- See: Software available to all on JASMIN analysis/batch servers

## Software available on all sci/batch nodes

### Data analysis and visualisation tools

If you are looking for software packages and environments that allow you to
analyse, process and visualise data then take a look at these options:

- Jaspy software environments (Python, R and other tools)
- The "jasmin-sci" software environment (packages not provided by Jaspy)
- Additional packages (provided under: "/apps/jasmin")
- IDL (and MIDL)
- Creating your own software environments

**NOTE** : If you are using Matplotlib to visualise data please refer to the
advice on our [Matplotlib help page]({{% ref "matplotlib" %}}).

### Jaspy Software Environments (Python, R and other tools)

Jaspy is a toolkit for managing and deploying Conda environments that include
both Python and non-Python packages. Jaspy environments, along with the
"jasmin-sci" environment (see below), provide the main software on the
scientific analysis servers and LOTUS cluster on JASMIN. Details of the Jaspy
environments and packages are available on the [Jaspy page]({{% ref "jaspy-envs" %}}).

### The "jasmin-sci" Software Environment

The "jasmin-sci" software environment is intended as a supplement to Jaspy
(see above). It contains extra software packages for use with scientific data
analysis which, for various reasons, are not provided as part of Jaspy itself.
Details of this environment are provided on the 
["jasmin-sci" software page]({{% ref "jasmin-sci-software" %}}).

### Additional packages

A number of additional packages are available under the "/apps/jasmin/"
directory scientific analysis servers and LOTUS cluster. Details of these
packages are provided on the [additional sofware packages page]({{% ref "additional-software" %}}).

### IDL

{{< link "https://www.nv5geospatialsoftware.com/Products/IDL" >}}IDL{{</link>}} stands for
Interactive Data Language. It is a licensed data manipulation toolkit made
available on JASMIN. IDL is available on the JASMIN scientific
analysis servers and LOTUS cluster. See [IDL]({{% ref "idl" %}}).

### Creating your own software environments

If you intend to create your own software environments then please take a look
at the following pages:

  * [Building virtual environments on top of Jaspy environments]({{% ref "python-virtual-environments" %}})
  * [Sharing your JASMIN software environments with other users]({{% ref "share-software-envs" %}})
  * Compilers on JASMIN

## Restricted software available on specific servers

### Workflow Management with Rose and Cylc

Rose and Cylc provide a suite of tools available for managing sophisticated
multi-step workflows. See full details on the 
[Rose and Cylc page]({{% ref "rose-cylc-on-jasmin" %}}).

### Graphical Linux desktop access using NoMachine NX

NoMachine NX is a tool that allows users to run a virtual graphical Linux
desktop on JASMIN. See details on the [NX page]({{% ref "graphical-linux-desktop-access-using-nx" %}}).

## Data movement software

### Data transfer

There are numerous tools for transferring data to/from JASMIN. Please consult
the [Data Transfer Tools page]({{% ref "data-transfer-tools" %}}) for details.

### Data migration disk/tape

The Joint Data Migration App, or JDMA, is a flexible tool for managing
large migrations of data between a range of storage media. On JASMIN, it can
be used for migrating data to/from tape, disk and object-store. See more
details on the [JDMA page]({{% ref "jdma" %}}).

### Still have a question?

Please consult the [JASMIN software FAQs]({{% ref "jasmin-software-faqs" %}}).
