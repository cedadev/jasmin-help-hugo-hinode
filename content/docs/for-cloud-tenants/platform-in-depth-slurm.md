---
description: In depth look at the slurm platform
slug: platform-in-depth-slurm
title: Platforms In Depth - Slurm
---

- what is it
- what the purpose
- creating
- updating
- patching
- changing options?

## Slurm Platform Overview

- The Slurm platform empowers users with a high-performance computing environment, leveraging the Slurm workload manager and Open OnDemand for seamless job scheduling and resource management.
- Access the platform effortlessly through your web browser via the Open OnDemand interface or connect directly using SSH.

## Getting Started

### Platform Setup

- Provide a unique name for your Slurm platform.
- Assign an external IP address to your cloud project's login node if needed.
- Specify the number and size of compute nodes based on your workload requirements.
- Optionally run post-configuration validation tests for added confidence.

### Key Considerations

- Platform names are visible to all members within your cloud project.
- Monitor system performance and job status using the integrated Grafana dashboard and Open OnDemand's job-specific monitoring.
- The 'azimuth' user has passwordless sudo access. For sudo access on non-login nodes, SSH as 'azimuth' from the login node first.
- To preserve software installations across platform upgrades, consider packaging them for use with 'apptainer', which supports SIF and Docker/OCI container formats.
- Explore the EESSI pilot repository for additional software options.
- For software with broad applicability, contribute to the Ansible Slurm Appliance repository to enhance the platform's image building and configuration capabilities.

### Creating a SLURM Cluster

To create a new SLURM Cluster platform navigate to you Azimuth tenancy/project

Click the Create platform button and you will navigate to the page shown below:

From the list of platforms select the SLURM workload manager platform option

{{<image src="img/docs/azimuth-images/azimuth-available-platforms.jpg" caption="Choose platform">}}

{{<image src="img/docs/azimuth-images/Azimuth-create-slurm-cluster-configuration-Page.jpg" caption="Create SLURM platform">}}

{{<image src="img/docs/azimuth-images/Azimuth-slurm-platform-scheduling-Page.jpg" caption="platform scheduling">}}

### Updating a SLURM Cluster

### Patching a SLURM Cluster

### Changing options on a SLURM Cluster

If you get an error such as:
***Azimuth SLURM cluster creation error: Failed to create platform. To retry please click patch. Possible reason for the failure was: Task:'ensure nfs service is running' Error: Unable to start service nfs-server: A dependency job for nfs-server.service failed. See 'journalctl -xe' for details.***

Here are some steps you can take to resolve the issue:

1. Check the System Log: Use the command journalctl -xe to view the system log. This will provide more specific details about the dependency job that failed and why. Look for error messages related to NFS.
2. Verify NFS Configuration: Ensure that the NFS service is enabled and configured correctly. This might involve checking the /etc/exports file (which specifies which directories are exported for NFS) and the firewall settings to ensure NFS traffic is allowed.
3. Check for Dependency Issues: The error message mentions a dependency job that failed. Identify the dependency and ensure it's running correctly. This could be a network service, a storage subsystem, or another system component.
4. Restart NFS Service: If the configuration seems correct and there are no dependency issues, try restarting the NFS service manually. You can do this using the command sudo systemctl restart nfs-server.
5. Check for Disk Space: Ensure that the disk where the NFS shares are located has enough free space. NFS services might fail if there's insufficient space.
6. Verify Network Connectivity: If the NFS shares are on a remote server, verify that network connectivity is working correctly. Check for firewall rules or network configuration issues that might be preventing NFS traffic.
7. Consult Documentation: Refer to the documentation for your specific Azimuth SLURM cluster setup and the underlying operating system for more detailed instructions on troubleshooting NFS issues.
8. Retry Patching: If the above steps don't resolve the issue, you can try retrying the patching process in Azimuth SLURM. However, make sure to address the underlying NFS problem first to prevent the issue from recurring.
