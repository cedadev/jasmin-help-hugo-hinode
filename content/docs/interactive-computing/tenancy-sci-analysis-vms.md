---
aliases: /article/4805-tenancy-sci-analysis-vms
description: Tenancy-Sci Analysis VMs
title: Tenancy Sci Analysis VMs
draft: true
weight: 70
---

{{<alert alert-type="danger">}}
**Deprecated feature** documented here to provide information about how to access existing instances.
Tenancy sci analysis machines are no longer part of the JASMIN Cloud service, as most use cases can be
served by using the shared [sci servers]({{% ref "sci-servers" %}}).
{{</alert>}}

This document explains how to access a tenancy-based sci machine. These are
normally provisioned by an admin/manager representing a particular community/institution.

Check which institutions/group you belong to:

NCAS, NCEO, UKMO, RSG, ...

The admin/manager will provide you the name of the tenancy.
You can then search for it on your JASMIN accounts portal under the JASMIN
service named `Sci Analysis VMs`.

## How to request access

**Step 1:** Find the Sci Analysis VMs under the Menu 'Discover services' at https://accounts.jasmin.ac.uk/services/

**Step 2:** Check the name of the service and the description that your supervisor
or PI recommended you to choose and click "More information"

{{<image src="img/docs/tenancy-sci-analysis-vms/file-EUW05EGJj3.png" caption="Locate the correct service" >}}

{{<image src="img/docs/tenancy-sci-analysis-vms/file-pyW8yyQboJ.png" caption="Click +Apply" >}}

**Step 3:** Apply for `USER` role and provide details on your project and a
reference then click "Apply"

{{<image src="img/docs/tenancy-sci-analysis-vms/file-QyGyIDjEcM.png" caption="Apply for USER role" >}}

**Step 4:** Notification

{{<image src="img/docs/tenancy-sci-analysis-vms/file-pY8gr70WNK.png" caption="Status PENDING" >}}

Once your request was approved, you will get a notification

{{<image src="img/docs/tenancy-sci-analysis-vms/file-j2xhRrluyc.png" caption="Notification" >}}

{{<image src="img/docs/tenancy-sci-analysis-vms/file-BLPGdEfAD5.png" caption="Status updated to ACTIVE" >}}

If your request was rejected, then reapply and provide further supporting
information

{{<image src="img/docs/tenancy-sci-analysis-vms/file-un7XlTQ5JU.png" caption="Rejected: further info requested" >}}

Click on the rejection notification. This will take you to the following page
where you can "Apply again"

{{<image src="img/docs/tenancy-sci-analysis-vms/file-jtLIeTwWez.png" caption="Request for further detail" >}}

## How to login

The machine will not be accessible directly externally, so you need to access it via a JASMIN login machine: don't forget the -A (agent forwarding) option on your initial connection.

{{<command user="localuser" host="localhost">}}
ssh -A user@login2.jasmin.ac.uk
{{</command>}}

Access the VM using the IP address (not the hostname) of the virtual machine. Your manager should be able
to provide you with this, since they created (provisioned) the virtual machine.

{{<command user="user" host="login2.jasmin.ac.uk">}}
ssh -A user@<IP-ADDRESS-OF-VM>
{{</command>}}

## How to report issues

Users should report issues to the `ADMIN` and/or `MANAGER`/`DEPUTY` of the
tenancy based SCI VM initially, rather than the JASMIN team. If the issue cannot be
resolved by the `ADMIN` and/or `MANAGER`, **they** should contact the JASMIN helpdesk. You can find the name of the current holders of the `MANAGER`/`DEPUTY` roles by going to the page which described the service on the accounts portal, as above.
