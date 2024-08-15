---
description: In depth look at the jupyterhub platforms
slug: platform-in-depth-jupyterhub
title: Platforms In Depth - JupyterHub, DaskHub, BinderHub
---

- What is it
- what is the purpose
- how to create
- how to patch
- any options to update?

## What is JupyterHub?

JupyterHub is a multi-user platform that allows multiple users to access and run Jupyter notebooks through a web interface. It is designed to provide a standardized computing environment for groups, such as classes or research teams, by launching individual Jupyter notebook instances for each user1.

## What is the Purpose?

The primary purpose of JupyterHub is to facilitate collaborative and scalable data science and research.

## It allows users to:

- Access a consistent computing environment from any device with a web browser.
- Share resources efficiently within a team or class.
- Manage user authentication and resource allocation centrally1.

## How to Create

To create a JupyterHub instance on Azimuth HPC:

- Ensure Kubernetes Cluster: You need an existing Kubernetes cluster.
- Access Applications Dashboard: Use the Applications dashboard in your Kubernetes cluster, powered by Kubeapps.
- Deploy JupyterHub: Select jupyterhub-azimuth from the catalog and customize your deployment by specifying the name, CPU, memory limits, and storage capacity for each user notebook.
- Start Deployment: Complete the form and start the deployment. Your JupyterHub instance will be available from the Services menu of your Kubernetes cluster1.

## How to Patch

Patching JupyterHub involves updating the software to fix bugs or vulnerabilities. 

This can typically be done by:

- Accessing the Kubernetes Cluster: Use the Kubernetes dashboard or command-line tools.
- Updating the Deployment: Apply updates to the JupyterHub deployment using Kubernetes commands or the Applications dashboard.
- Restarting the Service: Ensure the updated version is running by restarting the JupyterHub service1.
- Any Options to Update?
  
Yes, you can update JupyterHub by:

- Using Helm Charts: Update the Helm chart used for deploying JupyterHub.
- Manual Updates: Apply updates manually through the Kubernetes dashboard or command-line tools.
- Automated CI/CD Pipelines: Integrate updates into your continuous integration/continuous deployment (CI/CD) pipelines for automated updates1.
- Different Jupyter-Based Options

Azimuth HPC offers several Jupyter-based options:

- JupyterHub: Multi-user platform for running Jupyter notebooks.
- Jupyter Notebook: Single-user notebooks that can be launched from a repo2docker-compatible repository, similar to Binder2.
- JupyterLab: An enhanced interface for Jupyter notebooks, providing additional features like code consoles, terminals, and a file browser1.

- What the different jupyter based options are

## JupyterHub

- overview

## DaskHub

- overview
- extra stuff on top of vanilla
- note that this is the same as pangeo in the old system

## BinderHub

- overview
- extra stuff
