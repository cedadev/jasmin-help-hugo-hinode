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
methods like username/password, Keystone federation, and application credentials.  Azimuth leverages Zenith as an application proxy,
allowing services to be exposed without consuming floating IPs or requiring SSH keys. It simplifies OpenStack management through
automatic network detection, machine and volume management, and security group configuration.

These platforms are ideal for high-performance computing (HPC) tasks, enabling research in disciplines that
demand significant processing power. Researchers have the flexibility to configure their environments to meet
specific needs, including choice of operating system, software tools, and hardware. Cloud integration ensures
scalability and accessibility, allowing researchers to access their environments from anywhere. Collaboration is
facilitated through tools like Jupyter Notebooks for interactive data exploration and analysis. Ultimately, Azimuth Science Platforms
aim to enhance the efficiency and effectiveness of scientific research by providing customizable and powerful computing resources.

A **project**, also known as a **cloud tenancy**, is an organizational unit in the cloud where users are assigned.
Users can be part of multiple projects, and all resources within a project are visible and editable by its members or
if a **external IP** is attched, external users can also access it.
To get a cloud project or access an existing one, you currently need to contact Helspdesk Support, *This may change in the future*.

To access azimuth navigate to: [log in](https://portal.azimuth.jasmin.ac.uk/) which will take you to the landing page shown in the image below.
{{<image src="img/docs/azimuth-images/Azimuth-landing-Page.jpg" caption="Landing page" wrapper="col-9 mx-auto" wrapper="text-center">}}
To access the system, initiate the login process by selecting the "Sign in" button located in the upper right corner of the landing page.
You will be redirected to the login page where you will be prompted to enter your JASMIN credentials.
{{<image src="img/docs/azimuth-images/Azimuth-Login-Page.jpg" caption="Log in" wrapper="col-2 mx-auto" wrapper="text-center">}}
After successful authentication, you will be directed to the Azimuth Cloud Dashboard, as illustrated below.
To access your authorized tenancies, please select the "My Tenancies" button. This will display a list of one or more tenancies available to you.
{{<image src="img/docs/azimuth-images/Azimuth-list-of-Tenants-Page.jpg" caption="List of Tenants" wrapper="col-9 mx-auto" wrapper="text-center">}}
Within the displayed list of available tenancies, select the desired tenancy to view. ***This*** action will show the corresponding platform landing page, as illustrated below. The page displays the currently authenticated user. The **platform:**  section displays the associated tenancy/project name. Additionally there is the **quotas:** button navigates to the provisioned resource quotas for the current tenancy, the
**identity provider:** displays the configured identity providers and their associated settings, the **advanced:** section provides access to the advanced feature settings for the platform and associated resources, the **machines:** section navigates to the provisioned compute resources, referred to as "machines", the **volume:** section which displays the provisioned storage volumes and the **switch tenancy:** which enables users to transition between tenancies to which they have authorised access.

**Azimuth Identity provider:** employs a Keycloak-based identity provider to manage access control for platforms deployed
within each tenancy. This identity provider, essentially a Keycloak realm, is specifically tailored to each tenancy, controlling user
accounts, roles, and groups for the platforms hosted there.. More on this **here**. By default, the realm is configured to allow users with
Azimuth tenancy access to administer the realm itself. This grants them full control over the platforms deployed within the tenancy. To enhance
security and control, administrators can use the Keycloak administration console to: **Create Local Users:** by directly adding users
to the realm without requiring external authentication and allows for the ability to **Configure Federated Identity Providers:**
like GitHub, Google, or institutional identity providers to enable single sign-on (SSO). To further secure access Azimuth uses
**Platform Access Control** to control access to resources. Additionally, Federated users cannot deploy platforms in
Azimuth, however they can be granted access to existing platforms provisioned by others. This is achieved through role-based access control (RBAC) mechanisms within the Keycloak realm.

{{<image src="img/docs/azimuth-images/azimuth-tenancy-platform-landing-page.jpg" caption="platform landing page">}}
The **create platform** page provides two equivalent methods for initiating the platform creation process. When you select the
**Create Platform / New platform:** on the landing page, you can choose a platform type, based on your project as shown in the image below.
{{<image src="img/docs/azimuth-images/Azimuth-new-platform.jpg" caption="new platform list page" wrapper="col-6 mx-auto" wrapper="text-center">}}
When you select a platform, some configuration settings are required, including the platform name, size, and volume. When creating platforms it is recommended that you choose descriptive and meaningful names.

The **Azimuth portal** allows you to deploy various platforms, including the ***Linux Workstation*** and ***Jupyter Notebook***. The Linux
Workstation platform offers a flexible Ubuntu 22.04 cloud instance, while the Jupyter Notebook platform enables you to run
an existing notebook repository in a cloud environment, enhancing reproducibility. To launch a Jupyter Notebook, ensure your
repository is repo2docker-compatible and hosted on platforms such as GitHub, GitLab, Zenodo, Figshare, or Dataverse. This platform,
which functions similarly to Binder, supports any notebook repository adhering to the Reproducible Execution Environment Specification (REES).
Additionally, the notebook instance includes a configurable cloud volume at `/data`, which is particularly useful for managing large datasets
that cannot be included within the repository itself.

**The following platforms are available for your computational needs:**

{{<link "platform-in-depth-slurm">}}**Slurm Cluster**{{</link>}} is a high-performance computing cluster utilising Slurm for resource management and job scheduling across multiple nodes. This platform is ideal for batch processing and computationally intensive tasks. {{<link "platform-in-depth-k8s">}}**Kubernetes:**{{</link>}} is a comprehensive container orchestration platform providing a robust environment for deploying and managing containerised applications. Please note that utilising the Kubernetes platform necessitates an existing Kubernetes cluster. {{<link "platform-in-depth-jupyterhub">}}**JupyterHub:**{{</link>}} is a multi-user JupyterHub deployment built upon Kubernetes, enabling collaborative and interactive computing with Jupyter Notebooks. **Jupyter Notebooks:** provides interactive Jupyter Notebooks from an existing GitHub, GitLab, Zenodo or Figshare repository. Powered by repo2docker. **DaskHub:** is a multi-user DaskHub deployment on Kubernetes, facilitating parallel computing in Python. It extends the capabilities of JupyterHub by providing a framework for distributed computing and scalable data analysis.

Azimuth **Quotas** provides a comprehensive overview of resource allocation within the Azimuth platform. This functionality allows users to monitor both the total resources allocated to them and the proportion of those resources currently in use. Azimuth **Quotas** include: **machines:** which indicates the number of allowed machines that can be spinned up in the project/tenancy, **volumes:** which indicates the number of volumes that can be created in the tenancy/project, **external IPs:** (note that the quota use is for the tenancy, not the IPs attached to machines/in use by platforms), **CPUs:** which indicates the total number of CPUs that can be defined for all platforms in the current tenancy, **RAM:** which indicates the total amount of RAM that can be define for all platforms in the current tenancy and **volume storage:** which indiactes the total size
of storage capacity that can be defined for platforms in the current tenancy. as shown below:

{{<image src="img/docs/azimuth-images/Azimuth-quotas-Page.jpg" caption="Quotas page" wrapper="col-6 mx-auto" wrapper="text-center">}}

In the advanced tab there are two sections, the **machine** and the **volume** sections. Documentation for accessing a machine go to the:
{{<link "platform-in-depth-workstation">}}**Create a Machine**{{</link>}} section. Some actions you can be able to perform on the machine include **viewing** a list of existing machines, **edit** or **delete** machines, **attatch/detatch** external IPs, **define firewall rules** and **Start/Stop/Restart** machines. On the **volume tab**, users are able to, **view** a list of volumes in the project and **create new** volumes by providing the name and volume size.
{{<image src="img/docs/azimuth-images/Azimuth-create-volume-Page.jpg" caption="Azimuth New volume" wrapper="col-4 mx-auto" wrapper="text-center">}}
Additinally users can **delete** and **attach / detach** volumes.
For details on other platforms: {{<link "platform-in-depth-slurm">}}**Slurm Cluster**{{</link>}} | {{<link "platform-in-depth-k8s">}}**Kubernetes**{{</link>}} | {{<link "platform-in-depth-jupyterhub">}}**JupyterHub**{{</link>}} | {{<link "platform-in-depth-workstation">}}**Linux Workstations**{{</link>}}
