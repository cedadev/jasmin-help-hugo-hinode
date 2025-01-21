---
description: In depth look at the workstation platforms
slug: platform-in-depth-workstation
title: Platforms In Depth - Workstastions
weight: 30
---
**The Linux Workstation platform** provides a versatile cloud-based instance running Ubuntu 22.04. Users can access the graphical desktop environment or the command-line interface through a web browser. For external access, an optional public IP address can be configured to enable secure shell (SSH) connections. Each instance includes a dedicated cloud volume mounted at /data for managing large datasets. The capacity of this volume is configurable during instance launch.
Azimuth offers two distinct **Linux Workstation configurations**, primarily differentiated by **access methods** and **resource utilisation**.
**Linux Workstation (Direct Access)** configuration provides direct access to the Azimuth platform via a graphical user interface (GUI) displayed within the user's web browser.
Interaction with the platform leverages standard mouse and keyboard input. The Azimuth platform utilises the processing power, memory, and storage resources of the underlying cloud instance/project. This option is ideal for users who prefer a traditional GUI-driven workflow and whose workload requirements are compatible with the allocated cloud instance resources.
**Linux Workstation (with SSH access)** configuration facilitates remote access to the Azimuth platform through the secure shell (SSH) protocol. Users interact with the platform via a command-line interface (CLI) established from their local workstation. The Azimuth platform operates on a remote server, utilising its resources to execute tasks. This option is well-suited for users comfortable with command-line operations, those with constrained local resources, or those requiring access from multiple locations.
***Note:*** Platform names are visible to all project members!

**Option** | **Explanation**
---|---
Platform name | A name to identify the Linux Workstation.
Workstation size | The size of the cloud instance, showing the number of CPUs and RAM.
Volume size | The size of the cloud volume at /data.
External IP for SSH access (optional) |  Assign an external IP address if needed |
{.table .table-striped}

**Some additional features include:**

**Feature** | **Use**
---|---
Platform Monitoring | A Grafana dashboard for system monitoring
EESSI | A software suite which offers various toolkits and modules for research computing.
Podman | Is included for building and running OCI containers. It is recommended to install software via Podman to avoid issues during image upgrades. The Podman CLI is similar to Docker’s.
Apptainer | Is another container framework included for HPC applications which supports OCI containers like Podman
{.table .table-striped}

To creating a Linux platform instance, from the Azimuth tenancy landing page shown below click on the **Create a Platform** button / **New platform** button.

{{<image src="img/docs/azimuth-images/azimuth-tenancy-platform-landing-page.jpg" caption="Platform landing page" wrapper="col-5 mx-auto" wrapper="text-center">}}

A list of available platforms will be shown, where you can choose the linux workstation.

{{<image src="img/docs/azimuth-images/azimuth-available-platforms.jpg" caption="Platform List" wrapper="col-9 mx-auto" wrapper="text-center">}}

On the create a new platform window provide a platform name of your choice. ***Note that only lower case and dash (-) are allowed characters*** and Workstation Size.
From the dropdown list selet from a list of predefined sizes ***Note that each resource used reduces the number of resources in the allocated quota for the project/tenancy*** and a select
the data volume size for your workstation which will be available at `/data`. When yo want to make changes to the configurations, use the back button, otherwise click on Create Platform.
On the platform scheduling window shown below, review the current requested resource count/size against the projected resouce usage and the tenant resource quota/allocation.

{{<image src="img/docs/azimuth-images/Azimuth-platform-resource-consumption-Page.jpg" caption="Platform Scheduling" wrapper="col-8 mx-auto" wrapper="text-center">}}

This enables better resource management. Once done click on confirm which will land you on the azimuth platform configuring page show below.

{{<image src="img/docs/azimuth-images/Azimuth-configuring-page.jpg" caption="Configuring" wrapper="col-8 mx-auto" wrapper="text-center">}}

Once the deployment is complete the deployment page indicates the workstation is ready and you can use **details** button to navigate to the platform instance or the **monitor** button to monitor the workstation. From the **Web console** label, you can either copy the url for the web interface for the workstation or click on the link for webconsole for the workstation.

{{<image src="img/docs/azimuth-images/Azimuth-webconsole-url-Page.jpg" caption="Webconsole" wrapper="col-9 mx-auto" wrapper="text-center">}}

Additionlly when you hover the mouse over the Monitoring link you can either copy the link or click on the go-to service link to navigate to the grafana monitoring page shown below

{{<image src="img/docs/azimuth-images/Azimuth-monitoring-Page.jpg" caption="Monitoring" wrapper="col-9 mx-auto" wrapper="text-center">}}

When you click the details button you can view the platform details shown below:

{{<image src="img/docs/azimuth-images/Azimuth-platfor-details-Page.jpg" caption="Platform details" wrapper="col-9 mx-auto" wrapper="text-center">}}

The platform details also allows for updating, patching or deleting the platform.

{{<image src="img/docs/azimuth-images/Azimuth-update-platform-Page.jpg" caption="Update" wrapper="col-9 mx-auto" wrapper="text-center">}}

The platform details page allows you navigate to the webconsole service (Apache guacamole) or the monitoring page as indicated earlier. The webconsole navigates to the All connections for the platform (Desktop or shell) and you will be able to view any recent desktop or shell sessions. **Note** You may need to allow your browser to use the clipboard for copying and pasting text from your PC/Mac to the console instance of the platform.

{{<image src="img/docs/azimuth-images/azimuth-all-connections-page.jpg" caption="All connections" wrapper="col-9 mx-auto" wrapper="text-center">}}

From the all connections you can navigate to a browser based desktop instance of your Ubuntu desktop or instance of a shell. It is important to take note of the unique ID `xxxxxxxxxxxxxx` in the `azimuth.jasmin.ac.uk/guacamole/#/` url.

To **Creating a volume** To create a new volume, navigate to the Tenancy/project page and in the advanced section click the Volumes button.
There you can click the **New volume** button shown below:

  {{<image src="img/docs/azimuth-images/azimuth-new-volume-page.jpg" caption="New volume" wrapper="col-9 mx-auto" wrapper="text-center">}}

Specify the volume name, size and click on create.

{{<image src="img/docs/azimuth-images/azimuth-volume-name-page.jpg" caption="New volume" wrapper="col-9 mx-auto" wrapper="text-center">}}

Once the volume is created you can perform actions like **attach**, **detach** or **Delete** the volume on an instance of a platform. This is available from the Actions button
  
{{<image src="img/docs/azimuth-images/azimuth-attach-volume-page.jpg" caption="New volume" wrapper="col-9 mx-auto" wrapper="text-center">}}

You can also detach or delete an existing volume in your tenancy. It is particularly important to note that you can only manually detatch or delete a volume that you manually attached or created.