---
aliases: /article/204-interactive-computing-overview
description: Interactive computing overview
title: Interactive computing overview
weight: 10
---

This article introduces the resources on JASMIN available for interactive
computing (as opposed to [batch computing]({{< ref "slurm-scheduler-overview" >}})). It covers:

- Login servers
- Scientific Analysis servers
- Data Transfer Servers
- Project Specific Servers

## Login Severs

The [login (also known as gateway or bastion) servers]({{< ref "login-servers">}}) provide external* users with access to services inside of JASMIN.

*external = outside of the STFC/RAL firewall.

## Scientific Analysis Servers

The [scientific analysis servers]({{< ref "sci-servers" >}}) are the main
resource for most users' everyday work. They have a [standardised software
environment]({{< ref "software-overview#common-software" >}}) and are ideal for development and testing of
processing tasks which can then be submitted to the [LOTUS batch processing
cluster]({{< ref "slurm-scheduler-overview" >}}) for larger processing runs.

## Data Transfer Servers

General [data transfer servers]({{< ref "transfer-servers" >}}) are provided
for simple or smaller data transfer tasks. For larger data flows or where high
performance is required, more sophisticated tools and services are available.
Please read the guides in consult the [data transfer
category](http://help.ceda.ac.uk/category/217-data-transfer) for more details.

## Project-Specific Servers

In some cases in the past, project requirements were not met by the general resources
provided above and [project-specific servers]({{< ref "project-specific-servers" >}}) were provided.
However these are now deprecated as in most cases, a [tenancy in the
JASMIN Cloud](http://help.ceda.ac.uk/category/65-for-cloud-tenants) should provide what's needed.
