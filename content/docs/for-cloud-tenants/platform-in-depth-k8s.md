---
description: In depth look at the kubernetes platforms
slug: platform-in-depth-k8s
title: Platforms In Depth - Kubernetes
---
## Kubernetes Platform at a Glance

### Overview

- The Kubernetes platform delivers a complete Kubernetes container orchestration cluster, incorporating tools for monitoring, ingress control, and application management.
- It empowers you to run Kubernetes applications seamlessly within Azimuth or implement custom installations using Helm Charts or Kustomize to oversee Kubernetes manifests.
- Once your platform is up and running, you'll find a kubeconfig file in the platform Details section, ready for use with helm or kubectl.

## Setting Up Your Cluster

Important: Keep in mind that platform names are visible to all members of your cloud project.

## Configuration Options

### Platform Name:

Give your Kubernetes cluster platform a distinctive name.

### Cluster Template:

This determines the Kubernetes version deployed and any cloud operator-defined customizations. Check your cloud operator's documentation for specifics.

### Control Plane Size:

Choose the size of cloud instances to run the Kubernetes control plane. Consult your cloud operator's documentation for details on CPU and RAM resources for each size.

## Node Groups

- Essential: Every Kubernetes cluster requires at least one node group of Kubernetes worker nodes.

- For GPU Workloads: If you're planning to use GPU-enabled Jupyter notebooks, be sure to select a Node Size that includes GPUs.
Options

- Name: Provide a unique name for the node group. These names are used as node labels within the Kubernetes cluster.

- Node Size: Choose the size of cloud instances that will make up the node group. Your cloud operator's documentation will provide details on CPU, RAM, and other hardware resources (like GPUs or high-speed network interfaces) available for each size.

- Autoscaling: Enable this to let the node group automatically scale up or down based on the demands of your pods. If disabled, the node group size remains constant.

- Node Count: If autoscaling is enabled, set the minimum and maximum number of cloud instances allowed in the node group. Otherwise, specify the fixed number of cloud instances.

### Cluster Addons

- By Default: All cluster addons are enabled, offering valuable insights into your cluster's health and additional features.

### Options

- Kubernetes Dashboard: Access the Kubernetes dashboard from the platforms page.
- Cluster Monitoring: View a Grafana instance with pre-configured dashboards for visualizing cluster metrics from the platforms page.
- Applications Dashboard: Simplify Kubernetes application installation with a dedicated dashboard, accessible from the platforms page.

### Advanced Options

- Proceed with Caution: Advanced options are set to reasonable defaults. Changing them could lead to unexpected behavior, even preventing your Kubernetes cluster from deploying correctly. Only modify these settings if you're confident in what you're doing.

### Options

- Auto-Healing: Enable this to let the cluster automatically attempt to fix unhealthy nodes.
- Kubernetes Ingress: Enable this to use Kubernetes Ingress to expose services in your cluster via a load balancer. You'll need an external IP for the load balancer.
- cert-manager: Enable this to use cert-manager to manage TLS certificates for your cluster services.

## create Kubernetes

- From the project/Tenancy landing page:
  - Click the New platform buttom
  - From the Create a new platform window select Kubernetes
  - On the Create a new platform window enter
    - the Cluster name
    - select a cluster template to use
    - select a control plabe to use
    - select or add a new node group
    - enable or disable cluster addons
      - Enable Kubernetes Dashboard
      - Enable cluster monitoring
    - Advanced options include :
      - enabling/disabling auto-healing
      - enable/disable Kubernetes ingress
      - add an external IP for ingress control
      - define a metrics and Logs volume size
    - Once these options a provided click on create platform
    - on the Platform scheduling window confirm the options selected in the previous section
    - Once the deployment is complete the cluster is available from the azimuth landing page for the tenancy

From the Cluster details windows you can be able to:

- refresh,
- view the Kubeconfig,
- update,
- upgrade or
- delete the Kubernetes instance.
- Navigate to Kubernetes dashboard
- Monitor the Kubernetes instance

## update options

- Options available include
  - Changing to a different Control plane size
  - adding or removing node group(s)
    - Enable/Disable
      - Kubernetes Dashboard
      - cluster monitoring
      - Enable auto-healing
      - Enable Kubernetes Ingress
      - Change the Metrics and logs volumes

## upgrade Kubernetes version

***Upgrading a Kubernetes cluster is a long-running and potentially disruptive operation that may affect workloads running on the cluster. Once started, an upgrade cannot be stopped***

- You can upgrade the Kubernetes version to a newer version.

## change the size of the machines and the cluster size

- You can change the cluster size by defining the node size and count from the node group
