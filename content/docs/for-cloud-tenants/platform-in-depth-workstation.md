---
description: In depth look at the workstation platforms
slug: platform-in-depth-workstation
title: Platforms In Depth - Workstations
weight: 30
---

**The Linux Workstation platform** provides a versatile cloud-based instance running Ubuntu 22.04. Users can access the graphical desktop environment or the command-line interface through a web browser. These are aimed at:

- those with constrained local resources
- those requiring access from multiple locations
- as an easy was to create a machine which also has an available GUI.

For external access, an optional public IP address can be configured to enable secure shell (SSH) connections. Each instance includes a dedicated cloud volume mounted at `/data` for managing large datasets. The capacity of this volume is configurable during instance launch.
Azimuth offers two distinct **Linux Workstation configurations**, primarily differentiated by **access methods** and **resource utilisation**.

1. **Linux Workstation (Direct Access)** configuration provides direct access to the Azimuth platform via a graphical user interface (GUI) displayed within the user's web browser.
Interaction with the platform uses standard mouse and keyboard input. The Azimuth platform uses the processing power, memory, and storage resources of the underlying cloud instance/project. This option is ideal for users who prefer a traditional GUI-driven workflow and whose workload requirements are compatible with the allocated cloud instance resources. Shell access through the browser is also possible.

1. **Linux Workstation (with SSH access)** configuration facilitates remote access to the Azimuth platform through the secure shell (SSH) protocol. Users interact with the platform via a command-line interface (CLI) established from their local workstation. This option is well-suited for users comfortable with command-line operations.

### Configuration

**Option** | **Explanation**
---|---
Platform name | A name to identify the Linux Workstation.
Workstation size | The size of the cloud instance: the number of CPUs and RAM.
Volume size | The size of the cloud volume at /data.
External IP for SSH access (optional) |  Assign an external IP address if needed |
{.table .table-striped .w-auto}

Some additional features of the Workstation platforms include:

**Feature** | **Use**
---|---
Platform Monitoring | A Grafana dashboard for system monitoring
EESSI | A software suite which offers various toolkits and modules for research computing.
Podman | Is included for building and running OCI containers. It is recommended to install software via Podman to avoid issues during image upgrades. The Podman CLI is similar to Docker’s.
Apptainer | another container framework included for HPC applications, supporting OCI containers like Podman
{.table .table-striped}.

### Platform Creation

From the Azimuth tenancy landing page shown below click **Create a Platform** or **New platform**.

{{<image src="img/docs/platform-in-depth-workstation/azimuth-tenancy-platform-landing-page.png" caption="Platform landing page" wrapper="col-12 mx-auto text-center">}}

A list of available platforms will be shown, where you can choose the **Linux Workstation**.

On the create a new platform window provide a platform name of your choice. ***Note that only lower case and dash (-) are allowed characters*** and Workstation Size.
From the dropdown list select from a list of predefined sizes (*note that each resource used reduces the number of resources in the allocated quota for the project/tenancy*) and a select
the data volume size for your workstation which will be available at `/data`. If you want to make changes to the configurations, use the back button, otherwise click on Create Platform.

{{<mark>}}Can we have an image showing the options when creating a workstation here?{{</mark>}}

{{<image src="img/docs/platform-in-depth-workstation/new-work-station.png" caption="New work station" wrapper="col-10 mx-auto text-center">}}

The platform scheduling window shown below will then enable you to review the current requested resource count/size against the projected resource usage and the tenant resource quota/allocation.

{{<image src="img/docs/platform-in-depth-workstation/Azimuth-platform-resource.png" caption="Platform Scheduling" wrapper="col-6 mx-auto text-center">}}

This enables better resource management. Once done click **confirm** to go to the azimuth platform configuring page, shown below.

{{<image src="img/docs/platform-in-depth-workstation/Azimuth-configuring-page.png" caption="Platform in configuring state" wrapper="col-6 mx-auto text-center">}}

### Platform Usage

Once the deployment is complete, the deployment page indicates the workstation is ready. Click **details** to go to the platform instance or **monitor** to monitor the workstation. From  **Web console**, you can either copy the URL for the web interface for the workstation, or click on the link for the webconsole for the workstation.

{{<image src="img/docs/platform-in-depth-workstation/platform-ready-state.png" caption="Platform in ready state" wrapper="col-10 mx-auto text-center">}}

Additionally when you hover the mouse over the Monitoring link you can either copy the link or click on the go-to service link to navigate to the Grafana monitoring page shown below.

{{<image src="img/docs/platform-in-depth-workstation/Azimuth-monitoring-Page.png" caption="Monitoring" wrapper="col-12 mx-auto text-center">}}

When you click the **Details** button on the platform you can view the platform details shown below.

{{<image src="img/docs/platform-in-depth-workstation/Azimuth-platform-details-Page.png" caption="Platform details" wrapper="col-11 mx-auto text-center">}}

The platform details also allows for **updating**, **patching** or **deleting** the platform.

{{<image src="img/docs/platform-in-depth-workstation/Azimuth-update-platform-Page.png" caption="Platform update pop up" wrapper="col-9 mx-auto text-center">}}

The platform details page allows you navigate to the webconsole service (Apache guacamole) or the monitoring page as indicated earlier. For the GUI and webconsole, navigate to the **All connections** section after clicking **Web console** on the **platform** tile. You will be able to view any recent desktop or shell sessions. 

**Note** You may need to allow your browser to use the clipboard for copying and pasting text from your PC/Mac to the console instance of the platform.

{{<image src="img/docs/platform-in-depth-workstation/azimuth-all-connections-page.png" caption="All connections" wrapper="col-10 mx-auto text-center">}}

From the all connections you can navigate to a browser-based desktop instance of your Ubuntu desktop or instance of a shell. It is important to take note of the unique ID `xxxxxxxxxxxxxx` in the `azimuth.jasmin.ac.uk/guacamole/#/` url.

To create a new volume, navigate to the Tenancy/project page and in the advanced section click the Volumes button.
There you can click the **New volume** button shown below:

  {{<image src="img/docs/platform-in-depth-workstation/azimuth-new-volume-page.png" caption="New volume" wrapper="col-14 mx-auto text-center">}}

Specify the volume name, size and click on create.

{{<image src="img/docs/platform-in-depth-workstation/azimuth-volume-name-page.png" caption="New volume name" wrapper="col-6 mx-auto text-center">}}

Once the volume is created you can perform actions like **attach**, **detach** or **delete** the volume on an instance of a platform. This is available from the Actions button
  
{{<image src="img/docs/platform-in-depth-workstation/azimuth-attach-volume-page.png" caption="Attatch, delete or detach a volume" wrapper="col-6 mx-auto text-center">}}

You can also detach or delete an existing volume in your tenancy. It is particularly important to note that you should only manually detach or delete a volume that you manually attached or created, not the ones created with the platform.
