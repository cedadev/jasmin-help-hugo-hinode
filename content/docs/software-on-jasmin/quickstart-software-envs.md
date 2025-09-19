---
aliases: /article/4916-quickstart-software-envs
description: Quickstart for activating/deactivating software environments
slug: quickstart-software-envs
title: Quickstart for activating/deactivating software environments
---

This article provides a minimum quick-start guide for working with software environments on JASMIN.

## Activate (load) an environment

To activate an environment containing the "current" common software packages
(including a modern Python):

{{<command user="user" host="sci1">}}
module load jaspy
{{</command>}}

or for a specific version, see [how to discover what versions are available]({{% ref "jaspy-envs/#discover-which-environments-are-available" %}})

To activate additional packages (known as "jasmin-sci"):

{{<command user="user" host="sci1">}}
module load jasmin-sci
{{</command>}}

## Deactivate (unload) an environment

If you want to deactivate an environment that you have previously activated,
do:

{{<command user="user" host="sci1">}}
module unload <env-id>
{{</command>}}

Where "<env-id>" is the name used when you activated the environment.

## Which environment(s) should you use?

If you are not sure which environment(s) to use please see details on the
[overview]({{% ref "software-overview" %}}) of Jaspy and "jasmin-sci"
environments page.
