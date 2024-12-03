---
description: In depth look at the slurm platform
slug: platform-in-depth-slurm
title: Platforms In Depth - Slurm
---
The **Slurm platform** empowers users with a high-performance computing environment, leveraging the Slurm workload manager and Open OnDemand for seamless job scheduling and resource management. It also enables access to the platform effortlessly through a web browser via the Open OnDemand interface or directly using SSH.

To setup the platform you need to provide a unique name for your Slurm platform, assign an external IP address to your cloud project's login node if needed, specify the number and size of compute nodes based on your workload requirements and optionally run post-configuration validation tests for added confidence.

Some key Considerations when defining a Slurm cluster inlude the following:

- The platform name will be visible to all members of your cloud project
- One can monitor system performance and job status using the integrated Grafana dashboard and Open OnDemand's job-specific monitoring.
- The `azimuth` user has passwordless sudo access. For sudo access on non-login nodes, SSH as `azimuth` from the login node first.
- To preserve software installations across platform upgrades, consider packaging them for use with 'apptainer', which supports SIF and Docker/OCI container formats.
- Explore the EESSI pilot repository for additional software options and
- For software with broad applicability, contribute to the Ansible Slurm Appliance repository to enhance the platform's image building and configuration capabilities.

To create a new SLURM Cluster platform navigate to you Azimuth tenancy/project and select the Create platform button
From the list of platforms select the SLURM workload manager platform option
{{<image src="img/docs/azimuth-images/Azimuth-create-slurm-cluster-configuration-Page.jpg" caption="Create SLURM platform" wrapper="col-9 mx-auto" wrapper="text-center">}}>

If you get an error such as:

`Azimuth SLURM cluster creation error: Failed to create platform. To retry please click patch. Possible reason for the failure was: Task:'ensure nfs service is running' Error: Unable to start service nfs-server: A dependency job for nfs-server.service failed. See 'journalctl -xe' for details`

Here are some steps you can take to resolve the issue:

**Check the System Log:**
Use the command journalctl -xe to view the system log. This will provide more specific details about the dependency job that failed and why. Look for error messages related to NFS.
**Verify NFS Configuration:**
Ensure that the NFS service is enabled and configured correctly. This might involve checking the /etc/exports file (which specifies which directories are exported for NFS) and the firewall settings to ensure NFS traffic is allowed.
**Check for Dependency Issues:** The error message mentions a dependency job that failed. Identify the dependency and ensure it's running correctly. This could be a network service, a storage subsystem, or another system component.
**Restart NFS Service:**
If the configuration seems correct and there are no dependency issues, try restarting the NFS service manually. You can do this using the command sudo systemctl restart nfs-server.
**Check for Disk Space:**
Ensure that the disk where the NFS shares are located has enough free space. NFS services might fail if there's insufficient space.
**Verify Network Connectivity:**
If the NFS shares are on a remote server, verify that network connectivity is working correctly. Check for firewall rules or network configuration issues that might be preventing NFS traffic.
**Consult Documentation:**
Refer to the documentation for your specific Azimuth SLURM cluster setup and the underlying operating system for more detailed instructions on troubleshooting NFS issues.
**Retry Patching:**
If the above steps don't resolve the issue, you can try retrying the patching process in Azimuth SLURM. However, make sure to address the underlying NFS problem first to prevent the issue from recurring.

For further details click the link for: [**monitoring Slurm**]({{< ref path="docs/batch-computing/how-to-monitor-slurm-jobs" >}}) | [**submit a Slurm job**]({{< ref path="docs/batch-computing/how-to-submit-a-job-to-slurm" >}}) | [**Slurm queues**]({{< ref path="docs/batch-computing/slurm-queues" >}}) | and the [**Slurm scheduler**]({{< ref path="docs/batch-computing/slurm-scheduler-overview" >}})
