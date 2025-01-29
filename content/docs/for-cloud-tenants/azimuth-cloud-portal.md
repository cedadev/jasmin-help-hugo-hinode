---
description: Introduction to the Azimuth cloud portal
slug: azimuth-cloud-portal
title: The Azimuth Cloud Portal
weight: 20
---

Azimuth is a self-service portal designed to simplify the management of cloud resources, particularly for high-performance computing (HPC)
and artificial intelligence (AI) applications. It supports OpenStack clouds and can manage a range of platforms from single-machine
workstations to entire Slurm clusters and Kubernetes-based platforms like JupyterHub.

**Azimuth Science Platforms** are designed to be flexible and high-performing computing environments tailored for scientific research.
They offer a unified interface for managing both Kubernetes and Cluster-as-a-Service (CaaS) platforms, supporting multiple authentication
methods like username/password, Keystone federation, and application credentials.  Azimuth uses Zenith as an application proxy,
allowing services to be exposed without consuming floating IPs or requiring SSH keys. It simplifies OpenStack management through
automatic network detection, machine and volume management, and security group configuration.

These platforms are ideal for high-performance computing (HPC) tasks, enabling research in disciplines that
demand significant processing power. Researchers have the flexibility to configure their environments to meet
specific needs, including choice of operating system, software tools, and hardware. Cloud integration ensures
scalability and accessibility, allowing researchers to access their environments from anywhere. Collaboration is
facilitated through tools like Jupyter Notebooks for interactive data exploration and analysis. Ultimately, Azimuth Science Platforms
aim to enhance the efficiency and effectiveness of scientific research by providing customizable and powerful computing resources.

A **project**, also known as a **cloud tenancy**, is an organizational unit in the cloud where users are assigned.
Users can be part of multiple tenancies, and all resources within a tenancy are visible and editable by its members or
if a **external IP** is attached, external users can also access it.
To get a cloud tenancy or access an existing one, you currently need to contact Helpdesk Support, *This may change in the future*.

## Using the JASMIN Azimuth Cloud Portal

