---
description: Introduction to the Azimuth cloud portal
slug: azimuth-cloud-portal
title: The Azimuth Cloud Portal
---
- Azimuth is a self-service portal designed to simplify the management of cloud resources, particularly for high-performance computing (HPC) and artificial intelligence (AI) applications.
- It supports OpenStack clouds and can manage a range of platforms from single-machine workstations to entire Slurm clusters and Kubernetes-based platforms like JupyterHub.

## Key features include:

#### Multiple Authentication Methods:

Azimuth supports the following authentication methods:

- username/password
- Keystone federation, and
- application credentials.

#### On-demand Platforms:

Azimuth has a unified interface for managing Kubernetes and Cluster-as-a-Service (CaaS) platforms.

#### Application Proxy:

Azimuth uses Zenith to expose services without consuming floating IPs or requiring SSH keys.

#### Simplified OpenStack Management:

Automatic network detection, machine and volume management, and security group configuration.

Azimuth Science Platforms are designed to provide flexible, high-performance computing environments tailored for scientific research.

Here are some key purposes:

#### High-Performance Computing (HPC):

These platforms support large-scale computational tasks, making them ideal for scientific disciplines that require significant processing power.

#### Flexibility:

Researchers can configure their computing environments to meet specific needs, such as choosing the operating system, software tools, and hardware specifications.

#### Cloud Integration:

By leveraging cloud infrastructure, Azimuth Science Platforms offer scalability and accessibility, allowing researchers to access their environments from anywhere.

#### Collaboration:

These platforms facilitate collaborative research by providing tools like Jupyter Notebooks for interactive data exploration and analysis.

Overall, Azimuth Science Platforms aim to enhance the efficiency and effectiveness of scientific research by providing customizable and powerful computing resources.

## Usage

