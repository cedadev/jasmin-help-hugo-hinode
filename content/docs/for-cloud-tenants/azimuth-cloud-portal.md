---
description: Introduction to the Azimuth cloud portal
slug: azimuth-cloud-portal
title: The Azimuth Cloud Portal
---
- Azimuth is a self-service portal designed to simplify the management of cloud resources, particularly for high-performance computing (HPC) and artificial intelligence (AI) applications.
- It supports OpenStack clouds and can manage a range of platforms from single-machine workstations to entire Slurm clusters and Kubernetes-based platforms like JupyterHub.

## Key features include:

## Multiple Authentication Methods:

Supports username/password, Keystone federation, and application credentials.

## On-demand Platforms:

Unified interface for managing Kubernetes and Cluster-as-a-Service (CaaS) platforms.

## Application Proxy:

Uses Zenith to expose services without consuming floating IPs or requiring SSH keys.

## Simplified OpenStack Management:

Automatic network detection, machine and volume management, and security group configuration.

- what's it's purpose (simplification of Horizon)
Azimuth Science Platforms are designed to provide flexible, high-performance computing environments tailored for scientific research.

Here are some key purposes:

## High-Performance Computing (HPC):

These platforms support large-scale computational tasks, making them ideal for scientific disciplines that require significant processing power.

## Flexibility:

Researchers can configure their computing environments to meet specific needs, such as choosing the operating system, software tools, and hardware specifications.

## Cloud Integration:

By leveraging cloud infrastructure, Azimuth Science Platforms offer scalability and accessibility, allowing researchers to access their environments from anywhere.

## Collaboration:

These platforms facilitate collaborative research by providing tools like Jupyter Notebooks for interactive data exploration and analysis.

Overall, Azimuth Science Platforms aim to enhance the efficiency and effectiveness of scientific research by providing customizable and powerful computing resources.

## Usage

To access azimuth navigate to: [log in](https://cloud.jasmin.ac.uk/). This will take you to the login page shown in the image below.

{{<image src="img/docs/azimuth-images/Azimuth-Login-Page.jpg" caption="Log in">}}

In the top right-hand corner of the login page click on the Sign in button and enter your JASMIN username and password and click on sign in.

{{<image src="img/docs/azimuth-images/Azimuth-landing-Page.jpg" caption="Dashboard">}}

Once you have successifully signed in you will land on the JASMIN cloud Dashboard as shown below.

{{<image src="img/docs/azimuth-images/Azimuth-list-of-Tenants-Page.jpg" caption="List of Tenants">}}

Here you will see a list of 1 or more projects/tenancies you have been granted access.

## What is project/tenency?

A project, also known as a cloud tenancy, is an organizational unit in the cloud where users are assigned.
Users can be part of multiple projects, and all resources within a project are visible and editable by its members.
To get a cloud project or access an existing one, you need to contact your GWS manager.

## Platforms

Introduciton to the platforms and their usage

- breif overview of whats available, with links to the main ones in the other articles
- (some of this can be taken from the azimuth docs)

##  Identity provider

- Explain what the identity provide is
- what it is for
- how to use it
- limitations
- advantages over host their own ID
- links into some of the platforms - explicitly say which

## Quotas

Explaining quotas

- What all the quotas are
- machines
- volumes
- external IPs (note that the quota use is for the tenancy, not the IPs attache to machines/ in use by platforms)
- CPUs
- RAM
- volume storage

## Advanced use

Use of machine and volume tabs

- manual creation of machines and volumes
- actions on machines
  - especially attaching IPs, firewall, restart
- attaching volumes
