---
description: In depth look at the jupyterhub platforms
slug: platform-in-depth-jupyterhub
title: Platforms In Depth - JupyterHub, DaskHub, BinderHub
weight: 30
---
**JupyterHub** is a multi-user platform that allows multiple users to access and run **Jupyter notebooks** through a web interface.
It is designed to provide a standardised computing environment for groups, such as classes or research teams, by launching individual
Jupyter notebook instances for each user. The primary purpose of JupyterHub is to facilitate collaborative and scalable data science and
research. IT allows users access to a consistent computing environment from any device with a web browser where they can share resources
efficiently within a team or class. Adminisistrators can manage user authentication and resource allocation centrally.
To **create** a JupyterHub instance on Azimuth HPC, you will need an existing **Kubernetes cluster**.

To create a **JupyterHub Platform** navigate to Azimuth Project/Tenancy page and click on **New platform**. Note that any resource, RAM, storage, CPU or network resource is allocated based the tenancy Quota
  {{<image src="img/docs/azimuth-images/azimuth-new-platform-jupyterhub.jpg" caption="New platform" wrapper="col-9 mx-auto" wrapper="text-center">}}

Then select the **Jupyterhub platform** from the Createa new platform page and additionally from the configuration platform
Tab shown below.

{{<image src="img/docs/azimuth-images/azimuth-jupyterhub-details.jpg" caption="New Jupyterhub platform details" wrapper="col-9 mx-auto" wrapper="text-center">}}

Enter the **Platform name** and either select an existing **Kubernetes cluster** or create one here by clicking the plus sign at the end of the textbox. Enter the cluster details, **Name** | **Template** | **Version** | **number of worker nodes** and **define auto healing** if needed and deploy the instance creation.

{{<image src="img/docs/azimuth-images/azimuth-cluster-details.jpg" caption="cluster details" wrapper="col-9 mx-auto" wrapper="text-center">}}

Once the cluster deployent is complete as show below, complete the jupyter configuration options and click the create button.

{{<image src="img/docs/azimuth-images/azimuth-cluster-deployment-complete.jpg" caption="cluster deployment complete" wrapper="col-9 mx-auto" wrapper="text-center">}}

Once successfuly deployed, you can access the platform from the azimuth tenenacy landing page. From the details button for the jupyterhub instance deployed you can be able to **refresh** | **update** and **delete** the service.

{{<image src="img/docs/azimuth-images/azimuth-jupyterhub-and-cluster-deployed.jpg" caption="jupyterhub deployment complete" wrapper="col-9 mx-auto" wrapper="text-center">}}

From the platform details page you can access the jupyter notebook service from the services section
  
{{<image src="img/docs/azimuth-images/azimuth-jupyterhub-platform-details-page.jpg" caption="jupyterhub details" wrapper="col-9 mx-auto" wrapper="text-center">}}

For details about using the Jupyter notebook service [here]({{< ref path="docs/interactive-computing/jasmin-notebooks-service" >}})

{{<image src="img/docs/azimuth-images/azimuth-jupyterhub-service.jpg" caption="jupyterhub services" wrapper="col-9 mx-auto" wrapper="text-center">}}

To  update the jupyterhub, from the update window you are able to change the, **Notebook CPUs** | **Notebook RAM** and **Notebook storage**

{{<image src="img/docs/azimuth-images/azimututh-jupyterhub-update.jpg" caption="jupyterhub update" wrapper="col-9 mx-auto" wrapper="text-center">}}

Once you have entered the desired details click the update platform button.

From the Azimuth tenancy page you can access the cluster created above. Additionally from the cluster details page you can, **view the Kubeconfig** | **update the cluster** | **upgrade the cluster** and **delete the cluster**. NOTE ***deleting a cluster or any resource is not reversible*** **Patching** a JupyterHub instance involves updating the software to fix bugs or vulnerabilities, which can typically be done by accessing the Kubernetes Cluster, from the Kubernetes dashboard or through command-line tools. You can apply updates to the JupyterHub deployment using Kubernetes commands or from the Applications dashboard. To ensure the updated version is running you can restart the JupyterHub service.

Azimuth HPC offers several Jupyter-based options such as, **JupyterHub** mensioned above, **Jupyter Notebook** which is a single-user notebook service that can be launched from a repo2docker-compatible repository, similar to Binder2 and **JupyterLab** which is an enhanced interface for Jupyter notebooks, providing additional features like code consoles, terminals, and a file browser.

