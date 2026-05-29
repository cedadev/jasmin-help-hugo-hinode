---
aliases: /article/4490-resource-applications
description: How to approve user requests for resources using the JASMIN Accounts Portal
slug: approving-requests-for-access
tags:
- approvals
- application
- access
title: Approving requests for access roles
---

Every service in the JASMIN Accounts Portal represents access to a resource on JASMIN, such as a particular server or Group Workspace. Most of the time, these resources belong to particular projects or groups, and access will only be granted to users involved in that project or group.

Typically, users with a `MANAGER` or `DEPUTY` role for a service are people working on the associated project, rather than a member of the JASMIN team. These roles mean that the user can approve applications from other users who want to access that resource, usually colleagues working on the same project.

Pending applications are processed using the Accounts Portal in the browser. This example will demonstrate approving access to a Group Workspace, but the process is the same for other services listed in the Accounts Portal.

**Step 1:** Sign in into the {{<link "jasmin_accounts_portal">}}JASMIN Accounts Portal{{</link>}} and select 'Manage JASMIN services' to navigate to the JASMIN Services page. On this page, you will see the list of services you have requested or been granted access to.

{{<image src="img/docs/approving-requests-for-access/services.png" caption="The 'My Services' page showing the services a user has been granted access to. There is a green icon next to the name of the 'example-gws' service, indicating that the user has an active `MANAGER` grant.">}}

**Step 2:** In the list of 'My Services', scroll to the service you want to process applications for. This should have a label to indicate that you have been granted the `MANAGER` or `DEPUTY` role. Click on 'More information' to view the service page.

{{<image src="img/docs/approving-requests-for-access/service-page.png" caption="The 'example-gws' service page">}}

**Step 3:** Click on the 'Pending requests' tab to view the list. The oldest request is at the bottom of the page and the newest is at the top. Click on 'Make decision' to view a request.

{{<image src="img/docs/approving-requests-for-access/pending-requests.png" caption="Pending requests for the 'example-gws' service">}}

**Step 4:** After reading the information provided by the user, scroll down to the 'Decide' section.

{{<image src="img/docs/approving-requests-for-access/application-example.png" caption="An application for the 'example-gws' service.">}}

If you aren't ready to make a decision, you can write a note in the 'Internal comment' box without selecting an option from the 'Decision' drop down, and click 'Save'. This makes the comment visible to yourself, other users with the `MANAGER` or `DEPUTY` role for the service, and CEDA staff.

{{<image src="img/docs/approving-requests-for-access/application-decision.png" caption="An internal comment on the pending application">}}

To approve an application, choose 'APPROVED' from the 'Decision' drop-down menu. This will prompt you to provide an expiry date for this user's access. If none of the options are suitable, you can also specify a date by choosing 'Custom expiry date' from the drop-down menu, and entering your chosen date. After you have chosen an expiry date, click 'Save'.

{{<image src="img/docs/approving-requests-for-access/custom-expiry.png" caption="Entering a custom expiry date for an approved request">}}

If you would like to send a message to the user before approving their application, such as to request further information needed to make a decision, choose 'INCOMPLETE'. This will display a free text field where you can type your message to the user, then click 'Save' to send it. The user will then have the option to amend and resubmit their application in response to your message.

{{<image src="img/docs/approving-requests-for-access/incomplete-application.png" caption="Closing a request as incomplete">}}

To reject a request, choose 'REJECTED' from the 'Decision' drop-down menu. This will also display a free text field you can use to explain the decision to the user, but doesn't give them the option to amend and resubmit their application. Once you have typed your message, click 'Save' to close the application.

{{<image src="img/docs/approving-requests-for-access/rejected-application.png" caption="Closing a request as rejected">}}

## Additional information

- The Accounts Portal will also send you an email when a new application is made for a service you manage. Clicking the link in these emails will take you directly to that application.
- You will also receive notifications in the menu bar of the Accounts Portal, clicking on the notification will also take you directly to the application:

{{<image src="img/docs/approving-requests-for-access/application-notification.png" caption="Pending application visible in the Accounts Portal notifications">}}

- To protect other users' privacy, please do not distribute information from applications or save it to your own computer, as in the JASMIN Terms and Conditions

## Transcript:

In this video tutorial, I will be
showing you how to approve or reject
requests for access using the JASMIN
Accounts Portal.

Every service in the
JASMIN Accounts Portal represents
access to a resource on JASMIN, such as
a particular server, Group Workspace, or
cloud tenency. Most of the time, these
resources belong to particular projects
or groups, and access will only be
granted to users that are involved in
that project or group.

Each service has one or more approvers
that make decisions about who is allowed
to access their service. These approvers
are not necessarily members of CEDA
staff. For example, Group Workspace
managers or cloud tenancy owners.

Until now, the process has been for the
CEDA Helpdesk to approve every request
after consulting with approvers by
email. In the JASMIN Accounts Portal,
approvers can now make decisions on
requests directly with no involvement
from the CEDA Helpdesk.

This tutorial assumes that you have a
JASMIN account, can log into the
JASMIN Accounts Portal, and are a
designated approver for at least one
service. This example will use a cloud
tenency, but the process is the same for
Group Workspaces and project VMs.

Starting from the 'My Services' page, I
can immediately see which services I am
an approver for, the `ceda-dev-M` and `cedatest-U` tenencies.

By clicking on more information, I can
see the details of my current access and
when each role will expire.

As well as the details for the service,
I also have access to two more tabs. The
users tab gives me a list of users for
whom access has been approved, who
granted that access, and when it will
expire.

The pending requests tab gives a list of
the outstanding access requests for this
service.

When a request for access to my service
is submitted, the portal will send me an
email. This email contains some basic
details about the request along with a
link that I can click to review it.
Clicking this link takes me to a page
describing the request in detail,
including information about the user who
submitted the request and the supporting
information they provided.

This page will also display information
about any current or previous access
that the user has. However, this user is
new to the service.

It goes without saying that this
information should never be saved to
your own computer or distributed as in
the JASMIN terms and conditions.

I can use the form at the bottom to make
a decision on the request. If I select
'rejected', two additional fields appear
for me to provide a reason as to why.
The first is for the user and is
mandatory. The second is internal; if
the user applies for access again, it
will be displayed to approvers, but it
will never be displayed to the user.

These fields support the markdown
language for formatting, but it's easier
to use the buttons on the WYSIWYG
editor to add the correct syntax for
you. However, I don't want to reject
this request. When I select 'approved', a
new field appears for me to select an
expiry date from a drop down of common
durations with the most common being 3
years.

If none of the durations are suitable, I
can select 'custom expiry date'. This
causes another field to appear where I
can enter a custom expiry date using a
calendar widget.

However, I'm going to go for 3 years.
Once I submit the form, I'm taken to the
pending requests page where I can see
that there are no pending requests.

Clicking on the users tab, I can see
that Matt P is now a user and the expiry
date is in 3 years time.

That's it for this tutorial. Please
check out the JASMIN channel on YouTube
for more video tutorials like this.
