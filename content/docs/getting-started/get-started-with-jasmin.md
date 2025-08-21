---
aliases: /article/189-get-started-with-jasmin
description: Basic steps to gain access
slug: get-started-with-jasmin
title: Get Started with JASMIN
weight: 10
---

This article explains the steps involved for most users to gain
access to the JASMIN environment.

## Start here

For most users, the "front door" to JASMIN is via {{<abbr SSH>}} access to
the JASMIN login servers.

Other services are only available once these basic steps have been
completed.

{{<alert alert-type="info">}}
The overview presentation of the [JASMIN workshop](https://github.com/cedadev/jasmin-workshop) training materials gives a good introduction to the range of other services available". Once you're up & running after following the steps below, we recommend new users to try the accompanying
exercises.
{{</alert>}}

**Table 1.** Steps involved to gain login access to JASMIN.

## Essential steps

Step  |  Details  |  Comments  
---|---|---  
1  |  [Generate an SSH key]({{% ref "generate-ssh-key-pair" %}}) |  Create this on your laptop/desktop, ready to upload the public part of it to your JASMIN account.
2  |  [Get a JASMIN portal account]({{% ref "get-jasmin-portal-account" %}}) | Register for an account: do this on the {{<link "jasmin_accounts_portal" >}}JASMIN Accounts Portal{{</link>}}. However, this simply creates a user profile to store your basic information and SSH key: it does not give you privileges to access any services yet: you will need to apply for access to the services you require, see below.
3  |  [Request "jasmin-login" access]({{% ref "get-login-account" %}}) | Apply for the `jasmin-login` service, which will create you a system account and allow you to connect to it using {{<abbr SSH>}}.
4  |  [How to login]({{% ref "how-to-login" %}}) |  Follow these steps for logging in to JASMIN via {{<abbr SSH>}}.
{.table .table-striped}

## Optional further steps

Step  |  Details  |  Comments
---|---|---
5  |  Apply for access to additional services on JASMIN<br>(optional) |  JASMIN has a range of additional services, access to which is managed via the Accounts Portal. Search and apply for any services you require in the portal. In most cases, users will "belong" to a particular scientific project which may already have a presence on JASMIN, often in the form of a [Group Workspace]({{% ref "short-term-project-storage" %}}). See here how to [Apply for access to a Group Workspace]({{% ref "apply-for-access-to-a-gws" %}}).
6  |  [Get a CEDA account]({{% ref "ceda-archive" %}})<br>(optional) |  If you will need to access data in the {{<link "ceda_archive">}}CEDA Archive{{</link>}} for your work, it's accessible read-only throughout JASMIN,  Some datasets on the CEDA Archive require specific agreements, and to apply for access to these, you will need a CEDA account.  
7  |  [Link your JASMIN and CEDA accounts]({{% ref "update-a-jasmin-account" %}}) (optional)  |  The final step is to link your CEDA account to your JASMIN account. This lets you access CEDA data on JASMIN, with the same dataset access permissions that your linked CEDA account has.
{.table .table-striped}

## Further information

* Use the navigation menu on the left to find about other services on JASMIN.
* Try exercises in the JASMIN workshop training materials
* The CEDA team also hosts training workshops and events, see CEDA
{{<link "ceda_events">}}events{{</link>}} and {{<link "ceda_news">}}news{{</link>}}.
* Keep an eye on the {{<link "ceda_status">}}status{{</link>}} info (also provided in the terminal when you log in).
