---
description: GeoCat - replaces NCAR Command Language (NCL)
slug: geocat-replaces-ncl
title: Geocat replaces NCL
---

## Introduction

This article introduces {{<link "https://geocat-viz.readthedocs.io/en/latest/">}}geocat{{</link>}} as a replacement on JASMIN for NCAR Command Language (NCL) which is now deprecated.

## NCL now deprecated

NCL is now deprecated by NCAR (see [this announcement](https://www.ncl.ucar.edu/Document/Pivot_to_Python/)),
there is no Rocky 9 version available, so we will not be providing it when JASMIN moves from CentOS to using
Rocky 9 in the next few months. The plan is to add to Jaspy the `geocat-viz` package, which is NCAR's Python
replacement for NCL. 

## Installation in a conda environment

To give you a chance now to familiarise yourself with `geocat-viz`, here are some
instructions for how you could install it in a Conda environment under your own home directory.

{{<alert alert-type="info">}}
Note that such an environment cannot be activated at the same time as Jaspy.
{{</alert>}}

Total disk space required is 3.2GB.

Commands marked with `#*` below will be needed again in order to activate the environment in later sessions.

Deactivate `jaspy` in this session:

{{<command user="user" host="sci-vm-01">}}
module unload jaspy     ##*
{{</command>}}

Download `miniforge` installer:

{{<command user="user" host="sci-vm-01">}}
wget <https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh>
{{</command>}}

Install base environment:

{{<command user="user" host="sci-vm-01">}}
bash Miniforge3-Linux-x86_64.sh
{{</command>}}

Accept the default answers to the questions, saying no to the question about `conda init`.

Activate the base environment:

{{<command user="user" host="sci-vm-01">}}
source ~/miniforge3/bin/activate  ##*
{{</command>}}

Create and activate an environment:

{{<command user="user" host="sci-vm-01">}}
mamba create -n my-geocat-env
conda activate my-geocat-env    ##*
{{</command>}}

Install the packages:

{{<command user="user" host="sci-vm-01">}}
mamba install geocat-viz geocat-datafiles
{{</command>}}

Try one of the examples from:\
https://geocat-examples.readthedocs.io/en/latest/gallery/index.html

{{<command user="user" host="sci-vm-01">}}
wget https://geocat-examples.readthedocs.io/en/latest/_downloads/efafc109e5344e8e33052ad5213ee4be/NCL_box_1.py
python NCL_box_1.py
{{</command>}}

(should display a plot)

Full documentation is at <https://geocat-viz.readthedocs.io/en/latest/>