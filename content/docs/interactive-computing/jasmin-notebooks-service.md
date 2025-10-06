---
aliases: /article/4851-jasmin-notebook-service
description: Jupyter Notebooks service on JASMIN
slug: jasmin-notebooks-service
tags:
- Jupyter
title: JASMIN Notebooks Service
---

The JASMIN Notebooks Service provides access to
{{<link "https://jupyter.org/">}}Jupyter Notebooks{{</link>}} in a web browser.

## What is a Jupyter Notebook?

A Jupyter Notebook is an interactive document containing live code and
visualisations that can be viewed and modified in a web browser. These
documents can be shared, often using GitHub, and many projects distribute
example code as Jupyter notebooks. Users interact with their notebooks using
the open-source Jupyter Notebook server application.

Jupyter has support for many languages including Python, R, Scala and Julia,
which are implemented by plugins known as "kernels". The JASMIN Notebook
Service currently provides one kernel - Python 3.10 with the latest
[Jaspy software environment]({{% ref "jaspy-envs" %}}) installed. This environment is
active by default, so there is no need for the `module` commands described in
the linked article. You can also install and use your own Python environments
as explained below.

The JASMIN Notebook Service uses
{{<link "https://jupyter.org/hub">}}JupyterHub{{</link>}} to manage multiple Jupyter Notebook
servers. After authenticating with a JASMIN account (with the correct access),
a user gets access to **their own notebook server**. The notebook server runs as
the authenticated user, and the user can access their home directory, Group
Workspaces and CEDA Archive data as they would from a scientific analysis
server.

## Getting access to the JASMIN Notebook Service

In order to access the JASMIN Notebook service, first, follow the steps in
[Getting started with JASMIN]({{% ref "get-started-with-jasmin" %}}) to get a
JASMIN account and the `jasmin-login` service.

## Using the JASMIN Notebook Service

To use the JASMIN Notebook Service, navigate to
<https://notebooks.jasmin.ac.uk>. This will redirect you to the JASMIN
Accounts Portal, where you should sign in with your JASMIN Account. If you
have previously accessed the notebook service from the computer you are using,
this may happen automatically.

The first time you access the JASMIN Notebook Service from a new computer or
browser, you will be asked to verify your email address after signing in. To
do this, make sure the "Email" method is selected and click "Send me a code":

{{<image src="img/docs/jasmin-notebooks-service/file-9fa76fPQdE.png" caption="Sign in with 2-factor authentication">}}

This will result in an email being sent to your registered email address
containing a six-digit verification code. Enter this code and press "Verify
code". Each code lasts between 15 and 30 minutes.

Upon successfully signing in and verifying your email if required, you will be
redirected back to the JASMIN Notebook Service. The service will then create a
notebook server for you to use, and you will see a loading page:

{{<image src="img/docs/jasmin-notebooks-service/file-nkDFYlwSg1.png" caption="Loading page">}}

After a few seconds, or in some rare cases a minute or two, you will be taken
to the JupyterLab interface:

{{<image src="img/docs/jasmin-notebooks-service/file-fhTnvJz3xx.png" caption="JupyterLab interface">}}

The folder shown in the left-hand panel will be your home directory on JASMIN,
exactly as if you had logged in to a scientific analysis server. Any changes
made in JupyterLab will be immediately reflected on the scientific analysis
servers and LOTUS, and vice-versa. You can then launch, edit and run Python
notebooks using the JupyterLab interface. Notebooks can access files from the
CEDA Archive, and also have read-only access to group workspaces. For example,
this notebook reads a file belonging to the CCI project from the CEDA Archive
and plots the data on a map:

{{<image src="img/docs/jasmin-notebooks-service/file-LvHEu70CM6.png" caption="Example notebook">}}

A full discussion of the power of the JupyterLab interface is beyond the scope
of this documentation, but the
{{<link "https://jupyterlab.readthedocs.io/en/stable/">}}JupyterLab documentation{{</link>}} is excellent, and
there are many tutorials available on the internet.

### Intended usage and limitations

The JupyterLab environment provided by the JASMIN Notebooks Service is
powerful, but it has some limitations that reflect the type of usage that we
want to encourage.

The JASMIN Notebooks Service is primarily intended for interactively producing visualisations
of existing data, not for processing vast amounts of data. As such, the
resources made available to each notebook server are limited.

For larger processing tasks with Notebooks, users
should consider using the {{<link "https://github.com/cedadev/jasmin-daskgateway">}}JASMIN Dask Gateway service{{</link>}}, which provides an easy way for processing managed from within a Jupyter Notebook to be scaled out to multiple LOTUS jobs in parallel.