**Azimuth Daskhub** is a cloud-based platform designed to simplify and accelerate distributed data processing tasks using Dask. It provides a user-friendly interface that abstracts away the complexities of setting up and managing Dask clusters, allowing users to focus on their data analysis and machine learning workflows.
**Key Features and Benefits** include, a **simplified Cluster Management** which handles the provisioning, scaling, and management of Dask clusters, eliminating the need for users to manually configure and maintain infrastructure.**Scalability** which allows platform users to scale Dask clusters up or down to accommodate varying workloads, ensuring optimal resource utilisation and performance.Additionally Dask offers a **User-Friendly Interface** which provides a web-based interface that is intuitive and easy to use, even for users who are not familiar with Dask or distributed computing. Dask also **integrates seamlessly** with popular data science tools like JupyterLab, allowing users to leverage their existing workflows and libraries. Azimuth Daskhub comes pre-installed with a wide range of popular libraries and packages, including NumPy, Pandas, Scikit-learn, and TensorFlow, making it easy to get started with data analysis and machine learning tasks. Azimuth Daskhub offers a pay-as-you-go pricing model, allowing users to only pay for the resources they actually use.

To use Dusk you need to first create a **Dask cluster** with the desired number of workers and memory allocation. Once the cluster is created data can be uploaded to the platform or accessed from external storage sources. A user can then start to submit Dask tasks and workflows to the cluster, which are then executed in parallel across the worker nodes.The platform provides tools to monitor cluster health, task progress, and resource usage. Additionally users can also manage their clusters, such as scaling them up or down as needed.

Azimuth Daskhub can be used to perform large-scale data analysis and visualization tasks, such as exploratory data analysis, feature engineering, and data cleaning. Additionally the platform is well-suited for training and deploying machine learning models on large datasets, including tasks like image classification, natural language processing, and recommendation systems. Azimuth Daskhub can also be used for various scientific computing tasks, such as simulations, numerical modeling, and data processing.

Another platform is **Azimuth BinderHub** which is a cloud-based platform that provides a convenient way to create and share interactive computing environments based on Jupyter Notebooks. It leverages Project Jupyter's Binder technology to dynamically generate Jupyter environments from GitHub repositories, making it easy for users to explore, analyze, and collaborate on data science projects.

**Azimuth BinderHub** allows users to create and share interactive Jupyter Notebooks, which are a powerful tool for data analysis, visualization, and machine learning. Additionally the platform integrates seamlessly with GitHub, making it easy to create Binder environments from public or private repositories. Users can simply provide a GitHub repository URL, and Azimuth BinderHub will automatically build the corresponding Jupyter environment. Azimuth BinderHub provides a high degree of customization for Jupyter environments. Users can specify the desired Python version, libraries, and other dependencies in their GitHub repository, ensuring that the environment is tailored to their specific needs. Azimuth BinderHub facilitates collaboration among data scientists and researchers. Users can share their Binder environments with colleagues, allowing them to explore and interact with the same data and code.

The platform helps to ensure reproducibility in data science workflows, by sharing Binder environments where users can provide others with a self-contained environment that can be used to replicate their results. Azimuth BinderHub is accessible from any device with an internet connection, making it a convenient tool for users who need to work on data science projects remotely. Users create a GitHub repository containing the necessary files for their Jupyter environment, including Jupyter Notebooks, Python scripts, and configuration files.
**Binder Build:** When a user accesses a GitHub repository through Azimuth BinderHub, the platform triggers a Binder build process. This process creates a Docker image based on the specified dependencies and configuration.
**Interactive Environment:** Once the Docker image is built, Azimuth BinderHub launches an interactive Jupyter environment that can be accessed through a web browser. This environment contains all of the files and dependencies defined in the GitHub repository.

Azimuth BinderHub is a valuable tool for teaching data science and machine learning. Instructors can create interactive Jupyter Notebooks that students can explore and experiment with. The platform can be used to facilitate collaboration among researchers, allowing them to share and work on data science projects together. Azimuth BinderHub provides a convenient way to explore and analyze data using Jupyter Notebooks.
Users can visualize data, perform statistical analysis, and build machine learning models. By sharing Binder environments, researchers can ensure that their work is reproducible and can be verified by others
