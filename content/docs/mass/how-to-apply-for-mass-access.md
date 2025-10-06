---
aliases:
  - /article/228-how-to-apply-for-mass-access
  - /article/226-how-to-apply-for-access-to-met-office-mass-archive-from-jasmin
description: How to apply for MASS access
slug: how-to-apply-for-mass-access
title: How to apply for MASS access
---

### Introduction

To access data held in the Met Office MASS archive, you will need:

- a sponsor
- access to the `mass-cli` client machine
- a MASS account

Your sponsor will need to be a **Senior Met Office Scientist** with whom you
are working on a collaborative research project. If you are a Met Office
employee, your sponsor will be your manager.

Note: The following instructions also assume you already have a **JASMIN login
account** and the **jasmin-login** service. If you do not, please [follow steps
1-4 here]({{% ref "get-started-with-jasmin" %}}).

### Step One - Sponsor Form

**Ask your Met Office sponsor** to complete the sponsor form {{<link "https://metoffice.service-now.com/sp?id=sc_cat_item&sys_id=f00fb9d4dbd06b404690fe9b0c9619a6">}} available here only to those in the Met Office{{</link>}}.

The following information will be asked for, so please provide your sponsor
with any details they may not have:

- Your full name
- Your official email address
- Your organization's name
- Your department name
- The host country of your organization
- A list of MASS projects and/or data sets that you need access to. A full MOOSE dataset path is required, and your sponsor should help you determine this.
- Your JASMIN username
- Your JASMIN user ID number (UID). You can get this by typing `echo $UID` at the terminal on any JASMIN machine.

The information you provide to the Met Office will be treated in accordance
with the {{<link "https://www.metoffice.gov.uk/about-us/legal/privacy">}}Met Office Privacy Policy{{</link>}}, and your use of the service will be subject to the {{<link "https://metoffice.github.io/JASMIN-MASS-access/Terms_and_Conditions.html">}}Terms and Conditions of Use{{</link>}} for the service.

### Step Two - Access to `mass-cli`

Next you need to apply for {{<link "https://accounts.jasmin.ac.uk/services/additional_services/mass/">}}the MASS service{{</link>}} in the JASMIN Accounts Portal:

  1. Sign into your JASMIN account
  1. Select ‘JASMIN Services’
  1. Select ‘Additional Services’
  1. Next to ‘mass’ click ‘More information’ 
  1. Select ‘Apply for access’
  1. Within the request, please name your sponsor

### Step Three - MASS account

When steps one and two are complete, you will be provided with a specific MASS account to
use on JASMIN and emailed a MOOSE credentials file. Please see [Setting up
your JASMIN account for access to MASS]({{% ref "setting-up-your-jasmin-account-for-access-to-mass" %}}) once you have received the credentials file.
Your MASS account will give (read-only) access to the relevant data on MASS based on the information provided by your sponsor;
please note that the access control is handled by the Met Office and not by the JASMIN team.

Note: If you have access to MASS on other systems you cannot copy those MOOSE
credentials file/s onto JASMIN – they will not work! Please also see the
[External Users’ MOOSE Guide]({{% ref "moose-the-mass-client-user-guide" %}})
for what MOOSE commands are available on JASMIN.
