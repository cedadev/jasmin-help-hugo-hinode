---
aliases: /article/5023-processing-requests-for-resources
description: Processing requests for resources
slug: processing-requests-for-resources
tags:
- consortium
- manager
- approve
- requests
- reject
- requirements
title: Processing requests for resources
---

This article **is for consortium managers** and explains:

- The overall process and role of consortium manager
- How to process a request for new resources for a service, submitted by a project
- How to process a request for additional resources on an existing project's service

## Introduction

Please make sure you have read the article
["Requesting resources"]({{% ref "requesting-resources" %}}) to understand how the process works from the
requester's point of view.

This article will show you how to process requests for resources, but also
show you what you need to consider when doing so.

## Overall process

The overall process for handling requests for resources from projects is
summarised as follows. It all happens via the
{{< link "jasmin_projects_portal" >}}JASMIN Projects Portal{{</link>}}.

  * A **project owner** will have created a record representing a **project** for you to review
  * This will come to you for review because they have selected your consortium as the most relevant to their work.
    * But this means that the resources they are requesting need to come out of your consortium allocation.
  * The project record should contain:
    * A project description
    * Requests for 1 or more services. Each proposed service (e.g., a Group Workspace or a Cloud Tenancy) can have
      * 1 or more requirements for **resources**
        * For a Group Workspace service, these could be requirements for disk or tape storage
        * For a Cloud Tenancy service, these could be requirements for disk, CPU and memory resources for the tenancy
    * Once **all the requirements for a service** have been agreed with the project owner, you, as consortium manager can submit the request for provisioning by the JASMIN team.
      * Different services on the same project can be provisioned separately: for example, we can provision the Group Workspace resources while you're still discussing what's needed for a cloud tenancy.
      * But all the requirements for a particular service (for example, disk and tape, for a Group Workspace) need to be agreed before it can be submitted for provisioning.
      * If necessary, certain requirements can simply be rejected and excluded from the submission and can be added later.
      * Requests made by projects directly to the JASMIN team will be referred back to this process, as it's essential that we manage valuable resources in an organised manner, involving you as consortium manager to make decisions for your consortium's allocations. So this does involve active engagement on your part.
  * Once resources have been provisioned, you should be notified so that you can track the progress of the request on behalf of the project.

## Role of the consortium manager

