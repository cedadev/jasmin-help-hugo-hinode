---
aliases: /article/147-cylc-rose-on-jasmin
description: Workflow Management with rose/cylc
slug: rose-cylc-on-jasmin
tags:
- JULES
- cylc
- rose
title: Workflow Management with rose/cylc
---

This page provides is an overview of Met Office tools (Rose, Cylc and FCM)
that are installed on JASMIN for running and managing suites on the LOTUS
cluster.

 **IMPORTANT** : Users of the **JULES** land surface model are advised to log
into the Cylc server in order to launch the JULES suite.

## About rose/cylc

Rose and Cylc are very useful workflow management tools. You can:

- Configure a Rose suite to work with the LOTUS batch cluster on JASMIN.
- Run a Rose suite and monitor its progress using the Cylc GUI.

Find out more

- Rose: <https://metomi.github.io/rose/doc/html/>
- Cylc: <https://cylc.github.io/doc/built-sphinx/>

Getting started with rose/cylc

The tools are installed under the following common directory which is visible
on all LOTUS nodes and the dedicated cylc server:

## Add the location of the rose/cylc executables to $PATH

```bash
export PATH=/apps/jasmin/metomi/bin:$PATH
```

Jobs must be scheduled from the JASMIN server: `cylc.jasmin.ac.uk`

All users with a JASMIN login account can log in to this server.

Access to the Met Office Science Repository Service has also been set up. For
information about authentication to the repositories see:
<https://code.metoffice.gov.uk/trac/home/wiki/AuthenticationCaching#JASMIN>

Following these instructions will give you access to FCM.

If you would like to run the cylc GUI then please login through the 
[NoMachine servers]({{% ref "graphical-linux-desktop-access-using-nx" %}}).

## Example rose/cylc suite

Please see the JASMIN Workshop tutorial for a {{<link "https://github.com/cedadev/jasmin-workshop/tree/master/tutorials/tut02">}}worked example{{</link>}} of setting up a rose/cylc suite and run it on LOTUS.

## Setting up the "suite.rc" file for use with LOTUS

For use on JASMIN, you will need to configure the `suite.rc` to run on LOTUS
(using the Slurm scheduling tool):

```txt
[[job submission]]
    method = slurm
    execution time limit = PT15M
[[directives]]
    -q = short-serial
    -W = 05:00
    -n = 1
```
