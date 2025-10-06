---
aliases: /article/4799-cluster-as-a-service-slurm
description: Cluster-as-a-Service - Slurm
slug: cluster-as-a-service-slurm
title: Cluster-as-a-Service - Slurm
---

This article describes how to deploy and use a Slurm cluster using JASMIN
Cluster-as-a-Service (CaaS).

{{< alert alert-type="danger" >}}
CaaS Slurm clusters are currently disabled because of a security problem
with the images that were being used. We are working on a new system which
will provide slurm clusters.
{{< /alert >}}

## Introduction

The [Slurm Workload Manager](https://slurm.schedmd.com/) is a popular open-
source job scheduler. It provides facilities for executing and monitoring
workloads across a set of nodes and managing contention for those nodes by
maintaining a queue of pending jobs.

Slurm is a powerful scheduling system, and a full discussion of the available
commands and options is beyond the discussion of this article - please consult
the Slurm documentation. This article focuses on the specifics of how to
deploy and access a Slurm cluster in CaaS.

In CaaS, a Slurm cluster consists of a single login node and several worker
nodes. The Linux users and groups on the cluster are managed by the [Identity
Manager]({{% ref "cluster-as-a-service-identity-manager" %}}) for the tenancy,
meaning that SSH access to the nodes can be controlled using FreeIPA groups.
User home directories are mounted on all nodes using a [shared storage
cluster]({{% ref "cluster-as-a-service-shared-storage" %}}). Slurm is
configured with a single queue, to which all the compute hosts are added.

The login node can optionally be assigned an external IP, however external IPs
are a scarce resource in the JASMIN Cloud - if you want to preserve your
external IPs for other clusters, you can use the Identity Manager gateway host
as a jump host.

## Cluster configuration

The following variables are available to configure a Slurm cluster:

| Variable |  Description  |  Required?  |  Can be updated? |
|---|---|---|---|
| Identity manager  |  The CaaS Identity Manager that is used to control access to the cluster.  |  Yes  |  No  |
| Shared storage  |  The shared storage cluster to use for user home directories.  |  Yes  |  No  |
| Worker nodes  |  The number of worker nodes in the cluster. This can be scaled up or down after deployment. When scaling down, there is currently no effort made to drain the hosts in order to remove them gracefully: jobs executing on the removed hosts will fail. This may change in the future. |  Yes  |  Yes  
| Login node size  |  The size to use for the login node.  |  Yes  |  No  
Compute node size  |  The size to use for the compute nodes.  |  Yes  |  No  
| External IP  |  The external IP to attach to the login node. This is optional - if not given, the cluster can still be accessed by using the Identity Manager's gateway host as a jump host for SSH.  |  No  |  No
{.table .table-striped}
  
## Accessing the cluster

The Slurm hosts are configured to use the users and groups from FreeIPA using
{{<link "https://docs.pagure.org/SSSD.sssd/">}}SSSD{{</link>}}. They are also configured to use
SSH keys from FreeIPA for SSH authentication (password-based SSH is disabled).

For every Slurm cluster that is deployed, CaaS automatically creates a group
in FreeIPA called `<clustername>_users`. This group, along with the `admins`
group, are permitted SSH access to the hosts in the cluster. To permit a user
SSH access to a Slurm cluster, they just need to be [added to one of these
groups]({{% ref "cluster-as-a-service-identity-manager" %}}) (depending on
whether you also want them to be an admin on other clusters).

Once they have been added to one of these groups, the Slurm cluster can be
accessed via SSH. The following is an example of accessing a Slurm cluster
without an external IP using the Identity Manager's gateway as a jump host:

{{<command user="user" host="localhost">}}
    ## Add SSH key to the session
    ssh-add /path/to/ssh/key
    
    ## SSH to the identity manager gateway with agent forwarding enabled
    ssh -A jbloggs@192.171.139.83
{{</command>}}

{{<command user="jbloggs" host="identity-gateway-0">}}
    ## SSH to the Slurm login node
    ssh 192.168.3.16
{{</command>}}

{{<command user="jbloggs" host="slurm-login-0">}}
## Check that we are in our home directory
pwd
(out)/home/users/jbloggs

## Check the Slurm status
sinfo
(out)PARTITION AVAIL  TIMELIMIT  NODES  STATE NODELIST
(out)compute*     up 1-00:00:00      3   idle slurm-compute-[0-2]

## Run a simple job
srun -N3 -l /bin/hostname
(out)0: slurm-compute-0.novalocal
(out)1: slurm-compute-1.novalocal
(out)2: slurm-compute-2.novalocal
{{</command>}}

A more in-depth discussion of the capabilities of Slurm is beyond the scope of
this document - please refer to the Slurm documentation.
