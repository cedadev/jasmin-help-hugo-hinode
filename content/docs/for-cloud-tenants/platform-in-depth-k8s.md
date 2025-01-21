---
description: In depth look at the kubernetes platforms
slug: platform-in-depth-k8s
title: Platforms In Depth - Kubernetes
weight: 30
---
The **Kubernetes platform** delivers a complete Kubernetes container orchestration cluster, incorporating tools for monitoring, ingress control, and application management. It empowers you to run Kubernetes applications seamlessly within Azimuth or implement custom installations using Helm Charts or Kustomize to oversee Kubernetes manifests. Once your platform is up and running, you'll find a kubeconfig file in the platform Details section, ready for use with helm or kubectl.

When setting up your Kubernetes cluster, remember that the platform name you choose will be visible to everyone in your cloud project.
To configure your cluster, you'll need to provide a unique name and select a cluster template. This template determines the Kubernetes version and any customizations from your cloud operator.  Refer to your cloud operator's documentation for details on available templates and the resources associated with each control plane size option.

Every cluster needs at least one node group of worker nodes.  Give each node group a unique name and choose the appropriate cloud instance size based on your needs, considering factors like CPU, RAM, and GPUs. You can enable autoscaling to allow the node group to adjust its size automatically, or you can set a fixed number of instances. If you enable autoscaling, you'll need to define the minimum and maximum number of instances.

By default, all cluster addons are enabled. These include the Kubernetes dashboard, cluster monitoring with Grafana, and an applications dashboard for easy installation. All dashboards can be accessed from the platforms page.

The advanced options are pre-set with reasonable defaults.  Proceed cautiously when modifying these, as incorrect configurations could lead to issues, including deployment failures.  Among the advanced options are auto-healing for automatic node repair, Kubernetes Ingress for exposing services using a load balancer (requiring an external IP), and cert-manager for managing TLS certificates.

Some configuration options include, **Auto-Healing:** enable this to let the cluster automatically attempt to fix unhealthy nodes, **Kubernetes Ingress:**, enable this to use Kubernetes Ingress to expose services in your cluster via a load balancer. You'll need an external IP for the load balancer and **cert-manager:**, enable this to use cert-manager to manage TLS certificates for your cluster services.

To create a Kubernetes clusternavigate to the project/Tenancy landing page, Click the New platform buttom and from the Create a new platform window select Kubernetes
  
  {{<image src="img/docs/azimuth-images/azimuth-new-platform-jupyterhub.jpg" caption="New kubernetes platform" wrapper="col-9 mx-auto" wrapper="text-center">}}

From the Create a new platform window enter, the Cluster name, select a cluster template to use, select a control plane to use, select or add a new node group, enable or disable cluster addons, enable Kubernetes Dashboard and enable cluster monitoring
  {{<image src="img/docs/azimuth-images/azimuth-kubernetes-cluster-details.jpg" caption="kubernetes " wrapper="col-9 mx-auto" wrapper="text-center">}}

Some advanced features include, enabling/disabling auto-healing, enable/disable Kubernetes ingress, add an external IP for ingress control, define a metrics and Logs volume size and once these options a provided click on create platform

{{<image src="img/docs/azimuth-images/azimuth-k8s-advanced-options.jpg" caption="kubernetes advanced options" wrapper="col-9 mx-auto" wrapper="text-center">}}

From the Platform scheduling window confirm the options selected in the previous section and once the deployment is complete the cluster is available from the azimuth landing page for the tenancy

{{<image src="img/docs/azimuth-images/azimuth-k8es-cluster-scheduling.jpg" caption="kubernetes scheduling" wrapper="col-9 mx-auto" wrapper="text-center">}}

From the Cluster details windows you are be able to, refresh or view the Kubeconfig file.

{{<image src="img/docs/azimuth-images/azimuth-cluster-deployment-details.jpg" caption="kubernetes deployment" wrapper="col-9 mx-auto" wrapper="text-center">}}

{{<image src="img/docs/azimuth-images/azimuth-cluster-details-options.jpg" caption="kubernetes details" wrapper="col-9 mx-auto" wrapper="text-center">}}

{{<image src="img/docs/azimuth-images/azimuth-k82-config.jpg" caption="kubernetes config" wrapper="col-9 mx-auto" wrapper="text-center">}}

Available update options include, ability to change to a different Control plane size, adding or removing node group(s), enable/Disable: Kubernetes Dashboard, cluster monitoring, enable auto-healing, enable Kubernetes Ingress, change the Metrics and logs volumes
{{<image src="img/docs/azimuth-images/azimuth-k8s-update.jpg" caption="kubernetes update" wrapper="col-9 mx-auto" wrapper="text-center">}}

Additionally you can upgrade Kubernetes version to a newer one or delete the Kubernetes instance. You can also change the cluster size by defining the node size and count from the node group

{{<image src="img/docs/azimuth-images/azimuth-k8s-upgrade.jpg" caption="kubernetes upgrade" wrapper="col-9 mx-auto" wrapper="text-center">}}

***Upgrading a Kubernetes cluster is a long-running and potentially disruptive operation that may affect workloads running on the cluster. Once started, an upgrade cannot be stopped***

{{<image src="img/docs/azimuth-images/azimuth-k8s-delete.jpg" caption="kubernetes delete" wrapper="col-9 mx-auto" wrapper="text-center">}}

Navigate to Kubernetes dashboard

{{<image src="img/docs/azimuth-images/azimuth-k8s-dashboard.jpg" caption="kubernetes dashboard" wrapper="col-9 mx-auto" wrapper="text-center">}}

Monitor the Kubernetes instance

{{<image src="img/docs/azimuth-images/azimuth-k8s-monitoring.jpg" caption="kubernetes monitoring" wrapper="col-9 mx-auto" wrapper="text-center">}}