To access azimuth navigate to: [log in](https://portal.azimuth.jasmin.ac.uk/). 

This will take you to the landing page shown in the image below.

{{<image src="img/docs/azimuth-images/Azimuth-landing-Page.jpg" caption="Landing page">}}

In the top right-hand corner of the landing page, click on the Sign in button and enter your JASMIN username and password on the login page that appears.

{{<image src="img/docs/azimuth-images/Azimuth-Login-Page.jpg" caption="Log in">}}

Once you have successifully signed in, you will land on the Azimuth cloud Dashboard as shown below.

{{<image src="img/docs/azimuth-images/Azimuth-list-of-Tenants-Page.jpg" caption="List of Tenants">}}

Here, you will see a list of 1 or more projects/tenancies you have been granted access to.

{{<image src="img/docs/azimuth-images/azimuth-tenancy-platform-landing-page.jpg" caption="Platform landing page">}}

Sections on the platform landing page above:

  1. Sign out: Displays the currently logged in user
  2. Platform: Indicates the platform pane header
  3. Displays the tenancy/Project name.
  4. Quotas: Show the provisioned resource quotas for the tenancy
  5. Identity provider: Displays the configured Identity providers and associated settings.
  6. Advanced: Advanced setting displays some advanced feature settings for the platform and the associated resources
  7. Machines: Displays the provisioned Machines (Compute resources)
  8. Volume: Displays the provisioned volumes
  9. The Switch tenency: used when the currently logged in user needs to switch to another tenancy they area a member of.
  10. SSH public key: This is where the user can add there public key. Once a key has been added the text box can not be left empty.
  11. Create Platform: used to select a platform to create.
  12. New platform: used to create a new platform just like 11. above

### What is project/tenency?

A project, also known as a cloud tenancy, is an organizational unit in the cloud where users are assigned.
Users can be part of multiple projects, and all resources within a project are visible and editable by its members.
To get a cloud project or access an existing one, you need to contact your GWS manager.

## Platforms

From the azimuth portal you can deploy platforms such as:

#### Linux Workstation:

The Linux Workstation platform offers a flexible Ubuntu 22.04 cloud instance.

#### Jupyter Notebook:

A Jupyter notebook created from a compatible repository.

#### Jupyter Notebook Overview

- The Jupyter Notebook platform allows you to run an existing notebook repository in a cloud environment, making the code immediately reproducible.
- You can access the notebook through a web browser.
- To launch a Jupyter notebook, it must be from a repo2docker-compatible repository hosted on platforms like GitHub, GitLab, Zenodo, Figshare, or Dataverse. 
- This platform works similarly to Binder and supports any notebook repository that follows the Reproducible Execution Environment Specification (REES).
- The notebook instance includes a configurable cloud volume at /data, useful for handling large datasets that can’t be included in the repository.

#### Launch Configuration

- Platform Name: identifies the Linux Workstation platform.
- Notebook Repository: URL of a REES-compliant Jupyter notebook repository.
- Jupyter Notebook Size: Specifies the cloud instance size, including CPU and RAM, set by the cloud operator.
- Volume Size: Size of the cloud volume at /data.

Advanced

Platform Monitoring: A Grafana dashboard is available for system monitoring, showing both current and historical system information.

#### Slurm Cluster:

A multi-node Slurm batch-compute cluster.

#### Kubernetes:

A complete Kubernetes container orchestration cluster. Kubernetes Applications need an existing Kubernetes cluster before you can deploy them.

#### JupyterHub:

A multi-user JupyterHub on Kubernetes.

#### GPU-enabled Jupyter Notebooks:

Launch a GPU-enabled Jupyter Notebook using JupyterHub.

#### DaskHub:

A multi-user DaskHub on Kubernetes for parallel computing in Python.

Introduciton to the platforms and their usage

- breif overview of whats available, with links to the main ones in the other articles
- (some of this can be taken from the azimuth docs)

###  Identity provider

Azimuth Identity Provider: It is a Keycloak-Based Realm

#### Overview

Azimuth employs a Keycloak-based identity provider to manage access control for platforms deployed within each tenancy. This identity provider, essentially a Keycloak realm, is specifically tailored to each tenancy, controlling user accounts, roles, and groups for the platforms hosted there.

#### Default Configuration

By default, the realm is configured to allow users with Azimuth tenancy access to administer the realm itself. This grants them full control over the platforms deployed within the tenancy.

#### Customising User Access

To enhance security and control, administrators can use the Keycloak administration console to:

- Create Local Users: Directly add users to the realm without requiring external authentication.
- Configure Federated Identity Providers: Integrate with external identity providers like GitHub, Google, or institutional identity providers to enable single sign-on (SSO).

#### Platform Access Control

While federated users cannot deploy platforms in Azimuth, they can be granted access to existing platforms provisioned by others. This is achieved through role-based access control (RBAC) mechanisms within the Keycloak realm.

#### Key Points

- Keycloak Foundation: The Azimuth identity provider is built on the open-source Keycloak platform, ensuring a robust and customisable identity management solution.
- Tenancy-Specific Realms: Each tenancy has its own dedicated Keycloak realm for granular control over user access and permissions.
- Default Admin Access: Users with Azimuth tenancy access automatically have administrative privileges over the realm.
- Custom User Management: Administrators can add local users and integrate with external identity providers to meet specific security requirements.
- RBAC for Platform Access: Role-based access control allows for fine-grained control over which users can access specific platforms within the tenancy.

(- links into some of the platforms - explicitly say which)

### Quotas

Azimuth quotas refer to the allocation and management of computing resources within the Azimuth platform,
which is designed for High Performance Computing (HPC) and Artificial Intelligence (AI) workloads

Azimuth quotas include: machine, volumes, external IPs, CPUs RAm and Volume Storage as shown below:

{{<image src="img/docs/azimuth-images/Azimuth-quotas-Page.jpg" caption="Quotas page">}}

- machines: indicates the number of allowed machines that can be spinned up in the project/tenancy
- volumes: indicates the number of volumes that can be created in the tenancy/project
- external IPs (note that the quota use is for the tenancy, not the IPs attached to machines/ in use by platforms)
- CPUs: indicates the total number of CPUs that can be defines for all platforms in the current tenancy
- RAM: indicates the total amount of RAM that can be define for all platforms in the current tenancy.
- volume storage: indiactes the total size of storage capacity that can be defined for platforms in the current tenancy.

## Advanced use

In the advanced tab there are two sections, the machine and the volume sections

- To see how to create a machine go: ([Workstation Platform]{{<ref "platform-in-depth-workstation" >}})
  
- To see how to create a volume go: ([Workstation Platform]{{<ref "platform-in-depth-workstation" >}})

### Use of machine and volume tabs

On the machines tab, users are able to:

- create new machines

#### Actions

- view a list of existing machines
- edit or delete machines
- attatch/detatch external IPs
- define firewall rules
- Start/Stop/Restart machines

On the volume tab, users are able to:

- view a list of volumes in the project
- create new volumes

### Actions:

- delete volumes
- attach/detach volumes
