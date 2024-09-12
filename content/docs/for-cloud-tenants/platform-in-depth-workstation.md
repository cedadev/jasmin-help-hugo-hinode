---
description: In depth look at the workstation platforms
slug: platform-in-depth-workstation
title: Platforms In Depth - Workstastions
---
### Linux Workstation:

- The Linux Workstation platform offers a flexible Ubuntu 22.04 cloud instance.
- You can access it via a web browser to use the graphical desktop or shell.
- You can also add an external IP address to access the instance from outside the project using SSH.
- The instance includes a cloud volume at /data for large datasets.
- You can set the size of this volume when launching the platform.

### Linix workstation types

There are two types of Linux Workstation patform types and the primary difference between Linux Workstation and Linux Workstation (with SSH access) for the Azimuth platform lies in the method of accessing and interacting with the platform.

#### Linux Workstation:

- Direct Access: This configuration provides direct access to the Azimuth platform through a graphical user interface (GUI) running on the Linux workstation. You can interact with the platform using a mouse and keyboard.
- Local Resources: The workstation's local resources (CPU, memory, storage) are used to run the Azimuth platform.
- Suitable for: Users who prefer a traditional GUI-based interface and have sufficient local resources to handle the platform's workload.

#### Linux Workstation (with SSH access):

- Remote Access: This configuration provides access to the Azimuth platform remotely using the Secure Shell (SSH) protocol. You interact with the platform through a command-line interface (CLI) on your local workstation.
- Remote Resources: The Azimuth platform runs on a remote server, and you access it over a network connection. The remote server's resources are used to handle the platform's workload.
- Suitable for: Users who prefer a command-line interface, have limited local resources, or need to access the platform from multiple locations.

#### Launch Configuration

Note: Platform names are visible to all project members!

Option | Explanation
---|---
Platform name | A name to identify the Linux Workstation.
Workstation size | The size of the cloud instance, showing the number of CPUs and RAM.
Volume size | The size of the cloud volume at /data.
External IP for SSH access (optional) |  Assign an external IP address if needed |
{.table .table-striped}

#### Some advanced features include:

Feature | Use
---|---
Platform Monitoring | A Grafana dashboard for system monitoring
EESSI | A software suite which offers various toolkits and modules for research computing.
Podman | Is included for building and running OCI containers. It is recommended to install software via Podman to avoid issues during image upgrades. The Podman CLI is similar to Docker’s.
Apptainer | Is another container framework included for HPC applications which supports OCI containers like Podman
{.table .table-striped}

### Creating a Linix platform

To create a Linux platform instance proceed as follows:

- From the initial Azimuth tenancy landing page shown below click on the Create a Platform button (marked 11) / New platform button (marked 12).

{{<image src="img/docs/azimuth-images/azimuth-tenancy-platform-landing-page.jpg" caption="Platform landing page">}}

The following are sections on the platform page and a brief discription of each.

  1. sign out: Displays the currently logged in user
  2. Platform: Indicates the platform pane header
  3. Displays the tenancy/Project name.
  4. Quotas: Show the provisioned resource quotas for the tenancy
  5. Identity provider: Displays the configured Identity providers and associated settings.
  6. Advanced: Advanced setting displays some advanced feature settings for the platform and the associated resources
  7. Machines: Displays the provisioned Machines (Compute resources)
  8. Volume: Displays the provisioned volumes
  9. The Switch tenency: used when the currently logged in user needs to switch to another tenancy they area a member of.
  10. SSH public key: This is where the user can add there public key. ***Once a key has been added the text box can not be left empty***.
  11. Create Platform: used to select a platform to create.
  12. New platform: used to create a new platform just like 11. above

- You will land on the page shown below showing a list of available platforms.

{{<image src="img/docs/azimuth-images/azimuth-available-platforms.jpg" caption="Platform List">}}

- Select the Linux Workstation type you would like to create.

{{<image src="img/docs/azimuth-images/azimuth-choose-linux-platform.jpg" caption="Choose Platform">}}

- On the Create a new platform window enter:

  - The Platform name of your choice. ***Note that only lower case and dash (-) are allowed characters***
  - Workstation Size.
    - Selet from a list of predefined sizes ***Note that each resource used reduces the number of resources in the allocated quota for the project/tenancy***
  - The data volume size for your workstation which will be available at /data.

{{<image src="img/docs/azimuth-images/azimuth-configure-linux-platform.jpg" caption="Choose Platform">}}

- To make changes to the configurations use the back button. Otherwise click on Create Platform.

- On the platform scheduling window shown below, review the current requested resource count/size against the projected resouces usage and the tenant resource quota/allocation.

{{<image src="img/docs/azimuth-images/Azimuth-platform-resource-consumption-Page.jpg" caption="Platform Scheduling">}}

- This enables better resource management. To proceed click on confirm

- You will see the azimuth platform configuring page show below.

{{<image src="img/docs/azimuth-images/Azimuth-configuring-page.jpg" caption="Configuring">}}

- Once the deployment is complete the deployment page indicates the workstation is ready and you can view the details or monitor the workstation.

## Mintoring

- When you hover the mouse over the Web console label you can either copy the url for the web interface for workstation or click on the link for webconsole for the workstation.

{{<image src="img/docs/azimuth-images/Azimuth-webconsole-url-Page.jpg" caption="Webconsole">}}

- When you hover the mouse over the Monitoring link you can either copy the link or click on the go-to service link to navigate to the grafana monitoring page shown below

{{<image src="img/docs/azimuth-images/Azimuth-monitoring-Page.jpg" caption="Monitoring">}}

- When you click the details button you can view the platform details shown below:

{{<image src="img/docs/azimuth-images/Azimuth-platfor-details-Page.jpg" caption="Platform details">}}

- The platform details also allows for updating, patching or deleting the platform.

{{<image src="img/docs/azimuth-images/Azimuth-update-platform-Page.jpg" caption="Update">}}

- The platform details page allows you navigate to the webconsole service (Apache guacamole) or the monitoring page as indicated above.

- The webconsole navigates to the All connections for the platform (Desktop or shell).
- You will also be able to view any recent desktop or shell sessions.
- Note You may need to allow your browser to use the clipboard for copying and pasting text from your PC/Mac to the console instance of the platform.

{{<image src="img/docs/azimuth-images/azimuth-all-connections-page.jpg" caption="All connections">}}

- From the all connections you can navigate to a browser based Desktop instance of your Ubuntu desktop or a browser based instance of a shell.

## Creating a volume

To create a new volume proceed as follows:

- On the Tenancy/project page, in the advanced section click the Volumes button.
  
- Click the New volume button shown below:

  {{<image src="img/docs/azimuth-images/azimuth-new-volume-page.jpg" caption="New volume">}}

- Specify the volume name, size and click on create.

{{<image src="img/docs/azimuth-images/azimuth-volume-name-page.jpg" caption="New volume">}}

- Once the volume is created you can perform the following actions: attach, detach or Delete the volume on an instance of a platform.
- these option are available from the Actions button
  
{{<image src="img/docs/azimuth-images/azimuth-attach-volume-page.jpg" caption="New volume">}}

You can also detach or delete an existing volume in your tenancy.

{{<image src="img/docs/azimuth-images/Azimuth-detatch-volume-Page.jpg" caption="detatch volume">}}

You can only manually detatch or delete a volume that you manually attached or created

{{<image src="img/docs/azimuth-images/Azimuth-delete-volume-Page.jpg" caption="delete volume">}}