To access azimuth navigate to the [JASMIN Azimuth Portal](https://portal.azimuth.jasmin.ac.uk/) which will take you to the landing page shown in the image below.

{{<mark>}}Can the below show the whole window with the login button showing{{</mark>}}

{{<image src="img/docs/azimuth-images/Azimuth-landing-page.png" caption="Landing page" wrapper="col-12 mx-auto text-center">}}

Click "Sign in", top right, then enter your JASMIN credentials as requested:

{{<image src="img/docs/azimuth-images/Azimuth-Login-Page.jpg" caption="Log in" wrapper="col-6 mx-auto text-center">}}

Click the "My Tenancies" button. You should then see a list of one or more tenancies that you belong to.

{{<image src="img/docs/azimuth-images/Azimuth-list-of-Tenants-Page.jpg" caption="List of Tenancies" wrapper="col-12 mx-auto text-center">}}

Select a tenancy from the list. The landing page for that tenancy will then be shown.

The **Platforms** section displays the associated any platforms which have been deployed.
Additional tabs include:

- **Quotas** showing resource quotas for the current tenancy,
- **Identity Provider** displays the configured identity providers and their associated settings.
- **Advanced** provides access to the advanced feature settings for the platform and associated resources. Within this:
  - **Machines** show provisioned compute resources, referred to as "machines"
  - **Volumes** shows the provisioned storage volumes.
  
**Switch Tenancy** enables users to transition between tenancies to which they have authorised access.

The **Azimuth Identity provider** employs a Keycloak-based identity provider to manage access control for platforms deployed
within each tenancy. This identity provider, essentially a Keycloak realm, is tailored to each tenancy, controlling user
accounts, roles, and groups for the platforms hosted there. By default, the realm is configured to allow users with
Azimuth tenancy access to administer the realm itself. This grants them full control over the platforms deployed within the tenancy. To enhance
security and control, administrators can use the Keycloak administration console to: 

- **Create Local Users** by directly adding users
to the realm without requiring external authentication, and 
- **Configure Federated Identity Providers** like GitHub, Google, or institutional identity providers to enable single sign-on (SSO). 

To further secure access, Azimuth uses **Platform Access Control** to control access to resources. Federated users cannot deploy platforms in
Azimuth, however they can be granted access to existing platforms provisioned by others. This is achieved through role-based access control (RBAC) mechanisms within the Keycloak realm.

### Creating Platforms

{{<image src="img/docs/azimuth-images/azimuth-tenancy-platform-landing-page.jpg" caption="platform landing page" wrapper="col-12 mx-auto text-center">}}

The **Platform** page provides two equivalent methods for initiating the platform creation process. When you select
**Create Platform / New platform** on the landing page, you can choose a platform type, based on your project as shown in the image below.

{{<image src="img/docs/azimuth-images/Azimuth-new-platform.jpg" caption="New platform list page" wrapper="col-9 mx-auto text-center">}}

When you select a platform, some configuration settings are required, including the platform name, size, and volume. When creating platforms it is recommended that you choose descriptive and meaningful names.

The **Azimuth portal** allows you to deploy various platforms, these include:

{{<link "platform-in-depth-workstation">}}**Linux Workstation:**{{</link>}} a flexible Ubuntu 22.04 cloud instance with browser based GUI and shell.

{{<link "platform-in-depth-slurm">}}**Slurm Cluster:**{{</link>}} is a high-performance computing cluster using Slurm for resource management and job scheduling across multiple nodes. This platform is ideal for batch processing and computationally intensive tasks.

{{<link "platform-in-depth-k8s">}}**Kubernetes:**{{</link>}} is a comprehensive container orchestration platform providing a robust environment for deploying and managing containerised applications. Please note that using other platforms may require an existing Kubernetes cluster.

{{<link "platform-in-depth-jupyterhub">}}**JupyterHub:**{{</link>}} is a multi-user JupyterHub deployment built upon Kubernetes, enabling collaborative and interactive computing with Jupyter Notebooks.

**Jupyter Notebooks:** provides interactive notebooks based on an existing notebook repository in a cloud environment, enhancing reproducibility.
To launch a Jupyter Notebook, ensure your repository is repo2docker-compatible and hosted on platforms such as GitHub, GitLab, Zenodo, Figshare,
or Dataverse. This platform, which functions similarly to Binder, supports any notebook repository adhering to the Reproducible Execution Environment
Specification (REES). Additionally, the notebook instance includes a configurable cloud volume at `/data`, which is particularly useful for managing
large datasets that cannot be included within the repository itself.

**DaskHub:** is a multi-user DaskHub deployment on Kubernetes, facilitating parallel computing in Python. It extends the capabilities of JupyterHub by providing a framework for distributed computing and scalable data analysis.

For details on some platforms please see: {{<link "platform-in-depth-slurm">}}**Slurm Cluster**{{</link>}} | {{<link "platform-in-depth-k8s">}}**Kubernetes**{{</link>}} | {{<link "platform-in-depth-jupyterhub">}}**JupyterHub**{{</link>}} | {{<link "platform-in-depth-workstation">}}**Linux Workstations**{{</link>}}

### Quotas

Azimuth **Quotas** provides a comprehensive overview of resource allocation within the Azimuth platform. This functionality allows users to monitor both the total resources allocated to them and the proportion of those resources currently in use. Azimuth **Quotas** include the following:

- **machines:** the number of allowed machines that can be created up in the project/tenancy
- **volumes:** the number of volumes that can be created in the tenancy/project
- **external IPs:** the number of external IPs assigned to the tenancy (note that the quota use is for the tenancy, *not* the IPs attached to machines/in use by platforms)
- **CPUs:** the total number of CPUs that can be defined for all platforms in the current tenancy
- **RAM:** the total amount of RAM that can be defined for all platforms in the current tenancy
- **volume storage:** the total size of storage capacity that can be defined for platforms in the current tenancy

as shown below:

{{<image src="img/docs/azimuth-images/Azimuth-quotas-Page.jpg" caption="Quotas page" wrapper="col-12 mx-auto text-center">}}

### Advanced

In the advanced tab there are two sections: the **machine** and the **volume** sections. Some actions you can be able to perform on the machines include **viewing** a list of existing machines, **edit** or **delete** machines, **attach/detach** external IPs, **define firewall rules** and **Start/Stop/Restart** machines. On the **volume tab**, users are able to, **view** a list of volumes in the project and **create new** volumes by providing the name and volume size. Additionally users can **delete** and **attach / detach** volumes.
