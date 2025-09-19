---
author: Alex Manning
title: Dask Gateway
tags:
- notebook
- lotus
---

## Introduction

[Dask Gateway](https://gateway.dask.org/) is a service which manages [Dask](https://dask.org) clusters for users.
On JASMIN, it creates a Dask cluster in {{<link "../batch-computing/lotus-overview.md">}}LOTUS{{</link>}}, our batch computing cluster. It automatically creates a Dask for you, scheduling Slurm jobs to create Dask schedulers and workers as appropriate.

## Prerequisites

Before using Dask Gateway on JASMIN, you will need:

1. An existing JASMIN account and valid `jasmin-login` access role: {{<button button-size="sm" href="https://accounts.jasmin.ac.uk/services/login_services/jasmin-login/">}}Apply here{{</button>}}
2. A Slurm account to log the Dask compute to. To choose the right one, please read about the [new Slurm job accounting by project]({{% ref "docs/batch-computing/slurm-queues/#new-slurm-job-accounting-hierarchy" %}}).

The `jasmin-login` access role ensures that your account is set up with access to the LOTUS batch processing cluster.

## Creating a Dask cluster

### In the JASMIN Notebooks service

In the {{<link "jasmin_notebooks_service">}}JASMIN notebooks service{{</link>}}, authentication to `dask-gateway` happens automatically. You can use the snippet below to create a cluster and get a Dask client which you can use:

```python
import dask_gateway

# Create a connection to dask-gateway.
gw = dask_gateway.Gateway("https://dask-gateway.jasmin.ac.uk", auth="jupyterhub")

# Inspect and change the options if required before creating your cluster.
options = gw.cluster_options()
options.worker_cores = 2
options.account = "your-slurm-account-name"

# Create a Dask cluster, or, if one already exists, connect to it.
# This stage creates the scheduler job in Slurm, so it may take some
# time while your job queues.
clusters = gw.list_clusters()
if not clusters:
    cluster = gw.new_cluster(options, shutdown_on_close=False)
else:
    cluster = gw.connect(clusters[0].name)

# Create at least one worker, and allow your cluster to scale to three.
cluster.adapt(minimum=1, maximum=3)

# Get a Dask client.
client = cluster.get_client()

#########################
### DO DASK WORK HERE ###
#########################

# When you are done and wish to release your cluster:
cluster.shutdown()
```

### Elsewhere on JASMIN

The following explains how to use the Dask Gateway elsewhere on JASMIN, for example, on the `sci` machines.

{{<alert alert-type="info">}}
It is not necessary to do this if you only want to use Dask in the JASMIN notebook service.
{{</alert>}}

At the current time, it is still necessary to use the notebooks service to generate an API token to allow you to connect to the gateway server.

{{<alert alert-type="danger">}}
It is very important that your API token is not shared between users and remains secret. With it, another user could submit Dask jobs to LOTUS as you, and they could exploit this to see anything in your JASMIN account.
{{</alert>}}

#### Setup

1. Make a Dask configuration folder in your home directory

    {{<command user="user" host="sci-vm-01">}}
    mkdir -p ~/.config/dask
    {{</command>}}

2. Create a configuration file for `dask-gateway`

    {{<command user="user" host="sci-vm-01">}}
    touch ~/.config/dask/gateway.yaml
    {{</command>}}

3. Change the permissions on the file so that only you can read it

    {{<command user="user" host="sci-vm-01">}}
    chmod 600 ~/.config/dask/gateway.yaml
    {{</command>}}

4. Head to the {{< link "https://notebooks.jasmin.ac.uk/hub/token" >}}API token generator page{{</link>}}, put a note in the box to remind yourself what this token is for, press the **big orange button**, then {{<mark>}}copy{{</mark>}} the {{<mark>}}token{{</mark>}}.

5. Paste the following snippet into `~/.config/dask/gateway.yaml`, replace the entry on the final line with the API token you just created.

    ```yaml
    gateway:
      address: https://dask-gateway.jasmin.ac.uk
      auth:
        type: jupyterhub
        kwargs:
          api_token: replaceWithYourSecretAPIToken
    ```

6. You're done. You can now use `dask-gateway` from the command line.

## Access the Dask dashboard

To get the link to your Dask dashboard, run the following:

```python
print(client.dashboard_link)
```

Currently the Dask dashboard is not accessible from a browser outside the JASMIN firewall. If your browser fails to load the dashboard link returned,
please use our [graphical desktop service]({{% ref "graphical-linux-desktop-access-using-nx" %}}) to run a Firefox browser inside the firewall to view your dashboard.

## Use a custom Python environment

By default the JASMIN Notebooks service and Dask Gateway use the latest version of the `jaspy` software environment. However, often users would like to use their own software environments.

### Understanding the problem

When Dask Gateway creates a dask cluster for a user, it runs a setup command to activate a conda environment or python `venv`.
To have Dask use your packages, you need to create a custom environment which you can pass to `dask-gateway` to activate.

However, for technical reasons, it is not currently possible to use the same virtual environment in both the notebook service and on JASMIN. So you will need to make two environments, one for your notebook to use and one for Dask to use.

{{<alert alert-type="info">}}
It is VERY important that these environments have the same packages installed in them, and that the packages are exactly the same version in both environments.

If you do not keep packages and versions in-sync you can expect many confusing errors.
{{</alert>}}

If you use a self-contained conda environment this is not a problem, and you can use this as a kernel in the notebooks service and on the `sci` machines. You can skip to {{<link "#putting-it-all-together">}}Putting it all together{{</link>}} below.

### Creating a virtual environment for Dask

- Login to one of the JASMIN `sci` machines.
- Activate `jaspy`

{{<command>}}
module load jaspy
{{</command>}}

- Create your environment in the normal way

{{<command>}}
python -m venv name-of-environment
{{</command>}}

- Activate the environment

{{<command>}}
source name-of-environment/bin/activate
{{</command>}}

- Install dask and dask gateway and dependencies: without this step your environment will not work with dask.

{{<command>}}
pip install dask-gateway dask lz4
{{</command>}}

### Creating a virtual environment for the notebooks service

- Follow the instructions [here]({{% ref "creating-a-virtual-environment-in-the-notebooks-service" %}}) to create a virtual environment.
- Install Dask and Dask Gateway and dependencies: without this step your environment will not work with Dask.

{{<command>}}
pip install dask-gateway dask lz4
{{</command>}}

### Putting it all together

- Set your notebook virtual environment as the kernel for the notebook in question as shown in the instructions linked above.
- Set `options.worker_setup` to a command which will activate your Dask virtual environment. For example

```bash
options.worker_setup = "source /home/users/example/name-of-environment/bin/activate"
```

- If you have an existing Dask cluster, close it and ensure all LOTUS jobs are stopped before recreating it using the new environment.

## Code Examples

Examples of code and notebooks which can be used to test the JASMIN Dask Gateway service are
{{< link "https://github.com/cedadev/jasmin-daskgateway/tree/main/examples" >}}available on GitHub{{</link>}}.
