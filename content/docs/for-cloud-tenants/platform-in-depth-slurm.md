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

Provide a unique name for your Slurm platform.
Assign an external IP address to your cloud project's login node if needed.
Specify the number and size of compute nodes based on your workload requirements.
Optionally run post-configuration validation tests for added confidence.

### Key Considerations

- Platform names are visible to all members within your cloud project.
- Monitor system performance and job status using the integrated Grafana dashboard and Open OnDemand's job-specific monitoring.
- The 'azimuth' user has passwordless sudo access. For sudo access on non-login nodes, SSH as 'azimuth' from the login node first.
- To preserve software installations across platform upgrades, consider packaging them for use with 'apptainer', which supports SIF and Docker/OCI container formats.
- Explore the EESSI pilot repository for additional software options.
- For software with broad applicability, contribute to the Ansible Slurm Appliance repository to enhance the platform's image building and configuration capabilities.
