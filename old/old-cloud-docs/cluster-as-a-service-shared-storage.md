---
aliases: /article/4798-cluster-as-a-service-shared-storage
description: Cluster-as-a-Service - Shared storage
slug: cluster-as-a-service-shared-storage
title: Cluster-as-a-Service - Shared storage
---

This article describes how to deploy and use shared storage clusters using
JASMIN Cluster-as-a-Service (CaaS).

## Introduction

CaaS provides shared storage clusters that can be mounted on multiple nodes to
provide common storage across all those nodes.

These storage clusters are not intended to be directly consumed by users, but
are taken as cluster configuration options by other clusters. In particular,
[Slurm clusters]({{% ref "cluster-as-a-service-slurm" %}}) take a shared
storage cluster as a configuration option - the shared storage is mounted on
each cluster node for user home directories.

## NFS

{{<link "https://en.wikipedia.org/wiki/Network_File_System">}}Network File System (NFS){{</link>}}
is a protocol for accessing remote network-attached storage. NFS is also used
to refer to the implementation of the protocol in the Linux kernel.

A CaaS NFS shared storage cluster provides a simple
NFS server. A volume is
attached of the specified size, formatted as an {{<link "https://en.wikipedia.org/wiki/XFS">}}XFS filesystem{{</link>}}, mounted at `/srv` and exported with no authentication.

NFS servers do not get an external IP, and so are only accessible from the
tenancy's internal network.

### Cluster configuration

The following variables are available to configure an NFS cluster:

Variable |  Description  |  Required?  |  Can be updated?  
---|---|---|---  
Identity manager  |  The CaaS Identity Manager that is used to control access to the cluster.  |  Yes  |  No  
Volume size  |  The size of the NFS data volume in GB.  |  Yes  |  No  
Size  |  The size to use for the NFS server.  |  Yes  |  No
{.table .table-striped}
