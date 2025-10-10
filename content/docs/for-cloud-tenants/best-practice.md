---
description: Best practice with the JASMIN Cloud
slug: best-practice
title: Best Practice
weight: 90
---


The STFC Cloud documentation has information about [good practice for using the cloud](https://stfc.atlassian.net/wiki/spaces/CLOUDKB/pages/211845339/Virtual+Machine+Best+Practises).

## Security

We expect Tenants to abide by the terms and conditions set out by
{{<link "jasmin_tcs">}}JASMIN{{</link>}}, {{<link "stfc_cloud_tcs">}}STFC Cloud{{</link>}},
and {{<link "ukri_tcs">}}UKRI{{</link>}}.
This includes abiding by {{<link "stfc_cloud_patching">}}STFC Cloud's{{</link>}} and UKRI's patching policy.

### Patching Policy

{{<alert alert-type="danger">}}
We expect tenants to react in a timely manner to any security vulnerabilities.
This means critical vulnerabilities are patched within 7 days, and high
vulnerabilities are patched within 14 days. This is following UKRI security
policy. Failure to comply may result in tenancy access being revoked and
machines powered down.
{{</alert>}}

## VM life cycle

We expect tenants to regularly refresh their infrastructure by creating machines with new images and re-installing all required software. The suggested timeframe for this is every 6 months (or more frequently). This allows for better security of machines and means that machines are more stable (machines experience more issues as they get older). We also expect tenants to easily be able to reinstall their services in the event we cannot recover machines (though we will reasonably try if machines are refreshed regularly). In other words, we expect tenants to treat their machines as "cattle" rather than "pets". Infrastructure-as-Code techniques and technologies can be employed by the tenant to make redeployment as easy and painless as possible.

## Infrastructure-as-Code

We strongly encourage tenants to deploy applications and configure their machines in a reproducible way to mitigate against VM or hypervisor issues, as well as regularly phasing out old machines and replacing them with new images. One way of doing this is using Infrastructure-as-Code techniques, including:

- using Ansible to create and run provisioning scripts to easily re-provision a new machines when required;
- Terraform/OpenTofu to create machines and other infrastructure by making calls to the Openstack API in an easily repeatable way;
- Kubernetes which provides a platform which containers can be deployed on and managed using Kubernetes deployments and Helm;
- and ClusterAPI which provides declarative APIs and tooling to simplify provisioning, upgrading, and operating multiple Kubernetes clusters (from an existing cluster).

Also note that these methods would allow easier deployment to commercial cloud if required.

### Ansible

Ansible has probably the easiest learning curve and is most useful for the vast majority of JASMIN Cloud tenants. It allows you to define steps for the install of one, or many, services using YAML to describe what the services should look like and what steps are taken to install them, with any changes which are required to the machine. It does this using readily available (and very well documented) building blocks. Once the Ansible playbook is written the first time, when a machine needs to be replaced, it is simply a matter of running the playbook pointing at the new machine.

See [STFC Cloud's page](https://stfc.atlassian.net/wiki/spaces/CLOUDKB/pages/1736734/Ansible) on Ansible, and the [Ansible documentation](https://docs.ansible.com/) (particularly [Getting Started](https://docs.ansible.com/ansible/latest/getting_started/index.html)) for more information.

### Terraform/OpenTofu

Terraform, and its open source fork OpenTofu, provide a way of declaring what infrastructure should look like using the building blocks provided for the specific cloud. It then creates or changes the existing infrastructure using the least changes possible so that what is deployed matches what has been defined. This is a powerful tool for automation and reproducibility which can also invoke Ansible playbooks to install software and services onto the infrastructure after it has been created. The combination of Terraform and Ansible would provide the most resilience in case of machine loss because of the low effort reinstalling those machines - Terraform/OpenTofu would just need to be run again to recreate the infrastructure and services, rather than an admin having to manually create machines and install what is required (which often takes a large amount of time!).

Note that some machine changes would cause Terraform/OpenTofu to replace machines and in this instance anything installed or saved on the root disk would be lost.

See [STFC Cloud's page](https://stfc.atlassian.net/wiki/spaces/CLOUDKB/pages/1736760/Terraform) on Terraform, and the Terraform Openstack Provider [documentation](https://registry.terraform.io/providers/terraform-provider-openstack/openstack/latest/docs), as well as the [OpenTofu equivalent](https://search.opentofu.org/provider/terraform-provider-openstack/openstack/v2.1.0).

Using Azmiuth's platforms may mean that users never need to consider Terraform/OpenTofu.

### Kubernetes

Kubernetes, while having a reasonably high learning curve, presents a great opportunity for tenants to deploy robust and easily updatable and re-deployable services. In CEDA we use a Kubernetes cluster to deploy most of our user facing services. It allows us to more frequently update and patch applications and services, with minimal downtime and a robust deployment.

Azimuth provides an easily deployable Kubernetes cluster as part of its platform offerings, giving users the lowest barrier to entry possible by providing a cluster with as many widely useful services already installed.

Creating Kubernetes clusters outside of the Azimuth platforms is possible using multiple methods, but is not advised because of the major advantages which the  {{<link "platform-in-depth-k8s">}}Azimuth Kubernetes Platform{{</link>}} gives.

See the [Kubernetes documentation](https://kubernetes.io/docs/home/) for details on how to use Kubernetes. The official [tutorials](https://kubernetes.io/docs/tutorials/) are particularly good.

### Cluster API

Cluster API is probably the least relevant technology for most tenants of the JASMIN Cloud, because Azimuth provides a much easier way to provision and manage Kubernetes clusters. Azimuth uses Cluster API under the hood to create its Kubernetes clusters.
