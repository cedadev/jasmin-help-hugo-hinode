---
aliases: /article/4996-jasmin-training-accounts
description: JASMIN training accounts
slug: jasmin-training-accounts
title: JASMIN training accounts
weight: 80
---

## What are training accounts?

JASMIN training accounts are TEMPORARY accounts that provide a person with
access to JASMIN for a specific event (such as a training workshop) organised
in advance.

The benefits of using these accounts are:

- permissions/services are consistent across all training accounts 
- these permissions include (but are limited to) those normally anticipated for use within training/hackathon events
- they provide access to someone who may not be eligible for a full account - setting up access for multiple users in advance of an event is more efficient for all involved than the usual registration process

## When should they be used?

- By participants of training events led by the JASMIN team
- (By special arrangement with the event organiser) by participants of other events such as training workshops or hackathons which require temporary access to JASMIN

In both cases, use of the training accounts is only for the duration of the
event. Use beyond the event requires the normal registration process.

## Who can request these accounts?

- Organisers of training events / hackathons, by contacting the JASMIN team.

## For event organisers

### How to request training accounts for your event

If you think these accounts could be useful for you, please contact the
helpdesk with the following information:

- Name/date of event 
- Estimated number of attendees (note: we only have 150 such accounts, and events sometimes overlap)
- What services the accounts will need access to e.g. sci machines, GWS, CEDA Archive, Notebook Service, Transfer Servers, LOTUS, or any other special services on JASMIN 

- Any special requests for accessing resources
  - By default, the training accounts have access to the following services. 
  - Any request for other services beyond these would need to be considered by the JASMIN team:
    - Login, nx-login, sci and xfer servers
    - `workshop` group workspace (`/gws/pw/j07/workshop`)
    - use of LOTUS via the `workshop` Slurm queue
    - Jupyter Notebooks service (requires users to set password)

Once the JASMIN team have confirmed that we can support your event, you will
need to collect and supply the following **at least 2 weeks** before your
event:

- Email addresses for all attendees who need a training account. 
  - These addresses cannot already be associated with an existing JASMIN account. They must be different.

Please note that we cannot guarantee the following during your event:

- no login problems
- uptime of services
- no problems due to usage at scale (particularly for use of sci servers and/or Notebook Service)

### What to tell your event attendees

The JASMIN team will set up the accounts and send credentials to attendees
approximately 1 week before your event.

Please ensure you have given the following information to attendees:

- A link to this help page. Tell them all information they need is under the 'for event attendees' section.
- Tell users what services they have been granted access to (see above) and any additional information e.g. full path to any GWSs, whether they will need to use the JASMIN Notebook Service or accounts portal. 
- Tell the users when the training accounts will be closed down. This is usually within 24 hours of the end of the event. They would be responsible for copying any important data and/or code elsewhere if it is important that these are not lost when the accounts are wiped.

***

## For event attendees

### How to set up your temporary account

1. Training account credentials will be emailed to you via OneDrive. Sometimes the OneDrive email ends up in junk/spam folders, please check here. If you still can't find the email, please contact the helpdesk ASAP. To access the training account credentials, you must:
    1. Click on the OneDrive link.
    1. Enter your email address (if you already have a JASMIN account, this will be the alternative email address you provided).
    1. If you are having difficulty opening the link, please sign out of any alternative OneDrive accounts and then try again.
    1. You will then be emailed a verification code.
    1. Enter this code on OneDrive.
    1. Download the files. These contain your training account credentials.
1. Next, you need to use these training account credentials to set up your own machine for accessing JASMIN. Follow the instructions in [Ex00](https://github.com/cedadev/jasmin-workshop/tree/master/exercises/ex00). You MUST do this before your event.
1. You may need access to the JASMIN Notebook Service and Accounts Portal. Your event organiser will let you know whether this is needed for your particular event. If you do need it, you will need to follow the steps in the section below.
    1. For the JASMIN Beginners workshop: you do not need this.
    1. For the JASMIN Advanced workshop: you do need this. Please follow the steps in the section below.
1. Before the event, familiarise yourself with the [JASMIN help documentation site]({{% ref "/" %}}). This should answer most questions you may have.

If you are attending a 3rd-party-led event, we suggest taking a look at the
[other JASMIN workshop training materials](https://github.com/cedadev/jasmin-workshop)
\- especially if you are a new user. Your event organiser should
provide full details of how the training account should be used for that
particular event - please contact them if you have any issues.

### JASMIN Notebook Service and Accounts Portal access

Access to these services requires a password. This is not sent in the OneDrive
link. If you need access to these services, you must:

- Go to the {{<link "https://accounts.jasmin.ac.uk/account/password_reset/" >}}Reset Account Password function of the JASMIN Accounts portal{{</link>}}
- Enter your email address (NB: the one to be used for the training account)
- You will then receive a password reset email (don’t forget to check your spam folder). Follow-
- You can now use this new password for accessing the notebook service and the accounts portal.
