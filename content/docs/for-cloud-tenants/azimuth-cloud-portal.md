---
description: Introduction to the Azimuth cloud portal
slug: azimuth-cloud-portal
title: The Azimuth Cloud Portal
---

- intro to azimuth
  - what is it
  - Azimuth is a self-service portal designed to simplify the management of cloud resources, particularly for high-performance computing (HPC) and   artificial intelligence (AI) applications.
  - It supports OpenStack clouds and can manage a range of platforms from single-machine workstations to entire Slurm clusters and Kubernetes-based platforms like JupyterHub.

### Key features include:

## Multiple Authentication Methods: 
Supports username/password, Keystone federation, and application credentials.

## On-demand Platforms: 
Unified interface for managing Kubernetes and Cluster-as-a-Service (CaaS) platforms.

## Application Proxy: 
Uses Zenith to expose services without consuming floating IPs or requiring SSH keys.

## Simplified OpenStack Management: 
Automatic network detection, machine and volume management, and security group configuration.

  - what's it's purpose (simplification of Horizon)

## Usage

- logging in
- navigating the portal
  - gettign to tenancies
  - what's in a tenancy breifly (more detail below)

## Platforms

Introduciton to the platforms and their usage

- breif overview of whats available, with links to the main ones in the other articles
- (some of this can be taken from the azimuth docs)

## Identity provider

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
