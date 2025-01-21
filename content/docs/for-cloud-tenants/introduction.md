---
aliases: /article/282-introduction-to-the-jasmin-cloud
description: Introduction to the JASMIN Cloud
slug: introduction-to-the-jasmin-cloud
title: Introduction to the JASMIN Cloud
weight: 10
---

In addition to the traditional batch computing (LOTUS) and storage (Group
Workspaces) services, JASMIN also provides a cloud computing service.

Many users will already be familiar with cloud services through the use of one
of the large public providers (e.g. Amazon AWS or Microsoft Azure). The JASMIN
Cloud is similar in that it allows an institution or project to consume
compute resources as a utility, with no need to provision and maintain the
associated physical infrastructure. Users can provision their own virtual
machines (VMs), allowing for greater
flexibility. The JASMIN Cloud also allows users to provision clusters using the
see {{<link "./azimuth-cloud-portal">}} Azimuth Portal{{</link>}}.

## Cloud terminology

Different cloud providers have different terms for the users within their
cloud and the chunks of resource they have been allocated. In the JASMIN Cloud
documentation, we will use the following terminology:

- **Tenancy/Project:** An allocation of resources, i.e. virtual CPUs, RAM and block storage, within the cloud.
- **Tenant:** A group (institution or project) that has been allocated a tenancy in the cloud.
- **Tenancy Admin(istrator):** The person designated as the administrator of a tenancy. There would usually also be a deputy administrator.

## JASMIN Cloud Architecture

The JASMIN Cloud is situated on the {{<link "stfc_cloud">}}STFC Cloud{{</link>}}.
The STFC Cloud is a dedicated cloud infrastructure provided by STFC for STFC staff
and partner organisations run by the Scientific Computing Department.

Tenants are primarily expected to use the JASMIN {{<link "./azimuth-cloud-portal">}} Azimuth Portal{{</link>}}
to administer their tenancies (creating machines, volumes, clusters etc.).
Tenants can also log into STFC Cloud's {{<link "stfc_cloud">}}Horizon Portal{{</link>}},
and use the OpenStack API and CLI tools to manage resources.

Tenants are allowed root access and have complete responsibility for all system administration
tasks. This means that tenants are able to provision their own infrastructure
(e.g. web portals, remote desktop services), but it also means that tenants
are responsible for the security of their machines (e.g. patching, firewall
configuration) and for managing their own users.
The Azimuth Platform also provides "Platforms" which are Platform-as-a-Service
offerings that tenants can use to deploy clusters including, an identity cluster,
storage cluster (NFS), and a Kubernetes cluster.

Each tenancy has its own local network, where machines have addresses in the
`192.168.3.0/24` range - all machines in the tenancy can talk to each other
on this network. In addition, each tenancy has an "edge device", which is
effectively a virtual router. Similarly to your home broadband router, this
allows machines within the tenancy to talk to machines outside the tenancy,
and ensures packets coming back into the tenancy are forwarded to the correct
machine. These "edge devices" also provide a [Network Address Translation
(NAT)](https://en.wikipedia.org/wiki/Network_address_translation) facility,
which allows machines to be allocated an IP address that is visible outside of
the tenancy.

Because it is outside of the JASMIN firewall, tenancies in the External Cloud
cannot directly access the JASMIN storage (including PFS, and SOF), and so
there is no filesystem level access to the CEDA Archive or Group Workspaces -
all access to these data is via the usual external interfaces (i.e. the Object
Store, FTP, OpenDAP, HTTP).


## Our Expectations from Tenants

We expect Tenants to abide by the terms and conditions set out by
{{<link "jasmin_tcs">}}JASMIN{{</link>}}, {{<link "stfc_cloud_tcs">}}STFC Cloud{{</link>}},
and {{<link "ukri_tcs">}}UKRI{{</link>}}.
This includes abiding by {{<link "stfc_cloud_patching">}}STFC Cloud's{{</link>}} and UKRI's patching policy.

{{<alert type="info">}}

### Patching Policy

We expect tenants to react in a timely manner to any security vulnerabilities.
This means critical vulnerabilities are patched within 7 days, and high
vulnerabilities are patched within 14 days. This is following UKRI security
policy. Failure to comply may result in tenancy access being revoked and
machines powered down.
{{</alert>}}

We also expect tenants to practice good practices arouns machine lifecycles:
patching machines and updating clusters regularly, and working in a reproducible
way i.e. treating machines as "cattle" not "pets".

### Patching and Machine Lifecycle

Machines should be kept up to date and patched regularly, and also rebooted so that
updates which required reboot can be applied. The suggested interval for this is 6
weeks.

Machines should also be cycled out of production regularly. VMs should not be left
to age for a number of reasons, primarily that older images are more vulnerable to
security vulnerabilities. Older flavors are also cycled out of production, as is 
older hardware, so updating to newer images will improve the reliability of the machine.

Regularly cycling machines out of production also encourages the use of reproducible deployment
methods to make deployments easier and faster.

### Reproducible Deployments

All services and workflows deployed in the JASMIN cloud should be deployed in a reproducible way.
That is that the VMs themselves should be considered "cattle" rather than "pets". There are
a number of methods and technologies to do this which generally are considered
Infrastructre-as-Code (IaC). These include: Ansible, Terraform, Docker, Cluster API,
Kubernetes, and Helm.

The Azimuth Portal is able to provision {{<link "./platform-in-depth-k8s">}}Kubernetes Clusters{{</link>}}
which can be used to make machine lifecycles and reproducbile deployments easier,
including:
- deployments can be deployed and Helm charts, meaning that a deployment is a single 
command away from being redeployed or updated
- in event of machine loss, Kubernetes will redeploy the workload to another worker
- Azimuth Kubernetes clusters auto-heal and can auto-scale to dynamically create and
replace worker nodes

More detail on IaC technologies which we suggest are available in the following articles:
- {{<link "./ansible">}}Ansible{{</link>}}
- {{<link "./terraform">}}Terraform{{</link>}}
- {{<link "./k8s">}}Kubernetes and Helm{{</link>}}
- {{<link "./cluster-api">}}Cluster API{{</link>}}
- {{<link "./docker">}}Docker{{</link>}}

Documentation pages for some general advice are also availble for
{{<link "./linux-admin">}}Linux Administration{{</link>}},
and {{<link "./openstack">}}OpenStack{{</link>}}.


## Getting a JASMIN Cloud Tenancy

To start a conversation with us about getting a JASMIN Cloud Tenancy for your
project, please contact JASMIN Support.
