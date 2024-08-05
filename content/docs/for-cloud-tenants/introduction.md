---
aliases: /article/282-introduction-to-the-jasmin-cloud
description: Introduction to the JASMIN Cloud
slug: introduction-to-the-jasmin-cloud
title: Introduction to the JASMIN Cloud
---

- What is the jasmin Cloud
- features
  - Where it sits
  - what functionality
  - main componets (Azimuth, ... )
- arcitecture
  - breif outline of whats there from STFC cloud's slides (not sure how up to date the servers are)
  - any limitations imitations
- purpose
  - what is it for?
- terms of use
  - patching policy
  - T&C


{{<alert color="danger">}} NEEDS merging with the sections above {{</alert>}}

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

The **JASMIN Cloud** is an Infrastructure-as-a-Service (IaaS)
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

{{<alert type="info">}}

#### Patching Policy

We expect tenants to react in a timely manner to any security vulnerabilities.
This means critical vulnerabilities are patched within 7 days, and high
vulnerabilities are patched within 14 days. This is following UKRI security
policy. Failure to comply may result in tenancy access being revoked and
machines powered down.
{{</alert>}}



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
the tenancy. 

## Getting a JASMIN Cloud Tenancy

To start a conversation with us about getting a JASMIN Cloud Tenancy for your
project, please contact JASMIN Support.
