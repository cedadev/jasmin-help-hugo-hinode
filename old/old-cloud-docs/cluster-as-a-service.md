---
aliases: /article/4735-cluster-as-a-service
description: Cluster-as-a-Service
slug: cluster-as-a-service
title: Cluster-as-a-Service
---

## Introduction

JASMIN Cluster-as-a-Service (CaaS) is a service on the JASMIN Cloud that aims
to make it easy to provision and maintain clusters of various types by
providing a simple, intuitive interface via the JASMIN Cloud Portal.

CaaS is only available in the External Cloud, and machines provisioned by the
CaaS system are subject to the usual constraints:

### Root access

- The provisioning user gets root access to the hosts.
- Clusters can be customised, for example to add new packages.
- But be careful not to break the configuration of the clustering software!
  - **Note:** If a tenants makes a change which breaks the cluster patching, the cluster will have to be rebuilt.

### Patching

- Users are responsible for applying patches.
- However, patching a cluster is a simple task triggered in the JASMIN Cloud Portal.
- Cluster admins to decide when to trigger a patch.

### Access to CEDA archive and JASMIN Group Workspaces

- No POSIX access to the CEDA archive or JASMIN Group Workspaces.
- Read-only access via HTTP/OPeNDAP is possible.
- Read-write access to the JASMIN Object Store is also possible.
- The CaaS system has cluster types that provide shared storage between clusters.

### User management

- Tenancies must manage their own users/groups.
- Users of services in a tenancy do not need a JASMIN account.
- However a JASMIN account **is** required to use the JASMIN Cloud Portal.
- Encourages a structure where admins provision and maintain clusters on behalf of their users.
- The CaaS system has an Identity Manager which provides identity services for a tenancy, i.e. users have a single identity across all clusters within in a single tenancy.
- However this identity is not linked to a JASMIN account.

### Available cluster types

Cluster type | Details
---|--- 
[Identity Manager]({{% ref "cluster-as-a-service-identity-manager" %}})  |  Manages identity and permissions for other clusters using a combination of [FreeIPA](https://www.freeipa.org/page/Main_Page) and [Keycloak](https://www.keycloak.org/).  
[NFS]({{% ref "cluster-as-a-service-shared-storage" %}}) |  Shared storage for other clusters using a simple NFS server.  
[Kubernetes]({{% ref "cluster-as-a-service-kubernetes" %}}) |  A Kubernetes cluster deployed using [Rancher Kubernetes Engine](https://rancher.com/docs/rke/latest/en/).
[Pangeo]({{% ref "cluster-as-a-service-pangeo" %}}) |  The [Pangeo](https://pangeo.io/) stack deployed on Kubernetes.  
[Slurm]({{% ref "cluster-as-a-service-slurm" %}}) (currently disabled) |  A batch cluster running the [Slurm workload manager](https://slurm.schedmd.com/).
{.table .table-striped}
  
## Creating a cluster

Clusters are created via the JASMIN Cloud Portal using a new **Clusters** tab
alongside **Overview** , **Machines** , and **Volumes**. If you do not see
this tab, then clusters are not enabled for your tenancy.

{{< image src="img/docs/cluster-as-a-service/file-N77Jt6iuMA.png" caption="Select clusters tab if available" wrapper="col-6 mx-auto" >}}

Click on the tab and you will see a list of your existing clusters. To create
a new cluster, click on the **New cluster** button - this will launch a
dialogue where you can select a cluster type:

{{<image src="img/docs/cluster-as-a-service/file-m8MJKBGWbg.png" caption="Select a cluster type">}}

Clicking on a cluster type will show a form collecting parameters for the
cluster, which will be different for each cluster type (the options for each
cluster type are discussed in more detail in other articles):

{{<image src="img/docs/cluster-as-a-service/file-6zCKxYATJd.png" caption="Specify parameters for new cluster">}}

Click **Create cluster** to start the cluster creation. The cluster may take
several minutes to configure (especially as the initial configuration includes
a full patch of operating system packages):

{{<image src="img/docs/cluster-as-a-service/file-sBQzvCEIP0.png" caption="Create the cluster">}}

Once configuration is complete, the cluster status will become **READY**. The
cluster is then ready to use:

{{<image src="img/docs/cluster-as-a-service/file-FysROPzFxf.png" caption="Cluster in READY status">}}

More details of how to use each cluster type are given in other help articles
on this site, linked in the table of available cluster types above.

Visit the **Machines** tab to see the machines that were created as part of
the cluster:

{{<image src="img/docs/cluster-as-a-service/file-uPRA6pYBcQ.png" caption="List machines created as part of the cluster">}}

## Updating a cluster

Some cluster options, such the number of workers in a Kubernetes cluster, can
be updated after a cluster has been created. To do this, select **Update
cluster options** from the **Actions...** dropdown for the cluster:

{{<image src="img/docs/cluster-as-a-service/file-hjbidWNoWg.png" caption="Select update cluster options">}}

This will launch a dialogue similar to the one for creating a cluster, except
some of the options will be greyed out as they cannot be changed:

{{<image src="img/docs/cluster-as-a-service/file-gov0vLALmy.png" caption="Next dialogue">}}

After updating the options, click **Update cluster** to re-configure the
cluster. As with cluster creation the cluster status will change to
**CONFIGURING** , becoming **READY** once the re-configuration is complete.
Where possible, the CaaS system makes an effort to re-configure the cluster
with as little downtime as possible.

## Patching a cluster

"Patching" refers to the specific operation of updating the operating system
packages on a machine. It is expected that tenants in the External Cloud will
ensure that their machines are regularly patched as a security measure, as
package updates often contain fixes for known vulnerabilities that can be
exploited if left unpatched.

The CaaS system makes patching clusters easy - just select **Patch cluster**
from the **Actions...** dropdown for the cluster and confirm the operation in
the dialogue that appears:

{{<image src="img/docs/cluster-as-a-service/file-8UgmxTXHq4.png" caption="Select patch cluster">}}

{{<image src="img/docs/cluster-as-a-service/file-dUZ0anUR7C.png" caption="Patch cluster - confirmation">}}

As with creating and updating, the cluster status will first become
**CONFIGURING** , becoming **READY** once the patching is complete. Where
possible, the CaaS system will patch the cluster with as little downtime as
possible.

Clusters that have not been patched recently will be flagged in the Cloud
Portal:

{{<image src="img/docs/cluster-as-a-service/file-O49bJXoZzQ.png" caption="Unpatched clusters">}}

## Deleting a cluster

To delete a cluster, just select **Delete** from the **Actions...** dropdown
for the cluster and confirm the operation in the dialogue that appears:

{{<image src="img/docs/cluster-as-a-service/file-YbBzoEzWVV.png" caption="Select delete cluster">}}

{{<image src="img/docs/cluster-as-a-service/file-90OF1EFAXx.png" caption="Delete confirmation">}}

The cluster status will become **DELETING** :

{{<image src="img/docs/cluster-as-a-service/file-qxaWljk6Op.png" caption="Deleting">}}

This will delete the machines associated with the cluster. Once the machines
have been deleted, the cluster will be removed. A deleted cluster cannot be
restored.