Your task when reviewing should be to:

  * Check that the project has selected the appropriate consortium: does this activity sit within your domain?
  * **Scrutinise** the project's request for use of your allocation of consortium resources for this project. Questions to consider are:
    * Do the proposed resource requirements sound reasonable?
      * Have they properly considered using shared services like scratch and XFC to minimise the need for their own dedicated resources? For example:
        * Instead of 100TB SOF for their Group Workspace, could they manage with 25TB, knowing that copious scratch space is nearly always available?
        * Could some of the 100TB go on tape first, "streaming" their processing so that only some fraction is needed on disk at a time?
        * Have they asked for tape resources alongside their disk space? (this would reassure you that they've considered a sensible workflow like above, but you might want to discuss with them). It's reasonable to ask for an equivalent amount of space on tape as on disk. Historically this has usually been provisioned by default anyway, but we do want to capture what the project actually plans to use.
      * Is the proposed workflow free of unnecessary duplication of data already available elsewhere on JASMIN, either in the CEDA Archive or other Group Workspaces (which can be processed in place rather than needing to be copied)?
      * Some of this information will be in the project description but feel free to contact the project owner to gather more details yourself to form your opinion.
    * Are the start and end dates realistic?
      * You will need to reclaim your consortium's resources once a project has finished (in order to support other projects from your allocation), so it's important that these dates are agreed and regularly reviewed.
      * Does the project actually need all the requested resources initially, or could they manage with some fraction to start with?
        * "Hogging" disk space (or other resources), but not using it, wastes expensive resources.
        * Is there a date beyond which the data could be moved off disk onto tape, freeing up disk? The project's requirements can be modified during its lifetime to achieve this, but this should be considered (at the start) as a way to "sunset" the disk requirements while keeping some data still available after the active phase of the project.
        * Group Workspace storage is short-term storage for the duration of a project only. Keeping data in Group Workspace disk storage in an open-ended way is bad for a number of reasons: other projects won't have the resources they need, plus there are a number of data-sharing services attached to the CEDA Archive (such as, enabling other projects to discover the data) which make this a much better place to share data from, with all the benefits of professional data curation. The disk requirement for Group Workspaces should only be allocated for the active phase of the project where working space is needed.
      * Longer-term visibility of any data produced should be addressed by involving the CEDA Archive team at the project planning stage.

## Processing a request for new resources

Log in to the {{< link "jasmin_projects_portal" >}}JASMIN Projects Portal{{</link>}}

This requires your JASMIN credentials (so you need to have a JASMIN account to
proceed). Two-factor authentication is used: you can opt to send a
verification code to the email address registered with your JASMIN account,
then enter that code to proceed. Check your spam folder if the message doesn't
appear.

{{<image src="img/docs/processing-requests-for-resources/file-beGPU0FT33.png" caption="">}}

Follow the "Consortia" link at the top, to show all the consortia. The one(s)
you are responsible for will have a "Go to consortium" button.

{{<image src="img/docs/processing-requests-for-resources/file-Sgzblb0QRe.png" caption="">}}

Click "Go to consortium"

{{<image src="img/docs/processing-requests-for-resources/file-ywQMwjynoE.png" caption="">}}

This screen has 3 tabs: we are looking at the
"overview" tab first, showing your how much of each type of resource is
committed (provisioned) against the allocated resources for your consortium.

Go to the "Projects" tab. If you have any projects with outstanding items for
review, the number of projects will be indicated next to the "Projects" tab.

{{<image src="img/docs/processing-requests-for-resources/file-e2cXo2Xt2L.png" caption="">}}

Here we can see all the projects in this consortium:
scroll down to see "cards" for all the projects. The tab indicated that there
were 2 to be reviewed and these are labelled here too.

Click "Go to Project" for the one you want to review, to see the **project
overview** screen.

{{<image src="img/docs/processing-requests-for-resources/file-uhXOLmsJmX.png" caption="">}}

The "Overview" screen for a project gives you the
timeline of what's happened (most recent first) so you can see the description
and any comments.

Now go to the "Services" tab, to see what service(s) this project thinks it
needs, and what resources are requested for those services:

{{<image src="img/docs/processing-requests-for-resources/file-YtZ08rDv8i.png" caption="">}}

In this case, they're just asking for a Group
Workspace, and have documented a requirement for 10 TB of SOF disk space,
between the dates shown. For now, we'll just consider how to approve that one
request (but you could encourage them to ask for tape space as well, then
approve both together).

The SOF requirement is in the "REQUESTED" state, meaning it's awaiting your
review, so click the "?" icon, to review that requirement:

{{<image src="img/docs/processing-requests-for-resources/file-B2GlK1C4RM.png" caption="">}}

Here, you can see that this requirement for 10 TB SOF
of SOF disk is OK in terms of your consortium's overall allocation for SOF
(1.6 PB), and current commitments (770.2 TB or 48%) against that allocation.
But only you know what other projects are in the pipeline in your science
domain:

  * is there some big project on the horizon which will need lots of space in the near future?
  * if you're struggling for space, are there other projects which you could ask to give up some or all of their disk space, if they've finished their work?
  * if they've asked for particular types of disk space (PFS, SSD or HPOS), have they justified why? The default storage type for Group Workspaces should be SOF, but there may be reasons why others are more appropriate, e.g. 
    * HPOS (Object Storage) for visibility inside / outside of JASMIN (to be encouraged!)
    * SSD (Solid State Disk) for small file storage (but very limited amounts available, normally 100GB at a time)
    * PFS (Parallel File System) for workflows which absolutely must be able to write in parallel to the same file from multiple processes (...but there are 2 PB of scratch space available for this purpose, so consider carefully).

If you want to suggest changes to the project (e.g. you think they've picked
the wrong type) you can "Reject" with comments, and they can re-submit the
request.

If you're happy to approve, click "Approve":

{{<image src="img/docs/processing-requests-for-resources/file-Wc5Leta8pS.png" caption="">}}


The SOF requirement now has status "APPROVED" so (as
long as there are no other requirements in "REQUESTED" state), you can click
"Submit for provisioning".

If there are other requirements that have been requested, you either need to
approve them too, or reject them so that you can agree acceptable resource
request with the project owner.

{{<image src="img/docs/processing-requests-for-resources/file-wbaUpLxykd.png" caption="">}}

If submitted, the requirement will then have the
status "AWAITING PROVISIONING" and the JASMIN team will pick up the request to
arrange provision of the resources.

{{<image src="img/docs/processing-requests-for-resources/file-Tsra3DcRkq.png" caption="">}}

Once the JASMIN team has completed provisioning the
resources, the status changes to "PROVISIONED" and the location is confirmed:
in this case giving the path to the disk space now that's now available.

At this point, the project owner who requested the resources would also be
notified to check the status on the portal, so should be able to pick up the
location, but you may wish to check with them yourself, to track the request
to completion.

## Processing a request for additional resources

Where a project already exists, a project owner can submit a request for
changes to resources on an existing service, or could request an additional
service (e.g. adding a cloud tenancy where there's already a Group Workspace).
Adding an additional service should work as described above, but reviewing a
request to modify resources on an existing service, is shown below:

We start from the project overview screen (so check above for steps to reach
that):

{{<image src="img/docs/processing-requests-for-resources/file-Cm6NWP5GdB.png" caption="">}}


We can see in the comments that something has been requested: those comments
are attached by the project owner to provide extra context to the request.

Go to the Service tab to review further:

{{<image src="img/docs/processing-requests-for-resources/file-wexo0BiLCL.png" caption="">}}

Here we can see the original 10 TB which is
"PROVISIONED" but above it is the request for the additional 1 TB, with status
"REQUESTED".

Click the "?" to review:

{{<image src="img/docs/processing-requests-for-resources/file-Nv3hYTq2de.png" caption="">}}

From the consortium manager's point of view, it's the
same process as before, so go through the same steps to scrutinise the
request.

Reject the request (with comments) if you want the project owner to change
things, or approve it if you're happy:

{{<image src="img/docs/processing-requests-for-resources/file-enxubp0Anh.png" caption="">}}

Now the request is marked as "APPROVED", and since we
have no other requests in "REQUESTED" state for you to review, you can click
"Submit for provisioning".

{{<image src="img/docs/processing-requests-for-resources/file-8rA9Xz0Auw.png" caption="">}}

Once you have submitted it, the request is marked
"AWAITING PROVISIONING" for the JASMIN team to pick up.

In this case, we're adding space to the same service, so when it comes to
recording what's provisioned, the 10 TB & 1 TB "chunks" will be combined (in
terms of how they're recorded here), reflecting the fact that the JASMIN team
will have simply expanded the size of the (single) disk volume. This makes
sense if the project has asked for more space, but the total space is needed
until the end of the whole project. So the previous 10TB (the record, not the
actual disk) has been marked "DECOMMISSIONED":

{{<image src="img/docs/processing-requests-for-resources/file-MjIM9tdrHr.png" caption="">}}

An alternative, which might be applicable in some
cases, is where the extra space "boost" is only needed for a shorter period of
time, as shown by the different end dates to the 2 requirements below. They're
both referring to the same physical storage, but the extra 1 TB space
"expires" first.

{{<image src="img/docs/processing-requests-for-resources/file-UtPmX7AzE1.png" caption="">}}

## Processing requests for resource types other than storage

The process for reviewing requests for other resource types, such as those
needed for cloud tenancies, is the same as above. Further examples may follow
here as needed.