Alternatively, use the [LOTUS batch processing cluster]({{% ref "lotus-overview" %}})
separately, before using the notebooks service to visualise the output.

Doing this means that the bulk of the resource usage will be shared by the LOTUS cluster rather than the Notebooks service itself.

{{<alert alert-type="info">}}
Although it was previously the case that Group Workspaces were only available in Notebooks read-only, this is no longer the case (as of 2023), so you should have full read-write access to any group workspace volume.
{{</alert>}}

### Using the GPU-enabled Notebook Service

Please see the [JASMIN Notebooks with GPUs enabled page]({{% ref "jasmin-notebook-service-with-gpus" %}}) 
to learn about using Notebooks with GPU access.

### Common issues and questions

#### I get "403 forbidden" when I try to access the JASMIN Notebook Service

This error occurs when you do not have the correct permissions to access the
JASMIN Notebook service. Please ensure you have been granted the `jasmin-login` and allow some time for the changes to propagate through the system.

#### Which software environment is used by the Notebook Service?

The JASMIN Notebook Service currently uses the **default Jaspy environment**
listed on the [Jaspy page]({{% ref "jaspy-envs" %}}).

#### Can I install additional packages?

The recommended way to do this is to
[create your own virtual environment]({{% ref "creating-a-virtual-environment-in-the-notebooks-service" %}})
in the notebooks service and install additional packages into that.
You can make that virtual environment persist as a kernel to use again next time you
use the Notebooks service.

If you believe that the package is more widely applicable, you can request an
update to Jaspy.

#### Can I use a different software environment?

Yes, the article linked above also describes how to use Conda to create your
own custom environment.

#### I get "503 service unavailable" when I try to access the JASMIN Notebook Service

This error occurs when your notebook server is unable to start. By far the
most common cause of this error is when you are over your quota in your home
directory. As part of starting up, Jupyter needs to create some small files in
your home directory in order to track state. When it is unable to do this
because you are over your quota, you will see the "503 service unavailable"
error.

If you see this error, try connecting to JASMIN using SSH and checking your
home directory usage. After clearing some space in your home directory, your
notebook server should be able to start again.

#### I get the following message when my notebook is queued for spawning

{{<image src="img/docs/jasmin-notebooks-service/file-NHYStoV3nD.png" caption="Error message">}}

The message above indicates that the Notebook service
is oversubscribed -busy- and there are no resources available to start your
Notebook server. Please try again later!

Please use the scientific analysis server and LOTUS for processing and Jupyter
Notebook for lighter visualisation.

## Example Notebooks

In support of the JASMIN Notebook Service, we have developed a GitHub
repository with a collection of Notebooks that demonstrate some of the
important features of the service. The following provides a general
introduction:

<https://github.com/cedadev/ceda-notebooks/blob/master/notebooks/training/intro/notebook-tour.ipynb>

Other Notebooks can be found within the repository, under:

<https://github.com/cedadev/ceda-notebooks/tree/master/notebooks>

## Webinar / video tutorial

A {{<link "https://www.ceda.ac.uk/events/past/jasmin-notebook-service-webinar/">}}CEDA webinar on 16th June 2020{{</link>}}
demonstrated how to use the service. A recording of the event is available:

{{< youtube nle9teGLAb0 >}}

## Further info

Here are a set of links to learn more about Jupyter Notebooks and the JASMIN
Notebook Service:

- {{<link "https://notebooks.jasmin.ac.uk/">}}JASMIN Notebook Service{{</link>}}
- {{<link "https://jupyter.org/">}}Intro to Jupyter Lab{{</link>}}
- {{<link "https://jupyter.org/try">}}Try a Jupyter Lab Notebook in your browser{{</link>}} (this link does not use the JASMIN Notebook Service)
- {{<link "https://github.com/cedadev/ceda-notebooks/tree/master/notebooks/training/intro">}}Tour of the JASMIN Notebooks Service{{</link>}} \- set of notebooks highlighting different features
- {{<link "https://www.ceda.ac.uk/events/past/jasmin-notebook-service-webinar/">}}Intro to the JASMIN Notebooks Service{{</link>}} \- video of a webinar from June 2020
- {{<link "https://github.com/cedadev/ceda-notebooks/blob/master/notebooks/training/rerunnable-virtualenv-maker.ipynb">}}Instructions to create a Python virtual environment{{</link>}} \- example notebook
- {{<link "https://github.com/cedadev/ceda-notebooks/blob/master/notebooks/docs/add_conda_envs.ipynb">}}Instructions to create a Conda environment for use with the Notebook Service{{</link>}} \- example notebook
