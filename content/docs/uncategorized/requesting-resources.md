---
aliases:
- /article/5022-requesting-resources
- /article/4467-request-gws
description: Requesting resources
slug: requesting-resources
tags:
- quota
- requirement
- gws
- workspace
- tenancy
title: Requesting resources
---

## How projects and resources are managed

Resouces on JASMIN, such as storage and compute, are allocated to science
communities separated into "consortia". Each consortium has a manager: a
representative of that science community who is in touch with its major
activities and understands the resource requirements for projects in that
domain. Representatives of individual projects should discuss requirements
with their Consortium Manager, who is best placed to make decisions about the
allocation of JASMIN resources within that consortium. Requirements can be
documented using the “JASMIN Resource Management” tool, but need to be
approved by a Consortium Manager before being passed to the JASMIN Team for
provisioning.

[See here for further details](https://jasmin.ac.uk/users/resources-projects),
including a list of current consortia and their managers.

## Accessing the JASMIN projects portal

The {{< link "https://projects.jasmin.ac.uk" >}}JASMIN projects portal{{</link>}} provides a place
to:

- document the resources required for a project (new projects, or changes to existing projects)
- submit those requirements for review
- track the provision of those resources

Usually, you would only need to access the projects portal if you are:

- the Principal Investigator (or their delegated project manager) for a project
  - to document requirements for a project
  - to invite other individuals (with a JASMIN account) who may wish to view and/or discuss the requirements
- a consortium manager
  - to review/approve resource requirements

**Note: Please do not make requests yourself unless you are involved in the
management of the project: speak to the project or group workspace (GWS)
manager and ask them to make the request.**

These users need to log in with their JASMIN account credentials, the same as
those used for the JASMIN accounts portal. 2-factor authentication is in use,
with verification codes sent to the email address associated with your JASMIN
account (this is the same process used to access the JASMIN notebook service).

Once you have logged in, you are presented with a view of the projects where
you are named as owner or collaborator (or, for consortium managers, where you
are the relevant consortium manager). A further guide for consortium managers
about how to process requests for resources is available
[here]({{% ref "processing-requests-for-resources" %}}).

{{<image src="img/docs/requesting-resources/file-CFe92vMRQV.png" caption="">}}

## Create a project to record resource requirements

To create a new project:

- Go to "My Projects"
- Click "Start new project"

{{<image src="img/docs/requesting-resources/file-zl6tBZHWsW.png" caption="">}}

Enter details for the project, as described below.

A project can have several Services, such as:

- a group workspace
- a managed cloud tenancy
- an external cloud tenancy
  - [particular compute requirements*]
  - some services are not yet able to be described/requested via this tool, but will be soon.
  - please contact the helpdesk if you're not able to describe what you need.

To add the services needed for the project:

- in the panel on the right, click "Add Service"
- select the category of service required: in this case, we're making requirements for a group workspace, but the available options are: 
  - **Group Workspace** (for shared disk storage for a project)
  - **External Tenancy VIO** (for an external cloud tenancy on the VIO cloud platform)
  - **Managed Tenancy VIO** (for a managed cloud tenancy on the VIO cloud platform)
  - (please do not use the "... Tenancy **MCP** " options as these will soon be removed)
- provide a short name for the service
- click "create".

{{<image src="img/docs/requesting-resources/file-bo7r6lG1NA.png" caption="">}}

{{<image src="img/docs/requesting-resources/file-GPxShAAROa.png" caption="">}}

{{<image src="img/docs/requesting-resources/file-I0n92JdcKD.png" caption="">}}

{{<image src="img/docs/requesting-resources/file-kbDroJj43z.png" caption="">}}

A Service may have several requirements, but, for example, we could request 10
TB of SOF storage for our GWS:

{{<image src="img/docs/requesting-resources/file-uV9ApenDrm.png" caption="">}}

SOF (scale-out filesystem) is the usual type of storage used for GWS volumes,
but you could also request:

- HPOS (high-performance object store available via an S3-like interface)
- PFS (parallel file system, by special request if certain workflows specifically need this)
- SSD (Solid State Disk), used for "small files" or "SMF" volumes for storing code or virtual environments to share within a GWS.

It is assumed that you've considered carefully how you will do your work on
JASMIN, with some knowledge of its services and components. You may find the
following helpful:

- Article: [Understanding new JASMIN storage]({{% ref "understanding-new-jasmin-storage" %}})
- [JASMIN workshop](https://github.com/cedadev/jasmin-workshop) overview talk, explaining the main services offered by JASMIN
- how your request will be [scrutinised]({{% ref "processing-requests-for-resources" %}}) by the relevant consortium manager.

Once created, the requirements appear in the list, along with their start and
end dates and status. This one is "REQUESTED".

{{<image src="img/docs/requesting-resources/file-gg37EcPAxa.png" caption="">}}

{{<image src="img/docs/requesting-resources/file-gKtZB9giSE.png" caption="">}}

Click "Submit for review" and the manager of the relevant consortium will be
notified that they need to review the request, with status updated to
"REQUESTED".

Only a user with "OWNER" status on a project can submit the project for
review. It's best if one person coordinates with the consortium manager once
the outline plan has been agreed with other project contacts (see inviting
another user and joining a project, below)

{{<image src="img/docs/requesting-resources/file-KwyoJbji2p.png" caption="">}}

If there are multiple requirements, make sure these are all documented so that
the consortium manager can consider them all together, in context. Just repeat
the process above for each additional requirement.

The project is marked as "UNDER REVIEW" while the requirements are being
agreed.

The consortium manager may approve, reject or request changes to the
requirements before they are agreed.

Once the consortium manager has agreed, the requirements are ready for
provisioning: the JASMIN team will then manage the provisioning of the
requested resources and the project contact will be notified when this is
complete and the new resources available.

## Invite another user

By default, information in the projects portal is only visible by those
nominated "collaborators" on the project, the relevant consortium manager, and
the JASMIN Team (or others involved in the provision of JASMIN services). To
share your plans for what's needed on a project with other individuals, you
can invite another user to the project:

- Go to "My Projects"
- In the panel on the right, click the link with the number of current collaborators
- Enter the email address of the other user you wish to invite, and press "Invite"
  - Although you are inviting them by email address, they must have a JASMIN account in order to access the projects portal.

## Join an existing project by invitation from another user

If you have received an invitation code from an existing collaborator on a
project, you can use it to join a project as follows:

- Go to "My Projects"
- Click "Join existing project"
- Enter the invitation code which the other user has sent you.

## Request additional resources for an existing project

You can add new requirements to a project once it has been PROVISIONED (but
not while it's already UNDER_REVIEW).

To add new requirements, go to "My Projects" and create the new requirement.

For example, if a GWS currently has 10 TB of SOF space provisioned, and the
new and an additional 5 TB of space is needed, then:

- If the GWS as a whole has the same end date, then create a new requirement for 15TB, with that end date, and submit this so that it can be reviewed.
- If it's just a temporary / short-term boost of storage that's needed 
  - consider whether scratch or XFC storage would suffice
  - create a requirement for the additional storage only, confirming the start and end dates of the new storage
  - in some cases, the end dates of the original storage will be out-of-date, so please agree new dates with your consortium manager as part of this process.

Although these examples have concentrated on storage requirements, the same
methods apply to requesting cloud tenancies. More detail on how to request
these, and additional methods for documenting requirements for compute
resources, will follow in due course.

## Alternatives

In some cases, it may not be appropriate to provide dedicated resources to
certain projects. Your consortium manager should be able to help you look at
other options. In some cases, a relevant project may already exist, and by
discussion with the appropriate manager of that project, it may be possible
for you to make use of those existing resources without the need to create a
new one. There is a certain management overhead associated with setting up and
operating each project's dedicated services, which use expensive resources, so
requests do have to be considered carefully.

The following "generic" Group Workspaces exist for general use by members of
these communities and often solve the problem of a small GWS needed by an
individual:

- [ncas_generic](https://accounts.jasmin.ac.uk/account/login/?next=/services/group_workspaces/%3Fquery%3Dncas_generic) : (National Centre for Atmospheric Science)
- [nceo_generic](https://accounts.jasmin.ac.uk/account/login/?next=/services/group_workspaces/%3Fquery%3Dnceo_generic) : (National Centre for Earth Observation)
- [ceh_generic](https://accounts.jasmin.ac.uk/account/login/?next=/services/group_workspaces/%3Fquery%3Dceh_generic) : (UK Centre for Ecology and Hydrology)

In these cases, the relevant consortium manager is usually the manager of the
"generic" workspace so can approve applications for access to these workspaces
themselves.

Please consult the
[list of available group workspaces](https://accounts.jasmin.ac.uk/account/login/?next=/services/group_workspaces/)
for other options.

Another alternative, for easily accessible short-term storage for an
individual user is the [JASMIN Transfer Cache (XFC) service]({{% ref "xfc" %}}).
