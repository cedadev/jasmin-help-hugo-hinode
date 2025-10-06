---
aliases: /article/204-interactive-computing-overview
description: Interactive computing overview
title: Interactive computing overview
weight: 10
---

This article introduces the resources on JASMIN available for interactive
computing (as opposed to [batch computing]({{% ref "slurm-scheduler-overview" %}})). It covers:

- Login servers
- Scientific Analysis servers
- Data Transfer Servers

## Login Severs

The [login (also known as gateway or bastion) servers]({{% ref "login-servers" %}}) provide external* users with access to services inside of JASMIN.

*external = outside of the STFC/RAL firewall.

## Scientific Analysis Servers

The [scientific analysis servers]({{% ref "sci-servers" %}}) are the main
resource for most users' everyday work. They have a [standardised software
environment]({{% ref "software-overview#common-software" %}}) and are ideal for development and testing of
processing tasks which can then be submitted to the [LOTUS batch processing
cluster]({{% ref "slurm-scheduler-overview" %}}) for larger processing runs.

## Data Transfer Servers

General [data transfer servers]({{% ref "transfer-servers" %}}) are provided
for simple or smaller data transfer tasks. For larger data flows or where high
performance is required, more sophisticated tools and services are available.
See also [data transfer overview]({{% ref "data-transfer-overview" %}}).
