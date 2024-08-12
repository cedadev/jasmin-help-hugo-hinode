---
description: In depth look at the workstation platforms
slug: platform-in-depth-k8s
title: Platforms In Depth - Workstastions
---

- What is it
  - differences between the two
- what is it's purpose
- how to create
- how to patch/update
- how to use
  
### Linux Workstation:

- The Linux Workstation platform offers a flexible Ubuntu 22.04 cloud instance.
- You can access it via a web browser to use the graphical desktop or shell.
- You can also add an external IP address to access the instance from outside the project using SSH.
- The instance includes a cloud volume at /data for large datasets.
- You can set the size of this volume when launching the platform.

### Launch Configuration

Note: Platform names are visible to all project members!

Option | Explanation
---|---
Platform name | A name to identify the Linux Workstation.
Workstation size | The size of the cloud instance, showing the number of CPUs and RAM.
Volume size | The size of the cloud volume at /data.
External IP for SSH access (optional) |  Assign an external IP address if needed |
{.table .table-striped}

### Some advanced features include:

Feature | Use
---|---
Platform Monitoring | A Grafana dashboard for system monitoring
EESSI | A software suite which offers various toolkits and modules for research computing.
Podman | Is included for building and running OCI containers. It is recommended to install software via Podman to avoid issues during image upgrades. The Podman CLI is similar to Docker’s.
Apptainer | Is another container framework included for HPC applications which supports OCI containers like Podman |
{.table .table-striped}

To Access the Linux Platform navigate to this link:  ({{<ref "azimuth-cloud-portal" >}})

To create a Linux platform instance proceed as follows:

From the azimuth tenancy landing page shown below click on Create a Platform.
{{<image src="img/docs/azimuth-images/azimuth-tenancy-platform-landing-page.jpg" caption="Platform landing page">}}

Sections on the platform page:

  1. sign out: Displays the currently logged in user
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
