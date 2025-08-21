---
aliases: /article/282-introduction-to-the-jasmin-cloud
description: Introduction to the JASMIN Cloud
slug: introduction-to-the-jasmin-cloud
title: Introduction to the JASMIN Cloud
---

In addition to the traditional batch computing (LOTUS) and storage (Group
Workspaces) services, JASMIN also provides a cloud computing service.

Many users will already be familiar with cloud services through the use of one
of the large public providers (e.g. Amazon AWS or Microsoft Azure). The JASMIN
Cloud is similar in that it allows an institution or project to consume
compute resources as a utility, with no need to provision and maintain the
associated physical infrastructure. Users can provision their own virtual
machines (VMs) within the JASMIN infrastructure, allowing for greater
flexibility. The JASMIN Cloud also allows users to provision clusters for
Identity Management, Kubernetes, and Slurm clusters amongst others (see
Cluster-as-a-Service).

The thing that makes the JASMIN Cloud unique is its colocation with the CEDA
Archive and Group Workspaces. The JASMIN Cloud is ideally suited to projects
that work with such data, and can enable novel solutions for the manipulation
and presentation of data to end-users.

## Cloud terminology

Different cloud providers have different terms for the users within their
cloud and the chunks of resource they have been allocated. In the JASMIN Cloud
documentation, we will use the following terminology:

- **Tenancy:** An allocation of resources, i.e. virtual CPUs, RAM and block storage, within the cloud.
- **Tenant:** A group (institution or project) that has been allocated a tenancy in the cloud.
- **Tenancy Admin(istrator):** The person designated as the administrator of a tenancy. There would usually also be a deputy administrator.

## JASMIN Cloud Architecture

In order to provide as much flexibility as possible for tenants while
preserving the security of the system, the JASMIN Cloud is split into two
parts (see the schematic below). Both parts of the JASMIN Cloud are
administered through the same self-service portal, allowing tenancy admins to
provision VMs as required, within the quota of their tenancy.

{{<image src="img/docs/introduction-to-the-jasmin-cloud/file-rJTVn4CXil.png" caption="jasmin cloud achitecture">}}

The **JASMIN External Cloud** is an Infrastructure-as-a-Service (IaaS)
offering, and sits outside of the main JASMIN firewall. Tenants are allowed
root access and have complete responsibility for all system administration
tasks. This means that tenants are able to provision their own infrastructure
(e.g. web portals, remote desktop services), but it also means that tenants
are responsible for the security of their machines (e.g. patching, firewall
configuration) and for managing their own users. Because it is outside of the
JASMIN firewall, tenancies in the External Cloud cannot directly access the
JASMIN storage (including PFS, and SOF), and so there is no filesystem level
access to the CEDA Archive or Group Workspaces - all access to these data is
via the usual external interfaces (i.e. the Object Store, FTP, OpenDAP, HTTP).
We also have our Cluster-as-a-Service available to external cloud tenants
which is a Platform-as-a-Service offering that tenants can use to deploy
clusters including, an identity cluster, storage cluster (NFS), and a
Kubernetes cluster.

### External Cloud patching policy

{{<alert alert-type="info">}}
We expect tenants to react in a timely manner to any security vulnerabilities.
This means critical vulnerabilities are patched within 7 days, and high
vulnerabilities are patched within 14 days. This is following UKRI security
policy. Failure to comply may result in tenancy access being revoked and
machines powered down.
{{</alert>}}

By contrast, the **JASMIN Managed Cloud** is a Platform-as-a-Service (PaaS)
offering, sitting inside the main JASMIN firewall, meaning it can reach the
JASMIN storage. In order to preserve security, this means that tenants are
_not_ allowed root access, and can only deploy VMs from a limited set of pre-
approved templates. However, tenants are not responsible for the security of
these machines, and users on VMs within the tenancy are JASMIN users.
Currently, only two templates are available - an SSH bastion, or login
machine, and a Scientific Analysis server with a similar configuration to the
shared JASMIN Scientific Analysis servers. The Scientific Analysis servers
have the CEDA Archive and Group Workspaces mounted.

Both offerings have a similar network structure. Each tenancy has its own
local network, where machines have addresses in the `192.168.3.0/24` range -
all machines in the tenancy can talk to each other on this network. In
addition, each tenancy has an "edge device", which is effectively a virtual
router. Similarly to your home broadband router, this allows machines within
the tenancy to talk to machines outside the tenancy, and ensures packets
coming back into the tenancy are forwarded to the correct machine. These "edge
devices" also provide a [Network Address Translation
(NAT)](https://en.wikipedia.org/wiki/Network_address_translation) facility,
which allows machines to be allocated an IP address that is visible outside of
the tenancy. In the Managed Cloud, this translates to an IP address that is
visible on the JASMIN network. In the External Cloud, it translates to an IP
address that is visible on the _public internet_.

## External vs. Managed - pros and cons

Attribute |  Managed Cloud  |  External Cloud  
---|---|---  
Self-service provisioning  |  Yes  |  Yes  
Filesystem level access to JASMIN Storage (PFS, SOF)  |  Yes  |  No  
Root access  |  No  |  Yes  
Provision custom infrastructure  |  SSH bastion or Scientific Analysis server only  |  Build from generic Ubuntu or CentOS templates  
Security and patching  |  Handled by infrastructure team  |  Tenant's responsibility  
User management  |  JASMIN users  |  Tenant's responsibility  
Visibility to public internet  |  No  |  Yes (limited number of external IPs)   
Ability to provision Cluster-as-a-Service  |  No  |  Yes
{.table .table-striped}
  
## Getting a JASMIN Cloud Tenancy

To start a conversation with us about getting a JASMIN Cloud Tenancy for your
project, please contact JASMIN Support.
