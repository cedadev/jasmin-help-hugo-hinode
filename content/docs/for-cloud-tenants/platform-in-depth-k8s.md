---
description: In depth look at the kubernetes platforms
slug: platform-in-depth-k8s
title: Platforms In Depth - Kubernetes
weight: 40
---

The **Kubernetes platform** delivers a complete Kubernetes container orchestration cluster, incorporating tools for monitoring, ingress control, and application management. It empowers you to run Kubernetes applications seamlessly within Azimuth or implement custom installations using Helm Charts or Kustomize to oversee Kubernetes manifests. Once your platform is up and running, you'll find a `kubeconfig` file in the platform Details section, ready for use with `helm` or `kubectl`.

To configure your cluster, you'll need to provide a unique name and select a cluster template. This template determines the Kubernetes version and any customizations from your cloud operator.  Refer to your cloud operator's documentation for details on available templates and the resources associated with each control plane size option.

Every cluster needs at least one node group of worker nodes.  Give each node group a unique name and choose the appropriate cloud instance size based on your needs, considering factors like CPU, RAM, and GPUs. You can enable autoscaling to allow the node group to adjust its size automatically, or you can set a fixed number of instances. If you enable autoscaling, you'll need to define the minimum and maximum number of instances.

By default, all cluster addons are enabled. These include the Kubernetes dashboard, cluster monitoring with Grafana, and an applications dashboard for easy installation. All dashboards can be accessed from the platforms page.

The advanced options are pre-set with reasonable defaults.  Proceed cautiously when modifying these, as incorrect configurations could lead to issues, including deployment failures.

Some configuration options include:

- **autohealing:** enable this to let the cluster automatically attempt to fix unhealthy nodes
- **Kubernetes Ingress:** enable this to use Kubernetes Ingress to expose services in your cluster via a load balancer (you'll need an external IP availble in your project for the load balancer)
- **cert-manager:**, enable this to use cert-manager to manage TLS certificates for your cluster services.

### Platform creation

To create a Kubernetes cluster, navigate to the project/tenancy landing page, click **New platform** and select **Kubernetes** from the **Create a new platform** window.

Enter the cluster name, select a cluster template to use, select a control plane to use, select or add a new node group, enable or disable cluster addons, enable **Kubernetes dashboard** and enable **cluster monitoring**.

{{<mark>}}Can we have an image of the k8s cluster options here instead?{{</mark>}}
{{<image src="img/docs/azimuth-images/azimuth-kubernetes-cluster-details.jpg" caption="kubernetes" wrapper="col-9 mx-auto text-center">}}

In order to create a Kubernetes platform, we also have to define a node group for the Kubernetes worker nodes.

{{<mark>}}Can we have an image of creating a node group here?{{</mark>}}

Advanced features can be set as shown:

{{<image src="img/docs/azimuth-images/azimuth-k8s-advanced-options.jpg" caption="kubernetes advanced options" wrapper="col-9 mx-auto text-center">}}

Click **create platform** to proceed.

From the **Platform scheduling** window, confirm the options selected in the previous section and once the deployment is complete, the cluster becomes available from the azimuth landing page for the tenancy.

{{<image src="img/docs/azimuth-images/azimuth-k8es-cluster-scheduling.jpg" caption="kubernetes scheduling" wrapper="col-6 mx-auto text-center">}}

### Platform Usage

From the Cluster details windows you are be able to: view the **Kubeconfig** file (for interacting with the cluster from your local computer), **Update** the configuration of the cluster, **Upgrade** the images used for patching or upgrading the Kubernetes version, and **Delete** the cluster. The installed **Cluster addons** are shown in the right panel. The **Nodes** tab shows information on the nodes in the cluster.

{{<image src="img/docs/azimuth-images/azimuth-cluster-deployment-details.jpg" caption="Kubernetes deployment details" wrapper="col-9 mx-auto text-center">}}

Once the **Kubeconfig** buttton has been pressed the following window will pop up alowing you to copy or download the kubeconfig file for accessing the cluster using `kubectl` from your local computer.

{{<image src="img/docs/azimuth-images/azimuth-k82-config.jpg" caption="kubernetes config" wrapper="col-9 mx-auto text-center">}}

Available **Update** options include: ability to change to a different Control plane size, adding or removing node group(s), enable/Disable: Kubernetes Dashboard, cluster monitoring, enable auto-healing, enable Kubernetes Ingress, change the Metrics and logs volumes. You can change the cluster size by defining the node size and count from the node group, either editing the existing node group, or creating a new one (node groups can be different sizes with different numbers of machines).

{{<image src="img/docs/azimuth-images/azimuth-k8s-update.jpg" caption="kubernetes update" wrapper="col-9 mx-auto text-center">}}

Additionally you can **Upgrade** the images in the cluster and potentially the Kubernetes version to a newer one.

*Upgrading a Kubernetes cluster is a long-running and potentially disruptive operation that may affect workloads running on the cluster. Once started, an upgrade cannot be stopped.*

{{<image src="img/docs/azimuth-images/azimuth-k8s-upgrade.jpg" caption="kubernetes upgrade" wrapper="col-6 mx-auto text-center">}}

You can also permanently **Delete** the cluster.

{{<mark>}}Can this be smaller?{{</mark>}}
{{<image src="img/docs/azimuth-images/azimuth-k8s-delete.jpg" caption="Delete a cluster" wrapper="col-6 mx-auto text-center">}}

The **Kubernetes Dashboard** provides an alternative option to managing the cluster as opposed to downloding the Kubeconfig file. 

{{<image src="img/docs/azimuth-images/azimuth-k8s-dashboard.jpg" caption="kubernetes dashboard" wrapper="col-12 mx-auto text-center">}}

Monitoring the Kubernetes instance is provided by a Grafana dashboard.

{{<image src="img/docs/azimuth-images/azimuth-k8s-monitoring.jpg" caption="kubernetes monitoring" wrapper="col-12 mx-auto text-center">}}

For links to resources for Kubernetes, see the {{<link "best-practice">}}**Best Practice**{{</link>}} section.
