---
description: In depth look at the slurm platform
slug: platform-in-depth-slurm
title: Platforms In Depth - Slurm
weight: 60
---

The **Slurm platform** empowers users with a high-performance computing environment, using the Slurm workload manager and Open OnDemand for seamless job scheduling and resource management. It also enables access to the platform effortlessly through a web browser via the Open OnDemand interface or directly using SSH.

To setup the platform you need to provide a unique name for your Slurm platform, assign an external IP address to your cloud project's login node if needed, specify the number and size of compute nodes based on your workload requirements, and, optionally, run post-configuration validation tests for added confidence.

Some key Considerations when defining a Slurm cluster include the following:

- System performance and job status can be monitored using the integrated Grafana dashboard and Open OnDemand's job-specific monitoring.
- The `azimuth` user has passwordless sudo access. For `sudo` access on non-login nodes, SSH as `azimuth` from the login node first.
- To preserve software installations across platform upgrades, consider packaging them for use with `apptainer`, which supports SIF and Docker/OCI container formats.
- Explore the EESSI pilot repository for additional software options.
- For software with broad applicability, contribute to the Ansible Slurm Appliance repository to enhance the platform's image building and configuration capabilities.

## Platform creation

To create a new Slurm Cluster platform navigate to your Azimuth tenancy/project and select **Create platform** or **New platform**.

From the list of platforms select the Slurm workload manager platform option.

{{<mark>}}Image is a bit blurry - can we get a better one?{{</mark>}}

{{<image src="img/docs/azimuth-images/Azimuth-create-slurm-cluster-configuration-Page.jpg" caption="Create Slurm platform" wrapper="col-9 mx-auto text-center">}}

Once the deployment is complete an instance of a slurm cluster will appear under the **Platforms** Tab.

{{<image src="img/docs/azimuth-images/Azimuth-slurm-cluster-Page.jpg" caption="Slurm cluster" wrapper="col-9 mx-auto text-center">}}

## Platform usage

Click **Details** to access the Slurm cluster:

{{<image src="img/docs/azimuth-images/slurm-cluster-details.jpg" caption="Slurm cluster Details" wrapper="col-12 mx-auto text-center">}}

This provides a command-line example to access the slurm cluster, but also the ability to **update**, **patch** and **delete** the cluster, along with details such creation date.

There are two services accessible from the **Details** page: the **Open onDemand** and the **Monitoring** service.

Click **Open OnDemand** to access and manage the Slurm cluster.

{{<image src="img/docs/azimuth-images/openonDemand.jpg" caption="Slurm open ondemand" wrapper="col-9 mx-auto text-center">}}

This web interface can be used to navigate the file system, create and manage jobs as shown below:

{{<image src="img/docs/azimuth-images/managejobs.jpg" caption="Manage jobs" wrapper="col-12 mx-auto text-center">}}

To simplify the creation of jobs, **Open OnDemand** offers templates that reduce the effort associated with job and assciated script creation.

{{<image src="img/docs/azimuth-images/jobcreation.jpg" caption="Create jobs" wrapper="col-12 mx-auto text-center">}}

From the **Details** page you can also monitor your Slurm cluster using Grafana.

An alternative way to navigate to the Slurm cluster from the platform landing page is to click **Open OnDemand**.

If you get an error such as this when creating your Slurm cluster:

```console
Azimuth SLURM cluster creation error: Failed to create platform.
To retry please click patch. Possible reason for the failure was:
Task:'ensure nfs service is running' Error: Unable to start service nfs-server:
A dependency job for nfs-server.service failed. See 'journalctl -xe' for details
```

try the following steps:

- **Check the System Log**
  - Use the command `journalctl -xe` to view the system log. This will provide more specific details about the dependency job that failed and why. Look for error messages related to NFS.
- **Verify NFS Configuration**
  - Ensure that the NFS service is enabled and configured correctly. This might involve checking the /etc/exports file (which specifies which directories are exported for NFS) and the firewall settings to ensure NFS traffic is allowed.
- **Check for Dependency Issues**
  - The error message mentions a dependency job that failed. Identify the dependency and ensure it's running correctly. This could be a network service, a storage subsystem, or another system component.
- **Restart NFS Service**
  - If the configuration seems correct and there are no dependency issues, try restarting the NFS service manually. You can do this using the command sudo systemctl restart nfs-server.
- **Check for Disk Space**
  - Ensure that the disk where the NFS shares are located has enough free space. NFS services might fail if there's insufficient space.
- **Verify Network Connectivity**
  - If the NFS shares are on a remote server, verify that network connectivity is working correctly. Check for firewall rules or network configuration issues that might be preventing NFS traffic.
- **Retry Patching**
  - If the above steps don't resolve the issue, you can try retrying the patching process in Azimuth SLURM. However, make sure to address the underlying NFS problem first to prevent the issue from recurring.

For further details on using slurm visit the JASMIN Slurm Documentation:

- [monitoring Slurm]({{% ref "how-to-monitor-slurm-jobs" %}})
- [submit a Slurm job]({{% ref "how-to-submit-a-job-to-slurm" %}})
- [Slurm queues]({{% ref "slurm-queues" %}})
- [Slurm scheduler]({{% ref "slurm-scheduler-overview" %}})
