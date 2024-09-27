---
aliases: /article/189-get-started-with-jasmin
title: Get Started with JASMIN
slug: get-started-with-jasmin
description: First steps to gain access to JASMIN
weight: 10
---

The {{<link "jasmin_site">}}JASMIN{{</link>}} scientific data analysis environment is
administered by {{<link "ceda_site">}}CEDA{{</link>}} and supports a wide variety of
scientific workflows across environmental science domains.

## Essential steps

The steps listed in **Table 1** (below) are required for scientific end-users
to gain SSH access to the JASMIN login machines which are the "front door" for
most users. Other services are available once these basic steps have been
completed.

An overview of JASMIN compute & storage components is given in the
presentation given at the [JASMIN workshop](https://github.com/cedadev/jasmin-workshop) \- we strongly encourage all new users to watch this video recording
and take a look at the [accompanying
exercises](https://github.com/cedadev/jasmin-workshop). These go into detail
about all the basic things you may want to do with JASMIN.

**Table 1.** Steps involved for a scientific end-user to gain login access to
JASMIN. Click on the links under the 'Details' column to find instructions for
each step.

Step  |  Details  |  Comments  
---|---|---  
1  |  [Generate an SSH key]({{% ref "generate-ssh-key-pair" %}}) |  Create this locally, ready to upload it to your JASMIN Account profile  
2  |  [Get a JASMIN portal account]({{% ref "get-jasmin-portal-account" %}}) |  Access to JASMIN services is controlled by the {{<link "jasmin_accounts_portal" >}}JASMIN Accounts Portal{{</link>}} \- you must register for an account. Using this portal, you will then need to apply for access to the JASMIN services and privileges you require (as described in the steps below). Some of these services will require manual approval by individuals external to the CEDA/JASMIN team. Creating a JASMIN portal account does not by itself provide you with any access to JASMIN machines or services. You must complete all the steps below to gain full access.  
3  |  [Check network details]({{% ref "check-network-details" %}}) |Check details of your network connection to JASMIN to ensure you are able to connect.   In order to maintain a secure and reliable scientific infrastructure for its users, JASMIN restricts login access by maintaining an "allow list" of network domains.
4  |  [Request SSH login access to JASMIN]({{% ref "get-login-account" %}}) |  Apply for the `jasmin-login` service, which will allow you to connect to JASMIN machines using SSH.  
5  |  Apply for access to additional services on JASMIN  |  JASMIN has a range of additional services, access to which is managed via the Accounts Portal. Search and apply for any services you require in the portal. In most cases, users will "belong" to a particular scientific project which may already have a presence on JASMIN, often in the form of a [Group Workspace]({{% ref "short-term-project-storage" %}}). See the following for [how to apply for access to a Group Workspace]({{% ref "apply-for-access-to-a-gws" %}}).
6  |  [How to login]({{% ref "how-to-login" %}}) |  Follow these steps for logging in to JASMIN via SSH, but we also have several other tutorials that may be useful - see {{< link "https://github.com/cedadev/jasmin-workshop" >}}Exercises 1-3 here{{</link>}}.
7  |  [Get a CEDA account]({{% ref "ceda-archive" %}}) |  The CEDA Archive provides access to thousands of atmospheric, climate change, and earth observation datasets. The Archive is directly accessible read-only throughout JASMIN. Some datasets on the CEDA Archive require specific agreements, and to apply for access to these, you will need a CEDA account.  
8  |  [Link your JASMIN and CEDA accounts]({{% ref "update-a-jasmin-account" %}})  |  The final step is to link your CEDA account to your JASMIN account. This allows you filesystem access to data on CEDA Archive. This is a step that you will be guided through in the JASMIN Accounts Portal.
{.table .table-striped}
  
The table above describes the initial steps to get you started on JASMIN -
however, there are a variety of ways that users can get the most out of
JASMIN, that are not described in the table. Users are strongly encouraged to
read further about JASMIN, and/or to discuss with scientific colleagues to
gain an understanding of the resources available.

The documentation in this site is split into sections, based on different
areas/services on JASMIN. You can navigate these sections in the menu on the
left-hand side of your screen. A short description of each of these sections
is below:

- [Getting Started]({{% ref "getting-started" %}}) \- this details all the steps needed to get started on JASMIN. Most documents are linked to from the table above, but there may be some other useful information there too.
- [Interactive Computing]({{% ref "interactive-computing" %}}) \- this introduces the resources on JASMIN available for interactive computing. This type of computing is the most common workflow on JASMIN for new users.
- [LOTUS batch processing cluster]({{% ref "lotus-overview" %}}) \- this introduces the available resources on JASMIN for batch computing.
- [Software on JASMIN]({{% ref "software-overview" %}}) \- Information on running software packages within JASMIN.
- [Data Transfer]({{% ref "data-transfer" %}}) \- this category includes guidance on transferring data to and from JASMIN.
- [MASS]({{% ref "mass" %}}) \- JASMIN has Read-only access to the Met Office MASS storage archive. This section explains how to get access.
- [Short-term project storage]({{% ref "short-term-project-storage" %}}) \- this section introduces the concept of shared Group Workspaces and the different storage types on JASMIN. Group Workspaces (GWSs) are portions of disk allocated for particular projects to manage themselves, enabling collaborating scientists to share network accessible storage on JASMIN. 
- [Long-term archive storage]({{% ref "long-term-archive-storage" %}}) \- this section describes the long-term CEDA Archive which consists of thousands of atmospheric, climate change, and earth observation datasets. This is directly accessible as a file system from the shared science machines on JASMIN.
- [For Cloud Tenants]({{% ref "for-cloud-tenants" %}}) \- JASMIN also provides a cloud computing service, this section describes this. 
- [Workflow management]({{% ref "workflow-management" %}}) \- this category details the various tools available for managing your workflow.

The CEDA team also regularly hosts training workshops and events. Details
about past and future events can be found on the [events
section](https://www.ceda.ac.uk/events/) of the CEDA website.
